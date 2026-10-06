package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.BookmarkBorder
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.local.ExamAttemptEntity
import com.example.ui.components.SubjectBadge
import com.example.ui.components.UnitChip
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MeceeViewModel
import com.example.ui.viewmodel.ReviewFilter
import com.example.ui.viewmodel.ReviewQuestionItem
import java.util.Locale

@Composable
fun ReviewScreen(
    viewModel: MeceeViewModel,
    attempt: ExamAttemptEntity?,
    reviewQuestions: List<ReviewQuestionItem>,
    currentFilter: ReviewFilter
) {
    BackHandler {
        viewModel.navigateTo(AppScreen.DASHBOARD)
    }

    if (attempt == null && reviewQuestions.isEmpty()) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("No review data available.", style = MaterialTheme.typography.titleMedium)
                Spacer(modifier = Modifier.height(10.dp))
                Button(onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) }) {
                    Text("Go to Dashboard")
                }
            }
        }
        return
    }

    val filteredList = reviewQuestions.filter { item ->
        when (currentFilter) {
            ReviewFilter.ALL -> true
            ReviewFilter.INCORRECT -> item.selectedOptionIndex != null && !item.isCorrect
            ReviewFilter.CORRECT -> item.isCorrect
            ReviewFilter.UNATTEMPTED -> item.selectedOptionIndex == null
            ReviewFilter.BOOKMARKED -> item.question.isBookmarked
        }
    }

    val incorrectCount = reviewQuestions.count { it.selectedOptionIndex != null && !it.isCorrect }
    val correctCount = reviewQuestions.count { it.isCorrect }
    val unattemptedCount = reviewQuestions.count { it.selectedOptionIndex == null }
    val score = (correctCount * 1.0f) - (incorrectCount * 0.25f)
    val total = reviewQuestions.size
    val accuracy = if (total - unattemptedCount > 0) {
        (correctCount.toFloat() / (total - unattemptedCount).toFloat()) * 100f
    } else 0f

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .testTag("review_screen")
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(8.dp))
            // Header Bar
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(
                    onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) },
                    modifier = Modifier.testTag("review_back_button")
                ) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }
                Spacer(modifier = Modifier.width(4.dp))
                Column {
                    Text(
                        text = attempt?.examTitle ?: "Exam Review",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Detailed Answer Review & Scientific Explanations",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        // Scorecard Summary
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("scorecard_card"),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.35f)
                ),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.primary.copy(alpha = 0.3f))
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = "FINAL SCORE",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.primary
                            )
                            Row(verticalAlignment = Alignment.Bottom) {
                                Text(
                                    text = String.format(Locale.US, "%.2f", score),
                                    style = MaterialTheme.typography.headlineLarge,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = MaterialTheme.colorScheme.onSurface
                                )
                                Text(
                                    text = " / ${total}",
                                    fontSize = 18.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                    modifier = Modifier.padding(bottom = 4.dp, start = 4.dp)
                                )
                            }
                        }

                        Column(horizontalAlignment = Alignment.End) {
                            Text(
                                text = "ACCURACY",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.secondary
                            )
                            Text(
                                text = "${String.format(Locale.US, "%.1f", accuracy)}%",
                                style = MaterialTheme.typography.titleLarge,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    // Breakdown chips
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = "$correctCount",
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF10B981),
                                fontSize = 16.sp
                            )
                            Text("Correct (+1)", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = "$incorrectCount",
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFFEF4444),
                                fontSize = 16.sp
                            )
                            Text("Wrong (-0.25)", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = "$unattemptedCount",
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                fontSize = 16.sp
                            )
                            Text("Skipped (0)", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = String.format(Locale.US, "-%.2f", incorrectCount * 0.25f),
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFFEF4444),
                                fontSize = 16.sp
                            )
                            Text("Penalty Lost", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }

        // Negative Penalty Guidance
        if (incorrectCount > 0) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFEF4444).copy(alpha = 0.08f)),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFEF4444).copy(alpha = 0.25f))
                ) {
                    Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Warning,
                            contentDescription = null,
                            tint = Color(0xFFEF4444),
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            text = "Negative marking cost you ${String.format(Locale.US, "%.2f", incorrectCount * 0.25f)} marks! Filter by 'Incorrect' below to review and eliminate recurring conceptual traps.",
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFFDC2626),
                            lineHeight = 16.sp
                        )
                    }
                }
            }
        }

        // Filter Pills
        item {
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                item {
                    FilterChip(
                        selected = currentFilter == ReviewFilter.ALL,
                        onClick = { viewModel.setReviewFilter(ReviewFilter.ALL) },
                        label = { Text("All ($total)") },
                        modifier = Modifier.testTag("filter_review_all")
                    )
                }
                item {
                    FilterChip(
                        selected = currentFilter == ReviewFilter.INCORRECT,
                        onClick = { viewModel.setReviewFilter(ReviewFilter.INCORRECT) },
                        label = { Text("Incorrect ($incorrectCount)") },
                        modifier = Modifier.testTag("filter_review_incorrect")
                    )
                }
                item {
                    FilterChip(
                        selected = currentFilter == ReviewFilter.CORRECT,
                        onClick = { viewModel.setReviewFilter(ReviewFilter.CORRECT) },
                        label = { Text("Correct ($correctCount)") },
                        modifier = Modifier.testTag("filter_review_correct")
                    )
                }
                item {
                    FilterChip(
                        selected = currentFilter == ReviewFilter.UNATTEMPTED,
                        onClick = { viewModel.setReviewFilter(ReviewFilter.UNATTEMPTED) },
                        label = { Text("Skipped ($unattemptedCount)") },
                        modifier = Modifier.testTag("filter_review_unattempted")
                    )
                }
                item {
                    FilterChip(
                        selected = currentFilter == ReviewFilter.BOOKMARKED,
                        onClick = { viewModel.setReviewFilter(ReviewFilter.BOOKMARKED) },
                        label = { Text("Bookmarked") },
                        modifier = Modifier.testTag("filter_review_bookmarked")
                    )
                }
            }
        }

        // Questions List
        itemsIndexed(filteredList) { index, item ->
            val q = item.question
            val selected = item.selectedOptionIndex
            val isCorrect = item.isCorrect

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("review_question_${q.id}"),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    // Status row
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            SubjectBadge(subject = q.subject)
                            Spacer(modifier = Modifier.width(6.dp))
                            UnitChip(unitName = q.unit)
                        }

                        Row(verticalAlignment = Alignment.CenterVertically) {
                            when {
                                isCorrect -> {
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(6.dp))
                                            .background(Color(0xFF10B981).copy(alpha = 0.15f))
                                            .padding(horizontal = 8.dp, vertical = 3.dp)
                                    ) {
                                        Text("+1.0 Mark", color = Color(0xFF10B981), fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                    }
                                }
                                selected != null -> {
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(6.dp))
                                            .background(Color(0xFFEF4444).copy(alpha = 0.15f))
                                            .padding(horizontal = 8.dp, vertical = 3.dp)
                                    ) {
                                        Text("-0.25 Penalty", color = Color(0xFFEF4444), fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                    }
                                }
                                else -> {
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(6.dp))
                                            .background(MaterialTheme.colorScheme.surfaceVariant)
                                            .padding(horizontal = 8.dp, vertical = 3.dp)
                                    ) {
                                        Text("0.0 Skipped", color = MaterialTheme.colorScheme.onSurfaceVariant, fontSize = 11.sp)
                                    }
                                }
                            }

                            Spacer(modifier = Modifier.width(6.dp))
                            IconButton(
                                onClick = { viewModel.toggleBookmark(q.id, q.isBookmarked) },
                                modifier = Modifier.size(28.dp).testTag("review_bookmark_${q.id}")
                            ) {
                                Icon(
                                    imageVector = if (q.isBookmarked) Icons.Default.Bookmark else Icons.Default.BookmarkBorder,
                                    contentDescription = "Bookmark",
                                    tint = if (q.isBookmarked) Color(0xFFF59E0B) else MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    // Question stem
                    Text(
                        text = "${index + 1}. ${q.questionText}",
                        style = MaterialTheme.typography.bodyLarge,
                        fontWeight = FontWeight.SemiBold,
                        lineHeight = 22.sp
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // Options list
                    val options = listOf(
                        0 to q.optionA,
                        1 to q.optionB,
                        2 to q.optionC,
                        3 to q.optionD
                    )
                    val letters = listOf("A", "B", "C", "D")

                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        options.forEach { (optIdx, optText) ->
                            val isCorrectOpt = optIdx == q.correctOptionIndex
                            val isUserSelected = selected == optIdx

                            val optBg = when {
                                isCorrectOpt -> Color(0xFF10B981).copy(alpha = 0.12f)
                                isUserSelected && !isCorrect -> Color(0xFFEF4444).copy(alpha = 0.12f)
                                else -> MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.35f)
                            }

                            val optBorder = when {
                                isCorrectOpt -> Color(0xFF10B981)
                                isUserSelected && !isCorrect -> Color(0xFFEF4444)
                                else -> Color.Transparent
                            }

                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(optBg)
                                    .border(1.dp, optBorder, RoundedCornerShape(8.dp))
                                    .padding(horizontal = 12.dp, vertical = 10.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = "${letters[optIdx]}.",
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 13.sp,
                                        color = if (isCorrectOpt) Color(0xFF10B981) else if (isUserSelected) Color(0xFFEF4444) else MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = optText,
                                        fontSize = 13.sp,
                                        modifier = Modifier.weight(1f),
                                        fontWeight = if (isCorrectOpt || isUserSelected) FontWeight.SemiBold else FontWeight.Normal
                                    )
                                    if (isCorrectOpt) {
                                        Icon(
                                            imageVector = Icons.Default.Check,
                                            contentDescription = "Correct",
                                            tint = Color(0xFF10B981),
                                            modifier = Modifier.size(18.dp)
                                        )
                                    } else if (isUserSelected) {
                                        Icon(
                                            imageVector = Icons.Default.Close,
                                            contentDescription = "Your incorrect answer",
                                            tint = Color(0xFFEF4444),
                                            modifier = Modifier.size(18.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }

                    // Explanation Box
                    Spacer(modifier = Modifier.height(10.dp))
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.2f))
                    ) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Default.Lightbulb,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.primary,
                                    modifier = Modifier.size(16.dp)
                                )
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    text = "Explanation & Key Concept",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp,
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = q.explanation,
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurface,
                                lineHeight = 16.sp
                            )
                        }
                    }
                }
            }
        }

        item {
            // Action Buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                OutlinedButton(
                    onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) },
                    modifier = Modifier.weight(1f).testTag("review_dashboard_button")
                ) {
                    Text("Dashboard")
                }
                Button(
                    onClick = { viewModel.navigateTo(AppScreen.ANALYTICS) },
                    modifier = Modifier.weight(1f).testTag("review_analytics_button")
                ) {
                    Text("Analytics")
                }
            }
            Spacer(modifier = Modifier.height(20.dp))
        }
    }
}
