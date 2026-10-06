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
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
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
import com.example.data.model.SubjectType
import com.example.data.model.SyllabusCatalog
import com.example.ui.components.SubjectBadge
import com.example.ui.components.getSubjectColor
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MeceeViewModel

@Composable
fun SyllabusScreen(
    viewModel: MeceeViewModel
) {
    BackHandler {
        viewModel.navigateTo(AppScreen.DASHBOARD)
    }

    var selectedTab by remember { mutableStateOf("PRIORITY") } // "PRIORITY", "ZOOLOGY", "BOTANY", "CHEMISTRY", "PHYSICS", "MAT"

    Column(
        modifier = Modifier
            .fillMaxSize()
            .testTag("syllabus_screen")
            .padding(horizontal = 16.dp)
    ) {
        Spacer(modifier = Modifier.height(8.dp))
        // Top Bar
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) },
                modifier = Modifier.testTag("syllabus_back_button")
            ) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back")
            }
            Spacer(modifier = Modifier.width(4.dp))
            Column {
                Text(
                    text = "MECEE-BL 2027 Syllabus & Marks",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Official chapter/unit-wise marks distribution (200 marks)",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Navigation Tabs
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            item {
                FilterChip(
                    selected = selectedTab == "PRIORITY",
                    onClick = { selectedTab = "PRIORITY" },
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Default.LocalFireDepartment,
                            contentDescription = null,
                            tint = if (selectedTab == "PRIORITY") Color(0xFFF97316) else MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.size(16.dp)
                        )
                    },
                    label = { Text("The BIG Priority List") },
                    modifier = Modifier.testTag("tab_priority_list")
                )
            }
            items(SubjectType.entries) { subj ->
                FilterChip(
                    selected = selectedTab == subj.name,
                    onClick = { selectedTab = subj.name },
                    label = { Text("${subj.displayName} (${subj.totalMarks}M)") },
                    modifier = Modifier.testTag("tab_${subj.name}")
                )
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            if (selectedTab == "PRIORITY") {
                // The BIG Priority List View
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f)
                        ),
                        border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.primary.copy(alpha = 0.3f))
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Info, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                                Spacer(modifier = Modifier.width(8.dp))
                                Text("MEC Strategic Guidance", fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                            }
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(
                                text = "If you want to maximize marks, study in this exact order! Completely mastering these top-weightage units targets over 70% of the entire 200-mark paper rather than studying every unit with equal effort.",
                                style = MaterialTheme.typography.bodySmall,
                                lineHeight = 18.sp
                            )
                        }
                    }
                }

                items(SyllabusCatalog.BIG_PRIORITY_LIST.mapIndexed { idx, pair -> Triple(idx + 1, pair.first, pair.second) }) { (rank, name, marks) ->
                    val unitObj = SyllabusCatalog.getUnitByName(name)
                    val subject = unitObj?.subject ?: SubjectType.ZOOLOGY
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                viewModel.startExam(
                                    title = "$name Priority Sprint",
                                    type = "UNIT",
                                    unitFilter = name,
                                    questionCount = 15,
                                    durationMinutes = 20
                                )
                            }
                            .testTag("priority_item_$rank"),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                        border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(14.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.weight(1f)) {
                                Box(
                                    modifier = Modifier
                                        .size(32.dp)
                                        .clip(RoundedCornerShape(8.dp))
                                        .background(
                                            if (rank <= 3) Color(0xFFF97316).copy(alpha = 0.15f)
                                            else MaterialTheme.colorScheme.surfaceVariant
                                        ),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = "#$rank",
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 13.sp,
                                        color = if (rank <= 3) Color(0xFFF97316) else MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                                Spacer(modifier = Modifier.width(12.dp))
                                Column {
                                    Text(
                                        text = name,
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 14.sp
                                    )
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        SubjectBadge(subject = subject.displayName)
                                        if (unitObj != null) {
                                            Spacer(modifier = Modifier.width(6.dp))
                                            Text(unitObj.priorityFlames, fontSize = 11.sp)
                                        }
                                    }
                                }
                            }

                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = "$marks Marks",
                                    fontWeight = FontWeight.ExtraBold,
                                    color = MaterialTheme.colorScheme.primary,
                                    fontSize = 14.sp
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Button(
                                    onClick = {
                                        viewModel.startExam(
                                            title = "$name Priority Sprint",
                                            type = "UNIT",
                                            unitFilter = name,
                                            questionCount = 15,
                                            durationMinutes = 20
                                        )
                                    },
                                    shape = RoundedCornerShape(8.dp),
                                    contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 10.dp, vertical = 6.dp)
                                ) {
                                    Icon(Icons.Default.PlayArrow, contentDescription = null, modifier = Modifier.size(14.dp))
                                }
                            }
                        }
                    }
                }
            } else {
                // Specific Subject View
                val currentSubj = SubjectType.fromString(selectedTab)
                val units = SyllabusCatalog.getUnitsForSubject(currentSubj)
                val color = getSubjectColor(currentSubj.name)

                item {
                    // Subject Highlight Card
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = color.copy(alpha = 0.1f)),
                        border = androidx.compose.foundation.BorderStroke(1.dp, color.copy(alpha = 0.3f))
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "${currentSubj.displayName} — ${currentSubj.totalMarks} Marks",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 16.sp,
                                    color = color
                                )
                                Text(
                                    text = "${units.size} Units",
                                    fontWeight = FontWeight.SemiBold,
                                    fontSize = 12.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            val keyFact = when (currentSubj) {
                                SubjectType.ZOOLOGY -> "Human Biology alone = 15/40 marks = 37.5% of Zoology!"
                                SubjectType.BOTANY -> "Biodiversity (9M), Genetics (6M), Plant Phys (6M) & Cell Bio (5M) form 65% of Botany."
                                SubjectType.CHEMISTRY -> "Physical (17M) + Organic (17M) = 34/50 marks = 68% of Chemistry. Massive priority!"
                                SubjectType.PHYSICS -> "Modern Physics (12M) + Mechanics (10M) = 22/50 marks of Physics."
                                SubjectType.MAT -> "4 balanced sections: Verbal, Numerical, Logical, Spatial Reasoning (5 marks each = 20 marks)."
                            }
                            Text(text = "🔥 Key Strategic Fact: $keyFact", fontSize = 12.sp, fontWeight = FontWeight.Medium)
                        }
                    }
                }

                items(units) { unit ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("syllabus_unit_${unit.id}"),
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
                                Text(
                                    text = unit.name,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 15.sp,
                                    modifier = Modifier.weight(1f)
                                )
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(unit.priorityFlames, fontSize = 11.sp)
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(6.dp))
                                            .background(color.copy(alpha = 0.15f))
                                            .padding(horizontal = 8.dp, vertical = 3.dp)
                                    ) {
                                        Text(
                                            text = "${unit.marks} Marks",
                                            color = color,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 12.sp
                                        )
                                    }
                                }
                            }
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(
                                text = unit.description,
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                lineHeight = 16.sp
                            )
                            Spacer(modifier = Modifier.height(10.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.End
                            ) {
                                Button(
                                    onClick = {
                                        viewModel.startExam(
                                            title = "${unit.name} Practice",
                                            type = "UNIT",
                                            unitFilter = unit.name,
                                            questionCount = 15,
                                            durationMinutes = 20
                                        )
                                    },
                                    colors = ButtonDefaults.buttonColors(containerColor = color),
                                    shape = RoundedCornerShape(8.dp)
                                ) {
                                    Icon(Icons.Default.PlayArrow, contentDescription = null, modifier = Modifier.size(14.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Practice Unit", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                }
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
