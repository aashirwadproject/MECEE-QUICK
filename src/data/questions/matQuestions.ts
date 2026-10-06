import { Question } from '../../types';

export const MAT_QUESTIONS: Question[] = [
  // =========================================================================
  // UNIT 1: Verbal Reasoning (5 Marks - Priority 3 🔥🔥🔥)
  // =========================================================================
  {
    id: 'mat_verb_1',
    subject: 'MAT',
    unit: 'Verbal Reasoning',
    priority: 3,
    questionText: 'Choose the word pair that exhibits the same relationship as: Ophthalmic : Eye :: Otic : ?',
    optionA: 'Nose',
    optionB: 'Ear',
    optionC: 'Throat',
    optionD: 'Skin',
    correctOptionIndex: 1,
    explanation: 'Ophthalmic refers to the anatomical structures or pathologies of the eye. Similarly, otic pertains specifically to the ear (e.g., otic ganglion, otitis media).'
  },
  {
    id: 'mat_verb_2',
    subject: 'MAT',
    unit: 'Verbal Reasoning',
    priority: 3,
    questionText: 'Select the precise medical antonym for the term: "BRADYCARDIA"',
    optionA: 'Hypertension',
    optionB: 'Tachycardia',
    optionC: 'Dyspnea',
    optionD: 'Arrhythmia',
    correctOptionIndex: 1,
    explanation: 'Bradycardia is an abnormally slow resting heart rate (< 60 bpm). Its direct clinical opposite is tachycardia, which denotes an abnormally rapid resting heart rate (> 100 bpm).'
  },
  {
    id: 'mat_verb_3',
    subject: 'MAT',
    unit: 'Verbal Reasoning',
    priority: 3,
    questionText: 'Select the word that best completes the sentence logically: "Due to the ______ nature of the viral infection, the clinical symptoms emerged with remarkable swiftness, leaving little time for prophylactic intervention."',
    optionA: 'dormant',
    optionB: 'fulminant',
    optionC: 'latent',
    optionD: 'insidious',
    correctOptionIndex: 1,
    explanation: '"Fulminant" describes a disease or infection occurring suddenly and with great severity or rapid progression. Latent and insidious denote slow or stealthy onset.'
  },

  // =========================================================================
  // UNIT 2: Numerical Reasoning (5 Marks - Priority 3 🔥🔥🔥)
  // =========================================================================
  {
    id: 'mat_num_1',
    subject: 'MAT',
    unit: 'Numerical Reasoning',
    priority: 3,
    questionText: 'What is the next number in the arithmetic sequence: 2, 6, 12, 20, 30, 42, ?',
    optionA: '52',
    optionB: '54',
    optionC: '56',
    optionD: '58',
    correctOptionIndex: 2,
    explanation: 'The differences between consecutive terms are increasing consecutive even numbers: +4, +6, +8, +10, +12. Therefore, the next term is 42 + 14 = 56 (also n^2 + n for n = 1, 2, 3...: 7^2 + 7 = 56).'
  },
  {
    id: 'mat_num_2',
    subject: 'MAT',
    unit: 'Numerical Reasoning',
    priority: 3,
    questionText: 'A pharmacist dilutes 200 mL of an 80% alcohol solution with distilled water to obtain a 50% alcohol antiseptic solution. What volume of distilled water must be added?',
    optionA: '80 mL',
    optionB: '120 mL',
    optionC: '150 mL',
    optionD: '100 mL',
    correctOptionIndex: 1,
    explanation: 'Amount of pure alcohol = 200 * 0.80 = 160 mL. In the diluted solution: 160 / (200 + V_water) = 0.50 -> 200 + V_water = 320 -> V_water = 120 mL.'
  },
  {
    id: 'mat_num_3',
    subject: 'MAT',
    unit: 'Numerical Reasoning',
    priority: 3,
    questionText: 'If 6 doctors examine 36 patients in 3 hours, how many patients can 10 doctors examine in 5 hours at the same consultation rate?',
    optionA: '60 patients',
    optionB: '80 patients',
    optionC: '100 patients',
    optionD: '120 patients',
    correctOptionIndex: 2,
    explanation: 'Rate = 36 / (6 * 3) = 2 patients per doctor-hour. For 10 doctors over 5 hours: Total patients = 10 * 5 * 2 = 100 patients.'
  },

  // =========================================================================
  // UNIT 3: Logical Sequencing (5 Marks - Priority 3 🔥🔥🔥)
  // =========================================================================
  {
    id: 'mat_log_1',
    subject: 'MAT',
    unit: 'Logical Sequencing',
    priority: 3,
    questionText: 'In a code language, if MEDICAL is encoded as NFEJDBM, how will SURGERY be encoded in the same cipher?',
    optionA: 'TVSHFSZ',
    optionB: 'TVSISFZ',
    optionC: 'RVRFEQX',
    optionD: 'TVSIESZ',
    correctOptionIndex: 0,
    explanation: 'Each letter is shifted by +1 in alphabetical order: M->N, E->F, D->E, I->J, C->D, A->B, L->M. Applying +1 to SURGERY: S->T, U->V, R->S, G->H, E->F, R->S, Y->Z, yielding TVSHFSZ.'
  },
  {
    id: 'mat_log_2',
    subject: 'MAT',
    unit: 'Logical Sequencing',
    priority: 3,
    questionText: 'Pointing to a portrait of a patient, Dr. Sita said: "Her mother is the only daughter of my mother." How is Dr. Sita related to the patient?',
    optionA: 'Sister',
    optionB: 'Mother',
    optionC: 'Aunt',
    optionD: 'Grandmother',
    correctOptionIndex: 1,
    explanation: '"The only daughter of my mother" (referring to a female speaker, Dr. Sita) is Dr. Sita herself. Therefore, Dr. Sita is the patient mother.'
  },
  {
    id: 'mat_log_3',
    subject: 'MAT',
    unit: 'Logical Sequencing',
    priority: 3,
    questionText: 'Arrange the following clinical events in a logical sequence: 1. Diagnosis, 2. Treatment, 3. Symptoms, 4. Consultation, 5. Recovery.',
    optionA: '3, 4, 1, 2, 5',
    optionB: '4, 3, 1, 2, 5',
    optionC: '3, 1, 4, 2, 5',
    optionD: '1, 3, 4, 2, 5',
    correctOptionIndex: 0,
    explanation: 'A patient first manifests Symptoms (3), leads to physician Consultation (4), enables definitive Diagnosis (1), followed by Treatment (2), leading to full Recovery (5).'
  },

  // =========================================================================
  // UNIT 4: Spatial / Abstract Reasoning (5 Marks - Priority 3 🔥🔥🔥)
  // =========================================================================
  {
    id: 'mat_spat_1',
    subject: 'MAT',
    unit: 'Spatial / Abstract Reasoning',
    priority: 3,
    questionText: 'A standard die has faces numbered 1 through 6 such that opposite faces sum to 7. If face 4 is on the top and face 2 is facing north, what number is on the bottom face?',
    optionA: '1',
    optionB: '3',
    optionC: '5',
    optionD: '6',
    correctOptionIndex: 1,
    explanation: 'On a standard die, opposite faces always sum to 7. The face opposite to top (4) is 7 - 4 = 3 on the bottom.'
  },
  {
    id: 'mat_spat_2',
    subject: 'MAT',
    unit: 'Spatial / Abstract Reasoning',
    priority: 3,
    questionText: 'A clock shows 3:15. What is the angle between the hour hand and the minute hand?',
    optionA: '0°',
    optionB: '7.5°',
    optionC: '15°',
    optionD: '22.5°',
    correctOptionIndex: 1,
    explanation: 'At 3:00, the hour hand is at 90°. In 15 minutes, the hour hand moves 15 * 0.5° = 7.5° past the 3 mark. The minute hand is precisely at the 3 mark (90°). Thus, the angle between them is 7.5°.'
  }
];
