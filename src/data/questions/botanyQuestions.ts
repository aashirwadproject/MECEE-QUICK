import { Question } from '../../types';

export const BOTANY_QUESTIONS: Question[] = [
  // =========================================================================
  // UNIT 1: Biodiversity (9 Marks - Priority 5 🔥🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'bot_bio_1',
    subject: 'BOTANY',
    unit: 'Biodiversity',
    priority: 5,
    questionText: 'Which characteristic feature of Gymnosperms distinguishes them from Angiosperms?',
    optionA: 'Presence of vessels in xylem',
    optionB: 'Naked seeds not enclosed within an ovary wall / fruit',
    optionC: 'Triploid endosperm formed after fertilization',
    optionD: 'Presence of flowers with sepals and petals',
    correctOptionIndex: 1,
    explanation: 'Gymnosperms (gymnos = naked, sperma = seed) possess naked ovules borne directly on megasporophylls without an enclosing ovary wall; thus, after fertilization, seeds remain uncovered without true fruit formation.'
  },
  {
    id: 'bot_bio_2',
    subject: 'BOTANY',
    unit: 'Biodiversity',
    priority: 5,
    questionText: 'In Pinus, the female gametophyte (endosperm) represents a:',
    optionA: 'Triploid (3n) tissue formed after double fertilization',
    optionB: 'Haploid (n) pre-fertilization tissue',
    optionC: 'Diploid (2n) tissue',
    optionD: 'Tetraploid (4n) tissue',
    correctOptionIndex: 1,
    explanation: 'In gymnosperms, the endosperm develops directly from the functional haploid megaspore prior to fertilization, functioning as the female gametophyte, and is therefore haploid (n), unlike Angiosperms where it is triploid (3n).'
  },
  {
    id: 'bot_bio_3',
    subject: 'BOTANY',
    unit: 'Biodiversity',
    priority: 5,
    questionText: 'Coralloid roots of Cycas exhibit a symbiotic association with which nitrogen-fixing cyanobacteria?',
    optionA: 'Rhizobium leguminosarum',
    optionB: 'Anabaena cycadae and Nostoc punctiforme',
    optionC: 'Spirulina and Chlorella',
    optionD: 'Clostridium pasteurianum',
    correctOptionIndex: 1,
    explanation: 'Dichotomously branched apogeotropic coralloid roots of Cycas contain a distinct blue-green algal zone in the middle cortex containing symbiotic nitrogen-fixing cyanobacteria (Anabaena cycadae and Nostoc punctiforme).'
  },
  {
    id: 'bot_bio_4',
    subject: 'BOTANY',
    unit: 'Biodiversity',
    priority: 5,
    questionText: 'Puccinia graminis tritici is an obligate heteroecious macrocyclic rust fungus. Its primary and alternate hosts are:',
    optionA: 'Wheat and Mustard',
    optionB: 'Wheat (primary) and Barberry (alternate)',
    optionC: 'Barberry (primary) and Wheat (alternate)',
    optionD: 'Wheat and Maize',
    correctOptionIndex: 1,
    explanation: 'Puccinia graminis produces urediniospores and teliospores on its primary cereal host (Wheat / Triticum aestivum), while pycniospores and aeciospores develop on its alternate barberry host (Berberis vulgaris).'
  },
  {
    id: 'bot_bio_5',
    subject: 'BOTANY',
    unit: 'Biodiversity',
    priority: 5,
    questionText: 'In Bryophytes (such as Funaria and Marchantia), the dominant independent photosynthesizing generation is the:',
    optionA: 'Sporophyte',
    optionB: 'Gametophyte',
    optionC: 'Protonema only',
    optionD: 'Capsule',
    correctOptionIndex: 1,
    explanation: 'Bryophytes are unique among land plants in possessing a dominant, free-living, haploid gametophyte phase. The diploid sporophyte is short-lived, nutritionally dependent, and physically attached to the gametophyte.'
  },
  {
    id: 'bot_bio_6',
    subject: 'BOTANY',
    unit: 'Biodiversity',
    priority: 5,
    questionText: 'Which algae is a colonial motile green alga belonging to Volvocales possessing cytoplasmic strands and coenobium?',
    optionA: 'Chlamydomonas',
    optionB: 'Volvox',
    optionC: 'Spirogyra',
    optionD: 'Chara',
    correctOptionIndex: 1,
    explanation: 'Volvox forms spherical or ovoid hollow colonies called coenobia containing up to thousands of biflagellate cells connected by cytoplasmic strands. It exhibits advanced oogamous sexual reproduction.'
  },
  {
    id: 'bot_bio_7',
    subject: 'BOTANY',
    unit: 'Biodiversity',
    priority: 5,
    questionText: 'Which family of Angiosperms is characterized by bicarpellary syncarpous superior ovary with an obliquely placed septum and swollen axile placenta?',
    optionA: 'Fabaceae',
    optionB: 'Solanaceae',
    optionC: 'Poaceae',
    optionD: 'Brassicaceae',
    correctOptionIndex: 1,
    explanation: 'Solanaceae (potato/nightshade family) is diagnostically recognized by bicarpellary, syncarpous, superior ovaries with an obliquely oriented septum, swollen axile placenta bearing numerous ovules, and persistent calyx.'
  },

  // =========================================================================
  // UNIT 2: Genetics (6 Marks - Priority 4 🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'bot_gen_1',
    subject: 'BOTANY',
    unit: 'Genetics',
    priority: 4,
    questionText: 'In a dihybrid cross involving independent assortment, what is the expected phenotypic ratio among F2 progeny?',
    optionA: '3 : 1',
    optionB: '9 : 3 : 3 : 1',
    optionC: '1 : 2 : 1',
    optionD: '9 : 7',
    correctOptionIndex: 1,
    explanation: 'According to Mendel Law of Independent Assortment, two pairs of alleles segregate independently during gametogenesis, resulting in a classical 9:3:3:1 phenotypic ratio (9 both dominant, 3 first dominant/second recessive, 3 first recessive/second dominant, 1 double recessive).'
  },
  {
    id: 'bot_gen_2',
    subject: 'BOTANY',
    unit: 'Genetics',
    priority: 4,
    questionText: 'Incomplete dominance in Mirabilis jalapa (four o clock plant) produces pink flowers upon crossing red (RR) and white (rr). The F2 phenotypic and genotypic ratio is:',
    optionA: '3 : 1 for both',
    optionB: '1 : 2 : 1 for both phenotypic and genotypic ratios',
    optionC: '9 : 3 : 3 : 1',
    optionD: '2 : 1 : 1',
    correctOptionIndex: 1,
    explanation: 'In incomplete dominance, neither allele is completely dominant over the other. The F1 heterozygote (Rr) is intermediate (pink). In F2, genotypes 1 RR : 2 Rr : 1 rr correspond precisely to 1 Red : 2 Pink : 1 White phenotypes (1:2:1).'
  },
  {
    id: 'bot_gen_3',
    subject: 'BOTANY',
    unit: 'Genetics',
    priority: 4,
    questionText: 'The Okazaki fragments synthesized on the lagging strand during DNA replication are joined covalently by:',
    optionA: 'DNA Polymerase I',
    optionB: 'DNA Ligase',
    optionC: 'DNA Helicase',
    optionD: 'RNA Primase',
    correctOptionIndex: 1,
    explanation: 'DNA Ligase catalyzes the formation of a phosphodiester bond between the 3-hydroxyl end of one Okazaki fragment and the 5-phosphate end of the adjacent fragment after RNA primers are excised and filled by DNA polymerase I.'
  },
  {
    id: 'bot_gen_4',
    subject: 'BOTANY',
    unit: 'Genetics',
    priority: 4,
    questionText: 'The genetic code is degenerate because:',
    optionA: 'One codon codes for more than one amino acid',
    optionB: 'More than one codon can specify the same amino acid',
    optionC: 'Codons overlap during translation',
    optionD: 'The third nucleotide is always identical',
    correctOptionIndex: 1,
    explanation: 'Degeneracy of the genetic code refers to the fact that 61 sense codons specify 20 standard amino acids; consequently, most amino acids are coded by multiple synonymous codons (often differing at the wobble 3rd base).'
  },

  // =========================================================================
  // UNIT 3: Plant Physiology (6 Marks - Priority 4 🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'bot_phys_1',
    subject: 'BOTANY',
    unit: 'Plant Physiology',
    priority: 4,
    questionText: 'The primary CO2 acceptor in C4 plants (such as Zea mays and sugarcane) located in mesophyll chloroplasts is:',
    optionA: 'Ribulose-1,5-bisphosphate (RuBP)',
    optionB: 'Phosphoenolpyruvate (PEP)',
    optionC: 'Oxaloacetate (OAA)',
    optionD: '3-Phosphoglycerate (3-PGA)',
    correctOptionIndex: 1,
    explanation: 'In C4 plants, PEP carboxylase fixes atmospheric CO2 onto 3-carbon phosphoenolpyruvate (PEP) in mesophyll cells to form the initial 4-carbon acid oxaloacetate (OAA). RuBP acts as the CO2 acceptor inside bundle sheath chloroplasts where Rubisco operates.'
  },
  {
    id: 'bot_phys_2',
    subject: 'BOTANY',
    unit: 'Plant Physiology',
    priority: 4,
    questionText: 'Kranz anatomy, characterized by wreath-like rings of chloroplast-dense bundle sheath cells, is an anatomical adaptation found in:',
    optionA: 'C3 plants',
    optionB: 'C4 plants',
    optionC: 'CAM plants',
    optionD: 'Submerged hydrophytes',
    correctOptionIndex: 1,
    explanation: 'Kranz anatomy is unique to C4 plants (maize, sorghum, sugarcane). Large bundle sheath cells with agranal chloroplasts encircle vascular bundles to concentrate CO2 around Rubisco, effectively abolishing photorespiration.'
  },
  {
    id: 'bot_phys_3',
    subject: 'BOTANY',
    unit: 'Plant Physiology',
    priority: 4,
    questionText: 'In aerobic cellular respiration, the net yield of ATP synthesized per molecule of glucose oxidized via complete glycolysis, Krebs cycle, and oxidative phosphorylation is approximately:',
    optionA: '2 ATP',
    optionB: '30 to 32 ATP',
    optionC: '48 ATP',
    optionD: '64 ATP',
    correctOptionIndex: 1,
    explanation: 'Under modern P/O ratios (2.5 ATP per NADH, 1.5 ATP per FADH2), complete aerobic oxidation of 1 mol of glucose produces 30 to 32 ATP depending on whether the glycerol-3-phosphate or malate-aspartate shuttle transfers cytosolic NADH electrons.'
  },
  {
    id: 'bot_phys_4',
    subject: 'BOTANY',
    unit: 'Plant Physiology',
    priority: 4,
    questionText: 'Which phytohormone is gaseous in nature and promotes apical senescence, abscission, and rapid climacteric fruit ripening?',
    optionA: 'Indole-3-acetic acid (IAA)',
    optionB: 'Ethylene (C2H4)',
    optionC: 'Gibberellic acid (GA3)',
    optionD: 'Abscisic acid (ABA)',
    correctOptionIndex: 1,
    explanation: 'Ethylene is the only volatile gaseous plant hormone. It stimulates climacteric fruit ripening (by inducing amylases, pectinases, and cellular respiration), leaf and flower senescence, and abscission zone formation.'
  },

  // =========================================================================
  // UNIT 4: Cell Biology (5 Marks - Priority 4 🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'bot_cell_1',
    subject: 'BOTANY',
    unit: 'Cell Biology',
    priority: 4,
    questionText: 'According to the Singer and Nicolson Fluid Mosaic Model (1972), the biological plasma membrane consists of:',
    optionA: 'A continuous outer protein layer and inner lipid core',
    optionB: 'A quasi-fluid phospholipid bilayer in which globular proteins are embedded like icebergs in a lipid sea',
    optionC: 'Alternating sandwiches of lipid and cellulose',
    optionD: 'Static rigid glycoprotein sheets',
    correctOptionIndex: 1,
    explanation: 'The Fluid Mosaic Model depicts the membrane as a dynamic, viscous two-dimensional liquid consisting of an amphipathic phospholipid bilayer with peripheral and integral (transmembrane) proteins capable of lateral diffusion.'
  },
  {
    id: 'bot_cell_2',
    subject: 'BOTANY',
    unit: 'Cell Biology',
    priority: 4,
    questionText: 'Recombination nodules and crossing-over between non-sister chromatids of homologous chromosomes take place during which sub-stage of Prophase I of Meiosis?',
    optionA: 'Leptotene',
    optionB: 'Pachytene',
    optionC: 'Diplotene',
    optionD: 'Diakinesis',
    correctOptionIndex: 1,
    explanation: 'During Pachytene, the synaptonemal complex is fully formed between paired homologous bivalents, and the enzyme recombinase mediates reciprocal exchange of non-sister chromatid genetic material (crossing over).'
  },
  {
    id: 'bot_cell_3',
    subject: 'BOTANY',
    unit: 'Cell Biology',
    priority: 4,
    questionText: 'The eukaryotic 80S ribosome dissociates into which two ribonucleoprotein subunits?',
    optionA: '50S and 30S',
    optionB: '60S and 40S',
    optionC: '50S and 40S',
    optionD: '70S and 30S',
    correctOptionIndex: 1,
    explanation: 'Eukaryotic cytoplasmic 80S ribosomes dissociate in low Mg2+ concentrations into a large 60S subunit (containing 28S, 5.8S, 5S rRNAs and approx. 49 proteins) and a small 40S subunit (containing 18S rRNA and approx. 33 proteins).'
  },

  // =========================================================================
  // UNIT 5: Ecology & Vegetation (4 Marks - Priority 3 🔥🔥🔥)
  // =========================================================================
  {
    id: 'bot_eco_1',
    subject: 'BOTANY',
    unit: 'Ecology & Vegetation',
    priority: 3,
    questionText: 'An inverted ecological pyramid of biomass is characteristically observed in which ecosystem?',
    optionA: 'Temperate grassland',
    optionB: 'Open ocean / aquatic marine ecosystem',
    optionC: 'Tropical rainforest',
    optionD: 'Desert shrubland',
    correctOptionIndex: 1,
    explanation: 'In open aquatic marine ecosystems, microscopic phytoplankton have extremely rapid turnover rates and low standing biomass at any single moment, yet support a far greater standing crop of zooplankton and predatory fish, resulting in an inverted biomass pyramid.'
  },
  {
    id: 'bot_eco_2',
    subject: 'BOTANY',
    unit: 'Ecology & Vegetation',
    priority: 3,
    questionText: 'Rhizophora and other mangrove halophytes growing in salt marshes exhibit which specialized breathing root adaptation?',
    optionA: 'Haustoria',
    optionB: 'Pneumatophores (respiratory roots with lenticels)',
    optionC: 'Stilt roots only',
    optionD: 'Epiphytic velamen',
    correctOptionIndex: 1,
    explanation: 'Pneumatophores are negatively geotropic roots that grow vertically upward out of waterlogged, anaerobic salt-marsh soils, possessing open lenticels/pneumathodes for atmospheric oxygen exchange.'
  },

  // =========================================================================
  // UNIT 6: Plant Anatomy (3 Marks - Priority 2 🔥🔥)
  // =========================================================================
  {
    id: 'bot_anat_1',
    subject: 'BOTANY',
    unit: 'Plant Anatomy',
    priority: 2,
    questionText: 'Casparian strips containing suberin and lignin are characteristic anatomical features found in the radial and transverse walls of:',
    optionA: 'Hypodermis',
    optionB: 'Endodermis of roots',
    optionC: 'Pericycle',
    optionD: 'Pith ray parenchyma',
    correctOptionIndex: 1,
    explanation: 'Casparian strips in root endodermal cells block the apoplastic diffusion pathway of water and dissolved minerals, forcing radial water movement through the selectively permeable symplast into the vascular cylinder.'
  },
  {
    id: 'bot_anat_2',
    subject: 'BOTANY',
    unit: 'Plant Anatomy',
    priority: 2,
    questionText: 'A monocot stem differs anatomically from a dicot stem primarily by possessing:',
    optionA: 'Concentric rings of vascular bundles with open cambium',
    optionB: 'Scattered closed (cambium-lacking) conjoint collateral vascular bundles surrounded by sclerenchymatous bundle sheaths',
    optionC: 'A well-differentiated cortex, endodermis, and broad pith',
    optionD: 'Anomalous secondary rings of cork',
    correctOptionIndex: 1,
    explanation: 'Monocot stems (e.g. Zea mays) feature atactostele architecture: numerous scattered vascular bundles embedded throughout ground parenchyma, each closed (lacking fascicular cambium) and enclosed within a sclerenchyma sheath.'
  },

  // =========================================================================
  // UNIT 7: Applied Botany (3 Marks - Priority 2 🔥🔥)
  // =========================================================================
  {
    id: 'bot_app_1',
    subject: 'BOTANY',
    unit: 'Applied Botany',
    priority: 2,
    questionText: 'Yarsagumba, an invaluable medicinal entity collected in the alpine Himalayan meadows of Nepal, represents:',
    optionA: 'A subterranean angiospermic root tuber',
    optionB: 'An entomopathogenic ascomycete fungus (Ophiocordyceps sinensis) parasitizing a ghost moth caterpillar (Thitarodes)',
    optionC: 'A lichenized symbiotic green alga',
    optionD: 'A high-altitude gymnosperm cone',
    correctOptionIndex: 1,
    explanation: 'Yarsagumba (Cordyceps / Ophiocordyceps sinensis) is a parasitic fungus whose ascospores infect subterraneous caterpillars of the ghost moth (genus Thitarodes) in Himalayan alpine grasslands (3,000–5,000 m). The fungal stroma emerges from the caterpillar head in spring.'
  },
  {
    id: 'bot_app_2',
    subject: 'BOTANY',
    unit: 'Applied Botany',
    priority: 2,
    questionText: 'The capability of an isolated somatic plant cell to regenerate into an entire functional fertile plant under sterile in vitro tissue culture conditions is defined as:',
    optionA: 'Pluripotency',
    optionB: 'Cellular Totipotency',
    optionC: 'Micropropagation',
    optionD: 'Somatic embryogenesis',
    correctOptionIndex: 1,
    explanation: 'Cellular totipotency, demonstrated by Haberlandt and proved by Steward with carrot explants, is the intrinsic capacity of any nucleated plant vegetative cell to regenerate into a complete organism when supplied with appropriate nutrients and auxin/cytokinin ratios.'
  },

  // =========================================================================
  // UNIT 8: Basic Components of Life (2 Marks - Priority 1 🔥)
  // =========================================================================
  {
    id: 'bot_comp_1',
    subject: 'BOTANY',
    unit: 'Basic Components of Life',
    priority: 1,
    questionText: 'The Michaelis constant (Km) of an enzyme represents:',
    optionA: 'The maximum velocity (Vmax) of the reaction',
    optionB: 'The substrate concentration at which the reaction velocity reaches half of Vmax',
    optionC: 'The turnover number of enzyme active sites',
    optionD: 'The activation energy in kilojoules per mole',
    correctOptionIndex: 1,
    explanation: 'Km (Michaelis constant) is defined as the substrate concentration [S] at which initial reaction velocity v = 1/2 Vmax. A low Km indicates high enzyme affinity for its substrate, whereas a high Km indicates low substrate affinity.'
  },

  // =========================================================================
  // UNIT 9: Developmental Botany (2 Marks - Priority 1 🔥)
  // =========================================================================
  {
    id: 'bot_dev_1',
    subject: 'BOTANY',
    unit: 'Developmental Botany',
    priority: 1,
    questionText: 'Double fertilization, a characteristic diagnostic feature of Angiosperms, entails:',
    optionA: 'Fertilization of two separate ovules in an ovary',
    optionB: 'Syngamy (one sperm fusing with egg to form 2n zygote) and Triple Fusion (second sperm fusing with 2n polar nuclei to form 3n primary endosperm nucleus)',
    optionC: 'Fusion of two pollen tubes with one synergid',
    optionD: 'Development of embryo without fertilization',
    correctOptionIndex: 1,
    explanation: 'Discovered by Nawaschin (1898) in Fritillaria and Lilium, double fertilization involves one haploid sperm nucleus fusing with the haploid egg (syngamy -> diploid zygote) while the second sperm fuses with the diploid secondary central nucleus (triple fusion -> triploid endosperm nucleus).'
  }
];
