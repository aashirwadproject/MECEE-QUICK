package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.SubjectType
import com.example.ui.theme.BotanyColor
import com.example.ui.theme.ChemistryColor
import com.example.ui.theme.MatColor
import com.example.ui.theme.PhysicsColor
import com.example.ui.theme.TealPrimary
import com.example.ui.theme.ZoologyColor

fun getSubjectColor(subjectName: String): Color {
    return when (subjectName.uppercase()) {
        "ZOOLOGY" -> ZoologyColor
        "BOTANY" -> BotanyColor
        "CHEMISTRY" -> ChemistryColor
        "PHYSICS" -> PhysicsColor
        "MAT" -> MatColor
        else -> TealPrimary
    }
}

@Composable
fun SubjectBadge(
    subject: String,
    modifier: Modifier = Modifier
) {
    val color = getSubjectColor(subject)
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(6.dp))
            .background(color.copy(alpha = 0.15f))
            .padding(horizontal = 8.dp, vertical = 4.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = subject.uppercase(),
            color = color,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 0.5.sp
        )
    }
}

@Composable
fun UnitChip(
    unitName: String,
    priorityFlames: String? = null,
    marks: Int? = null,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .clip(RoundedCornerShape(6.dp))
            .background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f))
            .padding(horizontal = 8.dp, vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (!priorityFlames.isNullOrEmpty()) {
            Text(
                text = priorityFlames,
                fontSize = 10.sp
            )
            Spacer(modifier = Modifier.width(4.dp))
        }
        Text(
            text = unitName,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            fontSize = 11.sp,
            fontWeight = FontWeight.Medium
        )
        if (marks != null) {
            Spacer(modifier = Modifier.width(4.dp))
            Text(
                text = "(${marks}M)",
                color = MaterialTheme.colorScheme.primary,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun MarkingSchemeBadge(
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .clip(RoundedCornerShape(6.dp))
            .background(Color(0xFF10B981).copy(alpha = 0.12f))
            .padding(horizontal = 8.dp, vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "+1.0",
            color = Color(0xFF10B981),
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold
        )
        Text(
            text = " / ",
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            fontSize = 11.sp
        )
        Text(
            text = "-0.25",
            color = Color(0xFFEF4444),
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold
        )
    }
}
