package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.BookmarkBorder
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Flag
import androidx.compose.material.icons.filled.GridView
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Timer
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.MarkingSchemeBadge
import com.example.ui.components.SubjectBadge
import com.example.ui.components.UnitChip
import com.example.ui.viewmodel.ActiveExamState
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MeceeViewModel
import java.util.Locale

@Composable
fun ExamScreen(
    viewModel: MeceeViewModel,
    exam: ActiveExamState
) {
    var showExitWarning by remember { mutableStateOf(false) }
    var showPaletteDialog by remember { mutableStateOf(false) }
    var showSubmitDialog by remember { mutableStateOf(false) }

    BackHandler {
        showExitWarning = true
    }

    if (exam.questions.isEmpty()) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("No questions found for this test.", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(10.dp))
                Button(onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) }) {
                    Text("Return to Dashboard")
                }
            }
        }
        return
    }

    val currentQ = exam.questions.getOrNull(exam.currentIndex) ?: exam.questions[0]
    val selectedOption = exam.userAnswers[currentQ.id]
    val isMarkedForReview = exam.markedForReview.contains(currentQ.id)

    // Format timer
    val hours = exam.timeRemainingSeconds / 3600
    val minutes = (exam.timeRemainingSeconds % 3600) / 60
    val seconds = exam.timeRemainingSeconds % 60
    val timeFormatted = if (hours > 0) {
        String.format(Locale.US, "%02d:%02d:%02d", hours, minutes, seconds)
    } else {
        String.format(Locale.US, "%02d:%02d", minutes, seconds)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .testTag("exam_screen")
            .background(MaterialTheme.colorScheme.background)
    ) {
        // Sticky Exam Header
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(bottomStart = 16.dp, bottomEnd = 16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = exam.title,
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            maxLines = 1
                        )
                        Text(
                            text = "Question ${exam.currentIndex + 1} of ${exam.questions.size}",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    // Timer Chip
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(
                                if (exam.timeRemainingSeconds < 300) Color(0xFFEF4444).copy(alpha = 0.15f)
                                else MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.5f)
                            )
                            .padding(horizontal = 8.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.Timer,
                            contentDescription = null,
                            tint = if (exam.timeRemainingSeconds < 300) Color(0xFFEF4444) else MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = timeFormatted,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            color = if (exam.timeRemainingSeconds < 300) Color(0xFFEF4444) else MaterialTheme.colorScheme.primary
                        )
                    }

                    Spacer(modifier = Modifier.width(6.dp))

                    IconButton(
                        onClick = { viewModel.togglePauseExam() },
                        modifier = Modifier.size(32.dp).testTag("pause_exam_button")
                    ) {
                        Icon(
                            imageVector = if (exam.isPaused) Icons.Default.PlayArrow else Icons.Default.Pause,
                            contentDescription = "Pause",
                            tint = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    Button(
                        onClick = { showSubmitDialog = true },
                        modifier = Modifier
                            .height(34.dp)
                            .testTag("submit_exam_button"),
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("Submit", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        // Question Body
        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .padding(horizontal = 16.dp)
        ) {
            item {
                Spacer(modifier = Modifier.height(12.dp))
                // Tags row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        SubjectBadge(subject = currentQ.subject)
                        Spacer(modifier = Modifier.width(6.dp))
                        UnitChip(unitName = currentQ.unit)
                    }
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        MarkingSchemeBadge()
                        Spacer(modifier = Modifier.width(4.dp))
                        IconButton(
                            onClick = { viewModel.toggleBookmark(currentQ.id, currentQ.isBookmarked) },
                            modifier = Modifier.size(32.dp).testTag("bookmark_button_${currentQ.id}")
                        ) {
                            Icon(
                                imageVector = if (currentQ.isBookmarked) Icons.Default.Bookmark else Icons.Default.BookmarkBorder,
                                contentDescription = "Bookmark",
                                tint = if (currentQ.isBookmarked) Color(0xFFF59E0B) else MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Question Text Card
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
                ) {
                    Text(
                        text = "${exam.currentIndex + 1}. ${currentQ.questionText}",
                        style = MaterialTheme.typography.titleMedium,
                        lineHeight = 24.sp,
                        fontWeight = FontWeight.SemiBold,
                        modifier = Modifier.padding(16.dp)
                    )
                }

                Spacer(modifier = Modifier.height(14.dp))

                // Options (A, B, C, D)
                val options = listOf(
                    0 to currentQ.optionA,
                    1 to currentQ.optionB,
                    2 to currentQ.optionC,
                    3 to currentQ.optionD
                )
                val optionLetters = listOf("A", "B", "C", "D")

                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    options.forEach { (index, text) ->
                        val isSelected = selectedOption == index
                        val isCorrectOption = index == currentQ.correctOptionIndex

                        // Instant feedback colors
                        val containerColor = when {
                            exam.isInstantFeedback && selectedOption != null -> {
                                when {
                                    isCorrectOption -> Color(0xFF10B981).copy(alpha = 0.15f)
                                    isSelected -> Color(0xFFEF4444).copy(alpha = 0.15f)
                                    else -> MaterialTheme.colorScheme.surface
                                }
                            }
                            isSelected -> MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.4f)
                            else -> MaterialTheme.colorScheme.surface
                        }

                        val borderColor = when {
                            exam.isInstantFeedback && selectedOption != null -> {
                                when {
                                    isCorrectOption -> Color(0xFF10B981)
                                    isSelected -> Color(0xFFEF4444)
                                    else -> MaterialTheme.colorScheme.outline.copy(alpha = 0.2f)
                                }
                            }
                            isSelected -> MaterialTheme.colorScheme.primary
                            else -> MaterialTheme.colorScheme.outline.copy(alpha = 0.2f)
                        }

                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable {
                                    if (!exam.isInstantFeedback || selectedOption == null) {
                                        viewModel.selectOption(currentQ.id, index)
                                    }
                                }
                                .testTag("option_${optionLetters[index]}"),
                            shape = RoundedCornerShape(12.dp),
                            colors = CardDefaults.cardColors(containerColor = containerColor),
                            border = androidx.compose.foundation.BorderStroke(if (isSelected || (exam.isInstantFeedback && isCorrectOption)) 2.dp else 1.dp, borderColor)
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(14.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(28.dp)
                                        .clip(CircleShape)
                                        .background(
                                            if (isSelected) MaterialTheme.colorScheme.primary
                                            else MaterialTheme.colorScheme.surfaceVariant
                                        ),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = optionLetters[index],
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 13.sp,
                                        color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                                Spacer(modifier = Modifier.width(12.dp))
                                Text(
                                    text = text,
                                    style = MaterialTheme.typography.bodyMedium,
                                    modifier = Modifier.weight(1f),
                                    fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Normal
                                )
                            }
                        }
                    }
                }

                // Instant Feedback Explanation box
                if (exam.isInstantFeedback && selectedOption != null) {
                    Spacer(modifier = Modifier.height(14.dp))
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = if (selectedOption == currentQ.correctOptionIndex)
                                Color(0xFF10B981).copy(alpha = 0.1f)
                            else Color(0xFFEF4444).copy(alpha = 0.1f)
                        ),
                        border = androidx.compose.foundation.BorderStroke(
                            1.dp,
                            if (selectedOption == currentQ.correctOptionIndex) Color(0xFF10B981) else Color(0xFFEF4444)
                        )
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Default.Lightbulb,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.primary,
                                    modifier = Modifier.size(18.dp)
                                )
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    text = if (selectedOption == currentQ.correctOptionIndex) "Correct! (+1.0 Mark)" else "Incorrect! (-0.25 Mark)",
                                    fontWeight = FontWeight.Bold,
                                    color = if (selectedOption == currentQ.correctOptionIndex) Color(0xFF10B981) else Color(0xFFEF4444)
                                )
                            }
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(
                                text = currentQ.explanation,
                                style = MaterialTheme.typography.bodySmall,
                                lineHeight = 18.sp
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))
            }
        }

        // Bottom Controls Bar
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 10.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Previous button
                OutlinedButton(
                    onClick = { viewModel.previousQuestion() },
                    enabled = exam.currentIndex > 0,
                    modifier = Modifier.testTag("previous_question_button")
                ) {
                    Text("Prev")
                }

                // Mark for review toggle
                IconButton(
                    onClick = { viewModel.toggleMarkForReview(currentQ.id) },
                    modifier = Modifier.testTag("mark_for_review_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.Flag,
                        contentDescription = "Mark for Review",
                        tint = if (isMarkedForReview) Color(0xFFF59E0B) else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                // Clear selection
                if (selectedOption != null && !exam.isInstantFeedback) {
                    TextButton(
                        onClick = { viewModel.clearOption(currentQ.id) },
                        modifier = Modifier.testTag("clear_option_button")
                    ) {
                        Text("Clear", color = MaterialTheme.colorScheme.onSurfaceVariant, fontSize = 12.sp)
                    }
                }

                // Grid Palette Sheet button
                IconButton(
                    onClick = { showPaletteDialog = true },
                    modifier = Modifier.testTag("question_palette_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.GridView,
                        contentDescription = "Palette",
                        tint = MaterialTheme.colorScheme.primary
                    )
                }

                // Next button
                Button(
                    onClick = {
                        if (exam.currentIndex < exam.questions.size - 1) {
                            viewModel.nextQuestion()
                        } else {
                            showSubmitDialog = true
                        }
                    },
                    modifier = Modifier.testTag("next_question_button")
                ) {
                    Text(if (exam.currentIndex < exam.questions.size - 1) "Next" else "Review")
                }
            }
        }
    }

    // Question Grid Palette Dialog
    if (showPaletteDialog) {
        AlertDialog(
            onDismissRequest = { showPaletteDialog = false },
            title = {
                Text(
                    text = "Question Palette (${exam.questions.size} Questions)",
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
            },
            text = {
                Column {
                    // Legend
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceAround
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(modifier = Modifier.size(10.dp).clip(CircleShape).background(Color(0xFF10B981)))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Answered", fontSize = 11.sp)
                        }
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(modifier = Modifier.size(10.dp).clip(CircleShape).background(Color(0xFFF59E0B)))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Marked", fontSize = 11.sp)
                        }
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(modifier = Modifier.size(10.dp).clip(CircleShape).background(MaterialTheme.colorScheme.surfaceVariant))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Unanswered", fontSize = 11.sp)
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    LazyVerticalGrid(
                        columns = GridCells.Fixed(5),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp),
                        modifier = Modifier.height(300.dp)
                    ) {
                        itemsIndexed(exam.questions) { idx, q ->
                            val isAns = exam.userAnswers.containsKey(q.id)
                            val isRev = exam.markedForReview.contains(q.id)
                            val isCurr = exam.currentIndex == idx

                            val boxColor = when {
                                isRev -> Color(0xFFF59E0B)
                                isAns -> Color(0xFF10B981)
                                else -> MaterialTheme.colorScheme.surfaceVariant
                            }

                            Box(
                                modifier = Modifier
                                    .size(44.dp)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(boxColor)
                                    .border(
                                        width = if (isCurr) 2.dp else 0.dp,
                                        color = if (isCurr) MaterialTheme.colorScheme.primary else Color.Transparent,
                                        shape = RoundedCornerShape(8.dp)
                                    )
                                    .clickable {
                                        viewModel.goToQuestion(idx)
                                        showPaletteDialog = false
                                    }
                                    .testTag("palette_item_$idx"),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "${idx + 1}",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp,
                                    color = if (isAns || isRev) Color.White else MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
            },
            confirmButton = {
                Button(onClick = { showPaletteDialog = false }) {
                    Text("Close")
                }
            }
        )
    }

    // Submit Confirmation Dialog
    if (showSubmitDialog) {
        val total = exam.questions.size
        val answered = exam.userAnswers.size
        val unanswered = total - answered
        val marked = exam.markedForReview.size

        AlertDialog(
            onDismissRequest = { showSubmitDialog = false },
            title = {
                Text("Submit Mock Exam?", fontWeight = FontWeight.Bold)
            },
            text = {
                Column {
                    Text("Review your test summary before final submission:")
                    Spacer(modifier = Modifier.height(10.dp))
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
                    ) {
                        Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            Text("• Total Questions: $total", fontWeight = FontWeight.Medium)
                            Text("• Answered: $answered", color = Color(0xFF10B981), fontWeight = FontWeight.Bold)
                            Text("• Unanswered: $unanswered", color = MaterialTheme.colorScheme.onSurfaceVariant)
                            Text("• Marked for Review: $marked", color = Color(0xFFF59E0B), fontWeight = FontWeight.SemiBold)
                            Text("• Negative Penalty Rule: -0.25 marks per wrong answer", color = Color(0xFFEF4444), fontSize = 11.sp)
                        }
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        showSubmitDialog = false
                        viewModel.submitExam()
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                    modifier = Modifier.testTag("confirm_submit_exam_button")
                ) {
                    Text("Submit & View Results", fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                OutlinedButton(onClick = { showSubmitDialog = false }) {
                    Text("Resume Test")
                }
            }
        )
    }

    // Exit Warning Dialog
    if (showExitWarning) {
        AlertDialog(
            onDismissRequest = { showExitWarning = false },
            title = { Text("Exit Mock Exam?") },
            text = { Text("Are you sure you want to leave? Your progress in this active session will be discarded, or you can submit now to save your record.") },
            confirmButton = {
                Button(
                    onClick = {
                        showExitWarning = false
                        viewModel.submitExam()
                    }
                ) {
                    Text("Submit & Save")
                }
            },
            dismissButton = {
                TextButton(
                    onClick = {
                        showExitWarning = false
                        viewModel.navigateTo(AppScreen.DASHBOARD)
                    }
                ) {
                    Text("Quit Without Saving", color = Color(0xFFEF4444))
                }
            }
        )
    }
}
