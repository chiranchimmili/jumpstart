import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InterviewProgress from '../components/InterviewProgress';

interface Progress {
  daily: number;
  weekly: number;
}

interface CodingQuestion {
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeLimit: number;
}

interface BehavioralQuestion {
  question: string;
  category: string;
}

interface QuestionHistory {
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  timeSpent: number;
  feedback: string;
  date: string;
}

const InterviewPrep: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<Progress>({
    daily: 45,
    weekly: 60
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const codingQuestions: CodingQuestion[] = [
    {
      question: "Implement a function to find the longest substring without repeating characters.",
      difficulty: "Medium",
      category: "Strings",
      timeLimit: 30
    },
    {
      question: "Design a system to handle rate limiting for an API.",
      difficulty: "Hard",
      category: "System Design",
      timeLimit: 45
    },
    {
      question: "Given a binary tree, find the maximum path sum.",
      difficulty: "Hard",
      category: "Trees",
      timeLimit: 30
    }
  ];

  const behavioralQuestions: BehavioralQuestion[] = [
    {
      question: "Tell me about a time when you had to solve a difficult technical problem.",
      category: "Problem Solving"
    },
    {
      question: "How do you handle conflicts in a team setting?",
      category: "Teamwork"
    },
    {
      question: "Describe a project where you had to learn something new quickly.",
      category: "Adaptability"
    }
  ];

  const categories = ['all', 'Strings', 'Arrays', 'Trees', 'System Design', 'Dynamic Programming'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  // Mock interview history data
  const mockHistory: QuestionHistory[] = [
    // Technical Questions - Easy (15 questions)
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Implement a function to reverse a string.",
      timeSpent: 180,
      feedback: "Good understanding of string manipulation. Consider optimizing the solution for better time complexity. Your approach shows solid fundamentals in string operations.",
      date: "2024-03-15T10:30:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Check if a number is prime.",
      timeSpent: 150,
      feedback: "Efficient solution with good time complexity. Consider adding input validation and edge cases. Your mathematical approach is strong.",
      date: "2024-03-15T11:45:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Find the maximum number in an array.",
      timeSpent: 120,
      feedback: "Quick solution. Consider handling edge cases for empty arrays. Your array manipulation skills are solid.",
      date: "2024-03-15T14:20:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Calculate the factorial of a number.",
      timeSpent: 140,
      feedback: "Good recursive implementation. Consider adding memoization for better performance. Your understanding of recursion is excellent.",
      date: "2024-03-15T16:10:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Check if a string is a palindrome.",
      timeSpent: 130,
      feedback: "Efficient solution. Consider handling case sensitivity and special characters. Your string manipulation skills are strong.",
      date: "2024-03-16T09:30:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Implement a stack using arrays.",
      timeSpent: 160,
      feedback: "Good implementation of data structures. Consider adding error handling for stack overflow. Your understanding of basic data structures is solid.",
      date: "2024-03-16T11:15:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Find the missing number in an array.",
      timeSpent: 170,
      feedback: "Good mathematical approach. Consider optimizing space complexity. Your problem-solving skills are strong.",
      date: "2024-03-16T14:40:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Implement a queue using stacks.",
      timeSpent: 190,
      feedback: "Good understanding of data structures. Consider optimizing for better time complexity. Your ability to combine data structures is impressive.",
      date: "2024-03-17T10:20:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Check if two strings are anagrams.",
      timeSpent: 140,
      feedback: "Efficient solution. Consider handling Unicode characters. Your string manipulation skills are excellent.",
      date: "2024-03-17T13:45:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Find the first non-repeating character in a string.",
      timeSpent: 150,
      feedback: "Good use of hash maps. Consider optimizing for space complexity. Your understanding of hash-based solutions is strong.",
      date: "2024-03-17T15:30:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Implement binary search.",
      timeSpent: 160,
      feedback: "Good implementation of search algorithms. Consider handling edge cases. Your understanding of binary search is solid.",
      date: "2024-03-18T09:15:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Find the intersection of two arrays.",
      timeSpent: 140,
      feedback: "Good use of hash sets. Consider optimizing for space complexity. Your array manipulation skills are strong.",
      date: "2024-03-18T11:40:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Implement bubble sort.",
      timeSpent: 130,
      feedback: "Good understanding of sorting algorithms. Consider optimizing for best-case scenario. Your knowledge of basic sorting is solid.",
      date: "2024-03-18T14:20:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Check if a linked list has a cycle.",
      timeSpent: 170,
      feedback: "Good use of two pointers. Consider explaining the time complexity. Your understanding of linked lists is excellent.",
      date: "2024-03-19T10:15:00Z"
    },
    {
      type: 'technical',
      difficulty: 'easy',
      question: "Find the middle element of a linked list.",
      timeSpent: 150,
      feedback: "Good use of two pointers. Consider handling edge cases. Your linked list manipulation skills are strong.",
      date: "2024-03-19T13:30:00Z"
    },

    // Technical Questions - Medium (8 questions)
    {
      type: 'technical',
      difficulty: 'medium',
      question: "Find the longest substring without repeating characters.",
      timeSpent: 240,
      feedback: "Excellent use of sliding window technique. Consider edge cases for empty strings. Your understanding of string manipulation and algorithms is impressive.",
      date: "2024-03-20T09:30:00Z"
    },
    {
      type: 'technical',
      difficulty: 'medium',
      question: "Implement a function to merge two sorted arrays.",
      timeSpent: 220,
      feedback: "Correct implementation with good space complexity. Consider edge cases for empty arrays. Your array manipulation and sorting skills are excellent.",
      date: "2024-03-20T13:15:00Z"
    },
    {
      type: 'technical',
      difficulty: 'medium',
      question: "Design a parking lot system.",
      timeSpent: 280,
      feedback: "Good object-oriented design. Consider handling concurrent access scenarios. Your system design skills are strong.",
      date: "2024-03-21T10:40:00Z"
    },
    {
      type: 'technical',
      difficulty: 'medium',
      question: "Implement a basic calculator.",
      timeSpent: 260,
      feedback: "Good handling of operator precedence. Consider adding support for parentheses. Your understanding of parsing and evaluation is solid.",
      date: "2024-03-21T14:20:00Z"
    },
    {
      type: 'technical',
      difficulty: 'medium',
      question: "Find the longest palindromic substring.",
      timeSpent: 270,
      feedback: "Good dynamic programming approach. Consider optimizing space complexity. Your understanding of DP is excellent.",
      date: "2024-03-22T09:45:00Z"
    },
    {
      type: 'technical',
      difficulty: 'medium',
      question: "Implement a trie data structure.",
      timeSpent: 250,
      feedback: "Good implementation of advanced data structures. Consider optimizing for space. Your understanding of tries is impressive.",
      date: "2024-03-22T13:30:00Z"
    },
    {
      type: 'technical',
      difficulty: 'medium',
      question: "Design a URL shortening service.",
      timeSpent: 290,
      feedback: "Good system design approach. Consider handling concurrent requests. Your understanding of distributed systems is strong.",
      date: "2024-03-23T10:15:00Z"
    },
    {
      type: 'technical',
      difficulty: 'medium',
      question: "Implement a thread-safe singleton pattern.",
      timeSpent: 230,
      feedback: "Good understanding of synchronization. Consider using enum for simpler implementation. Your knowledge of concurrency is solid.",
      date: "2024-03-23T14:40:00Z"
    },

    // Technical Questions - Hard (5 questions)
    {
      type: 'technical',
      difficulty: 'hard',
      question: "Design a system to handle rate limiting for an API.",
      timeSpent: 360,
      feedback: "Excellent system design approach. Consider improving scalability and fault tolerance. Your understanding of distributed systems and concurrency is impressive.",
      date: "2024-03-24T09:30:00Z"
    },
    {
      type: 'technical',
      difficulty: 'hard',
      question: "Design a distributed system for handling real-time chat messages.",
      timeSpent: 420,
      feedback: "Good understanding of distributed systems. Consider improving message ordering guarantees. Your system design skills are excellent.",
      date: "2024-03-25T10:15:00Z"
    },
    {
      type: 'technical',
      difficulty: 'hard',
      question: "Implement a LRU (Least Recently Used) cache.",
      timeSpent: 380,
      feedback: "Good implementation of doubly linked list. Consider optimizing for concurrent access. Your understanding of data structures and concurrency is strong.",
      date: "2024-03-26T09:45:00Z"
    },
    {
      type: 'technical',
      difficulty: 'hard',
      question: "Design a scalable URL shortening service.",
      timeSpent: 400,
      feedback: "Good consideration of scalability. Consider adding analytics features. Your system design and scalability knowledge is impressive.",
      date: "2024-03-27T10:30:00Z"
    },
    {
      type: 'technical',
      difficulty: 'hard',
      question: "Implement a thread-safe singleton pattern.",
      timeSpent: 340,
      feedback: "Good understanding of synchronization. Consider using enum for simpler implementation. Your knowledge of concurrency patterns is excellent.",
      date: "2024-03-28T09:15:00Z"
    },

    // Behavioral Questions - Easy (8 questions)
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: "Tell me about yourself.",
      timeSpent: 180,
      feedback: "Good introduction. Consider highlighting more technical achievements and specific projects. Your communication skills are strong.",
      date: "2024-03-29T10:20:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: "What are your strengths and weaknesses?",
      timeSpent: 200,
      feedback: "Good self-awareness. Consider providing specific examples for strengths and concrete plans for addressing weaknesses. Your self-reflection skills are solid.",
      date: "2024-03-29T13:45:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: "Why do you want to work at our company?",
      timeSpent: 190,
      feedback: "Good research on the company. Consider mentioning specific projects you're interested in and how your skills align. Your preparation is excellent.",
      date: "2024-03-30T09:30:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: "Where do you see yourself in 5 years?",
      timeSpent: 210,
      feedback: "Good career planning. Consider aligning more with company growth opportunities and specific technical goals. Your vision is clear.",
      date: "2024-03-30T11:15:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: "What is your ideal work environment?",
      timeSpent: 170,
      feedback: "Good understanding of work preferences. Consider mentioning collaboration aspects and specific tools you enjoy using. Your self-awareness is strong.",
      date: "2024-03-31T09:45:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: "How do you handle stress and pressure?",
      timeSpent: 190,
      feedback: "Good stress management approach. Consider providing specific examples and tools you use. Your emotional intelligence is solid.",
      date: "2024-03-31T13:20:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: "What motivates you?",
      timeSpent: 180,
      feedback: "Good understanding of personal motivation. Consider linking it to specific technical challenges. Your self-awareness is excellent.",
      date: "2024-04-01T10:15:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: "Describe your ideal team.",
      timeSpent: 200,
      feedback: "Good understanding of team dynamics. Consider mentioning specific roles and collaboration styles. Your team awareness is strong.",
      date: "2024-04-01T13:40:00Z"
    },

    // Behavioral Questions - Medium (6 questions)
    {
      type: 'behavioral',
      difficulty: 'medium',
      question: "Tell me about a time when you had to solve a difficult technical problem.",
      timeSpent: 240,
      feedback: "Clear communication of problem-solving approach. Consider adding more specific technical details and metrics. Your problem-solving skills are excellent.",
      date: "2024-04-02T09:30:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'medium',
      question: "How do you handle conflicts in a team setting?",
      timeSpent: 220,
      feedback: "Good conflict resolution approach. Consider providing more specific examples and outcomes. Your team collaboration skills are strong.",
      date: "2024-04-02T13:15:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'medium',
      question: "Describe a project where you had to learn something new quickly.",
      timeSpent: 230,
      feedback: "Good demonstration of learning ability. Consider mentioning specific resources used and measurable outcomes. Your learning agility is impressive.",
      date: "2024-04-03T10:20:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'medium',
      question: "How do you prioritize your work when multiple projects are due?",
      timeSpent: 210,
      feedback: "Good time management approach. Consider mentioning specific tools or methods used and their effectiveness. Your organizational skills are solid.",
      date: "2024-04-03T14:45:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'medium',
      question: "Tell me about a time you failed and how you handled it.",
      timeSpent: 250,
      feedback: "Good reflection on failure. Consider emphasizing more on lessons learned and specific improvements made. Your growth mindset is strong.",
      date: "2024-04-04T09:15:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'medium',
      question: "Describe a time when you had to work with a difficult team member.",
      timeSpent: 230,
      feedback: "Good demonstration of interpersonal skills. Consider providing specific strategies used and outcomes achieved. Your team collaboration skills are excellent.",
      date: "2024-04-04T13:30:00Z"
    },

    // Behavioral Questions - Hard (4 questions)
    {
      type: 'behavioral',
      difficulty: 'hard',
      question: "Describe a situation where you had to make a difficult decision with limited information.",
      timeSpent: 280,
      feedback: "Good demonstration of decision-making skills. Consider elaborating on the outcome and lessons learned. Your judgment and decision-making abilities are impressive.",
      date: "2024-04-05T10:15:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'hard',
      question: "How would you handle a situation where your team disagrees with your technical decision?",
      timeSpent: 300,
      feedback: "Good approach to team dynamics. Consider mentioning specific communication strategies and their effectiveness. Your leadership and technical skills are strong.",
      date: "2024-04-05T14:40:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'hard',
      question: "Tell me about a time you had to convince others of your technical approach.",
      timeSpent: 290,
      feedback: "Good persuasion skills. Consider mentioning specific data or metrics used and the outcome. Your communication and technical expertise are excellent.",
      date: "2024-04-06T09:30:00Z"
    },
    {
      type: 'behavioral',
      difficulty: 'hard',
      question: "Describe how you would handle a major system outage.",
      timeSpent: 310,
      feedback: "Good crisis management approach. Consider mentioning specific monitoring tools and communication strategies. Your technical and leadership skills are impressive.",
      date: "2024-04-06T13:15:00Z"
    }
  ];

  const [history, setHistory] = useState<QuestionHistory[]>(mockHistory);

  useEffect(() => {
    // Load interview history from localStorage
    const savedHistory = localStorage.getItem('interviewHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    } else {
      // If no saved history, use mock data
      setHistory(mockHistory);
    }
  }, []);

  const handleStartInterview = (type: 'technical' | 'behavioral') => {
    navigate('/interview-settings', { state: { type } });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Interview Preparation</h1>
          <p className="text-xl text-gray-400">
            Practice technical and behavioral interview questions to improve your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Technical Interview</h2>
            <p className="text-gray-400 mb-6">
              Practice coding challenges and system design questions to prepare for technical interviews.
            </p>
            <button
              onClick={() => handleStartInterview('technical')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
            >
              Start Technical Interview
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Behavioral Interview</h2>
            <p className="text-gray-400 mb-6">
              Practice answering common behavioral questions and improve your communication skills.
            </p>
            <button
              onClick={() => handleStartInterview('behavioral')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
            >
              Start Behavioral Interview
            </button>
          </div>
        </div>

        <InterviewProgress history={history} />
      </div>
    </div>
  );
};

export default InterviewPrep; 