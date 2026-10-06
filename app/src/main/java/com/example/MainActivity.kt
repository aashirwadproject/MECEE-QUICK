package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.AutoStories
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.outlined.AddCircleOutline
import androidx.compose.material.icons.outlined.AutoStories
import androidx.compose.material.icons.outlined.BarChart
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.LocalFireDepartment
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.ui.screens.AnalyticsScreen
import com.example.ui.screens.DashboardScreen
import com.example.ui.screens.ExamScreen
import com.example.ui.screens.PracticeScreen
import com.example.ui.screens.QuestionManagerScreen
import com.example.ui.screens.ReviewScreen
import com.example.ui.screens.SyllabusScreen
import com.example.ui.theme.MeceeQuickTheme
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MeceeViewModel

class MainActivity : ComponentActivity() {
    private val viewModel: MeceeViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MeceeQuickTheme {
                MainAppContainer(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun MainAppContainer(viewModel: MeceeViewModel) {
    val currentScreen by viewModel.currentScreen.collectAsStateWithLifecycle()
    val allQuestions by viewModel.allQuestions.collectAsStateWithLifecycle()
    val examAttempts by viewModel.examAttempts.collectAsStateWithLifecycle()
    val activeExam by viewModel.activeExam.collectAsStateWithLifecycle()
    val currentReviewAttempt by viewModel.currentReviewAttempt.collectAsStateWithLifecycle()
    val reviewQuestions by viewModel.reviewQuestions.collectAsStateWithLifecycle()
    val reviewFilter by viewModel.reviewFilter.collectAsStateWithLifecycle()

    val showBottomNav = currentScreen != AppScreen.EXAM

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        contentWindowInsets = WindowInsets.safeDrawing,
        bottomBar = {
            if (showBottomNav) {
                NavigationBar(
                    modifier = Modifier.testTag("main_bottom_nav"),
                    containerColor = MaterialTheme.colorScheme.surface
                ) {
                    NavigationBarItem(
                        selected = currentScreen == AppScreen.DASHBOARD,
                        onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) },
                        icon = {
                            Icon(
                                if (currentScreen == AppScreen.DASHBOARD) Icons.Filled.Home else Icons.Outlined.Home,
                                contentDescription = "Dashboard"
                            )
                        },
                        label = { Text("Home") },
                        modifier = Modifier.testTag("nav_home")
                    )

                    NavigationBarItem(
                        selected = currentScreen == AppScreen.PRACTICE,
                        onClick = { viewModel.navigateTo(AppScreen.PRACTICE) },
                        icon = {
                            Icon(
                                if (currentScreen == AppScreen.PRACTICE) Icons.Filled.AutoStories else Icons.Outlined.AutoStories,
                                contentDescription = "Practice"
                            )
                        },
                        label = { Text("Practice") },
                        modifier = Modifier.testTag("nav_practice")
                    )

                    NavigationBarItem(
                        selected = currentScreen == AppScreen.SYLLABUS,
                        onClick = { viewModel.navigateTo(AppScreen.SYLLABUS) },
                        icon = {
                            Icon(
                                if (currentScreen == AppScreen.SYLLABUS) Icons.Filled.LocalFireDepartment else Icons.Outlined.LocalFireDepartment,
                                contentDescription = "Syllabus"
                            )
                        },
                        label = { Text("Syllabus") },
                        modifier = Modifier.testTag("nav_syllabus")
                    )

                    NavigationBarItem(
                        selected = currentScreen == AppScreen.ANALYTICS,
                        onClick = { viewModel.navigateTo(AppScreen.ANALYTICS) },
                        icon = {
                            Icon(
                                if (currentScreen == AppScreen.ANALYTICS) Icons.Filled.BarChart else Icons.Outlined.BarChart,
                                contentDescription = "Analytics"
                            )
                        },
                        label = { Text("Analytics") },
                        modifier = Modifier.testTag("nav_analytics")
                    )

                    NavigationBarItem(
                        selected = currentScreen == AppScreen.QUESTION_MANAGER,
                        onClick = { viewModel.navigateTo(AppScreen.QUESTION_MANAGER) },
                        icon = {
                            Icon(
                                if (currentScreen == AppScreen.QUESTION_MANAGER) Icons.Filled.AddCircle else Icons.Outlined.AddCircleOutline,
                                contentDescription = "Import"
                            )
                        },
                        label = { Text("Import") },
                        modifier = Modifier.testTag("nav_import")
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentScreen) {
                AppScreen.DASHBOARD -> DashboardScreen(
                    viewModel = viewModel,
                    allQuestions = allQuestions,
                    examAttempts = examAttempts
                )

                AppScreen.PRACTICE -> PracticeScreen(
                    viewModel = viewModel,
                    allQuestions = allQuestions
                )

                AppScreen.EXAM -> {
                    activeExam?.let { exam ->
                        ExamScreen(
                            viewModel = viewModel,
                            exam = exam
                        )
                    } ?: DashboardScreen(
                        viewModel = viewModel,
                        allQuestions = allQuestions,
                        examAttempts = examAttempts
                    )
                }

                AppScreen.REVIEW -> ReviewScreen(
                    viewModel = viewModel,
                    attempt = currentReviewAttempt,
                    reviewQuestions = reviewQuestions,
                    currentFilter = reviewFilter
                )

                AppScreen.ANALYTICS -> AnalyticsScreen(
                    viewModel = viewModel,
                    examAttempts = examAttempts
                )

                AppScreen.SYLLABUS -> SyllabusScreen(
                    viewModel = viewModel
                )

                AppScreen.QUESTION_MANAGER -> QuestionManagerScreen(
                    viewModel = viewModel,
                    allQuestions = allQuestions
                )
            }
        }
    }
}
