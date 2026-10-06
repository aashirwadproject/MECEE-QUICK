import { SyllabusUnit, SubjectType } from '../types';

export const SUBJECT_INFO: Record<SubjectType, { name: string; marks: number; color: string }> = {
  ZOOLOGY: { name: 'Zoology', marks: 40, color: '#f43f5e' },
  BOTANY: { name: 'Botany', marks: 40, color: '#10b981' },
  CHEMISTRY: { name: 'Chemistry', marks: 50, color: '#a855f7' },
  PHYSICS: { name: 'Physics', marks: 50, color: '#0ea5e9' },
  MAT: { name: 'Mental Agility Test (MAT)', marks: 20, color: '#f59e0b' }
};

export const SYLLABUS_UNITS: SyllabusUnit[] = [
  // Zoology (40 Marks)
  {
    id: 'zoo_human_bio',
    subject: 'ZOOLOGY',
    name: 'Human Biology & Physiology',
    marks: 15,
    priorityLevel: 5,
    priorityFlames: '🔥🔥🔥🔥🔥',
    description: 'Digestive, respiratory, circulatory, excretory, nervous, endocrine, sensory & reproductive systems. Constitutes 37.5% of Zoology!',
    isTopPriority: true
  },
  {
    id: 'zoo_selected_animals',
    subject: 'ZOOLOGY',
    name: 'Study of Selected Animals',
    marks: 6,
    priorityLevel: 4,
    priorityFlames: '🔥🔥🔥🔥',
    description: 'Detailed morphology and anatomy of Earthworm, Frog, Cockroach, and Paramecium/Plasmodium.',
    isTopPriority: true
  },
  {
    id: 'zoo_diversity',
    subject: 'ZOOLOGY',
    name: 'Animal Diversity & Classification',
    marks: 4,
    priorityLevel: 3,
    priorityFlames: '🔥🔥🔥',
    description: 'Protozoa to Chordata taxonomy, diagnostic features, examples and phylogenetic relations.'
  },
  {
    id: 'zoo_tissues',
    subject: 'ZOOLOGY',
    name: 'Animal Tissues & Histology',
    marks: 4,
    priorityLevel: 3,
    priorityFlames: '🔥🔥🔥',
    description: 'Epithelial, connective, muscular, and nervous tissues, junctions and histology.'
  },
  {
    id: 'zoo_diseases',
    subject: 'ZOOLOGY',
    name: 'Microbial Diseases & Immunology',
    marks: 4,
    priorityLevel: 3,
    priorityFlames: '🔥🔥🔥',
    description: 'Bacterial, viral, protozoan and fungal pathogens, innate & adaptive immunity, antibodies.'
  },
  {
    id: 'zoo_evolution',
    subject: 'ZOOLOGY',
    name: 'Evolutionary Biology',
    marks: 3,
    priorityLevel: 2,
    priorityFlames: '🔥🔥',
    description: 'Lamarckism, Darwinism, Modern Synthetic Theory, speciation, human evolution and fossil records.'
  },
  {
    id: 'zoo_medtech',
    subject: 'ZOOLOGY',
    name: 'Medical Technology & Applied Biology',
    marks: 2,
    priorityLevel: 1,
    priorityFlames: '🔥',
    description: 'Biomedical diagnostics, ECG, CT scan, MRI, endoscopy, ELISA, recombinant DNA technology.'
  },
  {
    id: 'zoo_biota',
    subject: 'ZOOLOGY',
    name: 'Biota, Environment & Conservation',
    marks: 2,
    priorityLevel: 1,
    priorityFlames: '🔥',
    description: 'Ecosystems, biogeochemical cycles, wildlife conservation in Nepal, IUCN Red List status.'
  },

  // Botany (40 Marks)
  {
    id: 'bot_biodiversity',
    subject: 'BOTANY',
    name: 'Biodiversity',
    marks: 9,
    priorityLevel: 5,
    priorityFlames: '🔥🔥🔥🔥🔥',
    description: 'Monera, Fungi, Algae, Bryophytes, Pteridophytes, Gymnosperms, and Angiosperm families.',
    isTopPriority: true
  },
  {
    id: 'bot_genetics',
    subject: 'BOTANY',
    name: 'Genetics',
    marks: 6,
    priorityLevel: 4,
    priorityFlames: '🔥🔥🔥🔥',
    description: 'Mendelian genetics, linkage, crossing over, sex determination, mutations, DNA replication.',
    isTopPriority: true
  },
  {
    id: 'bot_physiology',
    subject: 'BOTANY',
    name: 'Plant Physiology',
    marks: 6,
    priorityLevel: 4,
    priorityFlames: '🔥🔥🔥🔥',
    description: 'Photosynthesis (C3, C4, CAM), respiration, transpiration, mineral nutrition, phytohormones.',
    isTopPriority: true
  },
  {
    id: 'bot_cell_bio',
    subject: 'BOTANY',
    name: 'Cell Biology',
    marks: 5,
    priorityLevel: 4,
    priorityFlames: '🔥🔥🔥🔥',
    description: 'Cell structure, organelle functions, membranes, cell division cycle, mitosis, meiosis.'
  },
  {
    id: 'bot_ecology',
    subject: 'BOTANY',
    name: 'Ecology & Vegetation',
    marks: 4,
    priorityLevel: 3,
    priorityFlames: '🔥🔥🔥',
    description: 'Ecological adaptations, food chains, trophic pyramids, succession, biomes of Nepal.'
  },
  {
    id: 'bot_anatomy',
    subject: 'BOTANY',
    name: 'Plant Anatomy',
    marks: 3,
    priorityLevel: 2,
    priorityFlames: '🔥🔥',
    description: 'Meristematic and permanent tissues, primary and anomalous secondary growth in stems and roots.'
  },
  {
    id: 'bot_applied',
    subject: 'BOTANY',
    name: 'Applied Botany',
    marks: 3,
    priorityLevel: 2,
    priorityFlames: '🔥🔥',
    description: 'Plant breeding, tissue culture, medicinal plants of Nepal (Yarsagumba, Chiraito), biofertilizers.'
  },
  {
    id: 'bot_components',
    subject: 'BOTANY',
    name: 'Basic Components of Life',
    marks: 2,
    priorityLevel: 1,
    priorityFlames: '🔥',
    description: 'Carbohydrates, amino acids, proteins, lipids, enzymes kinetics, nucleic acids.'
  },
  {
    id: 'bot_dev',
    subject: 'BOTANY',
    name: 'Developmental Botany',
    marks: 2,
    priorityLevel: 1,
    priorityFlames: '🔥',
    description: 'Microsporogenesis, megasporogenesis, double fertilization, endosperm and embryo development.'
  },

  // Chemistry (50 Marks)
  {
    id: 'chem_physical',
    subject: 'CHEMISTRY',
    name: 'Physical Chemistry',
    marks: 17,
    priorityLevel: 5,
    priorityFlames: '🔥🔥🔥🔥🔥',
    description: 'Mole concept, atomic structure, gas laws, thermodynamics, equilibrium, electrochemistry, kinetics.',
    isTopPriority: true
  },
  {
    id: 'chem_organic',
    subject: 'CHEMISTRY',
    name: 'Organic Chemistry',
    marks: 17,
    priorityLevel: 5,
    priorityFlames: '🔥🔥🔥🔥🔥',
    description: 'Hydrocarbons, haloalkanes, alcohols, aldehydes, ketones, carboxylic acids, amines, polymers.',
    isTopPriority: true
  },
  {
    id: 'chem_inorganic',
    subject: 'CHEMISTRY',
    name: 'Inorganic Chemistry',
    marks: 10,
    priorityLevel: 4,
    priorityFlames: '🔥🔥🔥🔥',
    description: 'Periodic table trends, s, p, d, f block elements, coordination chemistry, chemical bonding.',
    isTopPriority: true
  },
  {
    id: 'chem_applied',
    subject: 'CHEMISTRY',
    name: 'Applied Chemistry',
    marks: 3,
    priorityLevel: 2,
    priorityFlames: '🔥🔥',
    description: 'Pharmaceuticals, dyes, fertilizers, polymers, cement, environmental chemistry pollutants.'
  },
  {
    id: 'chem_analytical',
    subject: 'CHEMISTRY',
    name: 'Analytical Chemistry',
    marks: 3,
    priorityLevel: 2,
    priorityFlames: '🔥🔥',
    description: 'Titrimetric volumetric analysis, qualitative salt analysis, chromatography basics.'
  },

  // Physics (50 Marks)
  {
    id: 'phys_modern',
    subject: 'PHYSICS',
    name: 'Modern Physics',
    marks: 12,
    priorityLevel: 5,
    priorityFlames: '🔥🔥🔥🔥🔥',
    description: 'Photoelectric effect, Bohr atom model, X-rays, radioactivity decay, semiconductors and logic gates.',
    isTopPriority: true
  },
  {
    id: 'phys_mechanics',
    subject: 'PHYSICS',
    name: 'Mechanics',
    marks: 10,
    priorityLevel: 5,
    priorityFlames: '🔥🔥🔥🔥🔥',
    description: 'Vectors, kinematics, Newton laws, work-energy, gravitation, fluid dynamics, elasticity.',
    isTopPriority: true
  },
  {
    id: 'phys_electricity',
    subject: 'PHYSICS',
    name: 'Current Electricity & Magnetism',
    marks: 9,
    priorityLevel: 4,
    priorityFlames: '🔥🔥🔥🔥',
    description: 'Ohm law, Kirchhoff laws, potentiometer, magnetic force, Biot-Savart, electromagnetic induction, AC.',
    isTopPriority: true
  },
  {
    id: 'phys_optics',
    subject: 'PHYSICS',
    name: 'Wave & Optics',
    marks: 8,
    priorityLevel: 4,
    priorityFlames: '🔥🔥🔥🔥',
    description: 'Wave propagation, Doppler effect, refraction, lenses, optical instruments, interference, diffraction.',
    isTopPriority: true
  },
  {
    id: 'phys_thermo',
    subject: 'PHYSICS',
    name: 'Heat & Thermodynamics',
    marks: 7,
    priorityLevel: 3,
    priorityFlames: '🔥🔥🔥',
    description: 'Calorimetry, thermal expansion, kinetic gas theory, 1st and 2nd laws of thermodynamics, Carnot cycle.'
  },
  {
    id: 'phys_electrostatics',
    subject: 'PHYSICS',
    name: 'Electrostatics & Capacitors',
    marks: 4,
    priorityLevel: 2,
    priorityFlames: '🔥🔥',
    description: 'Coulomb law, electric potential, Gauss law, dielectric materials, capacitor combinations.'
  },

  // MAT (20 Marks)
  {
    id: 'mat_verbal',
    subject: 'MAT',
    name: 'Verbal Reasoning',
    marks: 5,
    priorityLevel: 3,
    priorityFlames: '🔥🔥🔥',
    description: 'Analogies, medical vocabulary, syllogisms, comprehension logic, sentence completion.'
  },
  {
    id: 'mat_numerical',
    subject: 'MAT',
    name: 'Numerical Reasoning',
    marks: 5,
    priorityLevel: 3,
    priorityFlames: '🔥🔥🔥',
    description: 'Number patterns, percentages, ratios, speed-distance-time, unitary method, arithmetic logic.'
  },
  {
    id: 'mat_logical',
    subject: 'MAT',
    name: 'Logical Sequencing',
    marks: 5,
    priorityLevel: 3,
    priorityFlames: '🔥🔥🔥',
    description: 'Coding-decoding, direction tests, seating arrangements, sequential ordering, Venn diagrams.'
  },
  {
    id: 'mat_spatial',
    subject: 'MAT',
    name: 'Spatial / Abstract Reasoning',
    marks: 5,
    priorityLevel: 3,
    priorityFlames: '🔥🔥🔥',
    description: 'Geometric series, figure matrices, mirror and water reflections, spatial rotation logic.'
  }
];

export const BIG_PRIORITY_LIST: { name: string; marks: number }[] = [
  { name: 'Human Biology & Physiology', marks: 15 },
  { name: 'Modern Physics', marks: 12 },
  { name: 'Biodiversity', marks: 9 },
  { name: 'Mechanics', marks: 10 },
  { name: 'Physical Chemistry', marks: 17 },
  { name: 'Organic Chemistry', marks: 17 },
  { name: 'Genetics', marks: 6 },
  { name: 'Plant Physiology', marks: 6 },
  { name: 'Study of Selected Animals', marks: 6 },
  { name: 'Current Electricity & Magnetism', marks: 9 },
  { name: 'Wave & Optics', marks: 8 },
  { name: 'Inorganic Chemistry', marks: 10 }
];
