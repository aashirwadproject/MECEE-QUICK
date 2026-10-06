package com.example.data.model

enum class SubjectType(val displayName: String, val totalMarks: Int) {
    ZOOLOGY("Zoology", 40),
    BOTANY("Botany", 40),
    CHEMISTRY("Chemistry", 50),
    PHYSICS("Physics", 50),
    MAT("MAT", 20);

    companion object {
        fun fromString(name: String): SubjectType {
            return entries.firstOrNull { it.name.equals(name, ignoreCase = true) || it.displayName.equals(name, ignoreCase = true) } ?: ZOOLOGY
        }
    }
}

data class SyllabusUnit(
    val id: String,
    val subject: SubjectType,
    val name: String,
    val marks: Int,
    val priorityLevel: Int, // 1 to 5
    val priorityFlames: String,
    val description: String,
    val isTopPriority: Boolean = false
)

object SyllabusCatalog {
    val ZOOLOGY_UNITS = listOf(
        SyllabusUnit(
            id = "zoo_human_bio",
            subject = SubjectType.ZOOLOGY,
            name = "Human Biology & Physiology",
            marks = 15,
            priorityLevel = 5,
            priorityFlames = "🔥🔥🔥🔥🔥",
            description = "Digestive, respiratory, circulatory, excretory, nervous, endocrine, sensory & reproductive systems. Constitutes 37.5% of Zoology!",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "zoo_selected_animals",
            subject = SubjectType.ZOOLOGY,
            name = "Study of Selected Animals",
            marks = 6,
            priorityLevel = 4,
            priorityFlames = "🔥🔥🔥🔥",
            description = "Detailed morphology and anatomy of Earthworm, Frog, Cockroach, and Paramecium/Plasmodium.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "zoo_diversity",
            subject = SubjectType.ZOOLOGY,
            name = "Animal Diversity & Classification",
            marks = 4,
            priorityLevel = 3,
            priorityFlames = "🔥🔥🔥",
            description = "Protozoa to Chordata taxonomy, characteristic features, diagnostic examples, and evolutionary links."
        ),
        SyllabusUnit(
            id = "zoo_tissues",
            subject = SubjectType.ZOOLOGY,
            name = "Animal Tissues & Histology",
            marks = 4,
            priorityLevel = 3,
            priorityFlames = "🔥🔥🔥",
            description = "Epithelial, connective, muscular, and nervous tissues, junctions, cellular specializations."
        ),
        SyllabusUnit(
            id = "zoo_diseases",
            subject = SubjectType.ZOOLOGY,
            name = "Microbial Diseases & Immunology",
            marks = 4,
            priorityLevel = 3,
            priorityFlames = "🔥🔥🔥",
            description = "Bacterial, viral, protozoan, fungal diseases, innate & adaptive immunity, antibodies, vaccines."
        ),
        SyllabusUnit(
            id = "zoo_evolution",
            subject = SubjectType.ZOOLOGY,
            name = "Evolutionary Biology",
            marks = 3,
            priorityLevel = 2,
            priorityFlames = "🔥🔥",
            description = "Theories of Lamarck, Darwin, Neo-Darwinism, speciation, human evolution, fossils."
        ),
        SyllabusUnit(
            id = "zoo_medtech",
            subject = SubjectType.ZOOLOGY,
            name = "Medical Technology & Applied Biology",
            marks = 2,
            priorityLevel = 1,
            priorityFlames = "🔥",
            description = "Biomedical tools, MRI, CT scan, ECG, endoscopy, amniocentesis, serology, recombinant DNA."
        ),
        SyllabusUnit(
            id = "zoo_biota",
            subject = SubjectType.ZOOLOGY,
            name = "Biota, Environment & Conservation",
            marks = 2,
            priorityLevel = 1,
            priorityFlames = "🔥",
            description = "Ecosystem dynamics, wildlife conservation in Nepal, endangered species, IUCN red list."
        )
    )

    val BOTANY_UNITS = listOf(
        SyllabusUnit(
            id = "bot_biodiversity",
            subject = SubjectType.BOTANY,
            name = "Biodiversity",
            marks = 9,
            priorityLevel = 5,
            priorityFlames = "🔥🔥🔥🔥🔥",
            description = "Monera, Fungi, Algae, Bryophytes, Pteridophytes, Gymnosperms, and Angiosperm families.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "bot_genetics",
            subject = SubjectType.BOTANY,
            name = "Genetics",
            marks = 6,
            priorityLevel = 4,
            priorityFlames = "🔥🔥🔥🔥",
            description = "Mendelian inheritance, linkage, crossing over, sex determination, mutations, molecular genetics.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "bot_physiology",
            subject = SubjectType.BOTANY,
            name = "Plant Physiology",
            marks = 6,
            priorityLevel = 4,
            priorityFlames = "🔥🔥🔥🔥",
            description = "Photosynthesis (C3, C4, CAM), respiration, transpiration, mineral nutrition, phytohormones.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "bot_cell_bio",
            subject = SubjectType.BOTANY,
            name = "Cell Biology",
            marks = 5,
            priorityLevel = 4,
            priorityFlames = "🔥🔥🔥🔥",
            description = "Cell structure, organelles, membranes, cell cycle, mitosis, meiosis, chromosome structure."
        ),
        SyllabusUnit(
            id = "bot_ecology",
            subject = SubjectType.BOTANY,
            name = "Ecology & Vegetation",
            marks = 4,
            priorityLevel = 3,
            priorityFlames = "🔥🔥🔥",
            description = "Ecological adaptations, food chains, trophic pyramids, succession, biomes of Nepal."
        ),
        SyllabusUnit(
            id = "bot_anatomy",
            subject = SubjectType.BOTANY,
            name = "Plant Anatomy",
            marks = 3,
            priorityLevel = 2,
            priorityFlames = "🔥🔥",
            description = "Meristems, simple & complex tissues, primary and secondary growth in stems and roots."
        ),
        SyllabusUnit(
            id = "bot_applied",
            subject = SubjectType.BOTANY,
            name = "Applied Botany",
            marks = 3,
            priorityLevel = 2,
            priorityFlames = "🔥🔥",
            description = "Plant breeding, tissue culture, medicinal plants of Nepal (Yarsagumba, Chiraito, etc.), biofertilizers."
        ),
        SyllabusUnit(
            id = "bot_components",
            subject = SubjectType.BOTANY,
            name = "Basic Components of Life",
            marks = 2,
            priorityLevel = 1,
            priorityFlames = "🔥",
            description = "Carbohydrates, proteins, lipids, enzymes, nucleic acids, water properties."
        ),
        SyllabusUnit(
            id = "bot_dev",
            subject = SubjectType.BOTANY,
            name = "Developmental Botany",
            marks = 2,
            priorityLevel = 1,
            priorityFlames = "🔥",
            description = "Microsporogenesis, megasporogenesis, pollination, fertilization, endosperm, embryo development."
        )
    )

    val CHEMISTRY_UNITS = listOf(
        SyllabusUnit(
            id = "chem_physical",
            subject = SubjectType.CHEMISTRY,
            name = "Physical Chemistry",
            marks = 17,
            priorityLevel = 5,
            priorityFlames = "🔥🔥🔥🔥🔥",
            description = "Mole concept, atomic structure, states of matter, thermodynamics, equilibrium, electrochemistry, kinetics.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "chem_organic",
            subject = SubjectType.CHEMISTRY,
            name = "Organic Chemistry",
            marks = 17,
            priorityLevel = 5,
            priorityFlames = "🔥🔥🔥🔥🔥",
            description = "Hydrocarbons, haloalkanes, alcohols, carbonyl compounds, carboxylic acids, amines, polymers, reaction mechanisms.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "chem_inorganic",
            subject = SubjectType.CHEMISTRY,
            name = "Inorganic Chemistry",
            marks = 10,
            priorityLevel = 4,
            priorityFlames = "🔥🔥🔥🔥",
            description = "Periodic table trends, s, p, d, f block elements, coordination compounds, metallurgy, chemical bonding.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "chem_applied",
            subject = SubjectType.CHEMISTRY,
            name = "Applied Chemistry",
            marks = 3,
            priorityLevel = 2,
            priorityFlames = "🔥🔥",
            description = "Drugs, dyes, plastics, fertilizers, cement, green chemistry, environmental pollutants."
        ),
        SyllabusUnit(
            id = "chem_analytical",
            subject = SubjectType.CHEMISTRY,
            name = "Analytical Chemistry",
            marks = 3,
            priorityLevel = 2,
            priorityFlames = "🔥🔥",
            description = "Volumetric analysis, qualitative salt analysis, chromatography, spectrophotometry principles."
        )
    )

    val PHYSICS_UNITS = listOf(
        SyllabusUnit(
            id = "phys_modern",
            subject = SubjectType.PHYSICS,
            name = "Modern Physics",
            marks = 12,
            priorityLevel = 5,
            priorityFlames = "🔥🔥🔥🔥🔥",
            description = "Photoelectric effect, Bohr's atomic model, X-rays, radioactivity, nuclear reactions, semiconductors, diodes.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "phys_mechanics",
            subject = SubjectType.PHYSICS,
            name = "Mechanics",
            marks = 10,
            priorityLevel = 5,
            priorityFlames = "🔥🔥🔥🔥🔥",
            description = "Vectors, kinematics, Newton's laws, work-energy, circular motion, gravitation, elasticity, fluid dynamics.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "phys_electricity",
            subject = SubjectType.PHYSICS,
            name = "Current Electricity & Magnetism",
            marks = 9,
            priorityLevel = 4,
            priorityFlames = "🔥🔥🔥🔥",
            description = "Ohm's law, Kirchhoff's laws, potentiometer, magnetic force, Biot-Savart law, electromagnetic induction, AC.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "phys_optics",
            subject = SubjectType.PHYSICS,
            name = "Wave & Optics",
            marks = 8,
            priorityLevel = 4,
            priorityFlames = "🔥🔥🔥🔥",
            description = "Wave motion, Doppler effect, reflection, refraction, lenses, optical instruments, interference, diffraction.",
            isTopPriority = true
        ),
        SyllabusUnit(
            id = "phys_thermo",
            subject = SubjectType.PHYSICS,
            name = "Heat & Thermodynamics",
            marks = 7,
            priorityLevel = 3,
            priorityFlames = "🔥🔥🔥",
            description = "Thermal expansion, calorimetry, kinetic theory of gases, first and second laws of thermodynamics, Carnot engine."
        ),
        SyllabusUnit(
            id = "phys_electrostatics",
            subject = SubjectType.PHYSICS,
            name = "Electrostatics & Capacitors",
            marks = 4,
            priorityLevel = 2,
            priorityFlames = "🔥🔥",
            description = "Coulomb's law, electric field, potential, Gauss's law, capacitor combinations, energy stored in dielectric."
        )
    )

    val MAT_UNITS = listOf(
        SyllabusUnit(
            id = "mat_verbal",
            subject = SubjectType.MAT,
            name = "Verbal Reasoning",
            marks = 5,
            priorityLevel = 3,
            priorityFlames = "🔥🔥🔥",
            description = "Analogies, vocabulary, syllogism, critical reading, sentence completion, blood relations."
        ),
        SyllabusUnit(
            id = "mat_numerical",
            subject = SubjectType.MAT,
            name = "Numerical Reasoning",
            marks = 5,
            priorityLevel = 3,
            priorityFlames = "🔥🔥🔥",
            description = "Number series, percentages, ratio-proportion, time-speed-distance, work calculations, simple algebra."
        ),
        SyllabusUnit(
            id = "mat_logical",
            subject = SubjectType.MAT,
            name = "Logical Sequencing",
            marks = 5,
            priorityLevel = 3,
            priorityFlames = "🔥🔥🔥",
            description = "Coding-decoding, direction sense, seating arrangements, sequence ordering, Venn diagrams."
        ),
        SyllabusUnit(
            id = "mat_spatial",
            subject = SubjectType.MAT,
            name = "Spatial / Abstract Reasoning",
            marks = 5,
            priorityLevel = 3,
            priorityFlames = "🔥🔥🔥",
            description = "Pattern completion, figure matrices, mirror images, folding and cube orientation, non-verbal logic."
        )
    )

    val ALL_UNITS: List<SyllabusUnit> = ZOOLOGY_UNITS + BOTANY_UNITS + CHEMISTRY_UNITS + PHYSICS_UNITS + MAT_UNITS

    val BIG_PRIORITY_LIST = listOf(
        "Human Biology & Physiology" to 15,
        "Modern Physics" to 12,
        "Biodiversity" to 9,
        "Mechanics" to 10,
        "Physical Chemistry" to 17,
        "Organic Chemistry" to 17,
        "Genetics" to 6,
        "Plant Physiology" to 6,
        "Study of Selected Animals" to 6,
        "Current Electricity & Magnetism" to 9,
        "Wave & Optics" to 8,
        "Inorganic Chemistry" to 10
    )

    fun getUnitsForSubject(subject: SubjectType): List<SyllabusUnit> {
        return ALL_UNITS.filter { it.subject == subject }
    }

    fun getUnitByName(name: String): SyllabusUnit? {
        return ALL_UNITS.firstOrNull { it.name.equals(name, ignoreCase = true) }
    }
}
