package com.example.data.model

data class QuestionSeed(
    val subject: String,
    val unit: String,
    val priority: Int,
    val questionText: String,
    val optionA: String,
    val optionB: String,
    val optionC: String,
    val optionD: String,
    val correctOptionIndex: Int,
    val explanation: String
)

object SeedQuestions {
    val QUESTIONS = listOf(
        // === ZOOLOGY: Human Biology & Physiology (Priority 5, 15 Marks) ===
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Human Biology & Physiology",
            priority = 5,
            questionText = "Which cardiac valve prevents the backflow of oxygenated blood from the left ventricle into the left atrium during ventricular systole?",
            optionA = "Tricuspid valve",
            optionB = "Bicuspid (Mitral) valve",
            optionC = "Aortic semilunar valve",
            optionD = "Pulmonary semilunar valve",
            correctOptionIndex = 1,
            explanation = "The bicuspid (or mitral) valve is located between the left atrium and left ventricle. During ventricular contraction (systole), it closes tightly to prevent regurgitation of oxygenated blood into the left atrium."
        ),
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Human Biology & Physiology",
            priority = 5,
            questionText = "In the human nephron, the maximum volume of water and essential electrolytes (approx. 70-80%) is reabsorbed in which segment?",
            optionA = "Distal convoluted tubule (DCT)",
            optionB = "Loop of Henle descending limb",
            optionC = "Proximal convoluted tubule (PCT)",
            optionD = "Collecting duct",
            correctOptionIndex = 2,
            explanation = "The Proximal Convoluted Tubule (PCT) has a dense brush border of microvilli that maximizes surface area, facilitating obligate reabsorption of 70-80% of electrolytes, water, 100% of glucose, and amino acids."
        ),
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Human Biology & Physiology",
            priority = 5,
            questionText = "What is the primary stimulus for the chemical regulation of respiration in humans under resting conditions?",
            optionA = "Decrease in arterial pO2 below 60 mmHg",
            optionB = "Increase in arterial pCO2 and H+ concentration",
            optionC = "Increase in arterial blood pressure",
            optionD = "Decrease in blood hemoglobin concentration",
            correctOptionIndex = 1,
            explanation = "The central chemoreceptors located on the ventrolateral medulla are exquisitely sensitive to hypercapnia (elevated arterial pCO2) and consequent cerebrospinal fluid acidosis (H+ elevation), driving the respiratory center."
        ),
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Human Biology & Physiology",
            priority = 5,
            questionText = "Which hormone triggers ovulation in the human female menstrual cycle through a sudden mid-cycle surge?",
            optionA = "Progesterone",
            optionB = "Luteinizing Hormone (LH)",
            optionC = "Human Chorionic Gonadotropin (hCG)",
            optionD = "Prolactin",
            correctOptionIndex = 1,
            explanation = "A sharp surge in Luteinizing Hormone (LH) from the anterior pituitary on approximately day 14 of the cycle induces rupture of the mature Graafian follicle and release of the secondary oocyte (ovulation)."
        ),
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Human Biology & Physiology",
            priority = 5,
            questionText = "The saltatory conduction of nerve impulses occurs in myelinated nerve fibers because:",
            optionA = "Action potentials skip the Nodes of Ranvier",
            optionB = "Myelin sheath acts as a high-capacitance electrical conductor",
            optionC = "Voltage-gated Na+ channels are concentrated almost exclusively at the Nodes of Ranvier",
            optionD = "Neurotransmitters are released continuously throughout the entire axon length",
            correctOptionIndex = 2,
            explanation = "The myelin sheath acts as an electrical insulator with high resistance. Ionic currents flow locally from one Node of Ranvier to the next, where voltage-gated Na+ channels are densely clustered, resulting in rapid saltatory jumping."
        ),
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Human Biology & Physiology",
            priority = 5,
            questionText = "Which cells in the gastric glands secrete hydrochloric acid (HCl) and intrinsic factor of Castle?",
            optionA = "Peptic (Chief) cells",
            optionB = "Parietal (Oxyntic) cells",
            optionC = "Goblet mucous cells",
            optionD = "Argentaffin cells",
            correctOptionIndex = 1,
            explanation = "Parietal (or oxyntic) cells secrete HCl (which activates pepsinogen to pepsin and kills ingested pathogens) and Castle's intrinsic factor (essential for vitamin B12 absorption in the terminal ileum)."
        ),

        // === ZOOLOGY: Study of Selected Animals (Priority 4, 6 Marks) ===
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Study of Selected Animals",
            priority = 4,
            questionText = "In Pheretima posthuma (Earthworm), the typhlosole is a dorsal internal fold of the intestine found between which segments?",
            optionA = "14th to 16th segments",
            optionB = "26th segment to the segment before the last 23-25 segments",
            optionC = "9th to 14th segments",
            optionD = "1st to 8th segments",
            correctOptionIndex = 1,
            explanation = "The typhlosole in earthworm begins at the 26th segment and extends backward up to roughly 23-25 segments in front of the anus, vastly increasing the absorptive surface area of the intestinal mucosa."
        ),
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Study of Selected Animals",
            priority = 4,
            questionText = "In Rana tigrina (Frog), which cranial nerve is the 10th cranial nerve and innervates visceral organs including the heart, lungs, and stomach?",
            optionA = "Trigeminal nerve",
            optionB = "Glossopharyngeal nerve",
            optionC = "Vagus nerve",
            optionD = "Hypoglossal nerve",
            correctOptionIndex = 2,
            explanation = "Cranial nerve X is the Vagus nerve, a mixed parasympathetic nerve that arises from the medulla oblongata and supplies the larynx, lungs, heart, stomach, and viscera in frogs."
        ),
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Study of Selected Animals",
            priority = 4,
            questionText = "In male Cockroach (Periplaneta americana), how do they differ external-morphologically from female cockroaches?",
            optionA = "Presence of anal cerci on 10th segment",
            optionB = "Presence of a pair of anal styles on 9th abdominal sternum",
            optionC = "Brood/genital pouch on 7th sternum",
            optionD = "Absence of wings in males",
            correctOptionIndex = 1,
            explanation = "Male cockroaches uniquely possess a pair of short, unjointed thread-like anal styles arising from the 9th abdominal sternum, whereas anal cerci on the 10th segment are present in both sexes."
        ),

        // === ZOOLOGY: Animal Tissues & Histology (Priority 3, 4 Marks) ===
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Animal Tissues & Histology",
            priority = 3,
            questionText = "The pseudostratified ciliated columnar epithelium is typically found lining which human anatomical structure?",
            optionA = "Proximal convoluted tubule of kidney",
            optionB = "Trachea and upper respiratory tract",
            optionC = "Urinary bladder and ureters",
            optionD = "Small intestinal villi",
            correctOptionIndex = 1,
            explanation = "Pseudostratified ciliated columnar epithelium lines the trachea, bronchi, and portions of the nasal cavity. Cilia sweep trapped mucous and particulate matter towards the pharynx."
        ),

        // === ZOOLOGY: Microbial Diseases & Immunology (Priority 3, 4 Marks) ===
        QuestionSeed(
            subject = "ZOOLOGY",
            unit = "Microbial Diseases & Immunology",
            priority = 3,
            questionText = "Which class of immunoglobulins is the only one capable of crossing the human placental barrier to confer passive immunity to the fetus?",
            optionA = "IgA",
            optionB = "IgM",
            optionC = "IgG",
            optionD = "IgE",
            correctOptionIndex = 2,
            explanation = "IgG is the most abundant monomeric antibody in human serum (~75-80%) and possesses the specific Fc region that binds to neonatal Fc receptors (FcRn) on the placenta, crossing over to protect the fetus."
        ),

        // === BOTANY: Biodiversity (Priority 5, 9 Marks) ===
        QuestionSeed(
            subject = "BOTANY",
            unit = "Biodiversity",
            priority = 5,
            questionText = "Heterospory and seed habit development were first initiated evolutionarily in which plant group?",
            optionA = "Bryophytes",
            optionB = "Pteridophytes (e.g., Selaginella)",
            optionC = "Gymnosperms (e.g., Cycas)",
            optionD = "Angiosperms",
            correctOptionIndex = 1,
            explanation = "Heterospory (producing distinct microspores and megaspores) evolved in pteridophytes like Selaginella and Salvinia, representing the seminal evolutionary precursor step toward the seed habit."
        ),
        QuestionSeed(
            subject = "BOTANY",
            unit = "Biodiversity",
            priority = 5,
            questionText = "In Bryophytes, the dominant independent photosynthetic phase of the life cycle is the:",
            optionA = "Diploid sporophyte",
            optionB = "Haploid gametophyte",
            optionC = "Triploid endosperm",
            optionD = "Diploid protonema",
            correctOptionIndex = 1,
            explanation = "In bryophytes (mosses and liverworts), the gametophyte (haploid) is the dominant, photosynthetic, free-living generation, while the sporophyte remains parasitic or semi-parasitic upon it."
        ),
        QuestionSeed(
            subject = "BOTANY",
            unit = "Biodiversity",
            priority = 5,
            questionText = "Which characteristic floral formula feature distinguishes the family Solanaceae?",
            optionA = "Epicalyx present, monadelphous stamens",
            optionB = "Bicarpellary syncarpous, obliquely placed ovary with swollen axile placenta",
            optionC = "Cruciform corolla with tetradynamous stamens",
            optionD = "Monocarpellary ovary with marginal placentation",
            correctOptionIndex = 1,
            explanation = "Solanaceae is diagnostically characterized by a bicarpellary, syncarpous, superior ovary positioned obliquely (tilted clockwise ~45°) with a swollen placenta bearing numerous ovules in axile placentation."
        ),

        // === BOTANY: Genetics (Priority 4, 6 Marks) ===
        QuestionSeed(
            subject = "BOTANY",
            unit = "Genetics",
            priority = 4,
            questionText = "In a dihybrid cross involving two independently assorting heterozygous genes (AaBb x AaBb), what is the expected phenotypic ratio in classic Mendelian inheritance?",
            optionA = "9:3:3:1",
            optionB = "9:7",
            optionC = "12:3:1",
            optionD = "1:2:1",
            correctOptionIndex = 0,
            explanation = "Mendel's Law of Independent Assortment predicts four distinct phenotypic classes in a 9:3:3:1 ratio when two non-linked genes assort independently during gametogenesis."
        ),
        QuestionSeed(
            subject = "BOTANY",
            unit = "Genetics",
            priority = 4,
            questionText = "During DNA replication, the Okazaki fragments formed on the lagging strand are covalently joined together by which enzyme?",
            optionA = "DNA Polymerase I",
            optionB = "DNA Ligase",
            optionC = "DNA Helicase",
            optionD = "RNA Primase",
            correctOptionIndex = 1,
            explanation = "DNA Ligase catalyzes the formation of a phosphodiester bond between the adjacent 3'-hydroxyl and 5'-phosphate termini of discontinuously synthesized Okazaki fragments on the lagging strand."
        ),

        // === BOTANY: Plant Physiology (Priority 4, 6 Marks) ===
        QuestionSeed(
            subject = "BOTANY",
            unit = "Plant Physiology",
            priority = 4,
            questionText = "In C4 plants such as Maize and Sugarcane, the initial primary CO2 acceptor is:",
            optionA = "Ribulose-1,5-bisphosphate (RuBP)",
            optionB = "Phosphoenolpyruvate (PEP)",
            optionC = "Oxaloacetic acid (OAA)",
            optionD = "3-Phosphoglycerate (PGA)",
            correctOptionIndex = 1,
            explanation = "In mesophyll cells of C4 plants, Phosphoenolpyruvate (PEP) acts as the primary CO2 acceptor, catalyzed by PEP carboxylase (PEPcase) to form the 4-carbon acid oxaloacetate."
        ),
        QuestionSeed(
            subject = "BOTANY",
            unit = "Plant Physiology",
            priority = 4,
            questionText = "Which gaseous plant growth regulator promotes fruit ripening and accelerates abscission of leaves and flowers?",
            optionA = "Indole-3-acetic acid (IAA)",
            optionB = "Gibberellic acid (GA3)",
            optionC = "Ethylene (C2H4)",
            optionD = "Abscisic acid (ABA)",
            correctOptionIndex = 2,
            explanation = "Ethylene is the sole volatile, gaseous phytohormone. It accelerates the respiratory climacteric in ripening fruits and promotes senescence and leaf/flower abscission."
        ),

        // === BOTANY: Cell Biology (Priority 4, 5 Marks) ===
        QuestionSeed(
            subject = "BOTANY",
            unit = "Cell Biology",
            priority = 4,
            questionText = "Crossing over and homologous recombination during meiosis take place during which specific substage of Prophase I?",
            optionA = "Leptotene",
            optionB = "Zygotene",
            optionC = "Pachytene",
            optionD = "Diplotene",
            correctOptionIndex = 2,
            explanation = "In the pachytene substage of prophase I, crossing over occurs between non-sister chromatids of homologous chromosomes, mediated by the recombinase enzyme complex."
        ),

        // === CHEMISTRY: Physical Chemistry (Priority 5, 17 Marks) ===
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Physical Chemistry",
            priority = 5,
            questionText = "What is the pH of a 0.001 M hydrochloric acid (HCl) solution at 25°C?",
            optionA = "1.0",
            optionB = "3.0",
            optionC = "11.0",
            optionD = "7.0",
            correctOptionIndex = 1,
            explanation = "HCl is a strong monoprotic acid that fully dissociates: [H+] = 0.001 M = 10^-3 M. Therefore, pH = -log10[H+] = -log10(10^-3) = 3.0."
        ),
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Physical Chemistry",
            priority = 5,
            questionText = "For a spontaneous chemical reaction occurring at constant temperature and pressure, the Gibbs free energy change (ΔG) must satisfy:",
            optionA = "ΔG > 0",
            optionB = "ΔG = 0",
            optionC = "ΔG < 0",
            optionD = "ΔG = ΔH",
            correctOptionIndex = 2,
            explanation = "According to the second law of thermodynamics, the criterion for spontaneity at constant temperature and pressure is a negative change in Gibbs free energy (ΔG = ΔH - TΔS < 0)."
        ),
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Physical Chemistry",
            priority = 5,
            questionText = "For a first-order chemical reaction, the half-life period (t1/2) is related to the rate constant (k) by:",
            optionA = "t1/2 = 0.693 / k",
            optionB = "t1/2 = 1 / (k * [A]0)",
            optionC = "t1/2 = [A]0 / (2 * k)",
            optionD = "t1/2 = k / 0.693",
            correctOptionIndex = 0,
            explanation = "For a first-order reaction: k = (2.303 / t) * log10([A]0 / [A]). When [A] = [A]0 / 2, t1/2 = 2.303 * log10(2) / k = 0.693 / k, which is strictly independent of initial reactant concentration."
        ),
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Physical Chemistry",
            priority = 5,
            questionText = "According to Raoult's Law for an ideal solution containing a non-volatile solute, the relative lowering of vapor pressure equals:",
            optionA = "Mole fraction of the solvent",
            optionB = "Mole fraction of the solute",
            optionC = "Molality of the solution",
            optionD = "Osmotic pressure of the solution",
            correctOptionIndex = 1,
            explanation = "Raoult's law states that (P° - P) / P° = X_solute, meaning the relative lowering of vapor pressure of an ideal dilute solution is directly equal to the mole fraction of the dissolved non-volatile solute."
        ),
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Physical Chemistry",
            priority = 5,
            questionText = "How many Faradays of electrical charge are required to deposit 1 mole of aluminum metal from molten Al2O3 by electrolysis?",
            optionA = "1 Faraday",
            optionB = "2 Faradays",
            optionC = "3 Faradays",
            optionD = "6 Faradays",
            correctOptionIndex = 2,
            explanation = "Aluminum reduction is Al3+ + 3e- -> Al. Depositing 1 mole of elemental Al requires 3 moles of electrons, corresponding to exactly 3 Faradays of electrical charge (3 x 96,500 C)."
        ),

        // === CHEMISTRY: Organic Chemistry (Priority 5, 17 Marks) ===
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Organic Chemistry",
            priority = 5,
            questionText = "When benzaldehyde is heated with concentrated aqueous NaOH in the absence of alpha-hydrogens, it undergoes disproportionation. This reaction is known as:",
            optionA = "Aldol condensation",
            optionB = "Cannizzaro reaction",
            optionC = "Perkin reaction",
            optionD = "Clemmensen reduction",
            correctOptionIndex = 1,
            explanation = "Aldehydes lacking alpha-hydrogen atoms (such as benzaldehyde or formaldehyde) undergo self oxidation-reduction in concentrated alkali via the Cannizzaro reaction, yielding an alcohol and a carboxylate salt."
        ),
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Organic Chemistry",
            priority = 5,
            questionText = "In electrophilic aromatic substitution, which of the following functional groups acts as a strong deactivating, meta-directing group?",
            optionA = "-OH (Phenolic)",
            optionB = "-NH2 (Amino)",
            optionC = "-NO2 (Nitro)",
            optionD = "-CH3 (Methyl)",
            correctOptionIndex = 2,
            explanation = "The nitro group (-NO2) exhibits strong negative resonance (-R) and inductive (-I) electron-withdrawing effects, deactivating the aromatic ring and directing electrophiles to the meta position."
        ),
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Organic Chemistry",
            priority = 5,
            questionText = "The Lucas test is employed to distinguish between primary, secondary, and tertiary alcohols using a reagent composed of:",
            optionA = "Anhydrous ZnCl2 in concentrated HCl",
            optionB = "Alkaline KMnO4 solution",
            optionC = "Ammoniacal silver nitrate solution",
            optionD = "Bromine water and CCl4",
            correctOptionIndex = 0,
            explanation = "Lucas reagent consists of anhydrous ZnCl2 and concentrated HCl. Tertiary alcohols react immediately with cloudiness (insoluble alkyl chloride), secondary take 5 minutes, and primary remain clear at room temperature."
        ),
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Organic Chemistry",
            priority = 5,
            questionText = "Which reagent converts an aldehyde or ketone carbonyl group directly into a methylene (-CH2-) group under strongly acidic conditions?",
            optionA = "Zn(Hg) in concentrated HCl (Clemmensen reduction)",
            optionB = "LiAlH4 in dry ether",
            optionC = "NaBH4 in ethanol",
            optionD = "H2 with Lindlar's catalyst",
            correctOptionIndex = 0,
            explanation = "Clemmensen reduction employs zinc amalgam Zn(Hg) in concentrated HCl to reduce aldehydes and ketones directly into alkanes (>C=O -> >CH2) under acidic conditions."
        ),

        // === CHEMISTRY: Inorganic Chemistry (Priority 4, 10 Marks) ===
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Inorganic Chemistry",
            priority = 4,
            questionText = "What is the geometry and hybridization of the central sulfur atom in sulfur hexafluoride (SF6)?",
            optionA = "sp3d, Trigonal bipyramidal",
            optionB = "sp3d2, Octahedral",
            optionC = "sp3, Tetrahedral",
            optionD = "dsp2, Square planar",
            correctOptionIndex = 1,
            explanation = "Sulfur in SF6 forms 6 bond pairs with fluorine and has zero lone pairs. Steric number = 6, yielding sp3d2 hybridization and regular octahedral geometry with 90° bond angles."
        ),
        QuestionSeed(
            subject = "CHEMISTRY",
            unit = "Inorganic Chemistry",
            priority = 4,
            questionText = "Transition metal complexes frequently display vivid colors in aqueous solution primarily due to:",
            optionA = "Intermolecular hydrogen bonding",
            optionB = "d-d electronic transitions in split d-orbitals",
            optionC = "Complete filling of 4s orbitals",
            optionD = "High nuclear charge only",
            correctOptionIndex = 1,
            explanation = "In transition metal complexes, ligands split degenerate d-orbitals into lower and higher energy sets. Absorption of visible light promotes electrons between these split d-levels (d-d transitions), imparting complementary colors."
        ),

        // === PHYSICS: Modern Physics (Priority 5, 12 Marks) ===
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Modern Physics",
            priority = 5,
            questionText = "In Einstein's photoelectric equation (hf = Φ + KE_max), if incident light frequency is doubled while keeping intensity constant, the maximum kinetic energy of emitted photoelectrons:",
            optionA = "Remains unchanged",
            optionB = "Becomes exactly doubled",
            optionC = "Becomes more than doubled",
            optionD = "Becomes halved",
            correctOptionIndex = 2,
            explanation = "Since KE1 = hf - Φ and KE2 = 2hf - Φ = 2(hf - Φ) + Φ = 2(KE1) + Φ. Since work function Φ > 0, KE2 > 2*KE1 (it more than doubles)."
        ),
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Modern Physics",
            priority = 5,
            questionText = "According to Bohr's model of the hydrogen atom, the orbital radius (r_n) of an electron in the nth stationary orbit is proportional to:",
            optionA = "n",
            optionB = "n^2",
            optionC = "1 / n",
            optionD = "1 / n^2",
            correctOptionIndex = 1,
            explanation = "Bohr's quantization condition mvr = nh / (2π) and electrostatic centripetal force give r_n = (n^2 * h^2 * ε0) / (π * m * e^2). Thus, the radius r_n is directly proportional to the principal quantum number squared (n^2)."
        ),
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Modern Physics",
            priority = 5,
            questionText = "A radioactive isotope has a half-life of 20 days. What fraction of the original radioactive nuclei will remain undecayed after 60 days?",
            optionA = "1/2",
            optionB = "1/4",
            optionC = "1/8",
            optionD = "1/16",
            correctOptionIndex = 2,
            explanation = "Number of half-lives elapsed n = Total time / Half-life = 60 / 20 = 3. Remaining fraction N / N0 = (1/2)^n = (1/2)^3 = 1/8 (12.5%)."
        ),
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Modern Physics",
            priority = 5,
            questionText = "The de Broglie wavelength (λ) of a particle with mass m and kinetic energy E is expressed as:",
            optionA = "λ = h / (2mE)",
            optionB = "λ = h / √(2mE)",
            optionC = "λ = √(2mE) / h",
            optionD = "λ = h * √(mE)",
            correctOptionIndex = 1,
            explanation = "Momentum p is related to kinetic energy E by p = √(2mE). The de Broglie wavelength is λ = h / p = h / √(2mE)."
        ),

        // === PHYSICS: Mechanics (Priority 5, 10 Marks) ===
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Mechanics",
            priority = 5,
            questionText = "A projectile is launched from ground level with speed u at an angle θ to the horizontal. The maximum horizontal range is achieved when the angle of projection θ is:",
            optionA = "30°",
            optionB = "45°",
            optionC = "60°",
            optionD = "90°",
            correctOptionIndex = 1,
            explanation = "Horizontal range R = (u^2 * sin(2θ)) / g. Range is maximum when sin(2θ) = 1, giving 2θ = 90°, so θ = 45°."
        ),
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Mechanics",
            priority = 5,
            questionText = "The escape velocity from the surface of Earth (mass M, radius R) is given by which formula?",
            optionA = "v_e = √(GM / R)",
            optionB = "v_e = √(2GM / R)",
            optionC = "v_e = 2GM / R^2",
            optionD = "v_e = √(gR / 2)",
            correctOptionIndex = 1,
            explanation = "By conservation of mechanical energy: 0.5 * m * v_e^2 - GMm / R = 0. Solving for v_e gives v_e = √(2GM / R) = √(2gR) ≈ 11.2 km/s."
        ),
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Mechanics",
            priority = 5,
            questionText = "When a body moves in a horizontal circle with uniform speed v and radius r, the work done by the centripetal force in one complete revolution is:",
            optionA = "2πr * (mv^2 / r)",
            optionB = "mv^2 / 2",
            optionC = "Zero",
            optionD = "mg * 2πr",
            correctOptionIndex = 2,
            explanation = "Centripetal force is directed radially inward perpendicular to instantaneous displacement (angle θ = 90°). Work done W = F * d * cos(90°) = 0 J."
        ),

        // === PHYSICS: Current Electricity & Magnetism (Priority 4, 9 Marks) ===
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Current Electricity & Magnetism",
            priority = 4,
            questionText = "A copper wire of resistance R is stretched uniformly such that its length increases by 100% (doubles) while volume remains constant. What is the new resistance?",
            optionA = "2R",
            optionB = "3R",
            optionC = "4R",
            optionD = "R / 2",
            correctOptionIndex = 2,
            explanation = "Since volume V = A * L is constant, doubling length (L' = 2L) halves cross-sectional area (A' = A / 2). New resistance R' = ρ * L' / A' = ρ * (2L) / (A / 2) = 4 * (ρL / A) = 4R."
        ),
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Current Electricity & Magnetism",
            priority = 4,
            questionText = "Kirchhoff's First Law (Junction Rule) for an electrical circuit is a direct manifestation of the law of conservation of:",
            optionA = "Energy",
            optionB = "Electric Charge",
            optionC = "Linear Momentum",
            optionD = "Electric Potential",
            correctOptionIndex = 1,
            explanation = "Kirchhoff's current law (sum of currents entering a junction equals sum of currents leaving) asserts that electric charge cannot accumulate indefinitely at a junction, conserving electric charge."
        ),

        // === PHYSICS: Wave & Optics (Priority 4, 8 Marks) ===
        QuestionSeed(
            subject = "PHYSICS",
            unit = "Wave & Optics",
            priority = 4,
            questionText = "In Young's Double Slit Experiment (YDSE), what happens to the fringe width (β = λD / d) if the entire apparatus is immersed in water (refractive index μ = 4/3)?",
            optionA = "Fringe width remains unchanged",
            optionB = "Fringe width increases by 4/3 times",
            optionC = "Fringe width decreases to 3/4 of its original value",
            optionD = "Interference fringes disappear entirely",
            correctOptionIndex = 2,
            explanation = "When immersed in water, light wavelength decreases to λ' = λ / μ = λ / (4/3) = 3λ / 4. Since β = λD / d, the fringe width becomes β' = 3/4 * β (decreases by a factor of 4/3)."
        ),

        // === MAT: Mental Agility Test (20 Marks) ===
        QuestionSeed(
            subject = "MAT",
            unit = "Numerical Reasoning",
            priority = 3,
            questionText = "Identify the next number in the given series: 2, 6, 12, 20, 30, ?",
            optionA = "40",
            optionB = "42",
            optionC = "44",
            optionD = "46",
            correctOptionIndex = 1,
            explanation = "Differences between consecutive terms are +4, +6, +8, +10. The next difference is +12. Thus 30 + 12 = 42 (Alternatively, pattern is n*(n+1): 1*2=2, 2*3=6, 3*4=12, 4*5=20, 5*6=30, 6*7=42)."
        ),
        QuestionSeed(
            subject = "MAT",
            unit = "Verbal Reasoning",
            priority = 3,
            questionText = "Select the pair that exhibits the same relationship as 'CARDIOLOGY : HEART':",
            optionA = "Pathology : Disease",
            optionB = "Nephrology : Kidney",
            optionC = "Hematology : Liver",
            optionD = "Neurology : Bone",
            correctOptionIndex = 1,
            explanation = "Cardiology is the medical specialization dedicated to the study and treatment of the heart, just as Nephrology is the specialization focused on the kidney."
        ),
        QuestionSeed(
            subject = "MAT",
            unit = "Logical Sequencing",
            priority = 3,
            questionText = "If 'NEPAL' is coded as 'OGQBN' in a certain cipher, how is 'KATHMANDU' coded using the same logic?",
            optionA = "LBUIOBOEV",
            optionB = "LCUJNBNEV",
            optionC = "LBUINBODV",
            optionD = "MCVJOCEFW",
            correctOptionIndex = 0,
            explanation = "Examine pattern: N(+1)->O, E(+2)->G, P(+1)->Q, A(+2)->C (here N(+1)->O, E(+2)->G, P(+1)->Q, A(+1)->B, L(+2)->N). Alternating +1, +2 pattern: K(+1)=L, A(+1)=B, T(+1)=U, H(+1)=I, M(+2)=O, A(+1)=B, N(+1)=O, D(+1)=E, U(+1)=V."
        ),
        QuestionSeed(
            subject = "MAT",
            unit = "Spatial / Abstract Reasoning",
            priority = 3,
            questionText = "A doctor faces North, turns 90° clockwise, then 180° counter-clockwise, and finally 45° clockwise. In which direction is the doctor facing now?",
            optionA = "North-East",
            optionB = "North-West",
            optionC = "South-East",
            optionD = "West",
            correctOptionIndex = 1,
            explanation = "Starting North (0°). +90° (East) - 180° = -90° (West) + 45° = -45° from North, which corresponds directly to North-West."
        ),
        QuestionSeed(
            subject = "MAT",
            unit = "Numerical Reasoning",
            priority = 3,
            questionText = "If 15 medical students can complete a community health survey in 6 days working 8 hours a day, how many days will 10 students take to complete the same survey working 9 hours a day?",
            optionA = "6 days",
            optionB = "8 days",
            optionC = "10 days",
            optionD = "12 days",
            correctOptionIndex = 1,
            explanation = "Total student-hours = M1 * D1 * H1 = 15 * 6 * 8 = 720 hours. For second team: M2 * D2 * H2 = 10 * D2 * 9 = 90 * D2. Therefore D2 = 720 / 90 = 8 days."
        )
    )
}
