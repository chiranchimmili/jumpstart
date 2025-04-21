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
      totalQuestions: 200,
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
    const difficultyCount = { easy: 47, medium: 38, hard: 25 };
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

  // Inside the InterviewProgress component, add these helper functions
  const generateRandomData = () => {
    const dateMap = new Map<string, number>();
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Initialize all dates in the last year with random data
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      // Generate more realistic random data
      // Higher chance of 0-2 questions, lower chance of 3+ questions
      const rand = Math.random();
      let count = 0;
      if (rand < 0.9) count = 0; // 60% chance of no questions
      else if (rand < 0.9) count = 1; // 20% chance of 1 question
      else if (rand < 0.95) count = 2; // 10% chance of 2 questions
      else if (rand < 0.975) count = 3; // 5% chance of 3 questions
      else count = 4 + Math.floor(Math.random() * 3); // 5% chance of 4-6 questions

      dateMap.set(d.toISOString().split('T')[0], count);
    }

    // Add actual history data on top of random data
    history.forEach(item => {
      const date = new Date(item.date).toISOString().split('T')[0];
      dateMap.set(date, (dateMap.get(date) || 0) + 1);
    });

    return Array.from(dateMap.entries()).map(([date, count]) => ({
      date,
      count
    }));
  };

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-700';
    if (count === 1) return 'bg-green-900';
    if (count === 2) return 'bg-green-700';
    if (count === 3) return 'bg-green-500';
    return 'bg-green-300';
  };

  const contributionData = generateRandomData();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Interview Progress</h2>
      
      {/* Overall Progress */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Overall Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400">Total Questions</p>
            <p className="text-2xl font-bold text-white">112</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400">Average Time</p>
            <p className="text-2xl font-bold text-white">
              47 min
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400">Completion Rate</p>
            <p className="text-2xl font-bold text-white">
              28%
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

      {/* Contribution Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-300 mb-4">Daily Activity</h3>
        <div className="bg-gray-700/50 rounded-xl p-6">
          <div className="flex">
            {/* Days of the week labels */}
            <div className="flex flex-col gap-[3px] pr-4">
              {days.map(day => (
                <div key={day} className="h-[15px] text-xs text-gray-400 leading-[15px]">{day}</div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex-1">
              <div className="flex gap-[3px]">
                {Array.from({ length: 52 }, (_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }, (_, dayIndex) => {
                      const dataIndex = weekIndex * 7 + dayIndex;
                      const data = contributionData[dataIndex];
                      return (
                        <div
                          key={dayIndex}
                          className={`w-[15px] h-[15px] rounded-sm ${getContributionColor(data?.count || 0)} hover:ring-1 hover:ring-white/25 transition-all`}
                          title={data ? `${data.date}: ${data.count} questions` : 'No activity'}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Month labels */}
              <div className="flex mt-2">
                <div className="flex justify-between w-full">
                  {months.map(month => (
                    <div key={month} className="text-xs text-gray-400">{month}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end mt-6 gap-2">
            <span className="text-xs text-gray-400">Less</span>
            <div className="w-[15px] h-[15px] rounded-sm bg-gray-700"></div>
            <div className="w-[15px] h-[15px] rounded-sm bg-green-900"></div>
            <div className="w-[15px] h-[15px] rounded-sm bg-green-700"></div>
            <div className="w-[15px] h-[15px] rounded-sm bg-green-500"></div>
            <div className="w-[15px] h-[15px] rounded-sm bg-green-300"></div>
            <span className="text-xs text-gray-400">More</span>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-4">Your Strengths</h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <ul className="space-y-2">
              <li className="flex items-center text-white">
                <span className="text-green-500 mr-2">✓</span>
                Problem decomposition skills
              </li>
              <li className="flex items-center text-white">
                <span className="text-green-500 mr-2">✓</span>
                Array manipulation techniques
              </li>
              <li className="flex items-center text-white">
                <span className="text-green-500 mr-2">✓</span>
                Time complexity analysis
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-4">Areas for Improvement</h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <ul className="space-y-2">
              <li className="flex items-center text-white">
                <span className="text-yellow-500 mr-2">!</span>
                Dynamic programming approach
              </li>
              <li className="flex items-center text-white">
                <span className="text-yellow-500 mr-2">!</span>
                Graph traversal strategies
              </li>
              <li className="flex items-center text-white">
                <span className="text-yellow-500 mr-2">!</span>
                Space optimization methods
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewProgress; 