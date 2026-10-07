import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Practice } from './components/Practice';
import { ExamSimulator } from './components/ExamSimulator';
import { ReviewModal } from './components/ReviewModal';
import { Analytics } from './components/Analytics';
import { SyllabusExplorer } from './components/SyllabusExplorer';
import { QuestionManager } from './components/QuestionManager';
import { MockTestsHub } from './components/MockTestsHub';
import { DailyLeaderboard } from './components/DailyLeaderboard';
import { CandidateNameModal } from './components/CandidateNameModal';
import { Question, ExamAttempt, SubjectType } from './types';
import { Storage } from './utils/storage';
import { BIG_PRIORITY_LIST } from './data/syllabus';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [candidateName, setCandidateName] = useState<string>('');
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(false);
  const [userDailyScore, setUserDailyScore] = useState<{
    score: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    timeSpentSeconds: number;
    accuracy: number;
  } | null>(null);

  // Active Exam state
  const [activeExamConfig, setActiveExamConfig] = useState<{
    title: string;
    type: 'FULL_200' | 'SUBJECT' | 'UNIT' | 'HIGH_YIELD' | 'PRACTICE';
    questions: Question[];
    durationMinutes: number;
    isInstantFeedback?: boolean;
  } | null>(null);

  // Reviewing attempt state
  const [reviewAttempt, setReviewAttempt] = useState<ExamAttempt | null>(null);

  useEffect(() => {
    // Load from local storage
    const loadedQuestions = Storage.getAllQuestions();
    setAllQuestions(loadedQuestions);

    const loadedAttempts = Storage.getExamAttempts();
    setExamAttempts(loadedAttempts);

    setCandidateName(Storage.getCandidateName());
    setUserDailyScore(Storage.getDailyMockScore());
  }, []);

  const handleRequestDailyMock = () => {
    setIsNameModalOpen(true);
  };

  const handleConfirmNameAndStartMock = (name: string) => {
    Storage.saveCandidateName(name);
    setCandidateName(name);
    setIsNameModalOpen(false);
    handleStartExam({
      title: "Today's MECEE Daily Mock 200",
      type: 'FULL_200',
      questionCount: 200,
      durationMinutes: 180
    });
  };

  const handleStartExam = (config: {
    title: string;
    type: 'FULL_200' | 'SUBJECT' | 'UNIT' | 'HIGH_YIELD' | 'PRACTICE';
    questions?: Question[];
    subjectFilter?: SubjectType;
    unitFilter?: string;
    questionCount?: number;
    durationMinutes: number;
    isInstantFeedback?: boolean;
    onlyHighYield?: boolean;
  }) => {
    let selected: Question[] = [];

    if (config.questions && config.questions.length > 0) {
      selected = config.questions;
    } else if (config.type === 'FULL_200') {
      // Official MECEE-BL 2027 Pattern:
      // Zoology (40), Botany (40), Chemistry (50), Physics (50), MAT (20)
      const zoo = allQuestions.filter(q => q.subject === 'ZOOLOGY').sort(() => 0.5 - Math.random()).slice(0, 40);
      const bot = allQuestions.filter(q => q.subject === 'BOTANY').sort(() => 0.5 - Math.random()).slice(0, 40);
      const chem = allQuestions.filter(q => q.subject === 'CHEMISTRY').sort(() => 0.5 - Math.random()).slice(0, 50);
      const phys = allQuestions.filter(q => q.subject === 'PHYSICS').sort(() => 0.5 - Math.random()).slice(0, 50);
      const mat = allQuestions.filter(q => q.subject === 'MAT').sort(() => 0.5 - Math.random()).slice(0, 20);

      selected = [...zoo, ...bot, ...chem, ...phys, ...mat];

      // Fallback if total selected is somehow less than 200
      if (selected.length < 200) {
        const remainingNeeded = 200 - selected.length;
        const remainingPool = allQuestions.filter(q => !selected.some(s => s.id === q.id));
        const extra = remainingPool.sort(() => 0.5 - Math.random()).slice(0, remainingNeeded);
        selected = [...selected, ...extra];
      }
    } else {
      let filtered = [...allQuestions];

      if (config.unitFilter) {
        filtered = filtered.filter(q => q.unit.toLowerCase() === config.unitFilter?.toLowerCase());
      } else if (config.subjectFilter) {
        filtered = filtered.filter(q => q.subject === config.subjectFilter);
      } else if (config.onlyHighYield) {
        const topNames = BIG_PRIORITY_LIST.map(p => p.name.toLowerCase());
        filtered = filtered.filter(q => topNames.includes(q.unit.toLowerCase()) || q.priority >= 4);
      }

      if (filtered.length === 0) {
        filtered = [...allQuestions];
      }

      // Shuffle and pick questions
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      selected = shuffled.slice(0, Math.max(1, config.questionCount || 20));
    }

    setActiveExamConfig({
      title: config.title,
      type: config.type,
      questions: selected,
      durationMinutes: config.durationMinutes,
      isInstantFeedback: config.isInstantFeedback
    });
    setReviewAttempt(null);
  };

  const handleFinishExam = (attempt: ExamAttempt) => {
    Storage.saveExamAttempt(attempt);
    setExamAttempts(prev => [attempt, ...prev]);

    // If it's a 200-question or Daily Mock, update today's leaderboard score
    if (attempt.totalQuestions === 200 || attempt.examType === 'FULL_200') {
      const dailyScoreData = {
        score: attempt.score,
        correct: attempt.correctCount,
        incorrect: attempt.incorrectCount,
        unattempted: attempt.unattemptedCount,
        timeSpentSeconds: attempt.timeSpentSeconds,
        accuracy: attempt.accuracyPercentage
      };
      Storage.saveDailyMockScore(dailyScoreData);
      setUserDailyScore(dailyScoreData);
    }

    setActiveExamConfig(null);
    setReviewAttempt(attempt);
  };

  const handleToggleBookmark = (questionId: string): boolean => {
    const isBookmarked = Storage.toggleBookmark(questionId);
    setAllQuestions(prev => prev.map(q => q.id === questionId ? { ...q, isBookmarked } : q));
    return isBookmarked;
  };

  const handleImportQuestions = (newQuestions: Question[]) => {
    Storage.saveCustomQuestions(newQuestions);
    setAllQuestions(Storage.getAllQuestions());
  };

  const handleAddQuestion = (newQuestion: Question) => {
    Storage.saveCustomQuestion(newQuestion);
    setAllQuestions(Storage.getAllQuestions());
  };

  const handleDeleteQuestion = (id: string) => {
    Storage.deleteQuestion(id);
    setAllQuestions(Storage.getAllQuestions());
  };

  const handleDeleteAttempt = (id: string) => {
    Storage.deleteExamAttempt(id);
    setExamAttempts(prev => prev.filter(a => a.id !== id));
    if (reviewAttempt?.id === id) setReviewAttempt(null);
  };

  const handleClearAllAttempts = () => {
    Storage.clearAllAttempts();
    setExamAttempts([]);
    setReviewAttempt(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setReviewAttempt(null);
        }}
        isExamActive={activeExamConfig !== null}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Active Test Screen */}
        {activeExamConfig ? (
          <ExamSimulator
            title={activeExamConfig.title}
            examType={activeExamConfig.type}
            questions={activeExamConfig.questions}
            totalDurationMinutes={activeExamConfig.durationMinutes}
            isInstantFeedback={activeExamConfig.isInstantFeedback}
            onFinishExam={handleFinishExam}
            onExitExam={() => setActiveExamConfig(null)}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : reviewAttempt ? (
          /* Review Screen */
          <ReviewModal
            attempt={reviewAttempt}
            onClose={() => setReviewAttempt(null)}
            onRetake={() => {
              handleStartExam({
                title: reviewAttempt.examTitle,
                type: reviewAttempt.examType,
                questionCount: reviewAttempt.totalQuestions,
                durationMinutes: Math.round(reviewAttempt.timeSpentSeconds / 60) || 30
              });
            }}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : (
          /* Main Navigation Tabs */
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                onStartExam={handleStartExam}
                onRequestDailyMock={handleRequestDailyMock}
                onOpenReview={(att) => setReviewAttempt(att)}
                onNavigateTab={(tab) => setActiveTab(tab)}
                allQuestions={allQuestions}
                examAttempts={examAttempts}
              />
            )}

            {activeTab === 'mocks' && (
              <MockTestsHub
                allQuestions={allQuestions}
                examAttempts={examAttempts}
                onStartExam={handleStartExam}
                onOpenReview={(att) => setReviewAttempt(att)}
                onBack={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'leaderboard' && (
              <DailyLeaderboard
                candidateName={candidateName}
                onUpdateCandidateName={(name) => {
                  Storage.saveCandidateName(name);
                  setCandidateName(name);
                }}
                onStartDailyMock={handleRequestDailyMock}
                userExamScore={userDailyScore}
              />
            )}

            {activeTab === 'practice' && (
              <Practice
                onStartExam={handleStartExam}
                onBack={() => setActiveTab('dashboard')}
                allQuestions={allQuestions}
              />
            )}

            {activeTab === 'syllabus' && (
              <SyllabusExplorer
                onStartExam={handleStartExam}
                onBack={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'analytics' && (
              <Analytics
                attempts={examAttempts}
                onOpenReview={(att) => setReviewAttempt(att)}
                onDeleteAttempt={handleDeleteAttempt}
                onClearAll={handleClearAllAttempts}
              />
            )}

            {activeTab === 'import' && (
              <QuestionManager
                questions={allQuestions}
                onImportQuestions={handleImportQuestions}
                onAddQuestion={handleAddQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                onBack={() => setActiveTab('dashboard')}
              />
            )}
          </>
        )}
      </main>

      <CandidateNameModal
        initialName={candidateName}
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSubmit={handleConfirmNameAndStartMock}
      />
    </div>
  );
};
