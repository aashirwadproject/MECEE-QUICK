import { Question } from '../../types';

export const PHYSICS_QUESTIONS: Question[] = [
  // =========================================================================
  // UNIT 1: Modern Physics (12 Marks - Priority 5 🔥🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'phys_mod_1',
    subject: 'PHYSICS',
    unit: 'Modern Physics',
    priority: 5,
    questionText: 'According to Einstein photoelectric equation, if the frequency of incident radiation is doubled, the maximum kinetic energy of the emitted photoelectrons:',
    optionA: 'Becomes more than double',
    optionB: 'Doubles',
    optionC: 'Becomes less than double',
    optionD: 'Remains unchanged',
    correctOptionIndex: 0,
    explanation: 'Einstein photoelectric equation: KE_max = hν - Φ. When frequency is doubled: KE\'_max = 2hν - Φ = 2(hν - Φ) + Φ = 2(KE_max) + Φ. Since work function Φ > 0, the new maximum kinetic energy is strictly greater than double.'
  },
  {
    id: 'phys_mod_2',
    subject: 'PHYSICS',
    unit: 'Modern Physics',
    priority: 5,
    questionText: 'In Bohr hydrogen atom model, the ratio of the radius of the first orbit (n=1) to the third orbit (n=3) is:',
    optionA: '1 : 3',
    optionB: '1 : 9',
    optionC: '1 : 6',
    optionD: '3 : 1',
    correctOptionIndex: 1,
    explanation: 'Bohr orbit radius is proportional to the square of principal quantum number: r_n ∝ n^2 / Z. For hydrogen (Z=1): r1 / r3 = (1^2) / (3^2) = 1 / 9 (1 : 9).'
  },
  {
    id: 'phys_mod_3',
    subject: 'PHYSICS',
    unit: 'Modern Physics',
    priority: 5,
    questionText: 'The shortest wavelength limit (cutoff wavelength λ_min) of continuous X-rays produced in a Coolidge tube operating at accelerating potential V is given by the Duane-Hunt law as:',
    optionA: 'λ_min = h / (2mc)',
    optionB: 'λ_min = eV / (hc)',
    optionC: 'λ_min = hc / (eV)',
    optionD: 'λ_min = V / (ehc)',
    correctOptionIndex: 2,
    explanation: 'When an electron of kinetic energy eV loses its entire energy in a single braking impact with a target nucleus, maximum photon energy hν_max = hc / λ_min = eV. Hence, λ_min = hc / (eV) = 12400 / V (in Å when V is in volts).'
  },
  {
    id: 'phys_mod_4',
    subject: 'PHYSICS',
    unit: 'Modern Physics',
    priority: 5,
    questionText: 'A radioactive sample has a half-life of 20 days. What fraction of the original radioactive nuclei will remain undecayed after 60 days?',
    optionA: '1/2',
    optionB: '1/4',
    optionC: '1/16',
    optionD: '1/8',
    correctOptionIndex: 3,
    explanation: 'Number of half-lives elapsed n = Total time / T_half = 60 / 20 = 3 half-lives. Fraction remaining N / N0 = (1/2)^n = (1/2)^3 = 1/8 (12.5%).'
  },
  {
    id: 'phys_mod_5',
    subject: 'PHYSICS',
    unit: 'Modern Physics',
    priority: 5,
    questionText: 'In an unbiased p-n junction diode, the depletion layer consists exclusively of:',
    optionA: 'Immobile positive and negative donor/acceptor ions devoid of mobile charge carriers',
    optionB: 'Mobile holes only',
    optionC: 'Mobile electrons only',
    optionD: 'Neutral silicon atoms only',
    correctOptionIndex: 0,
    explanation: 'Due to diffusion of electrons and holes across the junction and subsequent recombination, the space-charge depletion region is stripped of free mobile carriers, leaving uncompensated, fixed ionized donor ions on the n-side and ionized acceptor ions on the p-side.'
  },

  // =========================================================================
  // UNIT 2: Mechanics (10 Marks - Priority 5 🔥🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'phys_mech_1',
    subject: 'PHYSICS',
    unit: 'Mechanics',
    priority: 5,
    questionText: 'A projectile is launched with velocity u at an angle θ with the horizontal. What is the radius of curvature of its trajectory at the highest point?',
    optionA: 'u^2 / g',
    optionB: '(u^2 cos^2 θ) / g',
    optionC: '(u^2 sin^2 θ) / g',
    optionD: 'u^2 / (g cos θ)',
    correctOptionIndex: 1,
    explanation: 'At the apex, velocity is strictly horizontal: v = u cos θ. The normal acceleration perpendicular to velocity is gravity: a_n = g. Centripetal acceleration a_n = v^2 / R -> g = (u cos θ)^2 / R -> R = (u^2 cos^2 θ) / g.'
  },
  {
    id: 'phys_mech_2',
    subject: 'PHYSICS',
    unit: 'Mechanics',
    priority: 5,
    questionText: 'The escape velocity from the surface of Earth is approx. 11.2 km/s. If a planet has double the mass of Earth and half the radius of Earth, what is the escape velocity from its surface?',
    optionA: '11.2 km/s',
    optionB: '5.6 km/s',
    optionC: '22.4 km/s',
    optionD: '44.8 km/s',
    correctOptionIndex: 2,
    explanation: 'Escape velocity v_e = √(2GM / R). For the new planet: v\'_e = √(2G(2M) / (R/2)) = √(4 * 2GM / R) = 2 * v_e = 2 * 11.2 km/s = 22.4 km/s.'
  },
  {
    id: 'phys_mech_3',
    subject: 'PHYSICS',
    unit: 'Mechanics',
    priority: 5,
    questionText: 'A solid cylinder and a thin hollow cylinder of identical mass and radius roll down an incline from rest without slipping. Which reaches the bottom first?',
    optionA: 'Hollow cylinder',
    optionB: 'Depends on the angle of inclination',
    optionC: 'Both reach simultaneously',
    optionD: 'Solid cylinder',
    correctOptionIndex: 3,
    explanation: 'Acceleration on an incline without slipping is a = g sin θ / (1 + k^2/r^2). For a solid cylinder, k^2/r^2 = 1/2 (a = 2/3 g sin θ). For a thin hollow cylinder, k^2/r^2 = 1 (a = 1/2 g sin θ). The solid cylinder has higher acceleration and arrives first.'
  },
  {
    id: 'phys_mech_4',
    subject: 'PHYSICS',
    unit: 'Mechanics',
    priority: 5,
    questionText: 'According to Bernoulli theorem for non-viscous streamline incompressible fluid flow, which quantity remains constant along a streamline?',
    optionA: 'P + 1/2 ρv^2 + ρgh',
    optionB: 'P + ρv + gh',
    optionC: 'P / ρ + v^2',
    optionD: 'P * V',
    correctOptionIndex: 0,
    explanation: 'Bernoulli equation expresses conservation of mechanical energy in fluid dynamics: Static pressure head P + Dynamic pressure 1/2 ρv^2 + Hydrostatic potential pressure ρgh = constant.'
  },

  // =========================================================================
  // UNIT 3: Current Electricity & Magnetism (9 Marks - Priority 4 🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'phys_elec_1',
    subject: 'PHYSICS',
    unit: 'Current Electricity & Magnetism',
    priority: 4,
    questionText: 'In a potentiometer experiment, the null point for a cell of EMF 1.5 V is obtained at 300 cm. For another cell, the null point is obtained at 400 cm. The EMF of the second cell is:',
    optionA: '1.2 V',
    optionB: '2.0 V',
    optionC: '2.5 V',
    optionD: '3.0 V',
    correctOptionIndex: 1,
    explanation: 'For a uniform potentiometer wire: E1 / E2 = L1 / L2. 1.5 / E2 = 300 / 400 = 3 / 4 -> E2 = 1.5 * (4/3) = 2.0 V.'
  },
  {
    id: 'phys_elec_2',
    subject: 'PHYSICS',
    unit: 'Current Electricity & Magnetism',
    priority: 4,
    questionText: 'A charged particle enters a uniform magnetic field with its velocity vector directed perpendicular to the magnetic lines of force. Its path will be:',
    optionA: 'Straight line',
    optionB: 'Helix with variable pitch',
    optionC: 'Circular',
    optionD: 'Parabolic',
    correctOptionIndex: 2,
    explanation: 'The Lorentz magnetic force F = q(v x B) is always orthogonal to both velocity and magnetic field (F = qvB). Because force does no work (W=0), speed remains constant, and centripetal acceleration produces a circular orbit of radius r = mv / (qB).'
  },
  {
    id: 'phys_elec_3',
    subject: 'PHYSICS',
    unit: 'Current Electricity & Magnetism',
    priority: 4,
    questionText: 'In a series LCR alternating current circuit at electrical resonance, the impedance Z of the circuit is:',
    optionA: 'Maximum and equals √(R^2 + (XL - XC)^2)',
    optionB: 'Purely reactive',
    optionC: 'Zero',
    optionD: 'Minimum and purely resistive (Z = R)',
    correctOptionIndex: 3,
    explanation: 'At resonance, inductive reactance equals capacitive reactance (XL = XC = ωL = 1/ωC). The reactive term vanishes: Z = √(R^2 + (XL - XC)^2) = R. Impedance reaches its absolute minimum, resulting in maximum current amplitude with unity power factor (cos φ = 1).'
  },

  // =========================================================================
  // UNIT 4: Wave & Optics (8 Marks - Priority 4 🔥🔥🔥🔥)
  // =========================================================================
  {
    id: 'phys_opt_1',
    subject: 'PHYSICS',
    unit: 'Wave & Optics',
    priority: 4,
    questionText: 'In Young double-slit experiment (YDSE), if the separation between slits is halved and distance from slits to screen is doubled, fringe width β will:',
    optionA: 'Become four times',
    optionB: 'Double',
    optionC: 'Remain unchanged',
    optionD: 'Become one-fourth',
    correctOptionIndex: 0,
    explanation: 'Fringe width β = λD / d. When D -> 2D and d -> d/2: β\' = λ(2D) / (d/2) = 4(λD / d) = 4β. The fringe width increases by fourfold.'
  },
  {
    id: 'phys_opt_2',
    subject: 'PHYSICS',
    unit: 'Wave & Optics',
    priority: 4,
    questionText: 'A convex lens of focal length 20 cm in air (μ_lens = 1.5) is immersed in water (μ_water = 1.33). What is its new focal length in water?',
    optionA: '20 cm',
    optionB: '80 cm',
    optionC: '40 cm',
    optionD: '10 cm',
    correctOptionIndex: 1,
    explanation: 'Lens maker formula: 1/f = (μ_rel - 1)(1/R1 - 1/R2). In air: 1/f_a = (1.5 - 1)K = 0.5 K. In water: 1/f_w = ((1.5/1.33) - 1)K = (0.128)K. Ratio f_w / f_a = 0.5 / 0.128 ≈ 3.9 -> f_w ≈ 4 * 20 cm ≈ 80 cm.'
  },
  {
    id: 'phys_opt_3',
    subject: 'PHYSICS',
    unit: 'Wave & Optics',
    priority: 4,
    questionText: 'A sound source emitting frequency f approaches a stationary observer with speed equal to one-tenth the speed of sound v. What is the apparent frequency heard by the observer?',
    optionA: '(9/10) f',
    optionB: '(11/10) f',
    optionC: '(10/9) f',
    optionD: '(10/11) f',
    correctOptionIndex: 2,
    explanation: 'Doppler effect for a moving source approaching a stationary listener: f\' = f * (v / (v - v_s)). Substituting v_s = 0.1 v: f\' = f * (v / 0.9 v) = (10 / 9) f ≈ 1.11 f.'
  },

  // =========================================================================
  // UNIT 5: Heat & Thermodynamics (7 Marks - Priority 3 🔥🔥🔥)
  // =========================================================================
  {
    id: 'phys_thm_1',
    subject: 'PHYSICS',
    unit: 'Heat & Thermodynamics',
    priority: 3,
    questionText: 'A Carnot heat engine operates between a heat source at 500 K and a sink at 300 K. What is the theoretical maximum thermal efficiency η of this engine?',
    optionA: '20%',
    optionB: '80%',
    optionC: '60%',
    optionD: '40%',
    correctOptionIndex: 3,
    explanation: 'Carnot efficiency η = 1 - (T_sink / T_source) = 1 - (300 / 500) = 1 - 0.6 = 0.40, which corresponds to 40% efficiency.'
  },
  {
    id: 'phys_thm_2',
    subject: 'PHYSICS',
    unit: 'Heat & Thermodynamics',
    priority: 3,
    questionText: 'In an adiabatic expansion of an ideal gas, the relationship between pressure P and volume V is described by:',
    optionA: 'P * V^γ = constant (where γ = Cp / Cv)',
    optionB: 'P * V = constant',
    optionC: 'P / T = constant',
    optionD: 'P * T^γ = constant',
    correctOptionIndex: 0,
    explanation: 'For a reversible adiabatic process in which dq = 0, first law dU = -dW yields Cv dT = -P dV. Integration with ideal gas law gives P V^γ = constant, T V^(γ-1) = constant, and P^(1-γ) T^γ = constant.'
  },

  // =========================================================================
  // UNIT 6: Electrostatics & Capacitors (4 Marks - Priority 2 🔥🔥)
  // =========================================================================
  {
    id: 'phys_elec_cap_1',
    subject: 'PHYSICS',
    unit: 'Electrostatics & Capacitors',
    priority: 2,
    questionText: 'A parallel plate capacitor of capacitance C is charged to potential difference V and disconnected from the battery. A dielectric slab of dielectric constant K is then inserted between the plates. What happens to the energy stored in the capacitor?',
    optionA: 'Increases by factor K',
    optionB: 'Decreases by factor K (U\' = U / K)',
    optionC: 'Remains unchanged',
    optionD: 'Becomes zero',
    correctOptionIndex: 1,
    explanation: 'Because the battery is disconnected, the charge Q remains constant. The new capacitance becomes C\' = KC. Initial energy U = Q^2 / (2C). New energy U\' = Q^2 / (2KC) = U / K. The electric field does work pulling the dielectric slab into the plates, decreasing stored electrostatic energy.'
  },
  {
    id: 'phys_elec_cap_2',
    subject: 'PHYSICS',
    unit: 'Electrostatics & Capacitors',
    priority: 2,
    questionText: 'An electric dipole of dipole moment p is placed in a uniform electric field E at an angle θ. The torque τ acting on the dipole is:',
    optionA: 'τ = p · E',
    optionB: 'τ = p / E',
    optionC: 'τ = p × E (magnitude p E sin θ)',
    optionD: 'τ = zero at all angles',
    correctOptionIndex: 2,
    explanation: 'The forces on the +q and -q charges are equal and opposite (qE and -qE), creating zero net translational force but a net restoring torque τ = r × F = p × E, whose magnitude is p E sin θ.'
  }
];
