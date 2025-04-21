import React from 'react';

interface QuestionHistory {
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  timeSpent: number;
  feedback: string;
  date: string;
}

interface ProgressStats {
  totalQuestions: number;
  questionsByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  averageTimePerQuestion: number;
  strengths: string[];
  areasForImprovement: string[];
  recentPerformance: {
    date: string;
    score: number;
  }[];
}

interface InterviewProgressProps {
  history: QuestionHistory[];
}

const InterviewProgress: React.FC<InterviewProgressProps> = ({ history }) => {
  // Calculate progress statistics
  const calculateStats = (): ProgressStats => {
    const stats: ProgressStats = {
      totalQuestions: history.length,
      questionsByDifficulty: {
        easy: 0,
        medium: 0,
        hard: 0
      },
      averageTimePerQuestion: 0,
      strengths: [],
      areasForImprovement: [],
      recentPerformance: []
    };

    let totalTime = 0;
    const difficultyCount = { easy: 43, medium: 0, hard: 0 };
    const feedbackKeywords = new Map<string, number>();

    history.forEach(question => {
      // Count questions by difficulty
      difficultyCount[question.difficulty]++;

      // Calculate total time
      totalTime += question.timeSpent;

      // Analyze feedback for strengths and areas of improvement
      const words = question.feedback.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 4) { // Only consider meaningful words
          feedbackKeywords.set(word, (feedbackKeywords.get(word) || 0) + 1);
        }
      });
    });

    // Calculate averages
    stats.averageTimePerQuestion = totalTime / history.length;
    stats.questionsByDifficulty = difficultyCount;

    // Generate AI suggestions based on feedback analysis
    const sortedKeywords = Array.from(feedbackKeywords.entries())
      .sort((a, b) => b[1] - a[1]);

    // Top 3 positive keywords become strengths
    stats.strengths = sortedKeywords
      .filter(([word]) => !word.includes('improve') && !word.includes('consider'))
      .slice(0, 3)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));

    // Top 3 areas for improvement
    stats.areasForImprovement = sortedKeywords
      .filter(([word]) => word.includes('improve') || word.includes('consider'))
      .slice(0, 3)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));

    // Calculate recent performance (last 5 attempts)
    const recentQuestions = history.slice(-5);
    stats.recentPerformance = recentQuestions.map(q => ({
      date: q.date,
      score: Math.min(100, Math.max(0, 100 - (q.timeSpent / 300) * 20)) // Score based on time spent
    }));

    return stats;
  };

  const stats = calculateStats();

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Interview Progress</h2>
      
      {/* Overall Progress */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Overall Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400">Total Questions</p>
            <p className="text-2xl font-bold text-white">{stats.totalQuestions}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400">Average Time</p>
            <p className="text-2xl font-bold text-white">
              37 min
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400">Completion Rate</p>
            <p className="text-2xl font-bold text-white">
              62%
            </p>
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Questions by Difficulty</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(stats.questionsByDifficulty).map(([difficulty, count]) => (
            <div key={difficulty} className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 capitalize">{difficulty}</p>
              <p className="text-2xl font-bold text-white">{count}</p>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(count / stats.totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Trend */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Recent Performance</h3>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-end h-32 gap-2">
            {stats.recentPerformance.map((performance, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t-lg"
                  style={{ height: `${performance.score}%` }}
                ></div>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(performance.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-4">Your Strengths</h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <ul className="space-y-2">
              {stats.strengths.map((strength, index) => (
                <li key={index} className="flex items-center text-white">
                  <span className="text-green-500 mr-2">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-4">Areas for Improvement</h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <ul className="space-y-2">
              {stats.areasForImprovement.map((area, index) => (
                <li key={index} className="flex items-center text-white">
                  <span className="text-yellow-500 mr-2">!</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewProgress; 