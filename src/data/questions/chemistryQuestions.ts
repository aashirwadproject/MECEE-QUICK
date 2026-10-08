import { Question } from '../../types';

export const CHEMISTRY_QUESTIONS: Question[] = [
  // =========================================================================
  // UNIT 1: Physical Chemistry (17 Marks - Priority 5 🔥🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'chem_phys_1',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'According to de Broglie hypothesis, what is the wavelength associated with a particle of mass m moving with velocity v?',
    optionA: 'λ = h / (mv)',
    optionB: 'λ = mv / h',
    optionC: 'λ = h * mv',
    optionD: 'λ = h / (2mv)',
    correctOptionIndex: 0,
    explanation: 'The de Broglie relation connects particle momentum p = mv with wave character via λ = h / p = h / (mv), where h is Planck constant (6.626 x 10^-34 J s).'
  },
  {
    id: 'chem_phys_2',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'The compressibility factor Z for an ideal gas at all temperatures and pressures equals:',
    optionA: '0',
    optionB: '1',
    optionC: '2',
    optionD: '0.5',
    correctOptionIndex: 1,
    explanation: 'Compressibility factor Z = PV / (nRT). For an ideal gas obeying PV = nRT, Z is identically equal to 1 under all conditions of temperature and pressure.'
  },
  {
    id: 'chem_phys_3',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'For a reversible adiabatic expansion of an ideal gas, which thermodynamic state function remains constant?',
    optionA: 'Temperature (T)',
    optionB: 'Pressure (P)',
    optionC: 'Entropy (S)',
    optionD: 'Internal energy (U)',
    correctOptionIndex: 2,
    explanation: 'In a reversible adiabatic process, heat exchange q_rev = 0; thus, change in entropy ΔS = ∫(dq_rev / T) = 0. Therefore, entropy remains strictly constant (isentropic process).'
  },
  {
    id: 'chem_phys_4',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'What is the pH of a buffer solution prepared by mixing equal volumes of 0.1 M CH3COOH (pKa = 4.74) and 0.1 M CH3COONa?',
    optionA: '3.74',
    optionB: '7.00',
    optionC: '5.74',
    optionD: '4.74',
    correctOptionIndex: 3,
    explanation: 'Henderson-Hasselbalch equation: pH = pKa + log([Conjugate Base] / [Acid]). When [CH3COO-] = [CH3COOH], the ratio is 1, and log(1) = 0; hence pH = pKa = 4.74.'
  },
  {
    id: 'chem_phys_5',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'For a first-order chemical reaction, if the rate constant k is 0.0693 min^-1, what is the half-life (t1/2) of the reaction?',
    optionA: '10 min',
    optionB: '1 min',
    optionC: '6.93 min',
    optionD: '100 min',
    correctOptionIndex: 0,
    explanation: 'For a first-order reaction, t1/2 = ln(2) / k = 0.693 / k. Substituting k = 0.0693 min^-1 gives t1/2 = 0.693 / 0.0693 = 10 minutes.'
  },
  {
    id: 'chem_phys_6',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'How many coulombs of electricity are required to deposit 1 mole of aluminium from molten Al2O3 via electrolysis? (F = 96,500 C)',
    optionA: '96,500 C',
    optionB: '289,500 C',
    optionC: '193,000 C',
    optionD: '48,250 C',
    correctOptionIndex: 1,
    explanation: 'Al^3+ + 3e^- -> Al(s). Reduction of 1 mol of Al^3+ requires 3 moles of electrons. Q = n * F = 3 * 96,500 C = 289,500 C (3 Faradays).'
  },
  {
    id: 'chem_phys_7',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'Which colligative property is most suitably employed for determining the molecular weight of high polymers, proteins, and biomolecules?',
    optionA: 'Relative lowering of vapor pressure',
    optionB: 'Elevation in boiling point',
    optionC: 'Osmotic pressure (π)',
    optionD: 'Depression in freezing point',
    correctOptionIndex: 2,
    explanation: 'Osmotic pressure (π = CRT) yields substantial, easily measurable pressure readings even at room temperature with extremely dilute polymer solutions, preventing thermal denaturation of labile macromolecules.'
  },

  // =========================================================================
  // UNIT 2: Organic Chemistry (17 Marks - Priority 5 🔥🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'chem_org_1',
    subject: 'CHEMISTRY',
    unit: 'Organic Chemistry',
    priority: 5,
    questionText: 'When phenol is heated with chloroform in the presence of aqueous NaOH, followed by acidification, salicylaldehyde is formed. This reaction is known as:',
    optionA: 'Kolbe reaction',
    optionB: 'Cannizzaro reaction',
    optionC: 'Friedel-Crafts acylation',
    optionD: 'Reimer-Tiemann reaction',
    correctOptionIndex: 3,
    explanation: 'The Reimer-Tiemann reaction involves electrophilic attack of dichlorocarbene (:CCl2) on phenoxide at the ortho position, producing an ortho-formyl derivative (salicylaldehyde).'
  },
  {
    id: 'chem_org_2',
    subject: 'CHEMISTRY',
    unit: 'Organic Chemistry',
    priority: 5,
    questionText: 'Which of the following organic compounds will NOT undergo the Cannizzaro reaction when treated with concentrated alkali?',
    optionA: 'Acetaldehyde (CH3CHO)',
    optionB: 'Benzaldehyde (C6H5CHO)',
    optionC: 'Formaldehyde (HCHO)',
    optionD: 'Trimethylacetaldehyde (pivaldehyde)',
    correctOptionIndex: 0,
    explanation: 'The Cannizzaro reaction (disproportionation into alcohol and carboxylate) is given only by aldehydes lacking alpha-hydrogens (HCHO, C6H5CHO, (CH3)3CCHO). Acetaldehyde contains three alpha-hydrogens and instead undergoes Aldol condensation.'
  },
  {
    id: 'chem_org_3',
    subject: 'CHEMISTRY',
    unit: 'Organic Chemistry',
    priority: 5,
    questionText: 'The carbylamine test (isocyanide test) is a specific diagnostic test used to detect which functional class of amines?',
    optionA: 'Secondary aliphatic amines only',
    optionB: 'Primary (1°) amines (both aliphatic and aromatic)',
    optionC: 'Tertiary amines',
    optionD: 'Quaternary ammonium salts',
    correctOptionIndex: 1,
    explanation: 'When warmed with chloroform and ethanolic KOH, primary amines (R-NH2 or Ar-NH2) form carbylamines (isocyanides, R-NC) characterized by an intolerably foul, pungent odor.'
  },
  {
    id: 'chem_org_4',
    subject: 'CHEMISTRY',
    unit: 'Organic Chemistry',
    priority: 5,
    questionText: 'In an SN2 nucleophilic substitution reaction on an asymmetric chiral alkyl halide, the stereochemical outcome is:',
    optionA: 'Complete retention of configuration',
    optionB: 'Racemization (50% retention, 50% inversion)',
    optionC: 'Complete inversion of configuration (Walden inversion)',
    optionD: 'Formation of meso compound',
    correctOptionIndex: 2,
    explanation: 'SN2 proceeds via a concerted backside nucleophilic attack on the carbon atom opposite to the leaving group through a trigonal bipyramidal transition state, causing complete 100% Walden inversion of spatial configuration.'
  },
  {
    id: 'chem_org_5',
    subject: 'CHEMISTRY',
    unit: 'Organic Chemistry',
    priority: 5,
    questionText: 'Lucas reagent, used to distinguish primary, secondary, and tertiary alcohols based on turbidity time, consists of:',
    optionA: 'Bromine in carbon tetrachloride',
    optionB: 'Conc. HNO3 and conc. H2SO4',
    optionC: 'Alkaline KMnO4 solution',
    optionD: 'Conc. HCl and anhydrous ZnCl2',
    correctOptionIndex: 3,
    explanation: 'Lucas reagent is equimolar anhydrous ZnCl2 in concentrated HCl. 3° alcohols produce instant turbidity of insoluble alkyl chloride; 2° alcohols produce turbidity within 5 minutes; 1° alcohols produce no turbidity at room temperature.'
  },

  // =========================================================================
  // UNIT 3: Inorganic Chemistry (10 Marks - Priority 4 🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'chem_inorg_1',
    subject: 'CHEMISTRY',
    unit: 'Inorganic Chemistry',
    priority: 4,
    questionText: 'According to VSEPR theory, the molecular geometry and hybridization of Xenon tetrafluoride (XeF4) are:',
    optionA: 'Square planar, sp3d2',
    optionB: 'Tetrahedral, sp3',
    optionC: 'Trigonal bipyramidal, sp3d',
    optionD: 'See-saw, sp3d',
    correctOptionIndex: 0,
    explanation: 'Xe has 8 valence electrons. With 4 bond pairs to F and 2 lone pairs, total steric number is 6 (sp3d2 hybridization, octahedral electron geometry). The two lone pairs occupy trans axial positions to minimize repulsions, producing a square planar molecular shape.'
  },
  {
    id: 'chem_inorg_2',
    subject: 'CHEMISTRY',
    unit: 'Inorganic Chemistry',
    priority: 4,
    questionText: 'Lanthanoid contraction is primarily caused by which phenomenon?',
    optionA: 'High shielding ability of 5d orbitals',
    optionB: 'Imperfect shielding of 4f electrons due to their diffuse, spatial shapes',
    optionC: 'Decreasing nuclear charge across the series',
    optionD: 'Presence of relativistic inert pair effect',
    correctOptionIndex: 1,
    explanation: 'The 4f electrons have diffuse spatial geometry and poor shielding capability. As nuclear charge increases by one unit with each successive lanthanoid element, the effective nuclear charge Z_eff increases markedly, pulling the outer electron shells closer and causing a steady contraction in atomic and ionic radii.'
  },
  {
    id: 'chem_inorg_3',
    subject: 'CHEMISTRY',
    unit: 'Inorganic Chemistry',
    priority: 4,
    questionText: 'Which of the following complex ions is diamagnetic (possesses zero unpaired d-electrons)?',
    optionA: '[Fe(H2O)6]^2+',
    optionB: '[FeF6]^3-',
    optionC: '[Fe(CN)6]^4-',
    optionD: '[Mn(H2O)6]^2+',
    correctOptionIndex: 2,
    explanation: 'In [Fe(CN)6]^4-, iron is in Fe^2+ (d6) state. Cyanide (CN-) is a strong-field ligand that causes low-spin pairing in the t2g orbitals: t2g^6 eg^0. All 6 d-electrons are paired, rendering the complex completely diamagnetic.'
  },

  // =========================================================================
  // UNIT 4: Applied Chemistry (3 Marks - Priority 2 🔥🔥)
  // =========================================================================
  {
    id: 'chem_app_1',
    subject: 'CHEMISTRY',
    unit: 'Applied Chemistry',
    priority: 2,
    questionText: 'Portland cement contains gypsum (CaSO4 · 2H2O, approx. 2–3%) added during final clinker grinding for which specific purpose?',
    optionA: 'To accelerate early hardening',
    optionB: 'To increase the heat of hydration',
    optionC: 'To impart white color to concrete',
    optionD: 'To retard the initial setting time of cement',
    correctOptionIndex: 3,
    explanation: 'Gypsum reacts with tricalcium aluminate (C3A) to form insoluble calcium sulfoaluminate (ettringite), which retards flash setting and extends the workable setting time so concrete can be poured and shaped.'
  },
  {
    id: 'chem_app_2',
    subject: 'CHEMISTRY',
    unit: 'Applied Chemistry',
    priority: 2,
    questionText: 'Aspirin (acetylsalicylic acid), a widely used non-steroidal anti-inflammatory and antipyretic drug, is synthesized by acetylating:',
    optionA: 'Salicylic acid with acetic anhydride in presence of acid catalyst',
    optionB: 'Benzoic acid',
    optionC: 'Methyl salicylate with methanol',
    optionD: 'Phthalic acid',
    correctOptionIndex: 0,
    explanation: 'Salicylic acid (2-hydroxybenzoic acid) reacts with acetic anhydride ((CH3CO)2O) in the presence of concentrated sulfuric acid catalyst to acetylate the phenolic -OH group, yielding 2-acetoxybenzoic acid (aspirin).'
  },

  // =========================================================================
  // UNIT 5: Analytical Chemistry (3 Marks - Priority 2 🔥🔥)
  // =========================================================================
  {
    id: 'chem_ana_1',
    subject: 'CHEMISTRY',
    unit: 'Analytical Chemistry',
    priority: 2,
    questionText: 'In qualitative inorganic analysis, Group II metal cations (such as Cu^2+, Pb^2+, Bi^3+) are precipitated as sulfides by passing H2S gas in the presence of dilute HCl because:',
    optionA: 'HCl increases the solubility of metal sulfides',
    optionB: 'Common ion effect of H+ suppresses H2S ionization, lowering [S^2-] so only low-Ksp sulfides precipitate',
    optionC: 'HCl oxidizes sulfide ions into elemental sulfur',
    optionD: 'HCl acts as a reducing agent',
    correctOptionIndex: 1,
    explanation: 'Dilute HCl dissociates into H+ and Cl-. The high concentration of H+ exerts a common ion effect on the weak diprotic acid H2S, repressing its secondary dissociation. The resulting low sulfide concentration exceeds the solubility product (Ksp) of Group II sulfides only, preventing precipitation of higher-Ksp Group IV sulfides (ZnS, MnS).'
  },
  {
    id: 'chem_ana_2',
    subject: 'CHEMISTRY',
    unit: 'Analytical Chemistry',
    priority: 2,
    questionText: 'In thin layer chromatography (TLC), the retardation factor (Rf value) is defined as:',
    optionA: 'Distance moved by solvent front divided by distance moved by solute spot',
    optionB: 'Time taken for elution through the stationary column',
    optionC: 'Distance traveled by solute spot divided by distance traveled by the mobile phase solvent front',
    optionD: 'Ratio of molecular weight to charge',
    correctOptionIndex: 2,
    explanation: 'Rf = (Distance traveled by substance from origin) / (Distance traveled by solvent front from origin). Because the solute cannot advance beyond the solvent front, the Rf value is a unitless ratio strictly between 0 and 1.'
  }
];
