package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
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
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.ContentPaste
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
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
import com.example.ui.components.UnitChip
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MeceeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun QuestionManagerScreen(
    viewModel: MeceeViewModel,
    allQuestions: List<QuestionEntity>
) {
    BackHandler {
        viewModel.navigateTo(AppScreen.DASHBOARD)
    }

    var activeTab by remember { mutableStateOf("BULK_IMPORT") } // BULK_IMPORT, MANUAL_ADD, BROWSER

    Column(
        modifier = Modifier
            .fillMaxSize()
            .testTag("question_manager_screen")
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
                modifier = Modifier.testTag("qm_back_button")
            ) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back")
            }
            Spacer(modifier = Modifier.width(4.dp))
            Column {
                Text(
                    text = "Question Bank & PDF Importer",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Add and expand questions in your local database (${allQuestions.size} total)",
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
                    selected = activeTab == "BULK_IMPORT",
                    onClick = { activeTab = "BULK_IMPORT" },
                    label = { Text("Bulk PDF/Text Extractor") },
                    modifier = Modifier.testTag("tab_bulk_import")
                )
            }
            item {
                FilterChip(
                    selected = activeTab == "MANUAL_ADD",
                    onClick = { activeTab = "MANUAL_ADD" },
                    label = { Text("Add Single Question") },
                    modifier = Modifier.testTag("tab_manual_add")
                )
            }
            item {
                FilterChip(
                    selected = activeTab == "BROWSER",
                    onClick = { activeTab = "BROWSER" },
                    label = { Text("View Bank (${allQuestions.size})") },
                    modifier = Modifier.testTag("tab_browser")
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        when (activeTab) {
            "BULK_IMPORT" -> BulkImportTab(viewModel)
            "MANUAL_ADD" -> ManualAddTab(viewModel)
            "BROWSER" -> QuestionBrowserTab(viewModel, allQuestions)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun BulkImportTab(viewModel: MeceeViewModel) {
    var rawText by remember { mutableStateOf("") }
    var selectedSubject by remember { mutableStateOf(SubjectType.ZOOLOGY) }
    var selectedUnit by remember { mutableStateOf(SyllabusCatalog.ZOOLOGY_UNITS[0].name) }
    var subjectExpanded by remember { mutableStateOf(false) }
    var unitExpanded by remember { mutableStateOf(false) }
    var importMessage by remember { mutableStateOf<String?>(null) }

    val availableUnits = remember(selectedSubject) {
        SyllabusCatalog.getUnitsForSubject(selectedSubject)
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.25f))
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Info, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("How to Extract from PDF", fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Paste text extracted from any syllabus PDF, question bank, or mock exam. The parser automatically detects question numbers, options (A, B, C, D), correct answers (Ans: B), and explanations.",
                        style = MaterialTheme.typography.bodySmall,
                        lineHeight = 16.sp
                    )
                }
            }
        }

        item {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                // Subject Dropdown
                ExposedDropdownMenuBox(
                    expanded = subjectExpanded,
                    onExpandedChange = { subjectExpanded = it },
                    modifier = Modifier.weight(1f)
                ) {
                    OutlinedTextField(
                        value = selectedSubject.displayName,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text("Subject") },
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = subjectExpanded) },
                        modifier = Modifier.menuAnchor().fillMaxWidth()
                    )
                    ExposedDropdownMenu(
                        expanded = subjectExpanded,
                        onDismissRequest = { subjectExpanded = false }
                    ) {
                        SubjectType.entries.forEach { subj ->
                            DropdownMenuItem(
                                text = { Text(subj.displayName) },
                                onClick = {
                                    selectedSubject = subj
                                    selectedUnit = SyllabusCatalog.getUnitsForSubject(subj).firstOrNull()?.name ?: ""
                                    subjectExpanded = false
                                }
                            )
                        }
                    }
                }

                // Unit Dropdown
                ExposedDropdownMenuBox(
                    expanded = unitExpanded,
                    onExpandedChange = { unitExpanded = it },
                    modifier = Modifier.weight(1f)
                ) {
                    OutlinedTextField(
                        value = selectedUnit,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text("Unit") },
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = unitExpanded) },
                        modifier = Modifier.menuAnchor().fillMaxWidth()
                    )
                    ExposedDropdownMenu(
                        expanded = unitExpanded,
                        onDismissRequest = { unitExpanded = false }
                    ) {
                        availableUnits.forEach { unit ->
                            DropdownMenuItem(
                                text = { Text(unit.name) },
                                onClick = {
                                    selectedUnit = unit.name
                                    unitExpanded = false
                                }
                            )
                        }
                    }
                }
            }
        }

        item {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Text("Paste Raw Questions Text:", fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                TextButton(
                    onClick = {
                        rawText = """1. In human nephron, where does the filtration of blood take place?
A) Glomerulus inside Bowman's capsule
B) Loop of Henle
C) Distal convoluted tubule
D) Collecting duct
Ans: A
Exp: Ultrafiltration occurs across the glomerulus endothelial-capsular membrane into Bowman's capsule under glomerular hydrostatic pressure.

2. Which enzyme in saliva initiates carbohydrate digestion?
A) Pepsin
B) Ptyalin (Salivary Amylase)
C) Trypsin
D) Renin
Ans: B
Exp: Salivary amylase (ptyalin) hydrolyzes dietary starches into maltose and dextrins at pH ~6.8."""
                    }
                ) {
                    Text("Load Sample", fontSize = 12.sp)
                }
            }

            OutlinedTextField(
                value = rawText,
                onValueChange = { rawText = it },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .testTag("raw_text_input"),
                placeholder = {
                    Text("Paste text from PDF here...\nExample:\n1. Question text\nA) Option 1\nB) Option 2\nC) Option 3\nD) Option 4\nAns: B\nExp: Explanation...")
                }
            )
        }

        if (importMessage != null) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(8.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF10B981).copy(alpha = 0.15f))
                ) {
                    Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Check, contentDescription = null, tint = Color(0xFF10B981), modifier = Modifier.size(20.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(text = importMessage!!, color = Color(0xFF065F46), fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    }
                }
            }
        }

        item {
            Button(
                onClick = {
                    if (rawText.isNotBlank()) {
                        viewModel.importQuestionsFromText(
                            rawText = rawText,
                            subject = selectedSubject.name,
                            unit = selectedUnit
                        ) { count ->
                            importMessage = "Successfully imported $count question(s) into $selectedUnit!"
                            rawText = ""
                        }
                    }
                },
                enabled = rawText.isNotBlank(),
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("import_questions_button")
            ) {
                Icon(Icons.Default.ContentPaste, contentDescription = null, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(6.dp))
                Text("Parse & Import to Local Database", fontWeight = FontWeight.Bold)
            }
            Spacer(modifier = Modifier.height(20.dp))
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ManualAddTab(viewModel: MeceeViewModel) {
    var selectedSubject by remember { mutableStateOf(SubjectType.ZOOLOGY) }
    var selectedUnit by remember { mutableStateOf(SyllabusCatalog.ZOOLOGY_UNITS[0].name) }
    var subjectExpanded by remember { mutableStateOf(false) }
    var unitExpanded by remember { mutableStateOf(false) }

    var questionText by remember { mutableStateOf("") }
    var optionA by remember { mutableStateOf("") }
    var optionB by remember { mutableStateOf("") }
    var optionC by remember { mutableStateOf("") }
    var optionD by remember { mutableStateOf("") }
    var correctIndex by remember { mutableIntStateOf(0) }
    var explanation by remember { mutableStateOf("") }
    var successMessage by remember { mutableStateOf<String?>(null) }

    val availableUnits = remember(selectedSubject) {
        SyllabusCatalog.getUnitsForSubject(selectedSubject)
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                ExposedDropdownMenuBox(
                    expanded = subjectExpanded,
                    onExpandedChange = { subjectExpanded = it },
                    modifier = Modifier.weight(1f)
                ) {
                    OutlinedTextField(
                        value = selectedSubject.displayName,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text("Subject") },
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = subjectExpanded) },
                        modifier = Modifier.menuAnchor().fillMaxWidth()
                    )
                    ExposedDropdownMenu(
                        expanded = subjectExpanded,
                        onDismissRequest = { subjectExpanded = false }
                    ) {
                        SubjectType.entries.forEach { subj ->
                            DropdownMenuItem(
                                text = { Text(subj.displayName) },
                                onClick = {
                                    selectedSubject = subj
                                    selectedUnit = SyllabusCatalog.getUnitsForSubject(subj).firstOrNull()?.name ?: ""
                                    subjectExpanded = false
                                }
                            )
                        }
                    }
                }

                ExposedDropdownMenuBox(
                    expanded = unitExpanded,
                    onExpandedChange = { unitExpanded = it },
                    modifier = Modifier.weight(1f)
                ) {
                    OutlinedTextField(
                        value = selectedUnit,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text("Unit") },
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = unitExpanded) },
                        modifier = Modifier.menuAnchor().fillMaxWidth()
                    )
                    ExposedDropdownMenu(
                        expanded = unitExpanded,
                        onDismissRequest = { unitExpanded = false }
                    ) {
                        availableUnits.forEach { unit ->
                            DropdownMenuItem(
                                text = { Text(unit.name) },
                                onClick = {
                                    selectedUnit = unit.name
                                    unitExpanded = false
                                }
                            )
                        }
                    }
                }
            }
        }

        item {
            OutlinedTextField(
                value = questionText,
                onValueChange = { questionText = it },
                label = { Text("Question Stem") },
                modifier = Modifier.fillMaxWidth().testTag("manual_q_text")
            )
        }

        item {
            Text("Options (Select radio button for Correct Answer):", fontWeight = FontWeight.SemiBold, fontSize = 12.sp)
        }

        item {
            Row(verticalAlignment = Alignment.CenterVertically) {
                RadioButton(selected = correctIndex == 0, onClick = { correctIndex = 0 })
                OutlinedTextField(
                    value = optionA,
                    onValueChange = { optionA = it },
                    label = { Text("Option A") },
                    modifier = Modifier.weight(1f).testTag("manual_opt_a")
                )
            }
        }

        item {
            Row(verticalAlignment = Alignment.CenterVertically) {
                RadioButton(selected = correctIndex == 1, onClick = { correctIndex = 1 })
                OutlinedTextField(
                    value = optionB,
                    onValueChange = { optionB = it },
                    label = { Text("Option B") },
                    modifier = Modifier.weight(1f).testTag("manual_opt_b")
                )
            }
        }

        item {
            Row(verticalAlignment = Alignment.CenterVertically) {
                RadioButton(selected = correctIndex == 2, onClick = { correctIndex = 2 })
                OutlinedTextField(
                    value = optionC,
                    onValueChange = { optionC = it },
                    label = { Text("Option C") },
                    modifier = Modifier.weight(1f).testTag("manual_opt_c")
                )
            }
        }

        item {
            Row(verticalAlignment = Alignment.CenterVertically) {
                RadioButton(selected = correctIndex == 3, onClick = { correctIndex = 3 })
                OutlinedTextField(
                    value = optionD,
                    onValueChange = { optionD = it },
                    label = { Text("Option D") },
                    modifier = Modifier.weight(1f).testTag("manual_opt_d")
                )
            }
        }

        item {
            OutlinedTextField(
                value = explanation,
                onValueChange = { explanation = it },
                label = { Text("Scientific Rationale / Explanation") },
                modifier = Modifier.fillMaxWidth().testTag("manual_explanation")
            )
        }

        if (successMessage != null) {
            item {
                Text(text = successMessage!!, color = Color(0xFF10B981), fontWeight = FontWeight.Bold, fontSize = 13.sp)
            }
        }

        item {
            Button(
                onClick = {
                    if (questionText.isNotBlank() && optionA.isNotBlank() && optionB.isNotBlank()) {
                        viewModel.addCustomQuestion(
                            subject = selectedSubject.name,
                            unit = selectedUnit,
                            questionText = questionText,
                            optionA = optionA,
                            optionB = optionB,
                            optionC = optionC.ifEmpty { "None of the above" },
                            optionD = optionD.ifEmpty { "All of the above" },
                            correctOptionIndex = correctIndex,
                            explanation = explanation.ifEmpty { "Verified MECEE curriculum question." },
                            onSuccess = {
                                successMessage = "Question successfully saved to $selectedUnit!"
                                questionText = ""
                                optionA = ""
                                optionB = ""
                                optionC = ""
                                optionD = ""
                                explanation = ""
                            }
                        )
                    }
                },
                modifier = Modifier.fillMaxWidth().testTag("save_manual_question_button")
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(6.dp))
                Text("Save Question to Bank", fontWeight = FontWeight.Bold)
            }
            Spacer(modifier = Modifier.height(20.dp))
        }
    }
}

@Composable
private fun QuestionBrowserTab(
    viewModel: MeceeViewModel,
    allQuestions: List<QuestionEntity>
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedSubject by remember { mutableStateOf<String?>(null) }

    val filtered = allQuestions.filter { q ->
        (selectedSubject == null || q.subject.equals(selectedSubject, ignoreCase = true)) &&
        (searchQuery.isEmpty() || q.questionText.contains(searchQuery, ignoreCase = true) || q.unit.contains(searchQuery, ignoreCase = true))
    }

    Column(modifier = Modifier.fillMaxSize()) {
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Search question or unit...") },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            modifier = Modifier.fillMaxWidth().testTag("search_questions_input")
        )

        Spacer(modifier = Modifier.height(8.dp))

        LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            item {
                FilterChip(
                    selected = selectedSubject == null,
                    onClick = { selectedSubject = null },
                    label = { Text("All (${allQuestions.size})") }
                )
            }
            items(SubjectType.entries) { subj ->
                val count = allQuestions.count { it.subject.equals(subj.name, ignoreCase = true) }
                FilterChip(
                    selected = selectedSubject == subj.name,
                    onClick = { selectedSubject = subj.name },
                    label = { Text("${subj.displayName} ($count)") }
                )
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(filtered) { q ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(8.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
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
                            IconButton(
                                onClick = { viewModel.deleteQuestion(q.id) },
                                modifier = Modifier.size(24.dp)
                            ) {
                                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = Color(0xFFEF4444), modifier = Modifier.size(16.dp))
                            }
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(text = q.questionText, style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Medium)
                        Spacer(modifier = Modifier.height(4.dp))
                        val ansLetter = when (q.correctOptionIndex) {
                            0 -> "A"
                            1 -> "B"
                            2 -> "C"
                            else -> "D"
                        }
                        Text(
                            text = "Ans: $ansLetter • ${q.explanation}",
                            fontSize = 11.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(20.dp))
            }
        }
    }
}
