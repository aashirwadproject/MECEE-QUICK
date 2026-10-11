import { Question, ExamAttempt, SubjectType } from '../types';
import { SEED_QUESTIONS } from '../data/seedQuestions';

const STORAGE_KEYS = {
  CUSTOM_QUESTIONS: 'mecee_custom_questions',
  BOOKMARKS: 'mecee_bookmarked_ids',
  ATTEMPTS: 'mecee_exam_attempts',
  CANDIDATE_NAME: 'mecee_candidate_name',
  DAILY_MOCK_SCORE: 'mecee_daily_mock_score',
  DAILY_MOCK_VERSION: 'mecee_daily_mock_version',
  FESTIVE_MODE: 'mecee_festive_mode'
};

export const Storage = {
  getDailyMockVersion(): number {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_MOCK_VERSION);
    return raw ? parseInt(raw, 10) || 1 : 1;
  },

  saveDailyMockVersion(version: number) {
    localStorage.setItem(STORAGE_KEYS.DAILY_MOCK_VERSION, version.toString());
  },

  getCandidateName(): string {
    return localStorage.getItem(STORAGE_KEYS.CANDIDATE_NAME) || '';
  },

  saveCandidateName(name: string) {
    localStorage.setItem(STORAGE_KEYS.CANDIDATE_NAME, name.trim());
  },

  isFestiveModeEnabled(): boolean {
    const raw = localStorage.getItem(STORAGE_KEYS.FESTIVE_MODE);
    if (raw === null) return true; // Enabled by default during festive season
    return raw === 'true';
  },

  setFestiveModeEnabled(enabled: boolean) {
    localStorage.setItem(STORAGE_KEYS.FESTIVE_MODE, enabled ? 'true' : 'false');
  },

  getDailyMockScore(): {
    date: string;
    score: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    timeSpentSeconds: number;
    accuracy: number;
  } | null {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_MOCK_SCORE);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      const today = new Date().toISOString().split('T')[0];
      if (parsed.date === today) return parsed;
      return null;
    } catch {
      return null;
    }
  },

  saveDailyMockScore(data: {
    score: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    timeSpentSeconds: number;
    accuracy: number;
  }) {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(
      STORAGE_KEYS.DAILY_MOCK_SCORE,
      JSON.stringify({ ...data, date: today })
    );
  },
  getAllQuestions(): Question[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
    const custom: Question[] = raw ? JSON.parse(raw) : [];
    const bookmarks = this.getBookmarkedIds();

    const merged = [...SEED_QUESTIONS, ...custom];
    return merged.map(q => ({
      ...q,
      isBookmarked: bookmarks.has(q.id)
    }));
  },

  saveCustomQuestion(question: Question) {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
    const custom: Question[] = raw ? JSON.parse(raw) : [];
    custom.unshift(question);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(custom));
  },

  saveCustomQuestions(questions: Question[]) {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
    const custom: Question[] = raw ? JSON.parse(raw) : [];
    custom.unshift(...questions);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(custom));
  },

  deleteQuestion(id: string) {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
    if (!raw) return;
    const custom: Question[] = JSON.parse(raw);
    const filtered = custom.filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(filtered));
  },

  getBookmarkedIds(): Set<string> {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return new Set(raw ? JSON.parse(raw) : []);
  },

  toggleBookmark(id: string): boolean {
    const set = this.getBookmarkedIds();
    const isBookmarked = set.has(id);
    if (isBookmarked) {
      set.delete(id);
    } else {
      set.add(id);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(Array.from(set)));
    return !isBookmarked;
  },

  getExamAttempts(): ExamAttempt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return raw ? JSON.parse(raw) : [];
  },

  saveExamAttempt(attempt: ExamAttempt) {
    const attempts = this.getExamAttempts();
    attempts.unshift(attempt);
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  },

  deleteExamAttempt(id: string) {
    const attempts = this.getExamAttempts().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  },

  clearAllAttempts() {
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
  },

  parseRawQuestionText(rawText: string, targetSubject: SubjectType, targetUnit: string): Question[] {
    const parsed: Question[] = [];
    const blocks = rawText.split(/\n(?=\d+[.)]\s+|Question\s+\d+[:.]|Q\d+[:.]|Q[:.]\s*)/gi);

    for (const block of blocks) {
      const trimmed = block.trim();
      if (trimmed.length < 15) continue;

      try {
        let optA = '';
        let optB = '';
        let optC = '';
        let optD = '';
        let correctIdx = 0;
        let explanation = 'Imported from syllabus material.';
        const questionLines: string[] = [];

        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);

        for (const line of lines) {
          if (/^(\([Aa]\)|[Aa][.)])\s*/i.test(line)) {
            optA = line.replace(/^(\([Aa]\)|[Aa][.)])\s*/i, '');
          } else if (/^(\([Bb]\)|[Bb][.)])\s*/i.test(line)) {
            optB = line.replace(/^(\([Bb]\)|[Bb][.)])\s*/i, '');
          } else if (/^(\([Cc]\)|[Cc][.)])\s*/i.test(line)) {
            optC = line.replace(/^(\([Cc]\)|[Cc][.)])\s*/i, '');
          } else if (/^(\([Dd]\)|[Dd][.)])\s*/i.test(line)) {
            optD = line.replace(/^(\([Dd]\)|[Dd][.)])\s*/i, '');
          } else if (/^(Ans|Answer|Correct)[:.]\s*/i.test(line)) {
            const upper = line.toUpperCase();
            if (upper.includes('A') && !upper.includes('B') && !upper.includes('C') && !upper.includes('D')) correctIdx = 0;
            else if (upper.includes('B')) correctIdx = 1;
            else if (upper.includes('C')) correctIdx = 2;
            else if (upper.includes('D')) correctIdx = 3;
          } else if (/^(Exp|Explanation|Reason)[:.]\s*/i.test(line)) {
            explanation = line.replace(/^(Exp|Explanation|Reason)[:.]\s*/i, '');
          } else {
            if (!optA) {
              const clean = line.replace(/^(\d+[.)]|Question\s+\d+[:.]|Q\d+[:.]|Q[:.])\s*/i, '');
              questionLines.push(clean);
            }
          }
        }

        const qText = questionLines.join(' ');
        if (qText && optA && optB) {
          parsed.push({
            id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            subject: targetSubject,
            unit: targetUnit,
            priority: 4,
            questionText: qText,
            optionA: optA,
            optionB: optB,
            optionC: optC || 'None of the above',
            optionD: optD || 'All of the above',
            correctOptionIndex: correctIdx,
            explanation: explanation,
            isUserAdded: true,
            createdAt: Date.now()
          });
        }
      } catch {
        // Skip malformed
      }
    }
    return parsed;
  }
};
