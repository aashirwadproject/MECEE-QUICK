package com.example.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "exam_attempts")
data class ExamAttemptEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val examTitle: String,
    val examType: String,
    val subjectFilter: String? = null,
    val unitFilter: String? = null,
    val totalQuestions: Int,
    val attemptedCount: Int,
    val correctCount: Int,
    val incorrectCount: Int,
    val unattemptedCount: Int,
    val score: Float,
    val maxScore: Float,
    val accuracyPercentage: Float,
    val negativePenalty: Float,
    val timeSpentSeconds: Long,
    val timestamp: Long = System.currentTimeMillis(),
    val questionsDataJson: String = "" // Serialized review data
)
