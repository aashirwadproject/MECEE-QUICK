package com.example.data.repository

import com.example.data.local.ExamAttemptDao
import com.example.data.local.ExamAttemptEntity
import com.example.data.local.QuestionDao
import com.example.data.local.QuestionEntity
import com.example.data.model.SeedQuestions
import com.example.data.model.SyllabusCatalog
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext

class MeceeRepository(
    private val questionDao: QuestionDao,
    private val examAttemptDao: ExamAttemptDao
) {
    val allQuestions: Flow<List<QuestionEntity>> = questionDao.getAllQuestions()
    val bookmarkedQuestions: Flow<List<QuestionEntity>> = questionDao.getBookmarkedQuestions()
    val allExamAttempts: Flow<List<ExamAttemptEntity>> = examAttemptDao.getAllAttempts()

    suspend fun checkAndSeedDatabase() = withContext(Dispatchers.IO) {
        val count = questionDao.getQuestionCount()
        if (count == 0) {
            val entities = SeedQuestions.QUESTIONS.map { seed ->
                QuestionEntity(
                    subject = seed.subject,
                    unit = seed.unit,
                    priority = seed.priority,
                    questionText = seed.questionText,
                    optionA = seed.optionA,
                    optionB = seed.optionB,
                    optionC = seed.optionC,
                    optionD = seed.optionD,
                    correctOptionIndex = seed.correctOptionIndex,
                    explanation = seed.explanation,
                    isBookmarked = false,
                    isUserAdded = false
                )
            }
            questionDao.insertAll(entities)
        }
    }

    fun getQuestionsBySubject(subject: String): Flow<List<QuestionEntity>> =
        questionDao.getQuestionsBySubject(subject)

    fun getQuestionsByUnit(unit: String): Flow<List<QuestionEntity>> =
        questionDao.getQuestionsByUnit(unit)

    fun searchQuestions(query: String): Flow<List<QuestionEntity>> =
        questionDao.searchQuestions(query)

    suspend fun insertQuestion(question: QuestionEntity): Long = withContext(Dispatchers.IO) {
        questionDao.insertQuestion(question)
    }

    suspend fun insertQuestions(questions: List<QuestionEntity>) = withContext(Dispatchers.IO) {
        questionDao.insertAll(questions)
    }

    suspend fun toggleBookmark(questionId: Long, currentStatus: Boolean) = withContext(Dispatchers.IO) {
        questionDao.setBookmark(questionId, !currentStatus)
    }

    suspend fun deleteQuestion(id: Long) = withContext(Dispatchers.IO) {
        questionDao.deleteQuestion(id)
    }

    suspend fun saveExamAttempt(attempt: ExamAttemptEntity): Long = withContext(Dispatchers.IO) {
        examAttemptDao.insertAttempt(attempt)
    }

    fun getAttemptById(id: Long): Flow<ExamAttemptEntity?> =
        examAttemptDao.getAttemptById(id)

    suspend fun deleteAttempt(id: Long) = withContext(Dispatchers.IO) {
        examAttemptDao.deleteAttempt(id)
    }

    suspend fun clearHistory() = withContext(Dispatchers.IO) {
        examAttemptDao.deleteAllAttempts()
    }

    /**
     * Parses raw extracted text (e.g. from a PDF or syllabus question document)
     * Supports formats:
     * Question text
     * A) ... B) ... C) ... D) ...
     * Ans: A / B / C / D
     * Exp: ...
     */
    suspend fun parseAndImportRawQuestions(
        rawText: String,
        targetSubject: String,
        targetUnit: String
    ): Int = withContext(Dispatchers.IO) {
        val parsedList = mutableListOf<QuestionEntity>()
        val blocks = rawText.split(Regex("\n(?=\\d+[.)]\\s+|Question\\s+\\d+[:.]|Q\\d+[:.]|Q[:.]\\s*)"))

        for (block in blocks) {
            val trimmed = block.trim()
            if (trimmed.length < 15) continue

            try {
                var qText = ""
                var optA = ""
                var optB = ""
                var optC = ""
                var optD = ""
                var correctIdx = 0
                var explanation = "Imported from custom syllabus material."

                val lines = trimmed.lines().map { it.trim() }.filter { it.isNotEmpty() }
                val questionLines = mutableListOf<String>()

                for (line in lines) {
                    when {
                        line.startsWith("A)", ignoreCase = true) || line.startsWith("A.", ignoreCase = true) || line.startsWith("(A)", ignoreCase = true) -> {
                            optA = line.replaceFirst(Regex("^(\\([Aa]\\)|[Aa][.)])\\s*"), "")
                        }
                        line.startsWith("B)", ignoreCase = true) || line.startsWith("B.", ignoreCase = true) || line.startsWith("(B)", ignoreCase = true) -> {
                            optB = line.replaceFirst(Regex("^(\\([Bb]\\)|[Bb][.)])\\s*"), "")
                        }
                        line.startsWith("C)", ignoreCase = true) || line.startsWith("C.", ignoreCase = true) || line.startsWith("(C)", ignoreCase = true) -> {
                            optC = line.replaceFirst(Regex("^(\\([Cc]\\)|[Cc][.)])\\s*"), "")
                        }
                        line.startsWith("D)", ignoreCase = true) || line.startsWith("D.", ignoreCase = true) || line.startsWith("(D)", ignoreCase = true) -> {
                            optD = line.replaceFirst(Regex("^(\\([Dd]\\)|[Dd][.)])\\s*"), "")
                        }
                        line.startsWith("Ans", ignoreCase = true) || line.startsWith("Answer", ignoreCase = true) || line.startsWith("Correct", ignoreCase = true) -> {
                            val upper = line.uppercase()
                            if (upper.contains("A") && !upper.contains("B") && !upper.contains("C") && !upper.contains("D")) correctIdx = 0
                            else if (upper.contains("B")) correctIdx = 1
                            else if (upper.contains("C")) correctIdx = 2
                            else if (upper.contains("D")) correctIdx = 3
                        }
                        line.startsWith("Exp", ignoreCase = true) || line.startsWith("Explanation", ignoreCase = true) || line.startsWith("Reason", ignoreCase = true) -> {
                            explanation = line.replaceFirst(Regex("^(Exp|Explanation|Reason)[:.]\\s*", RegexOption.IGNORE_CASE), "")
                        }
                        else -> {
                            if (optA.isEmpty()) {
                                val cleanLine = line.replaceFirst(Regex("^(\\d+[.)]|Question\\s+\\d+[:.]|Q\\d+[:.]|Q[:.])\\s*"), "")
                                questionLines.add(cleanLine)
                            }
                        }
                    }
                }

                qText = questionLines.joinToString(" ")
                if (qText.isNotEmpty() && optA.isNotEmpty() && optB.isNotEmpty()) {
                    if (optC.isEmpty()) optC = "None of the above"
                    if (optD.isEmpty()) optD = "All of the above"

                    val unitObj = SyllabusCatalog.getUnitByName(targetUnit)
                    val priority = unitObj?.priorityLevel ?: 3

                    parsedList.add(
                        QuestionEntity(
                            subject = targetSubject,
                            unit = targetUnit,
                            priority = priority,
                            questionText = qText,
                            optionA = optA,
                            optionB = optB,
                            optionC = optC,
                            optionD = optD,
                            correctOptionIndex = correctIdx,
                            explanation = explanation,
                            isUserAdded = true
                        )
                    )
                }
            } catch (_: Exception) {
                // Ignore malformed block and continue
            }
        }

        if (parsedList.isNotEmpty()) {
            questionDao.insertAll(parsedList)
        }
        parsedList.size
    }
}
