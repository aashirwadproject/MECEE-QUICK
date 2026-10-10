import { Question } from '../types';
import { SEED_QUESTIONS } from './seedQuestions';

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
  // ================= CEE PAST YEAR PAPERS (MOCKS 1 - 10) =================
  {
    id: 'mock_1',
    mockNumber: 1,
    title: 'MECEE Grand Mock 01 (Official CEE 2024 Past Year Question Paper)',
    source: 'Medical Education Commission (MEC) CEE 2024 Official Entrance Examination',
    series: 'CEE Past Year Papers',
    difficulty: 'Past Paper Standard',
    description: 'Complete 200-question authentic synthesis of the CEE 2024 MBBS entrance examination with official marks distribution.',
    tags: ['CEE 2024 Past Paper', 'Official Past Questions', 'MEC 2024', 'High-Yield']
  },
  {
    id: 'mock_2',
    mockNumber: 2,
    title: 'MECEE Grand Mock 02 (Official CEE 2023 Past Year Question Paper)',
    source: 'Medical Education Commission (MEC) CEE 2023 Official Entrance Examination',
    series: 'CEE Past Year Papers',
    difficulty: 'Past Paper Standard',
    description: 'Actual memory recalls and authenticated questions from CEE 2023 across all 32 medical syllabus units.',
    tags: ['CEE 2023 Past Paper', 'Official Past Questions', 'MEC 2023', 'High-Yield']
  },
  {
    id: 'mock_3',
    mockNumber: 3,
    title: 'MECEE Grand Mock 03 (Official CEE 2022 Past Year Question Paper)',
    source: 'Medical Education Commission (MEC) CEE 2022 Official Entrance Examination',
    series: 'CEE Past Year Papers',
    difficulty: 'Past Paper Standard',
    description: 'Standard CEE 2022 medical entrance paper featuring high-frequency questions in organic mechanisms and human physiology.',
    tags: ['CEE 2022 Past Paper', 'Official Past Questions', 'MEC 2022', 'High-Yield']
  },
  {
    id: 'mock_4',
    mockNumber: 4,
    title: 'MECEE Grand Mock 04 (Official CEE 2021 Past Year Question Paper)',
    source: 'Medical Education Commission (MEC) CEE 2021 Official Entrance Examination',
    series: 'CEE Past Year Papers',
    difficulty: 'Past Paper Standard',
    description: 'Inaugural common entrance paper CEE 2021 with foundational physics numerical problems and biodiversity.',
    tags: ['CEE 2021 Past Paper', 'Official Past Questions', 'MEC 2021', 'High-Yield']
  },
  {
    id: 'mock_5',
    mockNumber: 5,
    title: 'MECEE Grand Mock 05 (Official CEE 2020 Past Year Question Paper)',
    source: 'Medical Education Commission (MEC) CEE 2020 Baseline Entrance Exam',
    series: 'CEE Past Year Papers',
    difficulty: 'Past Paper Standard',
    description: 'First official unified common medical entrance test paper with essential high-weightage question pool.',
    tags: ['CEE 2020 Past Paper', 'Official Past Questions', 'MEC 2020', 'High-Yield']
  },
  {
    id: 'mock_6',
    mockNumber: 6,
    title: 'MECEE Grand Mock 06 (IOM Maharajgunj MBBS Past Questions Archive)',
    source: 'Institute of Medicine (IOM) Maharajgunj Past Papers Archive (2015-2020)',
    series: 'Institute Past Paper Archive',
    difficulty: 'Challenging',
    description: 'Legendary tough questions from IOM Maharajgunj entrance examinations with high-level conceptual physics and genetics.',
    tags: ['IOM Maharajgunj', 'Past Papers', 'High Yield', 'Challenging']
  },
  {
    id: 'mock_7',
    mockNumber: 7,
    title: 'MECEE Grand Mock 07 (BPKIHS Dharan MBBS Past Questions Archive)',
    source: 'BP Koirala Institute of Health Sciences (BPKIHS) Dharan Past Papers',
    series: 'Institute Past Paper Archive',
    difficulty: 'High-Yield',
    description: 'Clinical application oriented questions mirroring BPKIHS Dharan MBBS entrance patterns and reason-assertion styles.',
    tags: ['BPKIHS Dharan', 'Past Papers', 'Clinical Orientation', 'High-Yield']
  },
  {
    id: 'mock_8',
    mockNumber: 8,
    title: 'MECEE Grand Mock 08 (Kathmandu University KU KUSMS Past Papers Archive)',
    source: 'Kathmandu University School of Medical Sciences (KUSMS) Past Papers',
    series: 'Institute Past Paper Archive',
    difficulty: 'Moderate',
    description: 'Thorough coverage of NCERT and HSEB curriculum with fundamental physics and chemistry numerical problems from KU exams.',
    tags: ['KU KUSMS', 'Past Papers', 'Numerical Focus']
  },
  {
    id: 'mock_9',
    mockNumber: 9,
    title: 'MECEE Grand Mock 09 (Patan Academy PAHS Medical Past Questions Synthesis)',
    source: 'Patan Academy of Health Sciences (PAHS) Past Entrance Papers',
    series: 'Institute Past Paper Archive',
    difficulty: 'Moderate',
    description: 'Special emphasis on public health epidemiology, bacteriology, and environmental biota questions.',
    tags: ['PAHS Patan', 'Past Papers', 'Community Medicine']
  },
  {
    id: 'mock_10',
    mockNumber: 10,
    title: 'MECEE Grand Mock 10 (Ministry of Education MOE Nepal Scholarship Past Exam)',
    source: 'Ministry of Education (MOE) Nepal Past Scholarship Examination Papers',
    series: 'Institute Past Paper Archive',
    difficulty: 'High-Yield',
    description: 'Focuses on core high-weightage topics across physical chemistry stoichiometry, wave optics, and mechanics.',
    tags: ['MOE Scholarship', 'Past Papers', 'High-Yield']
  },

  // ================= HIGHLY EFFICIENT ONLINE MOCKS (MOCKS 11 - 20) =================
  {
    id: 'mock_11',
    mockNumber: 11,
    title: 'MECEE Grand Mock 11 (NAME Online Grand CBT Mega Mock 01 - High Efficiency)',
    source: 'NAME Institute Online Medical Entrance CBT Portal Test 01',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'High-efficiency online CBT mock calibrated with real-time test analytics and negative marking risk management.',
    tags: ['Online CBT', 'High-Efficiency', 'NAME Online', 'Mega Mock']
  },
  {
    id: 'mock_12',
    mockNumber: 12,
    title: 'MECEE Grand Mock 12 (Vibrant Online MBBS CBT Ultra Mock 01 - High Efficiency)',
    source: 'Vibrant MBBS Online Preparation CBT System Grand Test 01',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'Deep focus on human physiology and plant biodiversity with tricky MAT sequencing questions from Vibrant CBT.',
    tags: ['Online CBT', 'High-Efficiency', 'Vibrant Online', 'Ultra Mock']
  },
  {
    id: 'mock_13',
    mockNumber: 13,
    title: 'MECEE Grand Mock 13 (Meditech Pre-CEE Online National Drill 01 - High Efficiency)',
    source: 'Meditech Online Educational Council Pre-CEE National Examination 01',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'Balanced full-length test designed for speed building, time-per-question optimization, and maximum exam efficiency.',
    tags: ['Online CBT', 'High-Efficiency', 'Meditech Online', 'Speed Drill']
  },
  {
    id: 'mock_14',
    mockNumber: 14,
    title: 'MECEE Grand Mock 14 (Apex Online Medical Simulator 01 - High Efficiency)',
    source: 'Apex Medical Preparation Online National Mock Platform',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Moderate',
    description: 'Emphasizes numerical reasoning speed and physical chemistry gas laws and equilibrium with online analytics.',
    tags: ['Online CBT', 'High-Efficiency', 'Apex Online', 'Simulator']
  },
  {
    id: 'mock_15',
    mockNumber: 15,
    title: 'MECEE Grand Mock 15 (Orbit Online MBBS Examination 01 - High Efficiency)',
    source: 'Orbit Medical Online Entrance CBT Test Bank 01',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'High-yield questions curated for rapid concept recall in modern physics and plant physiology.',
    tags: ['Online CBT', 'High-Efficiency', 'Orbit Online']
  },
  {
    id: 'mock_16',
    mockNumber: 16,
    title: 'MECEE Grand Mock 16 (Medical Wing Online Live Mock Series 01 - High Efficiency)',
    source: 'All Nepal Pre-Medical Online Live Mock Competition',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Challenging',
    description: 'Rigorous national-level simulation testing stamina with advanced reasoning problems.',
    tags: ['Online CBT', 'High-Efficiency', 'Live Mock']
  },
  {
    id: 'mock_17',
    mockNumber: 17,
    title: 'MECEE Grand Mock 17 (NAME Online Grand CBT Mega Mock 02 - High Efficiency)',
    source: 'NAME Institute Online Medical Entrance CBT Portal Test 02',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Challenging',
    description: 'Intense electrostatics, wave optics, and organic conversions mirroring top institute weekly tests.',
    tags: ['Online CBT', 'High-Efficiency', 'NAME Online']
  },
  {
    id: 'mock_18',
    mockNumber: 18,
    title: 'MECEE Grand Mock 18 (Vibrant Online MBBS CBT Ultra Mock 02 - High Efficiency)',
    source: 'Vibrant MBBS Online Preparation CBT System Grand Test 02',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'Comprehensive coverage of organic reaction mechanisms and animal tissues histology.',
    tags: ['Online CBT', 'High-Efficiency', 'Vibrant Online']
  },
  {
    id: 'mock_19',
    mockNumber: 19,
    title: 'MECEE Grand Mock 19 (Meditech Pre-CEE Online National Drill 02 - High Efficiency)',
    source: 'Meditech Online Pre-CEE National Examination 02',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Moderate',
    description: 'Speed and accuracy drill designed to minimize negative penalty traps in MAT and chemistry.',
    tags: ['Online CBT', 'High-Efficiency', 'Meditech Online']
  },
  {
    id: 'mock_20',
    mockNumber: 20,
    title: 'MECEE Grand Mock 20 (CEE Top Rankers Online Speed & Accuracy Mock - High Efficiency)',
    source: 'CEE Open-Source Aspirant Community Compilation & Top Rankers',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'Curated by top-ranked medical students with high-yield repeated questions from recent online mocks.',
    tags: ['Online CBT', 'High-Efficiency', 'Rankers Mock', 'Golden 200']
  },

  // ================= INTEGRATED PAST & ONLINE HIGH-YIELD MOCKS (MOCKS 21 - 50) =================
  {
    id: 'mock_21',
    mockNumber: 21,
    title: 'MECEE Grand Mock 21 (IOM Maharajgunj Decennial Special Past Synthesis)',
    source: 'IOM 10-Year Entrance Questions High-Frequency Bank',
    series: 'Institute Past Paper Archive',
    difficulty: 'Challenging',
    description: 'Master synthesis of the most frequently asked questions across 10 years of IOM MBBS entrance exams.',
    tags: ['IOM Past Papers', 'Decennial Special', 'Challenging']
  },
  {
    id: 'mock_22',
    mockNumber: 22,
    title: 'MECEE Grand Mock 22 (BPKIHS Dharan Clinical Reason-Assertion Past Drill)',
    source: 'BPKIHS Medical Faculty Model Bank',
    series: 'Institute Past Paper Archive',
    difficulty: 'High-Yield',
    description: 'Heavy emphasis on reason-assertion and clinical scenario questions characteristic of BPKIHS exams.',
    tags: ['BPKIHS Dharan', 'Reason-Assertion', 'Clinical']
  },
  {
    id: 'mock_23',
    mockNumber: 23,
    title: 'MECEE Grand Mock 23 (KU School of Medical Sciences Numerical Past Focus)',
    source: 'Kathmandu University Model Examination Paper B',
    series: 'Institute Past Paper Archive',
    difficulty: 'Moderate',
    description: 'Focuses on numerical accuracy in physical chemistry stoichiometry and mechanics problem solving.',
    tags: ['KU KUSMS', 'Numerical Focus']
  },
  {
    id: 'mock_24',
    mockNumber: 24,
    title: 'MECEE Grand Mock 24 (NAME Online Grand CBT Mega Mock 03 - High Efficiency)',
    source: 'NAME Institute Online Medical Entrance CBT Portal Test 03',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'Extensive test of modern physics de Broglie relations, Bohr model, and radioactivity with online CBT timing.',
    tags: ['Online CBT', 'High-Efficiency', 'NAME Online']
  },
  {
    id: 'mock_25',
    mockNumber: 25,
    title: 'MECEE Grand Mock 25 (Vibrant Online MBBS CBT Ultra Mock 03 - High Efficiency)',
    source: 'Vibrant MBBS Online Preparation CBT System Grand Test 03',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'Plant water relations, photosynthesis dark reactions, and biological diversity priority units.',
    tags: ['Online CBT', 'High-Efficiency', 'Vibrant Online']
  },
  {
    id: 'mock_26',
    mockNumber: 26,
    title: 'MECEE Grand Mock 26 (Meditech Online Speed Sprint 03 - High Efficiency)',
    source: 'Meditech Educational Council Speed Series 03',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Moderate',
    description: 'Sprint simulation built to train candidates in answering 200 questions within the 180-minute window.',
    tags: ['Online CBT', 'High-Efficiency', 'Meditech Online']
  },
  {
    id: 'mock_27',
    mockNumber: 27,
    title: 'MECEE Grand Mock 27 (Nepal Medical Association Model Test)',
    source: 'Nepal Medical Association Junior Doctors Forum Paper',
    series: 'All-Nepal Model Series',
    difficulty: 'High-Yield',
    description: 'Curated by newly licensed medical doctors targeting high-probability 2027 syllabus topics.',
    tags: ['NMA Model', 'High-Yield']
  },
  {
    id: 'mock_28',
    mockNumber: 28,
    title: 'MECEE Grand Mock 28 (Kathmandu Model College KMC Medical Test)',
    source: 'KMC Pre-Medical Department Annual Model Paper',
    series: 'All-Nepal Model Series',
    difficulty: 'Moderate',
    description: 'Balanced test covering fundamental concepts of optics, thermodynamics, and organic functional groups.',
    tags: ['KMC Model', 'Fundamentals']
  },
  {
    id: 'mock_29',
    mockNumber: 29,
    title: 'MECEE Grand Mock 29 (St. Xavier Pre-Med Association Test)',
    source: 'St. Xavier College Pre-Medical Alumni Council Paper',
    series: 'All-Nepal Model Series',
    difficulty: 'Challenging',
    description: 'Conceptual and analytical depth in mechanics, coordination chemistry, and genetics.',
    tags: ['St. Xavier', 'Analytical']
  },
  {
    id: 'mock_30',
    mockNumber: 30,
    title: 'MECEE Grand Mock 30 (NAME Online Grand CBT Mega Mock 04 - High Efficiency)',
    source: 'NAME Institute Online Medical Entrance CBT Portal Test 04',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'High-speed drill covering periodic properties, coordination compounds, and MAT verbal reasoning.',
    tags: ['Online CBT', 'High-Efficiency', 'NAME Online']
  },
  {
    id: 'mock_31',
    mockNumber: 31,
    title: 'MECEE Grand Mock 31 (Vibrant Online MBBS CBT Ultra Mock 04 - High Efficiency)',
    source: 'Vibrant MBBS Online Preparation CBT System Grand Test 04',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'Cardiovascular system, excretory counter-current mechanisms, and endocrine feedback loops.',
    tags: ['Online CBT', 'High-Efficiency', 'Vibrant Online']
  },
  {
    id: 'mock_32',
    mockNumber: 32,
    title: 'MECEE Grand Mock 32 (Pokhara Academy of Health Sciences Test)',
    source: 'PoAHS Medical Entrance Simulation Board',
    series: 'Regional Academy Series',
    difficulty: 'Moderate',
    description: 'Designed to mirror provincial examination patterns with balanced difficulty across all subjects.',
    tags: ['PoAHS', 'Regional Mock']
  },
  {
    id: 'mock_33',
    mockNumber: 33,
    title: 'MECEE Grand Mock 33 (Karnali Academy KAHS Remote Area Quota Drill)',
    source: 'Karnali Academy of Health Sciences Model Paper',
    series: 'Regional Academy Series',
    difficulty: 'Moderate',
    description: 'Thorough assessment of fundamental science concepts and health science awareness questions.',
    tags: ['KAHS', 'Quota Drill']
  },
  {
    id: 'mock_34',
    mockNumber: 34,
    title: 'MECEE Grand Mock 34 (Manipal College of Medical Sciences MCOMS Test)',
    source: 'MCOMS Pokhara Pre-Entrance Examination Paper',
    series: 'Affiliated College Series',
    difficulty: 'High-Yield',
    description: 'High-yield medical entrance test featuring clinical vignettes and physiological pharmacology basics.',
    tags: ['MCOMS', 'High-Yield']
  },
  {
    id: 'mock_35',
    mockNumber: 35,
    title: 'MECEE Grand Mock 35 (Chitwan Medical College CMC Entrance Drill)',
    source: 'CMC Bharatpur Medical Entrance Committee Paper',
    series: 'Affiliated College Series',
    difficulty: 'High-Yield',
    description: 'Rigorous physical and organic chemistry questions combined with human anatomy and cell biology.',
    tags: ['CMC Chitwan', 'High-Yield']
  },
  {
    id: 'mock_36',
    mockNumber: 36,
    title: 'MECEE Grand Mock 36 (Nepalgunj Medical College NGMC Model Test)',
    source: 'NGMC Kohalpur Medical Entrance Board Paper',
    series: 'Affiliated College Series',
    difficulty: 'Moderate',
    description: 'Balanced full-length test emphasizing speed building in MAT problem solving and basic physics.',
    tags: ['NGMC', 'Speed Test']
  },
  {
    id: 'mock_37',
    mockNumber: 37,
    title: 'MECEE Grand Mock 37 (Nobel Medical College Biratnagar Test)',
    source: 'Nobel Medical College Entrance Preparation Wing Paper',
    series: 'Affiliated College Series',
    difficulty: 'Moderate',
    description: 'Standard MECEE blueprint test designed for comprehensive revision across botany and zoology.',
    tags: ['Nobel Medical', 'Revision']
  },
  {
    id: 'mock_38',
    mockNumber: 38,
    title: 'MECEE Grand Mock 38 (Lumbini Medical College LMC Palpa Mock)',
    source: 'LMC Palpa Pre-Medical Test Series Paper',
    series: 'Affiliated College Series',
    difficulty: 'High-Yield',
    description: 'Focused on genetics dihybrid ratios, evolutionary mechanisms, and modern physics radiation.',
    tags: ['LMC Palpa', 'Genetics & Physics']
  },
  {
    id: 'mock_39',
    mockNumber: 39,
    title: 'MECEE Grand Mock 39 (NAME Online Grand CBT Mega Mock 05 - High Efficiency)',
    source: 'NAME Institute Online Medical Entrance CBT Portal Test 05',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Challenging',
    description: 'Simulates the toughest percentile-determining questions in organic synthesis and rotational dynamics.',
    tags: ['Online CBT', 'High-Efficiency', 'NAME Online', 'Top Percentile']
  },
  {
    id: 'mock_40',
    mockNumber: 40,
    title: 'MECEE Grand Mock 40 (Vibrant Online MBBS CBT Ultra Mock 05 - High Efficiency)',
    source: 'Vibrant MBBS Online Preparation CBT System Grand Test 05',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Challenging',
    description: 'Comprehensive test covering entire syllabus with difficult numerical problems in current electricity.',
    tags: ['Online CBT', 'High-Efficiency', 'Vibrant Online', 'Challenging']
  },
  {
    id: 'mock_41',
    mockNumber: 41,
    title: 'MECEE Grand Mock 41 (Universal College UCMS Bhairahawa Mock)',
    source: 'UCMS Bhairahawa Entrance Committee Standard Paper',
    series: 'Affiliated College Series',
    difficulty: 'High-Yield',
    description: 'Carefully balanced test adhering strictly to the official marks allocation per subject.',
    tags: ['UCMS', 'Standard Blueprint']
  },
  {
    id: 'mock_42',
    mockNumber: 42,
    title: 'MECEE Grand Mock 42 (Gandaki Medical College GMC Pokhara Test)',
    source: 'GMC Pokhara Academic Council Paper',
    series: 'Affiliated College Series',
    difficulty: 'Moderate',
    description: 'Covers plant morphology, embryology, and equilibrium constant thermodynamics problems.',
    tags: ['GMC Pokhara', 'Thermodynamics']
  },
  {
    id: 'mock_43',
    mockNumber: 43,
    title: 'MECEE Grand Mock 43 (KIST Medical College Lalitpur Paper)',
    source: 'KIST Medical College Entrance Examination Board',
    series: 'Valley College Series',
    difficulty: 'High-Yield',
    description: 'Emphasizes neurological pathways, sensory organs, and wave optics interference patterns.',
    tags: ['KIST', 'Neurology & Optics']
  },
  {
    id: 'mock_44',
    mockNumber: 44,
    title: 'MECEE Grand Mock 44 (Nepal Medical College NMCTH Jorpati Mock)',
    source: 'NMCTH Pre-Medical Examination Division',
    series: 'Valley College Series',
    difficulty: 'High-Yield',
    description: 'Features comprehensive review questions across biochemistry, biomolecules, and organic named reactions.',
    tags: ['NMCTH', 'Biochemistry']
  },
  {
    id: 'mock_45',
    mockNumber: 45,
    title: 'MECEE Grand Mock 45 (Kathmandu National Medical College Mock)',
    source: 'National Medical Entrance Resource Bank',
    series: 'Valley College Series',
    difficulty: 'Moderate',
    description: 'Standardized full-length simulation for final confidence building and pacing practice.',
    tags: ['KNMC', 'Full Simulation']
  },
  {
    id: 'mock_46',
    mockNumber: 46,
    title: 'MECEE Grand Mock 46 (Online Pre-CEE All Nepal Mega Mock Finale 01 - High Efficiency)',
    source: 'Combined All Nepal Medical Entrance Coaching Forum CBT',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Challenging',
    description: 'First of the five supreme final revision tests curated by national faculty toppers for maximum efficiency.',
    tags: ['Online CBT', 'High-Efficiency', 'Mega Finale']
  },
  {
    id: 'mock_47',
    mockNumber: 47,
    title: 'MECEE Grand Mock 47 (Online Pre-CEE All Nepal Mega Mock Finale 02 - High Efficiency)',
    source: 'Combined All Nepal Medical Entrance Coaching Forum CBT',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Challenging',
    description: 'Second supreme finale test with maximum weightage on high-yield human physiology and organic chemistry.',
    tags: ['Online CBT', 'High-Efficiency', 'Mega Finale']
  },
  {
    id: 'mock_48',
    mockNumber: 48,
    title: 'MECEE Grand Mock 48 (Online Pre-CEE All Nepal Mega Mock Finale 03 - High Efficiency)',
    source: 'Combined All Nepal Medical Entrance Coaching Forum CBT',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'Challenging',
    description: 'Third supreme finale test featuring high-precision numericals and critical MAT decision-making scenarios.',
    tags: ['Online CBT', 'High-Efficiency', 'Mega Finale']
  },
  {
    id: 'mock_49',
    mockNumber: 49,
    title: 'MECEE Grand Mock 49 (MEC Official 2027 Pre-Board Rank Predictor)',
    source: 'National Pre-Board Committee Standard Blueprint 2027',
    series: 'CEE Past Year Papers',
    difficulty: 'High-Yield',
    description: 'Comprehensive high-yield paper calibrated to predict percentile ranking in MECEE-BL 2027.',
    tags: ['Rank Predictor', 'Pre-Board', 'CEE 2027 Standard']
  },
  {
    id: 'mock_50',
    mockNumber: 50,
    title: 'MECEE Grand Mock 50 (The Ultimate CEE MBBS 2027 Finale Test - High Efficiency)',
    source: 'Consortium of Top Medical Entrance Tutors, Past Toppers & Online CBT',
    series: 'Highly Efficient Online Mocks',
    difficulty: 'High-Yield',
    description: 'The definitive 200-question master test synthesizing all 32 units for final revision before the official exam.',
    tags: ['Master Finale', 'Online CBT', 'High-Efficiency', 'Top 200 Highest Yield']
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

function getStem(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 45);
}

// Generates the official 200 questions for Mock #N
export function getMockTestQuestions(mockNumber: number, allQuestions?: any[]): Question[] {
  const pool = (allQuestions && allQuestions.length >= 200) ? allQuestions : SEED_QUESTIONS;
  const seed = mockNumber * 7919 + 104729;

  // Filter subject pools
  const zooPool = pool.filter(q => q.subject === 'ZOOLOGY');
  const botPool = pool.filter(q => q.subject === 'BOTANY');
  const chemPool = pool.filter(q => q.subject === 'CHEMISTRY');
  const physPool = pool.filter(q => q.subject === 'PHYSICS');
  const matPool = pool.filter(q => q.subject === 'MAT');

  const seenIds = new Set<string>();
  const seenStems = new Set<string>();
  const combined: Question[] = [];

  const pickSubject = (subPool: Question[], targetCount: number, seedOffset: number) => {
    const shuffled = shuffleWithSeed(subPool, seed + seedOffset);
    let count = 0;
    // Pass 1: Strict ID and stem uniqueness
    for (const q of shuffled) {
      if (count >= targetCount) break;
      const stem = getStem(q.questionText);
      if (!seenIds.has(q.id) && !seenStems.has(stem)) {
        seenIds.add(q.id);
        seenStems.add(stem);
        combined.push(q);
        count++;
      }
    }
    // Pass 2: Fallback on ID uniqueness if stem was overly strict
    if (count < targetCount) {
      for (const q of shuffled) {
        if (count >= targetCount) break;
        if (!seenIds.has(q.id)) {
          seenIds.add(q.id);
          combined.push(q);
          count++;
        }
      }
    }
  };

  // Official MECEE-BL Pattern: 40 Zoology, 40 Botany, 50 Chemistry, 50 Physics, 20 MAT = 200
  pickSubject(zooPool, 40, 101);
  pickSubject(botPool, 40, 202);
  pickSubject(chemPool, 50, 303);
  pickSubject(physPool, 50, 404);
  pickSubject(matPool, 20, 505);

  // Safety fill if any subject pool was short
  if (combined.length < 200) {
    const remaining = pool.filter(q => !seenIds.has(q.id));
    const extras = shuffleWithSeed(remaining, seed + 999);
    for (const extra of extras) {
      if (combined.length >= 200) break;
      if (!seenIds.has(extra.id)) {
        seenIds.add(extra.id);
        combined.push(extra);
      }
    }
  }

  return combined.slice(0, 200);
}

// Generates the official 200 questions for the Daily Mock Test based on date + version offset
export function getDailyMockQuestions(dateStr: string, version: number, allQuestions?: any[]): Question[] {
  const pool = (allQuestions && allQuestions.length >= 200) ? allQuestions : SEED_QUESTIONS;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const dateSeed = Math.abs(hash);
  const seed = dateSeed + (version * 8831) + 54321;

  const zooPool = pool.filter(q => q.subject === 'ZOOLOGY');
  const botPool = pool.filter(q => q.subject === 'BOTANY');
  const chemPool = pool.filter(q => q.subject === 'CHEMISTRY');
  const physPool = pool.filter(q => q.subject === 'PHYSICS');
  const matPool = pool.filter(q => q.subject === 'MAT');

  const seenIds = new Set<string>();
  const seenStems = new Set<string>();
  const combined: Question[] = [];

  const pickSubject = (subPool: Question[], targetCount: number, seedOffset: number) => {
    const shuffled = shuffleWithSeed(subPool, seed + seedOffset);
    let count = 0;
    for (const q of shuffled) {
      if (count >= targetCount) break;
      const stem = getStem(q.questionText);
      if (!seenIds.has(q.id) && !seenStems.has(stem)) {
        seenIds.add(q.id);
        seenStems.add(stem);
        combined.push(q);
        count++;
      }
    }
    if (count < targetCount) {
      for (const q of shuffled) {
        if (count >= targetCount) break;
        if (!seenIds.has(q.id)) {
          seenIds.add(q.id);
          combined.push(q);
          count++;
        }
      }
    }
  };

  pickSubject(zooPool, 40, 111);
  pickSubject(botPool, 40, 222);
  pickSubject(chemPool, 50, 333);
  pickSubject(physPool, 50, 444);
  pickSubject(matPool, 20, 555);

  if (combined.length < 200) {
    const remaining = pool.filter(q => !seenIds.has(q.id));
    const extras = shuffleWithSeed(remaining, seed + 999);
    for (const extra of extras) {
      if (combined.length >= 200) break;
      if (!seenIds.has(extra.id)) {
        seenIds.add(extra.id);
        combined.push(extra);
      }
    }
  }

  return combined.slice(0, 200);
}
