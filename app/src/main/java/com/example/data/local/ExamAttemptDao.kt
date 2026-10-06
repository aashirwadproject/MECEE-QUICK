package com.example.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface ExamAttemptDao {
    @Query("SELECT * FROM exam_attempts ORDER BY timestamp DESC")
    fun getAllAttempts(): Flow<List<ExamAttemptEntity>>

    @Query("SELECT * FROM exam_attempts ORDER BY timestamp DESC LIMIT :limit")
    fun getRecentAttempts(limit: Int): Flow<List<ExamAttemptEntity>>

    @Query("SELECT * FROM exam_attempts WHERE id = :id LIMIT 1")
    fun getAttemptById(id: Long): Flow<ExamAttemptEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAttempt(attempt: ExamAttemptEntity): Long

    @Query("DELETE FROM exam_attempts WHERE id = :id")
    suspend fun deleteAttempt(id: Long)

    @Query("DELETE FROM exam_attempts")
    suspend fun deleteAllAttempts()

    @Query("SELECT COUNT(*) FROM exam_attempts")
    suspend fun getTotalAttemptsCount(): Int
}
