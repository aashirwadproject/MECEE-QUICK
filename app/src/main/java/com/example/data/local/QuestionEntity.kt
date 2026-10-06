package com.example.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "questions")
data class QuestionEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val subject: String,
    val unit: String,
    val priority: Int = 3,
    val questionText: String,
    val optionA: String,
    val optionB: String,
    val optionC: String,
    val optionD: String,
    val correctOptionIndex: Int, // 0 to 3
    val explanation: String,
    val isBookmarked: Boolean = false,
    val isUserAdded: Boolean = false,
    val createdAt: Long = System.currentTimeMillis()
)
