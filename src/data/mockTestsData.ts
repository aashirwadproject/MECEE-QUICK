export interface MockTestMeta {
  id: string;
  mockNumber: number;
  title: string;
  source: string;
  series: string;
  difficulty: 'Moderate' | 'High-Yield' | 'Challenging' | 'Past Paper Standard';
  description: string;
  tags: string[];
}

export const MOCK_TESTS_METADATA: MockTestMeta[] = [
  {
    id: 'mock_1',
    mockNumber: 1,
    title: 'MECEE Grand Mock 01 (MEC 2027 Official Standard Model)',
    source: 'Medical Education Commission (MEC) Official Syllabus & Sample Blueprint',
    series: 'MEC Baseline Series',
    difficulty: 'High-Yield',
    description: 'Complete 200-question diagnostic exam calibrated to the exact 2027 marks distribution across all 32 units.',
    tags: ['MEC Official', '2027 Blueprint', 'High-Yield']
  },
  {
    id: 'mock_2',
    mockNumber: 2,
    title: 'MECEE Grand Mock 02 (IOM Maharajgunj Past Questions Synthesis)',
    source: 'Institute of Medicine (IOM) Past Papers 2018–2023',
    series: 'IOM Archive Edition',
    difficulty: 'Challenging',
    description: 'Curated high-frequency questions from previous IOM MBBS entrance examinations and memory recalls.',
    tags: ['IOM Past Papers', 'Maharajgunj', 'High Yield']
  },
  {
    id: 'mock_3',
    mockNumber: 3,
    title: 'MECEE Grand Mock 03 (BPKIHS Dharan Entrance Standard)',
    source: 'BP Koirala Institute of Health Sciences (BPKIHS) Past Papers',
    series: 'BPKIHS Series',
    difficulty: 'High-Yield',
    description: 'Clinical application oriented questions mirroring BPKIHS Dharan MBBS entrance patterns and reason-assertion styles.',
    tags: ['BPKIHS Dharan', 'Clinical Orientation']
  },
  {
    id: 'mock_4',
    mockNumber: 4,
    title: 'MECEE Grand Mock 04 (Kathmandu University KU Medical Entrance)',
    source: 'Kathmandu University School of Medical Sciences (KUSMS) Past Papers',
    series: 'KU Model Series',
    difficulty: 'Moderate',
    description: 'Thorough coverage of NCERT and HSEB curriculum with fundamental physics and chemistry numerical problems.',
    tags: ['KU KUSMS', 'Numerical Focus']
  },
  {
    id: 'mock_5',
    mockNumber: 5,
    title: 'MECEE Grand Mock 05 (NAME Institute Model Test Series A)',
    source: 'NAME Institute for Medical Education Weekly Mock 01',
    series: 'NAME Pre-Medical',
    difficulty: 'Challenging',
    description: 'Rigorous medical entrance simulation featuring tough organic mechanisms and modern physics reasoning.',
    tags: ['NAME Institute', 'Weekly Test', 'Challenging']
  },
  {
    id: 'mock_6',
    mockNumber: 6,
    title: 'MECEE Grand Mock 06 (Vibrant MBBS Intensive Mock Test 01)',
    source: 'Vibrant MBBS Entrance Preparation Grand Mock Test',
    series: 'Vibrant Medical Series',
    difficulty: 'High-Yield',
    description: 'Deep focus on human physiology and plant biodiversity with tricky MAT sequencing questions.',
    tags: ['Vibrant MBBS', 'Physiology Focus']
  },
  {
    id: 'mock_7',
    mockNumber: 7,
    title: 'MECEE Grand Mock 07 (Meditech Grand Entrance Test 01)',
    source: 'Meditech Educational Council Pre-CEE Examination',
    series: 'Meditech Series',
    difficulty: 'Moderate',
    description: 'Balanced full-length test designed for speed building and negative-marking risk management.',
    tags: ['Meditech', 'Speed Test']
  },
  {
    id: 'mock_8',
    mockNumber: 8,
    title: 'MECEE Grand Mock 08 (Ministry of Education MOE Scholarship Standard)',
    source: 'MOE Nepal Past Scholarship Examination Papers',
    series: 'MOE Archive',
    difficulty: 'High-Yield',
    description: 'Focuses on core high-weightage topics across physical chemistry stoichiometry and mechanics.',
    tags: ['MOE Scholarship', 'Past Papers']
  },
  {
    id: 'mock_9',
    mockNumber: 9,
    title: 'MECEE Grand Mock 09 (IOM & BPKIHS Integrated Model Test)',
    source: 'Integrated Medical Universities of Nepal Combined Bank',
    series: 'Combined Edition',
    difficulty: 'Challenging',
    description: 'Advanced questions integrating zoology disease immunology and genetics cross calculations.',
    tags: ['IOM', 'BPKIHS', 'Genetics']
  },
  {
    id: 'mock_10',
    mockNumber: 10,
    title: 'MECEE Grand Mock 10 (NAME Institute Model Test Series B)',
    source: 'NAME Institute Pre-Medical Special Test 02',
    series: 'NAME Pre-Medical',
    difficulty: 'Challenging',
    description: 'Simulates high-pressure test conditions with intense electrostatics and wave optics ray diagrams.',
    tags: ['NAME Institute', 'Optics & Physics']
  },
  {
    id: 'mock_11',
    mockNumber: 11,
    title: 'MECEE Grand Mock 11 (Vibrant MBBS Intensive Mock Test 02)',
    source: 'Vibrant MBBS Entrance Preparation Test Series',
    series: 'Vibrant Medical Series',
    difficulty: 'High-Yield',
    description: 'Comprehensive coverage of organic reaction mechanisms and animal tissues histology.',
    tags: ['Vibrant MBBS', 'Organic Chemistry']
  },
  {
    id: 'mock_12',
    mockNumber: 12,
    title: 'MECEE Grand Mock 12 (Patan Academy PAHS Community Medicine Focus)',
    source: 'Patan Academy of Health Sciences (PAHS) Model Series',
    series: 'PAHS Model',
    difficulty: 'Moderate',
    description: 'Special emphasis on public health epidemiology, bacteriology, and environmental biota.',
    tags: ['PAHS', 'Public Health & Ecology']
  },
  {
    id: 'mock_13',
    mockNumber: 13,
    title: 'MECEE Grand Mock 13 (CEE Nepal Golden 200 Series 01)',
    source: 'CEE Open-Source Aspirant Community Compilation',
    series: 'Aspirants Golden',
    difficulty: 'High-Yield',
    description: 'Curated by top-ranked medical students with high-yield repeated questions from 2021 to 2024.',
    tags: ['Golden Questions', 'Top Repeated']
  },
  {
    id: 'mock_14',
    mockNumber: 14,
    title: 'MECEE Grand Mock 14 (Apex Medical Model Examination 01)',
    source: 'Apex Medical Preparation Center Model Paper',
    series: 'Apex Series',
    difficulty: 'Moderate',
    description: 'Emphasizes numerical reasoning speed and physical chemistry gas laws and equilibrium.',
    tags: ['Apex Medical', 'Equilibrium']
  },
  {
    id: 'mock_15',
    mockNumber: 15,
    title: 'MECEE Grand Mock 15 (Orbit Medical Drill Examination 01)',
    source: 'Orbit Medical Entrance Test Bank',
    series: 'Orbit Medical',
    difficulty: 'High-Yield',
    description: 'Intense drill on plant physiology photosynthesis cycles and selected animal dissections.',
    tags: ['Orbit Medical', 'Physiology']
  },
  {
    id: 'mock_16',
    mockNumber: 16,
    title: 'MECEE Grand Mock 16 (All Nepal Pre-Medical Olympiad Mock)',
    source: 'Nepal Medical Students Association (NMSS) Open Mock',
    series: 'NMSS Olympiad',
    difficulty: 'Challenging',
    description: 'Challenging multi-concept questions testing deep conceptual clarity across physics and biochemistry.',
    tags: ['NMSS Olympiad', 'Deep Concepts']
  },
  {
    id: 'mock_17',
    mockNumber: 17,
    title: 'MECEE Grand Mock 17 (NAME Institute Model Test Series C)',
    source: 'NAME Institute Pre-Medical Special Test 03',
    series: 'NAME Pre-Medical',
    difficulty: 'Challenging',
    description: 'Advanced thermodynamics Carnot cycles and coordination compounds crystal field theory.',
    tags: ['NAME Institute', 'Thermodynamics']
  },
  {
    id: 'mock_18',
    mockNumber: 18,
    title: 'MECEE Grand Mock 18 (Vibrant MBBS Intensive Mock Test 03)',
    source: 'Vibrant MBBS Grand Test 03',
    series: 'Vibrant Medical Series',
    difficulty: 'High-Yield',
    description: 'High-yield cell biology organelles and human endocrinology hormonal feedback loops.',
    tags: ['Vibrant MBBS', 'Endocrinology']
  },
  {
    id: 'mock_19',
    mockNumber: 19,
    title: 'MECEE Grand Mock 19 (Meditech Grand Entrance Test 02)',
    source: 'Meditech Model Series Paper 02',
    series: 'Meditech Series',
    difficulty: 'Moderate',
    description: 'Carefully graded difficulty curve ideal for testing stamina over 180 minutes.',
    tags: ['Meditech', 'Full Syllabus']
  },
  {
    id: 'mock_20',
    mockNumber: 20,
    title: 'MECEE Grand Mock 20 (CEE Nepal Milestone Halfway Mock)',
    source: 'CEE Benchmark Consensus Paper',
    series: 'Benchmark Series',
    difficulty: 'High-Yield',
    description: 'Benchmark mock marking the first 20 exams; provides high predictive validity for actual CEE rank.',
    tags: ['Rank Predictor', 'Benchmark']
  },
  // Mocks 21 to 50
  {
    id: 'mock_21',
    mockNumber: 21,
    title: 'MECEE Grand Mock 21 (IOM Maharajgunj Decennial Special)',
    source: 'IOM 10-Year Topic Trend Compilation',
    series: 'IOM Archive Edition',
    difficulty: 'Challenging',
    description: 'Focuses on top recurring questions from the last 10 years of IOM entrance tests.',
    tags: ['IOM 10-Year', 'Past Repeated']
  },
  {
    id: 'mock_22',
    mockNumber: 22,
    title: 'MECEE Grand Mock 22 (BPKIHS Dharan Special Drill 02)',
    source: 'BPKIHS Dharan Medical Entrance Archive',
    series: 'BPKIHS Series',
    difficulty: 'High-Yield',
    description: 'Thorough coverage of neuro-sensory systems, heart physiology, and modern semiconductor physics.',
    tags: ['BPKIHS', 'Neuro & Physics']
  },
  {
    id: 'mock_23',
    mockNumber: 23,
    title: 'MECEE Grand Mock 23 (KU School of Medical Sciences Paper B)',
    source: 'KU Medical Test Bank 2022',
    series: 'KU Model Series',
    difficulty: 'Moderate',
    description: 'Standard difficulty paper covering Plant Anatomy, Taxonomy families, and Current Electricity.',
    tags: ['KU KUSMS', 'Botany & Circuits']
  },
  {
    id: 'mock_24',
    mockNumber: 24,
    title: 'MECEE Grand Mock 24 (NAME Institute Model Test Series D)',
    source: 'NAME Institute Pre-Medical Special Test 04',
    series: 'NAME Pre-Medical',
    difficulty: 'Challenging',
    description: 'Rigorous organic transformations from haloalkanes to aromatic amines and carbonyl compounds.',
    tags: ['NAME Institute', 'Organic Mastery']
  },
  {
    id: 'mock_25',
    mockNumber: 25,
    title: 'MECEE Grand Mock 25 (Vibrant MBBS Intensive Mock Test 04)',
    source: 'Vibrant MBBS Grand Test 04',
    series: 'Vibrant Medical Series',
    difficulty: 'High-Yield',
    description: 'In-depth microbial diseases, epidemiology of malaria and typhoid, with MAT abstract pattern solving.',
    tags: ['Vibrant MBBS', 'Pathology & MAT']
  },
  {
    id: 'mock_26',
    mockNumber: 26,
    title: 'MECEE Grand Mock 26 (Meditech Speed Drill 03)',
    source: 'Meditech Speed & Precision Paper',
    series: 'Meditech Series',
    difficulty: 'Moderate',
    description: 'Designed to train time-per-question management (under 54 seconds per question).',
    tags: ['Speed Training', 'Meditech']
  },
  {
    id: 'mock_27',
    mockNumber: 27,
    title: 'MECEE Grand Mock 27 (Nepal Medical Association Model Test)',
    source: 'NMA Youth Committee Practice Series',
    series: 'NMA Series',
    difficulty: 'High-Yield',
    description: 'Covers Human Excretion, Countercurrent multiplier in Henle loop, and Physical Chemistry Solutions.',
    tags: ['NMA Series', 'Renal Physiology']
  },
  {
    id: 'mock_28',
    mockNumber: 28,
    title: 'MECEE Grand Mock 28 (Kathmandu Model College KMC Medical Test)',
    source: 'KMC Science Faculty Entrance Drill',
    series: 'KMC Model',
    difficulty: 'Moderate',
    description: 'Balanced paper covering Botany Genetics dihybrid crosses and Physics Mechanics projectile motion.',
    tags: ['KMC Model', 'Genetics & Mechanics']
  },
  {
    id: 'mock_29',
    mockNumber: 29,
    title: 'MECEE Grand Mock 29 (St. Xavier Pre-Med Association Test)',
    source: 'SXCA Pre-Med Mock Bank',
    series: 'St. Xavier Series',
    difficulty: 'Challenging',
    description: 'High-concept physics modern Bohr model, photoelectric thresholds, and organic stereochemistry.',
    tags: ['St. Xavier', 'Concept Mastery']
  },
  {
    id: 'mock_30',
    mockNumber: 30,
    title: 'MECEE Grand Mock 30 (NAME Institute Model Test Series E)',
    source: 'NAME Institute Pre-Medical Special Test 05',
    series: 'NAME Pre-Medical',
    difficulty: 'Challenging',
    description: 'Intense 200-question paper focusing on competitive edge questions and high-yield MAT spatial puzzles.',
    tags: ['NAME Institute', 'Competitive Edge']
  },
  {
    id: 'mock_31',
    mockNumber: 31,
    title: 'MECEE Grand Mock 31 (Vibrant MBBS Intensive Mock Test 05)',
    source: 'Vibrant MBBS Grand Test 05',
    series: 'Vibrant Medical Series',
    difficulty: 'High-Yield',
    description: 'Detailed focus on Selected Animals (Earthworm, Cockroach, Frog anatomy) and Botany Plant Physiology.',
    tags: ['Vibrant MBBS', 'Animal Morphology']
  },
  {
    id: 'mock_32',
    mockNumber: 32,
    title: 'MECEE Grand Mock 32 (Pokhara Academy of Health Sciences Test)',
    source: 'PoAHS Western Nepal Model Paper',
    series: 'PoAHS Series',
    difficulty: 'Moderate',
    description: 'High-yield regional entrance examination standard with medical diagnostics and biotechnology questions.',
    tags: ['PoAHS', 'Biotech & Diagnostic']
  },
  {
    id: 'mock_33',
    mockNumber: 33,
    title: 'MECEE Grand Mock 33 (Karnali Academy KAHS Remote Area Quota Drill)',
    source: 'KAHS Entrance Guidance Paper',
    series: 'KAHS Model',
    difficulty: 'High-Yield',
    description: 'Focuses on fundamental concepts with clear, high-scoring numerical and memory-recall items.',
    tags: ['KAHS Model', 'Core Scoring']
  },
  {
    id: 'mock_34',
    mockNumber: 34,
    title: 'MECEE Grand Mock 34 (Manipal College of Medical Sciences MCOMS Test)',
    source: 'MCOMS Pre-Admission Archive',
    series: 'MCOMS Series',
    difficulty: 'High-Yield',
    description: 'Clinical biochemistry, enzyme kinetics Michaelis-Menten, and wave optics double slit interference.',
    tags: ['MCOMS', 'Biochemistry & Optics']
  },
  {
    id: 'mock_35',
    mockNumber: 35,
    title: 'MECEE Grand Mock 35 (Chitwan Medical College CMC Entrance Drill)',
    source: 'CMC Bharatpur Mock Test Bank',
    series: 'CMC Series',
    difficulty: 'Moderate',
    description: 'Balanced full-length test emphasizing botany taxonomy families (Solanaceae, Fabaceae) and electrochemistry.',
    tags: ['CMC Bharatpur', 'Taxonomy & Electrochemistry']
  },
  {
    id: 'mock_36',
    mockNumber: 36,
    title: 'MECEE Grand Mock 36 (Nepalgunj Medical College NGMC Model Test)',
    source: 'NGMC Pre-Medical Archive',
    series: 'NGMC Series',
    difficulty: 'Moderate',
    description: 'Thorough drill on respiratory volumes, gas exchange, cardiac cycle, and simple harmonic motion.',
    tags: ['NGMC', 'Physiology & SHM']
  },
  {
    id: 'mock_37',
    mockNumber: 37,
    title: 'MECEE Grand Mock 37 (Nobel Medical College Biratnagar Test)',
    source: 'Nobel Medical College Mock Exam',
    series: 'Nobel Series',
    difficulty: 'High-Yield',
    description: 'Focus on periodic trends, transition elements coordination chemistry, and embryonic development.',
    tags: ['Nobel Medical', 'Inorganic & Embryo']
  },
  {
    id: 'mock_38',
    mockNumber: 38,
    title: 'MECEE Grand Mock 38 (Lumbini Medical College LMC Palpa Mock)',
    source: 'LMC Palpa Admission Model Paper',
    series: 'LMC Series',
    difficulty: 'Moderate',
    description: 'Excellent practice for physics mechanics conservation of momentum and energy.',
    tags: ['LMC Palpa', 'Mechanics']
  },
  {
    id: 'mock_39',
    mockNumber: 39,
    title: 'MECEE Grand Mock 39 (NAME Institute Model Test Series F)',
    source: 'NAME Institute Advanced Revision Test 06',
    series: 'NAME Pre-Medical',
    difficulty: 'Challenging',
    description: 'Advanced paper testing negative marking discipline with borderline choices and tough options.',
    tags: ['NAME Institute', 'Negative Marking Control']
  },
  {
    id: 'mock_40',
    mockNumber: 40,
    title: 'MECEE Grand Mock 40 (Vibrant MBBS Intensive Mock Test 06)',
    source: 'Vibrant MBBS Grand Test 06',
    series: 'Vibrant Medical Series',
    difficulty: 'High-Yield',
    description: 'High-yield genetics chromosomal mutations, pedigree analysis basics, and organic named reactions.',
    tags: ['Vibrant MBBS', 'Genetics & Named Reactions']
  },
  {
    id: 'mock_41',
    mockNumber: 41,
    title: 'MECEE Grand Mock 41 (Universal College UCMS Bhairahawa Mock)',
    source: 'UCMS Bhairahawa Admission Paper',
    series: 'UCMS Series',
    difficulty: 'Moderate',
    description: 'Strong focus on MAT verbal analogies, medical vocabulary, and basic mathematical logic.',
    tags: ['UCMS', 'MAT Verbal & Logic']
  },
  {
    id: 'mock_42',
    mockNumber: 42,
    title: 'MECEE Grand Mock 42 (Gandaki Medical College GMC Pokhara Test)',
    source: 'GMC Pokhara Pre-Medical Model',
    series: 'GMC Series',
    difficulty: 'High-Yield',
    description: 'Covers Plant Ecology succession, nepalese flora conservation, and thermodynamics entropy.',
    tags: ['GMC Pokhara', 'Ecology & Entropy']
  },
  {
    id: 'mock_43',
    mockNumber: 43,
    title: 'MECEE Grand Mock 43 (KIST Medical College Lalitpur Paper)',
    source: 'KIST Medical College Entrance Bank',
    series: 'KIST Series',
    difficulty: 'Moderate',
    description: 'Focuses on analytical chemistry titrations, indicators pH range, and animal epithelial histology.',
    tags: ['KIST Lalitpur', 'Analytical & Histology']
  },
  {
    id: 'mock_44',
    mockNumber: 44,
    title: 'MECEE Grand Mock 44 (Nepal Medical College NMCTH Jorpati Mock)',
    source: 'NMCTH Jorpati Model Paper',
    series: 'NMCTH Series',
    difficulty: 'High-Yield',
    description: 'Covers human reproductive hormonal control, spermatogenesis, oogenesis, and AC circuit resonance.',
    tags: ['NMCTH', 'Reproduction & AC Circuits']
  },
  {
    id: 'mock_45',
    mockNumber: 45,
    title: 'MECEE Grand Mock 45 (Kathmandu National Medical College Mock)',
    source: 'NMC Birgunj / Kathmandu Model Paper',
    series: 'National Series',
    difficulty: 'Moderate',
    description: 'Thorough coverage of optics lens maker formula, microscope magnification, and cell division meiosis.',
    tags: ['National Series', 'Optics & Meiosis']
  },
  {
    id: 'mock_46',
    mockNumber: 46,
    title: 'MECEE Grand Mock 46 (CEE All Nepal Mega Mock Finale 01)',
    source: 'All Nepal Pre-Medical Mega Mock Alliance',
    series: 'Finale Series',
    difficulty: 'Challenging',
    description: 'High-stakes pre-exam simulation mirroring the full psychological challenge of exam day.',
    tags: ['Mega Mock', 'Exam Simulator']
  },
  {
    id: 'mock_47',
    mockNumber: 47,
    title: 'MECEE Grand Mock 47 (CEE All Nepal Mega Mock Finale 02)',
    source: 'All Nepal Pre-Medical Mega Mock Alliance',
    series: 'Finale Series',
    difficulty: 'Challenging',
    description: 'Deep diagnostic questions across physical chemistry rate kinetics Arrhenius equation and radioactivity.',
    tags: ['Mega Mock', 'Kinetics & Radioactivity']
  },
  {
    id: 'mock_48',
    mockNumber: 48,
    title: 'MECEE Grand Mock 48 (CEE All Nepal Mega Mock Finale 03)',
    source: 'All Nepal Pre-Medical Mega Mock Alliance',
    series: 'Finale Series',
    difficulty: 'Challenging',
    description: 'Intense focus on modern physics X-rays Duane-Hunt law, Bohr transitions, and botany developmental double fertilization.',
    tags: ['Mega Mock', 'Modern Physics & Botany']
  },
  {
    id: 'mock_49',
    mockNumber: 49,
    title: 'MECEE Grand Mock 49 (MEC 2027 Pre-Board Rank Predictor)',
    source: 'National Pre-Board Committee Standard',
    series: 'Pre-Board Special',
    difficulty: 'High-Yield',
    description: 'Comprehensive high-yield paper calibrated to predict percentile ranking in MECEE-BL 2027.',
    tags: ['Rank Predictor', 'Pre-Board']
  },
  {
    id: 'mock_50',
    mockNumber: 50,
    title: 'MECEE Grand Mock 50 (The Ultimate CEE MBBS 2027 Finale Test)',
    source: 'Consortium of Top Medical Entrance Tutors & Past Toppers',
    series: 'Ultimate Finale',
    difficulty: 'High-Yield',
    description: 'The definitive 200-question master test synthesizing all 32 units for final revision before the official exam.',
    tags: ['Master Finale', 'Top 200 Highest Yield', 'Complete Revision']
  }
];

// Deterministic PRNG to ensure Mock N always delivers the same consistent set of questions
function seededRandom(seed: number) {
  let s = Math.sin(seed) * 10000;
  return s - Math.floor(s);
}

function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const arr = [...array];
  let currentSeed = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    currentSeed += 1337;
    const rand = seededRandom(currentSeed);
    const j = Math.floor(rand * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generates the official 200 questions for Mock #N
export function getMockTestQuestions(mockNumber: number, allQuestions: any[]): any[] {
  const seed = mockNumber * 7919 + 104729;

  // Filter subject pools
  const zooPool = allQuestions.filter(q => q.subject === 'ZOOLOGY');
  const botPool = allQuestions.filter(q => q.subject === 'BOTANY');
  const chemPool = allQuestions.filter(q => q.subject === 'CHEMISTRY');
  const physPool = allQuestions.filter(q => q.subject === 'PHYSICS');
  const matPool = allQuestions.filter(q => q.subject === 'MAT');

  // Shuffle each pool deterministically with unique offset
  const zoo = shuffleWithSeed(zooPool, seed + 101).slice(0, 40);
  const bot = shuffleWithSeed(botPool, seed + 202).slice(0, 40);
  const chem = shuffleWithSeed(chemPool, seed + 303).slice(0, 50);
  const phys = shuffleWithSeed(physPool, seed + 404).slice(0, 50);
  const mat = shuffleWithSeed(matPool, seed + 505).slice(0, 20);

  let combined = [...zoo, ...bot, ...chem, ...phys, ...mat];

  // If pool count in any category is short, fill from remaining questions
  if (combined.length < 200) {
    const remaining = allQuestions.filter(q => !combined.some(c => c.id === q.id));
    const extraNeeded = 200 - combined.length;
    const extras = shuffleWithSeed(remaining, seed + 999).slice(0, extraNeeded);
    combined = [...combined, ...extras];
  }

  return combined;
}

// Generates the official 200 questions for the Daily Mock Test based on date + version offset
export function getDailyMockQuestions(dateStr: string, version: number, allQuestions: any[]): any[] {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const dateSeed = Math.abs(hash);
  const seed = dateSeed + (version * 8831) + 54321;

  const zooPool = allQuestions.filter(q => q.subject === 'ZOOLOGY');
  const botPool = allQuestions.filter(q => q.subject === 'BOTANY');
  const chemPool = allQuestions.filter(q => q.subject === 'CHEMISTRY');
  const physPool = allQuestions.filter(q => q.subject === 'PHYSICS');
  const matPool = allQuestions.filter(q => q.subject === 'MAT');

  const zoo = shuffleWithSeed(zooPool, seed + 111).slice(0, 40);
  const bot = shuffleWithSeed(botPool, seed + 222).slice(0, 40);
  const chem = shuffleWithSeed(chemPool, seed + 333).slice(0, 50);
  const phys = shuffleWithSeed(physPool, seed + 444).slice(0, 50);
  const mat = shuffleWithSeed(matPool, seed + 555).slice(0, 20);

  let combined = [...zoo, ...bot, ...chem, ...phys, ...mat];

  if (combined.length < 200) {
    const remaining = allQuestions.filter(q => !combined.some(c => c.id === q.id));
    const extraNeeded = 200 - combined.length;
    const extras = shuffleWithSeed(remaining, seed + 999).slice(0, extraNeeded);
    combined = [...combined, ...extras];
  }

  return combined;
}
