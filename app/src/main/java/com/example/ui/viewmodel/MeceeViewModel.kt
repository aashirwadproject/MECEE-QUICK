package com.example.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.local.AppDatabase
import com.example.data.local.ExamAttemptEntity
import com.example.data.local.QuestionEntity
import com.example.data.model.SubjectType
import com.example.data.model.SyllabusCatalog
import com.example.data.repository.MeceeRepository
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject

enum class AppScreen {
    DASHBOARD,
    PRACTICE,
    EXAM,
    REVIEW,
    ANALYTICS,
    SYLLABUS,
    QUESTION_MANAGER
}

enum class ReviewFilter {
    ALL,
    INCORRECT,
    CORRECT,
    UNATTEMPTED,
    BOOKMARKED
}

data class ReviewQuestionItem(
    val question: QuestionEntity,
    val selectedOptionIndex: Int?, // null if unattempted
    val isCorrect: Boolean,
    val penalty: Float // 0.25 if incorrect, 0 if correct/unattempted
)

data class ActiveExamState(
    val title: String = "",
    val type: String = "MOCK",
    val questions: List<QuestionEntity> = emptyList(),
    val currentIndex: Int = 0,
    val userAnswers: Map<Long, Int> = emptyMap(),
    val markedForReview: Set<Long> = emptySet(),
    val timeRemainingSeconds: Long = 0,
    val totalDurationSeconds: Long = 0,
    val isPaused: Boolean = false,
    val isInstantFeedback: Boolean = false,
    val isSubmitted: Boolean = false
)

data class SubjectStats(
    val subject: SubjectType,
    val totalAttempted: Int,
    val correct: Int,
    val accuracy: Float
)

class MeceeViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: MeceeRepository

    init {
        val database = AppDatabase.getInstance(application)
        repository = MeceeRepository(database.questionDao(), database.examAttemptDao())
        viewModelScope.launch {
            repository.checkAndSeedDatabase()
        }
    }

    val allQuestions: StateFlow<List<QuestionEntity>> = repository.allQuestions
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val bookmarkedQuestions: StateFlow<List<QuestionEntity>> = repository.bookmarkedQuestions
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val examAttempts: StateFlow<List<ExamAttemptEntity>> = repository.allExamAttempts
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _currentScreen = MutableStateFlow(AppScreen.DASHBOARD)
    val currentScreen: StateFlow<AppScreen> = _currentScreen.asStateFlow()

    private val _activeExam = MutableStateFlow<ActiveExamState?>(null)
    val activeExam: StateFlow<ActiveExamState?> = _activeExam.asStateFlow()

    private val _currentReviewAttempt = MutableStateFlow<ExamAttemptEntity?>(null)
    val currentReviewAttempt: StateFlow<ExamAttemptEntity?> = _currentReviewAttempt.asStateFlow()

    private val _reviewQuestions = MutableStateFlow<List<ReviewQuestionItem>>(emptyList())
    val reviewQuestions: StateFlow<List<ReviewQuestionItem>> = _reviewQuestions.asStateFlow()

    private val _reviewFilter = MutableStateFlow(ReviewFilter.ALL)
    val reviewFilter: StateFlow<ReviewFilter> = _reviewFilter.asStateFlow()

    private var timerJob: Job? = null

    fun navigateTo(screen: AppScreen) {
        _currentScreen.value = screen
    }

    // Start Exam Setup
    fun startExam(
        title: String,
        type: String,
        subjectFilter: String? = null,
        unitFilter: String? = null,
        questionCount: Int = 200,
        durationMinutes: Int = 180,
        isInstantFeedback: Boolean = false,
        onlyHighYield: Boolean = false
    ) {
        val allPool = allQuestions.value
        var filtered = when {
            unitFilter != null -> allPool.filter { it.unit.equals(unitFilter, ignoreCase = true) }
            subjectFilter != null -> allPool.filter { it.subject.equals(subjectFilter, ignoreCase = true) }
            onlyHighYield -> {
                val highYieldNames = SyllabusCatalog.BIG_PRIORITY_LIST.map { it.first }
                allPool.filter { highYieldNames.contains(it.unit) || it.priority >= 4 }
            }
            else -> allPool
        }

        if (filtered.isEmpty()) {
            filtered = allPool
        }

        // Shuffle and limit
        val examQuestions = filtered.shuffled().take(questionCount.coerceAtLeast(1))
        val totalSecs = (durationMinutes * 60).toLong()

        _activeExam.value = ActiveExamState(
            title = title,
            type = type,
            questions = examQuestions,
            currentIndex = 0,
            userAnswers = emptyMap(),
            markedForReview = emptySet(),
            timeRemainingSeconds = totalSecs,
            totalDurationSeconds = totalSecs,
            isPaused = false,
            isInstantFeedback = isInstantFeedback,
            isSubmitted = false
        )

        startTimer()
        _currentScreen.value = AppScreen.EXAM
    }

    private fun startTimer() {
        timerJob?.cancel()
        timerJob = viewModelScope.launch {
            while (true) {
                delay(1000)
                val current = _activeExam.value ?: break
                if (current.isSubmitted) break
                if (!current.isPaused && current.timeRemainingSeconds > 0) {
                    val remaining = current.timeRemainingSeconds - 1
                    _activeExam.value = current.copy(timeRemainingSeconds = remaining)
                    if (remaining <= 0) {
                        submitExam()
                        break
                    }
                }
            }
        }
    }

    fun togglePauseExam() {
        _activeExam.value?.let { exam ->
            _activeExam.value = exam.copy(isPaused = !exam.isPaused)
        }
    }

    fun selectOption(questionId: Long, optionIndex: Int) {
        _activeExam.value?.let { exam ->
            val updated = exam.userAnswers.toMutableMap()
            updated[questionId] = optionIndex
            _activeExam.value = exam.copy(userAnswers = updated)
        }
    }

    fun clearOption(questionId: Long) {
        _activeExam.value?.let { exam ->
            val updated = exam.userAnswers.toMutableMap()
            updated.remove(questionId)
            _activeExam.value = exam.copy(userAnswers = updated)
        }
    }

    fun toggleMarkForReview(questionId: Long) {
        _activeExam.value?.let { exam ->
            val updated = exam.markedForReview.toMutableSet()
            if (updated.contains(questionId)) updated.remove(questionId) else updated.add(questionId)
            _activeExam.value = exam.copy(markedForReview = updated)
        }
    }

    fun goToQuestion(index: Int) {
        _activeExam.value?.let { exam ->
            if (index in exam.questions.indices) {
                _activeExam.value = exam.copy(currentIndex = index)
            }
        }
    }

    fun nextQuestion() {
        _activeExam.value?.let { exam ->
            if (exam.currentIndex < exam.questions.size - 1) {
                _activeExam.value = exam.copy(currentIndex = exam.currentIndex + 1)
            }
        }
    }

    fun previousQuestion() {
        _activeExam.value?.let { exam ->
            if (exam.currentIndex > 0) {
                _activeExam.value = exam.copy(currentIndex = exam.currentIndex - 1)
            }
        }
    }

    fun submitExam() {
        val exam = _activeExam.value ?: return
        timerJob?.cancel()

        var correctCount = 0
        var incorrectCount = 0
        val reviewItems = mutableListOf<ReviewQuestionItem>()
        val jsonArray = JSONArray()

        for (q in exam.questions) {
            val selected = exam.userAnswers[q.id]
            val isCorrect = selected != null && selected == q.correctOptionIndex
            val penalty = if (selected != null && !isCorrect) 0.25f else 0.0f

            if (selected != null) {
                if (isCorrect) correctCount++ else incorrectCount++
            }

            reviewItems.add(
                ReviewQuestionItem(
                    question = q,
                    selectedOptionIndex = selected,
                    isCorrect = isCorrect,
                    penalty = penalty
                )
            )

            val qObj = JSONObject().apply {
                put("id", q.id)
                put("subject", q.subject)
                put("unit", q.unit)
                put("questionText", q.questionText)
                put("optionA", q.optionA)
                put("optionB", q.optionB)
                put("optionC", q.optionC)
                put("optionD", q.optionD)
                put("correctOptionIndex", q.correctOptionIndex)
                put("explanation", q.explanation)
                put("selectedOptionIndex", selected ?: -1)
                put("isCorrect", isCorrect)
                put("penalty", penalty.toDouble())
            }
            jsonArray.put(qObj)
        }

        val totalQ = exam.questions.size
        val unattempted = totalQ - (correctCount + incorrectCount)
        val negativePenalty = incorrectCount * 0.25f
        val finalScore = (correctCount * 1.0f) - negativePenalty
        val maxScore = totalQ * 1.0f
        val attemptedCount = correctCount + incorrectCount
        val accuracy = if (attemptedCount > 0) (correctCount.toFloat() / attemptedCount.toFloat()) * 100f else 0f
        val timeSpent = exam.totalDurationSeconds - exam.timeRemainingSeconds

        val attemptEntity = ExamAttemptEntity(
            examTitle = exam.title,
            examType = exam.type,
            totalQuestions = totalQ,
            attemptedCount = attemptedCount,
            correctCount = correctCount,
            incorrectCount = incorrectCount,
            unattemptedCount = unattempted,
            score = finalScore,
            maxScore = maxScore,
            accuracyPercentage = accuracy,
            negativePenalty = negativePenalty,
            timeSpentSeconds = timeSpent,
            questionsDataJson = jsonArray.toString()
        )

        viewModelScope.launch {
            val id = repository.saveExamAttempt(attemptEntity)
            val savedAttempt = attemptEntity.copy(id = id)
            _currentReviewAttempt.value = savedAttempt
            _reviewQuestions.value = reviewItems
            _activeExam.value = exam.copy(isSubmitted = true)
            _reviewFilter.value = ReviewFilter.ALL
            _currentScreen.value = AppScreen.REVIEW
        }
    }

    fun setReviewFilter(filter: ReviewFilter) {
        _reviewFilter.value = filter
    }

    fun loadAttemptForReview(attempt: ExamAttemptEntity) {
        _currentReviewAttempt.value = attempt
        val items = mutableListOf<ReviewQuestionItem>()

        try {
            if (attempt.questionsDataJson.isNotEmpty()) {
                val array = JSONArray(attempt.questionsDataJson)
                for (i in 0 until array.length()) {
                    val obj = array.getJSONObject(i)
                    val q = QuestionEntity(
                        id = obj.optLong("id", i.toLong()),
                        subject = obj.optString("subject", "ZOOLOGY"),
                        unit = obj.optString("unit", ""),
                        questionText = obj.optString("questionText", ""),
                        optionA = obj.optString("optionA", ""),
                        optionB = obj.optString("optionB", ""),
                        optionC = obj.optString("optionC", ""),
                        optionD = obj.optString("optionD", ""),
                        correctOptionIndex = obj.optInt("correctOptionIndex", 0),
                        explanation = obj.optString("explanation", "")
                    )
                    val sel = obj.optInt("selectedOptionIndex", -1)
                    val selected = if (sel >= 0) sel else null
                    val isCorrect = obj.optBoolean("isCorrect", false)
                    val penalty = obj.optDouble("penalty", 0.0).toFloat()

                    items.add(ReviewQuestionItem(q, selected, isCorrect, penalty))
                }
            }
        } catch (_: Exception) {
            // fallback
        }

        _reviewQuestions.value = items
        _reviewFilter.value = ReviewFilter.ALL
        _currentScreen.value = AppScreen.REVIEW
    }

    fun toggleBookmark(questionId: Long, currentStatus: Boolean) {
        viewModelScope.launch {
            repository.toggleBookmark(questionId, currentStatus)
        }
    }

    fun deleteAttempt(id: Long) {
        viewModelScope.launch {
            repository.deleteAttempt(id)
            if (_currentReviewAttempt.value?.id == id) {
                _currentReviewAttempt.value = null
                _currentScreen.value = AppScreen.ANALYTICS
            }
        }
    }

    fun clearAllHistory() {
        viewModelScope.launch {
            repository.clearHistory()
        }
    }

    fun addCustomQuestion(
        subject: String,
        unit: String,
        questionText: String,
        optionA: String,
        optionB: String,
        optionC: String,
        optionD: String,
        correctOptionIndex: Int,
        explanation: String,
        onSuccess: () -> Unit
    ) {
        viewModelScope.launch {
            val unitObj = SyllabusCatalog.getUnitByName(unit)
            val entity = QuestionEntity(
                subject = subject,
                unit = unit,
                priority = unitObj?.priorityLevel ?: 3,
                questionText = questionText,
                optionA = optionA,
                optionB = optionB,
                optionC = optionC,
                optionD = optionD,
                correctOptionIndex = correctOptionIndex,
                explanation = explanation,
                isUserAdded = true
            )
            repository.insertQuestion(entity)
            onSuccess()
        }
    }

    fun importQuestionsFromText(
        rawText: String,
        subject: String,
        unit: String,
        onComplete: (Int) -> Unit
    ) {
        viewModelScope.launch {
            val count = repository.parseAndImportRawQuestions(rawText, subject, unit)
            onComplete(count)
        }
    }

    fun deleteQuestion(questionId: Long) {
        viewModelScope.launch {
            repository.deleteQuestion(questionId)
        }
    }
}
