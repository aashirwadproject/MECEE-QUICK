package com.example

import com.example.data.model.SubjectType
import com.example.data.model.SyllabusCatalog
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class ExampleUnitTest {
    @Test
    fun testOfficialMeceeSyllabusDistribution() {
        val zooMarks = SyllabusCatalog.ZOOLOGY_UNITS.sumOf { it.marks }
        val botMarks = SyllabusCatalog.BOTANY_UNITS.sumOf { it.marks }
        val chemMarks = SyllabusCatalog.CHEMISTRY_UNITS.sumOf { it.marks }
        val physMarks = SyllabusCatalog.PHYSICS_UNITS.sumOf { it.marks }
        val matMarks = SyllabusCatalog.MAT_UNITS.sumOf { it.marks }

        assertEquals(40, zooMarks)
        assertEquals(40, botMarks)
        assertEquals(50, chemMarks)
        assertEquals(50, physMarks)
        assertEquals(20, matMarks)

        val totalMarks = zooMarks + botMarks + chemMarks + physMarks + matMarks
        assertEquals(200, totalMarks)
    }

    @Test
    fun testTopPriorityUnits() {
        val humanBio = SyllabusCatalog.getUnitByName("Human Biology & Physiology")
        assertEquals(15, humanBio?.marks)
        assertEquals(5, humanBio?.priorityLevel)

        val modernPhys = SyllabusCatalog.getUnitByName("Modern Physics")
        assertEquals(12, modernPhys?.marks)
        assertEquals(5, modernPhys?.priorityLevel)

        val physicalChem = SyllabusCatalog.getUnitByName("Physical Chemistry")
        assertEquals(17, physicalChem?.marks)

        val organicChem = SyllabusCatalog.getUnitByName("Organic Chemistry")
        assertEquals(17, organicChem?.marks)

        assertEquals(12, SyllabusCatalog.BIG_PRIORITY_LIST.size)
    }

    @Test
    fun testMeceeNegativeMarkingCalculation() {
        val correct = 140
        val incorrect = 20
        val unattempted = 40

        val penalty = incorrect * 0.25f
        val finalScore = (correct * 1.0f) - penalty

        assertEquals(5.0f, penalty, 0.001f)
        assertEquals(135.0f, finalScore, 0.001f)
        assertEquals(200, correct + incorrect + unattempted)
    }
}

