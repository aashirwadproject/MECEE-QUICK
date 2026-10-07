export interface DailyLeaderboardEntry {
  id: string;
  rank: number;
  candidateName: string;
  isCurrentUser?: boolean;
  score: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  accuracy: number;
  timeSpentSeconds: number;
  location: string;
  institute: string;
  avatarColor: string;
  submittedAtFormatted: string;
}

const NEPALI_NAMES = [
  'Aarav Sharma', 'Bibek Shrestha', 'Rohan Karki', 'Ayush Adhikari',
  'Priya Thapa', 'Anjali Shah', 'Saurav Joshi', 'Smriti Poudel',
  'Manish Yadav', 'Neha Bhattarai', 'Prabin Chaudhary', 'Suman Giri',
  'Roshani Mahato', 'Bipin Khadka', 'Shreya Shrestha', 'Abhishek Pandey',
  'Pooja Regmi', 'Sandeep Gautam', 'Priyanka K.C.', 'Niraj Dahal',
  'Kritika Basnet', 'Dipendra Oli', 'Alisha Magar', 'Rabin Tamang',
  'Sujata Bhatt', 'Milan Thapa', 'Barsha Acharya', 'Anup Subedi',
  'Manisha Rijal', 'Bishal Gurung', 'Kiran Acharya', 'Sunita Shrestha',
  'Pawan Jha', 'Asmita Silwal', 'Deepak Rayamajhi', 'Srijana Kharel',
  'Ujjwal Tiwari', 'Rameshwar Shah', 'Prashant Koirala', 'Samikshya Bista',
  'Kishor Neupane', 'Roshan Aryal', 'Puja Bhandari', 'Binod Thapa',
  'Sabina K.C.', 'Sagar Ghimire', 'Ritu Pokharel', 'Bikash Tamang'
];

const INDIAN_NAMES = [
  'Aryan Verma', 'Aditi Rao', 'Kartik Iyer', 'Ananya Deshmukh',
  'Rohan Mehra', 'Shreya Sen', 'Harsh Patel', 'Ishita Saxena',
  'Tanmay Chatterjee', 'Ritu Nair', 'Vikram Rathore', 'Divya Agarwal',
  'Gaurav Malhotra', 'Simran Kaur', 'Nikhil Gupta', 'Sneha Roy',
  'Akash Mishra', 'Swati Mukherjee', 'Rahul Chawla', 'Kavya Pillai',
  'Manav Sengupta', 'Tarun Reddy', 'Yashvardhan Singh', 'Radhika Sharma',
  'Ayushmaan Dixit', 'Megha Trivedi', 'Devansh Joshi', 'Riya Kapoor'
];

const LOCATIONS = [
  'Kathmandu, Nepal', 'Dharan, Nepal', 'Pokhara, Nepal', 'Biratnagar, Nepal',
  'Chitwan, Nepal', 'Butwal, Nepal', 'Janakpur, Nepal', 'Nepalgunj, Nepal',
  'Bhaktapur, Nepal', 'Lalitpur, Nepal', 'Lucknow, India', 'Patna, India',
  'New Delhi, India', 'Gorakhpur, India', 'Varanasi, India', 'Kolkata, India',
  'Dehradun, India', 'Chandigarh, India'
];

const INSTITUTES = [
  'NAME Institute', 'Vibrant MBBS Academy', 'PEA / Apex Med',
  'Pioneer Medical Wing', 'Self Study / Online', 'St. Xavier\'s Alumni Circle',
  'KMC Pre-Med Club', 'Allen Pre-Med', 'Aakash Medical Institute', 'Resonance Medical'
];

const AVATAR_COLORS = [
  'from-teal-500 to-emerald-600',
  'from-indigo-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-600',
  'from-violet-500 to-fuchsia-600',
  'from-emerald-500 to-teal-600'
];

// Seeded PRNG for stable daily leaderboard
function seededRandom(seed: number): number {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function getDateSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function formatTimeTaken(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  }
  return `${mins}m ${secs}s`;
}

/**
 * Generates the full Daily Leaderboard for today.
 * If user has provided their name and/or completed today's mock,
 * the user is intelligently placed at the suitable rank!
 */
export function generateDailyLeaderboard(
  userName?: string,
  userExamScore?: {
    score: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    timeSpentSeconds: number;
    accuracy: number;
  },
  customDateStr?: string
): DailyLeaderboardEntry[] {
  const today = customDateStr || new Date().toISOString().split('T')[0];
  const baseSeed = getDateSeed(today);

  // Combine and shuffle names with date seed
  const allNames = [...NEPALI_NAMES, ...INDIAN_NAMES];
  const shuffledNames: string[] = [];
  let s = baseSeed;

  const namesCopy = [...allNames];
  while (namesCopy.length > 0) {
    s += 17;
    const r = seededRandom(s);
    const idx = Math.floor(r * namesCopy.length);
    shuffledNames.push(namesCopy[idx]);
    namesCopy.splice(idx, 1);
  }

  // Generate 65 competitors with realistic descending CEE scores
  const entries: DailyLeaderboardEntry[] = [];
  const totalCompetitors = 65;

  // Top score between 184.50 and 189.75
  const topScoreRaw = 184 + Math.floor(seededRandom(baseSeed + 99) * 20) * 0.25;

  for (let i = 0; i < totalCompetitors; i++) {
    const candidateSeed = baseSeed + i * 37 + 101;
    const name = shuffledNames[i % shuffledNames.length];
    const loc = LOCATIONS[Math.floor(seededRandom(candidateSeed + 1) * LOCATIONS.length)];
    const inst = INSTITUTES[Math.floor(seededRandom(candidateSeed + 2) * INSTITUTES.length)];
    const color = AVATAR_COLORS[Math.floor(seededRandom(candidateSeed + 3) * AVATAR_COLORS.length)];

    // Drop score naturally as rank decreases
    const decayFactor = Math.pow(i / totalCompetitors, 1.15);
    const scoreDrop = decayFactor * 75; // from ~188 down to ~113
    const jitter = (Math.floor(seededRandom(candidateSeed + 4) * 5) - 2) * 0.25;
    const rawScore = Math.max(92, Math.min(196, Math.round((topScoreRaw - scoreDrop + jitter) * 4) / 4));

    // Realistic correct / incorrect adhering to MECEE marking (+1, -0.25)
    // score = correct - (incorrect * 0.25)
    // correct + incorrect + unattempted = 200
    const incorrect = Math.floor(seededRandom(candidateSeed + 5) * 16) + 4; // 4 to 19 incorrect
    const correct = Math.round(rawScore + incorrect * 0.25);
    const unattempted = Math.max(0, 200 - correct - incorrect);
    const totalAttempted = correct + incorrect;
    const accuracy = totalAttempted > 0 ? Math.round((correct / totalAttempted) * 1000) / 10 : 0;

    // Time spent: between 2h 10m (7800s) and 2h 58m (10680s)
    const timeSpent = 7800 + Math.floor(seededRandom(candidateSeed + 6) * 2800);

    // Submission time in today's morning / afternoon
    const hour = 8 + Math.floor(seededRandom(candidateSeed + 7) * 8);
    const minute = Math.floor(seededRandom(candidateSeed + 8) * 60);
    const timeString = `Today, ${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;

    entries.push({
      id: `bot_${i}_${today}`,
      rank: 0, // Assigned after sorting
      candidateName: name,
      score: rawScore,
      correct,
      incorrect,
      unattempted,
      accuracy,
      timeSpentSeconds: timeSpent,
      location: loc,
      institute: inst,
      avatarColor: color,
      submittedAtFormatted: timeString
    });
  }

  // Now handle current user entry!
  const effectiveUserName = userName?.trim();
  if (effectiveUserName) {
    if (userExamScore) {
      // User has a real mock exam score from today!
      entries.push({
        id: 'current_user_daily',
        rank: 0,
        candidateName: effectiveUserName,
        isCurrentUser: true,
        score: userExamScore.score,
        correct: userExamScore.correct,
        incorrect: userExamScore.incorrect,
        unattempted: userExamScore.unattempted,
        accuracy: userExamScore.accuracy,
        timeSpentSeconds: userExamScore.timeSpentSeconds,
        location: 'Nepal / India (Live)',
        institute: 'MECEE QUICK Candidate',
        avatarColor: 'from-amber-400 to-teal-500',
        submittedAtFormatted: 'Just now'
      });
    } else {
      // User registered name but hasn't completed test yet:
      // Randomly place user at a suitable, competitive placement (e.g. Rank 14 to 22 with realistic high-tier score)
      const userSeed = baseSeed + 777;
      const targetRank = 14 + Math.floor(seededRandom(userSeed) * 8); // e.g. Rank 14–21
      // Calculate a score that fits right at that percentile
      const targetScore = Math.round((168 - (targetRank - 14) * 1.5 + (Math.floor(seededRandom(userSeed + 1) * 3) * 0.25)) * 4) / 4;
      const incorrect = 10;
      const correct = Math.round(targetScore + incorrect * 0.25);
      const unattempted = Math.max(0, 200 - correct - incorrect);
      const accuracy = Math.round((correct / (correct + incorrect)) * 1000) / 10;
      const timeSpent = 8520 + Math.floor(seededRandom(userSeed + 2) * 600);

      entries.push({
        id: 'current_user_daily',
        rank: 0,
        candidateName: effectiveUserName,
        isCurrentUser: true,
        score: targetScore,
        correct,
        incorrect,
        unattempted,
        accuracy,
        timeSpentSeconds: timeSpent,
        location: 'Nepal / India (Live Candidate)',
        institute: 'MECEE QUICK Aspirant',
        avatarColor: 'from-teal-400 to-indigo-600',
        submittedAtFormatted: 'Today, Live Active'
      });
    }
  }

  // Sort primarily by Score DESC, tie-break by timeSpentSeconds ASC
  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeSpentSeconds - b.timeSpentSeconds;
  });

  // Assign ranks
  entries.forEach((entry, idx) => {
    entry.rank = idx + 1;
  });

  return entries;
}
