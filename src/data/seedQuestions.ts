import { Question } from '../types';

export const SEED_QUESTIONS: Question[] = [
  // Zoology: Human Biology & Physiology (15 Marks)
  {
    id: 'seed_zoo_1',
    subject: 'ZOOLOGY',
    unit: 'Human Biology & Physiology',
    priority: 5,
    questionText: 'Which cardiac valve prevents the backflow of oxygenated blood from the left ventricle into the left atrium during ventricular systole?',
    optionA: 'Tricuspid valve',
    optionB: 'Bicuspid (Mitral) valve',
    optionC: 'Aortic semilunar valve',
    optionD: 'Pulmonary semilunar valve',
    correctOptionIndex: 1,
    explanation: 'The bicuspid (or mitral) valve is positioned between the left atrium and left ventricle. During ventricular contraction (systole), it snaps shut to prevent regurgitation into the atrium.'
  },
  {
    id: 'seed_zoo_2',
    subject: 'ZOOLOGY',
    unit: 'Human Biology & Physiology',
    priority: 5,
    questionText: 'In the human nephron, where is the maximum volume of water and essential electrolytes (approx. 70-80%) reabsorbed?',
    optionA: 'Distal convoluted tubule (DCT)',
    optionB: 'Descending limb of Loop of Henle',
    optionC: 'Proximal convoluted tubule (PCT)',
    optionD: 'Collecting duct',
    correctOptionIndex: 2,
    explanation: 'The PCT has a dense brush border of microvilli that vastly expands surface area, reabsorbing 70-80% of electrolytes and water along with 100% of filtered glucose and amino acids.'
  },
  {
    id: 'seed_zoo_3',
    subject: 'ZOOLOGY',
    unit: 'Human Biology & Physiology',
    priority: 5,
    questionText: 'What is the primary stimulus for the chemical regulation of respiration in humans under resting conditions?',
    optionA: 'Decrease in arterial pO2 below 60 mmHg',
    optionB: 'Increase in arterial pCO2 and H+ concentration',
    optionC: 'Increase in arterial blood pressure',
    optionD: 'Decrease in blood hemoglobin concentration',
    correctOptionIndex: 1,
    explanation: 'Central chemoreceptors on the medulla are extraordinarily sensitive to hypercapnia (elevated arterial pCO2) and consequent CSF acidosis (H+ rise), strongly stimulating ventilation.'
  },
  {
    id: 'seed_zoo_4',
    subject: 'ZOOLOGY',
    unit: 'Human Biology & Physiology',
    priority: 5,
    questionText: 'Which hormone triggers ovulation in the human female menstrual cycle through a sudden mid-cycle surge?',
    optionA: 'Progesterone',
    optionB: 'Luteinizing Hormone (LH)',
    optionC: 'Human Chorionic Gonadotropin (hCG)',
    optionD: 'Prolactin',
    correctOptionIndex: 1,
    explanation: 'A dramatic surge in Luteinizing Hormone (LH) from the anterior pituitary around day 14 stimulates rupture of the Graafian follicle and release of the secondary oocyte.'
  },
  {
    id: 'seed_zoo_5',
    subject: 'ZOOLOGY',
    unit: 'Human Biology & Physiology',
    priority: 5,
    questionText: 'Which cells in the gastric mucosa secrete hydrochloric acid (HCl) and intrinsic factor of Castle?',
    optionA: 'Chief (Peptic) cells',
    optionB: 'Parietal (Oxyntic) cells',
    optionC: 'Goblet mucous cells',
    optionD: 'Enteroendocrine G cells',
    correctOptionIndex: 1,
    explanation: 'Parietal (oxyntic) cells secrete HCl to activate pepsinogen and kill pathogens, as well as Castle intrinsic factor needed for vitamin B12 absorption in the ileum.'
  },

  // Zoology: Study of Selected Animals (6 Marks)
  {
    id: 'seed_zoo_6',
    subject: 'ZOOLOGY',
    unit: 'Study of Selected Animals',
    priority: 4,
    questionText: 'In Pheretima posthuma (Earthworm), the typhlosole begins at which segment to enlarge intestinal absorption area?',
    optionA: '14th segment',
    optionB: '26th segment',
    optionC: '9th segment',
    optionD: '1st segment',
    correctOptionIndex: 1,
    explanation: 'The typhlosole in earthworm begins at the 26th segment and continues up to 23-25 segments in front of the anus, vastly augmenting mucosal surface area.'
  },
  {
    id: 'seed_zoo_7',
    subject: 'ZOOLOGY',
    unit: 'Study of Selected Animals',
    priority: 4,
    questionText: 'In male cockroaches (Periplaneta americana), which external structure is present that is absent in females?',
    optionA: 'Anal cerci on 10th segment',
    optionB: 'Anal styles on 9th abdominal sternum',
    optionC: 'Genital pouch on 7th sternum',
    optionD: 'Tegmina elytra',
    correctOptionIndex: 1,
    explanation: 'Males possess a pair of short, unjointed thread-like anal styles on the 9th sternum. Anal cerci on the 10th segment are present in both sexes.'
  },

  // Botany: Biodiversity (9 Marks)
  {
    id: 'seed_bot_1',
    subject: 'BOTANY',
    unit: 'Biodiversity',
    priority: 5,
    questionText: 'Heterospory and precursor traits to the seed habit first evolved in which plant group?',
    optionA: 'Bryophytes',
    optionB: 'Pteridophytes (e.g., Selaginella)',
    optionC: 'Gymnosperms (e.g., Cycas)',
    optionD: 'Angiosperms',
    correctOptionIndex: 1,
    explanation: 'Heterospory (producing distinct microspores and megaspores) originated in pteridophytes like Selaginella, marking a critical step toward seed evolution.'
  },
  {
    id: 'seed_bot_2',
    subject: 'BOTANY',
    unit: 'Biodiversity',
    priority: 5,
    questionText: 'Which characteristic floral feature is diagnostic of the family Solanaceae?',
    optionA: 'Epicalyx and monadelphous stamens',
    optionB: 'Bicarpellary syncarpous obliquely placed ovary with swollen placenta',
    optionC: 'Cruciform corolla and tetradynamous stamens',
    optionD: 'Monocarpellary ovary with marginal placentation',
    correctOptionIndex: 1,
    explanation: 'Solanaceae flowers feature a superior, bicarpellary syncarpous ovary tilted obliquely (~45°) with swollen axile placentation and numerous ovules.'
  },

  // Botany: Genetics (6 Marks)
  {
    id: 'seed_bot_3',
    subject: 'BOTANY',
    unit: 'Genetics',
    priority: 4,
    questionText: 'In a dihybrid cross of two independent heterozygous genes (AaBb x AaBb), what is the expected Mendelian phenotypic ratio?',
    optionA: '9:3:3:1',
    optionB: '9:7',
    optionC: '12:3:1',
    optionD: '1:2:1',
    correctOptionIndex: 0,
    explanation: 'Mendel Law of Independent Assortment produces four phenotypic classes in a classic 9:3:3:1 ratio for two unlinked autosomal genes.'
  },

  // Chemistry: Physical Chemistry (17 Marks)
  {
    id: 'seed_chem_1',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'What is the pH of a 0.001 M hydrochloric acid (HCl) solution at 25°C?',
    optionA: '1.0',
    optionB: '3.0',
    optionC: '11.0',
    optionD: '7.0',
    correctOptionIndex: 1,
    explanation: 'HCl completely dissociates into 0.001 M = 10^-3 M [H+]. Therefore, pH = -log10(10^-3) = 3.0.'
  },
  {
    id: 'seed_chem_2',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'For a first-order chemical reaction, the half-life period (t1/2) is related to rate constant k by:',
    optionA: 't1/2 = 0.693 / k',
    optionB: 't1/2 = 1 / (k * [A]0)',
    optionC: 't1/2 = [A]0 / (2 * k)',
    optionD: 't1/2 = k / 0.693',
    correctOptionIndex: 0,
    explanation: 'For first-order kinetics, t1/2 = ln(2) / k = 0.693 / k, which is strictly independent of initial reactant concentration.'
  },
  {
    id: 'seed_chem_3',
    subject: 'CHEMISTRY',
    unit: 'Physical Chemistry',
    priority: 5,
    questionText: 'How many Faradays of electrical charge are required to deposit 1 mole of aluminum metal from molten Al2O3?',
    optionA: '1 Faraday',
    optionB: '2 Faradays',
    optionC: '3 Faradays',
    optionD: '6 Faradays',
    correctOptionIndex: 2,
    explanation: 'The reduction equation is Al3+ + 3e- -> Al. Depositing 1 mole of Al requires 3 moles of electrons, which equals exactly 3 Faradays (3 x 96,500 C).'
  },

  // Chemistry: Organic Chemistry (17 Marks)
  {
    id: 'seed_chem_4',
    subject: 'CHEMISTRY',
    unit: 'Organic Chemistry',
    priority: 5,
    questionText: 'When benzaldehyde is heated with concentrated aqueous NaOH in the absence of alpha-hydrogens, it undergoes disproportionation via:',
    optionA: 'Aldol condensation',
    optionB: 'Cannizzaro reaction',
    optionC: 'Perkin reaction',
    optionD: 'Clemmensen reduction',
    correctOptionIndex: 1,
    explanation: 'Aldehydes lacking alpha-hydrogens undergo self oxidation-reduction in concentrated alkali via the Cannizzaro reaction, yielding an alcohol and a carboxylate salt.'
  },
  {
    id: 'seed_chem_5',
    subject: 'CHEMISTRY',
    unit: 'Organic Chemistry',
    priority: 5,
    questionText: 'The Lucas test distinguishes between primary, secondary, and tertiary alcohols using which reagent?',
    optionA: 'Anhydrous ZnCl2 in concentrated HCl',
    optionB: 'Alkaline KMnO4 solution',
    optionC: 'Ammoniacal silver nitrate solution',
    optionD: 'Bromine water in CCl4',
    correctOptionIndex: 0,
    explanation: 'Lucas reagent is anhydrous ZnCl2 in concentrated HCl. 3° alcohols react immediately (cloudiness), 2° in 5 minutes, and 1° remain clear at room temperature.'
  },

  // Physics: Modern Physics (12 Marks)
  {
    id: 'seed_phys_1',
    subject: 'PHYSICS',
    unit: 'Modern Physics',
    priority: 5,
    questionText: 'In photoelectric emission, if incident photon frequency is doubled while keeping intensity constant, the maximum kinetic energy of emitted photoelectrons:',
    optionA: 'Remains unchanged',
    optionB: 'Doubles exactly',
    optionC: 'Becomes more than doubled',
    optionD: 'Becomes halved',
    correctOptionIndex: 2,
    explanation: 'Since KE1 = hf - Φ and KE2 = 2hf - Φ = 2(hf - Φ) + Φ = 2(KE1) + Φ. Because work function Φ > 0, KE2 > 2*KE1 (it more than doubles).'
  },
  {
    id: 'seed_phys_2',
    subject: 'PHYSICS',
    unit: 'Modern Physics',
    priority: 5,
    questionText: 'A radioactive isotope has a half-life of 20 days. What fraction of nuclei remains undecayed after 60 days?',
    optionA: '1/2',
    optionB: '1/4',
    optionC: '1/8',
    optionD: '1/16',
    correctOptionIndex: 2,
    explanation: 'Number of half-lives n = 60 / 20 = 3. Remaining fraction N / N0 = (1/2)^3 = 1/8 (12.5%).'
  },

  // Physics: Mechanics (10 Marks)
  {
    id: 'seed_phys_3',
    subject: 'PHYSICS',
    unit: 'Mechanics',
    priority: 5,
    questionText: 'A projectile is launched from ground level with initial velocity u. The maximum horizontal range is achieved at a projection angle θ of:',
    optionA: '30°',
    optionB: '45°',
    optionC: '60°',
    optionD: '90°',
    correctOptionIndex: 1,
    explanation: 'Range R = (u^2 * sin(2θ)) / g. Maximum range occurs when sin(2θ) = 1, so 2θ = 90° and θ = 45°.'
  },
  {
    id: 'seed_phys_4',
    subject: 'PHYSICS',
    unit: 'Mechanics',
    priority: 5,
    questionText: 'When a body moves in a uniform horizontal circle with speed v, the work done by the centripetal force in one complete revolution is:',
    optionA: '2πr * (mv^2 / r)',
    optionB: 'mv^2 / 2',
    optionC: 'Zero',
    optionD: 'mg * 2πr',
    correctOptionIndex: 2,
    explanation: 'Centripetal force acts radially inward at 90° to the instantaneous tangential displacement. Work W = F * d * cos(90°) = 0 J.'
  },

  // MAT: Mental Agility Test (20 Marks)
  {
    id: 'seed_mat_1',
    subject: 'MAT',
    unit: 'Numerical Reasoning',
    priority: 3,
    questionText: 'Identify the next number in the series: 2, 6, 12, 20, 30, ?',
    optionA: '40',
    optionB: '42',
    optionC: '44',
    optionD: '46',
    correctOptionIndex: 1,
    explanation: 'Differences are +4, +6, +8, +10. Next difference is +12, giving 30 + 12 = 42 (Pattern is n*(n+1): 5*6=30, 6*7=42).'
  },
  {
    id: 'seed_mat_2',
    subject: 'MAT',
    unit: 'Verbal Reasoning',
    priority: 3,
    questionText: 'Select the pair exhibiting the same relationship as CARDIOLOGY : HEART:',
    optionA: 'Pathology : Disease',
    optionB: 'Nephrology : Kidney',
    optionC: 'Hematology : Liver',
    optionD: 'Neurology : Bone',
    correctOptionIndex: 1,
    explanation: 'Cardiology is the medical specialization for the heart, just as Nephrology is the medical specialization for the kidney.'
  },
  {
    id: 'seed_mat_3',
    subject: 'MAT',
    unit: 'Spatial / Abstract Reasoning',
    priority: 3,
    questionText: 'A medical student faces North, turns 90° clockwise, 180° counter-clockwise, and 45° clockwise. What direction is the student facing now?',
    optionA: 'North-East',
    optionB: 'North-West',
    optionC: 'South-East',
    optionD: 'West',
    correctOptionIndex: 1,
    explanation: 'From North (0°): +90° - 180° = -90° (West) + 45° = -45° from North, which is North-West.'
  }
];
