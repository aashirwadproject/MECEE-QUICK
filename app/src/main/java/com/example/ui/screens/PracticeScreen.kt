package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.FlashOn
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Timer
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
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
import com.example.data.local.QuestionEntity
import com.example.data.model.SubjectType
import com.example.data.model.SyllabusCatalog
import com.example.ui.components.SubjectBadge
import com.example.ui.components.getSubjectColor
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MeceeViewModel

@Composable
fun PracticeScreen(
    viewModel: MeceeViewModel,
    allQuestions: List<QuestionEntity>
) {
    BackHandler {
        viewModel.navigateTo(AppScreen.DASHBOARD)
    }

    var selectedSubject by remember { mutableStateOf<SubjectType?>(null) }
    var onlyHighYield by remember { mutableStateOf(false) }

    val displayedUnits = remember(selectedSubject, onlyHighYield) {
        var list = if (selectedSubject != null) {
            SyllabusCatalog.getUnitsForSubject(selectedSubject!!)
        } else {
            SyllabusCatalog.ALL_UNITS
        }
        if (onlyHighYield) {
            list = list.filter { it.priorityLevel >= 4 }
        }
        list
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .testTag("practice_screen")
            .padding(horizontal = 16.dp)
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        // Screen Top Bar
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) },
                modifier = Modifier.testTag("practice_back_button")
            ) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back")
            }
            Spacer(modifier = Modifier.width(4.dp))
            Column {
                Text(
                    text = "Chapter & Unit Practice",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Categorized tests according to official 2027 syllabus",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Filter Pills
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            item {
                FilterChip(
                    selected = selectedSubject == null,
                    onClick = { selectedSubject = null },
                    label = { Text("All Subjects") },
                    modifier = Modifier.testTag("filter_all_subjects")
                )
            }
            items(SubjectType.entries) { subject ->
                FilterChip(
                    selected = selectedSubject == subject,
                    onClick = { selectedSubject = subject },
                    label = { Text("${subject.displayName} (${subject.totalMarks}M)") },
                    modifier = Modifier.testTag("filter_${subject.name}")
                )
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        // High yield toggle
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            FilterChip(
                selected = onlyHighYield,
                onClick = { onlyHighYield = !onlyHighYield },
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.LocalFireDepartment,
                        contentDescription = null,
                        tint = if (onlyHighYield) Color(0xFFF97316) else MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(16.dp)
                    )
                },
                label = { Text("Top Weightage Only (🔥🔥🔥🔥+)") },
                modifier = Modifier.testTag("filter_high_yield")
            )

            Text(
                text = "${displayedUnits.size} Units",
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                fontWeight = FontWeight.SemiBold
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Units List
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(displayedUnits) { unit ->
                val qCountForUnit = allQuestions.count { it.unit.equals(unit.name, ignoreCase = true) }
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("unit_card_${unit.id}"),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                SubjectBadge(subject = unit.subject.displayName)
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = unit.priorityFlames,
                                    fontSize = 11.sp
                                )
                            }
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.1f))
                                    .padding(horizontal = 8.dp, vertical = 3.dp)
                            ) {
                                Text(
                                    text = "${unit.marks} Marks (${String.format("%.1f", (unit.marks.toFloat() / unit.subject.totalMarks.toFloat()) * 100)}%)",
                                    color = MaterialTheme.colorScheme.primary,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 11.sp
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = unit.name,
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = unit.description,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            lineHeight = 16.sp
                        )

                        Spacer(modifier = Modifier.height(12.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            // Instant Practice Button
                            OutlinedButton(
                                onClick = {
                                    viewModel.startExam(
                                        title = "${unit.name} Practice",
                                        type = "PRACTICE_MODE",
                                        unitFilter = unit.name,
                                        questionCount = 15,
                                        durationMinutes = 20,
                                        isInstantFeedback = true
                                    )
                                },
                                modifier = Modifier
                                    .weight(1f)
                                    .testTag("practice_instant_${unit.id}")
                            ) {
                                Icon(Icons.Default.FlashOn, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("Instant Mode", fontSize = 12.sp)
                            }

                            // Timed Test Button
                            Button(
                                onClick = {
                                    viewModel.startExam(
                                        title = "${unit.name} Chapter Test",
                                        type = "UNIT",
                                        unitFilter = unit.name,
                                        questionCount = 20,
                                        durationMinutes = 25,
                                        isInstantFeedback = false
                                    )
                                },
                                modifier = Modifier
                                    .weight(1f)
                                    .testTag("test_timed_${unit.id}"),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = getSubjectColor(unit.subject.name)
                                )
                            ) {
                                Icon(Icons.Default.Timer, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("Timed Test", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(20.dp))
            }
        }
    }
}
