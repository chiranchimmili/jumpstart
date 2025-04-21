import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface InterviewSettings {
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
}

interface Question {
  question: string;
  examples?: {
    input: any;
    output: any;
    explanation?: string;
  }[];
  constraints?: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
}

const MockInterview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = location.state as InterviewSettings;
  
  const [currentQuestion, setCurrentQuestion] = useState<Question>({ question: '' });
  const [userResponse, setUserResponse] = useState<string>('');
  const [timer, setTimer] = useState<number>(settings.duration * 60);
  const [feedback, setFeedback] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const technicalQuestions: Record<string, Question[]> = {
    easy: [
      {
        question: "Write a function to reverse a string.",
        examples: [
          {
            input: "hello",
            output: "olleh"
          },
          {
            input: "world",
            output: "dlrow"
          }
        ],
        constraints: [
          "The input string will only contain ASCII characters",
          "The input string length will be between 1 and 1000 characters",
          "Do not use built-in reverse functions"
        ]
      },
      {
        question: "Implement a function to check if a number is prime.",
        examples: [
          {
            input: 7,
            output: true
          },
          {
            input: 10,
            output: false
          }
        ],
        constraints: [
          "The input number will be a positive integer",
          "The input number will be less than or equal to 10^6",
          "1 is not considered a prime number"
        ]
      },
      {
        question: "Create a function to find the maximum number in an array.",
        examples: [
          {
            input: [1, 3, 2, 5, 4],
            output: 5
          },
          {
            input: [-1, -3, -2, -5, -4],
            output: -1
          }
        ],
        constraints: [
          "The array will contain at least one number",
          "The array will contain only integers",
          "The array length will be less than or equal to 1000",
          "Do not use built-in max functions"
        ]
      }
    ],
    medium: [
      {
        question: "Implement a function to find the longest substring without repeating characters.",
        examples: [
          {
            input: "abcabcbb",
            output: 3
          },
          {
            input: "bbbbb",
            output: 1
          }
        ],
        constraints: [
          "The input string will only contain ASCII characters",
          "The input string length will be between 0 and 50000 characters",
          "The function should return the length of the longest substring"
        ]
      },
      {
        question: "Design a system to handle rate limiting for an API.",
        examples: [
          {
            input: "User makes 100 requests in 1 minute",
            output: "Allow first 60 requests, reject remaining 40"
          }
        ],
        constraints: [
          "Support multiple rate limit rules (e.g., 100 requests per minute, 1000 requests per hour)",
          "Handle concurrent requests correctly",
          "Be memory efficient",
          "Support distributed systems"
        ]
      },
      {
        question: "Write a function to merge two sorted arrays.",
        examples: [
          {
            input: {
              nums1: [1, 2, 3, 0, 0, 0],
              m: 3,
              nums2: [2, 5, 6],
              n: 3
            },
            output: [1, 2, 2, 3, 5, 6]
          }
        ],
        constraints: [
          "nums1 has enough space to hold additional elements from nums2",
          "m and n represent the number of elements in nums1 and nums2 respectively",
          "The input arrays are sorted in non-decreasing order",
          "Do not return a new array, modify nums1 in-place"
        ]
      }
    ],
    hard: [
      {
        question: "Given a binary tree, find the maximum path sum.",
        examples: [
          {
            input: {
              val: -10,
              left: {
                val: 9,
                left: null,
                right: null
              },
              right: {
                val: 20,
                left: {
                  val: 15,
                  left: null,
                  right: null
                },
                right: {
                  val: 7,
                  left: null,
                  right: null
                }
              }
            },
            output: 42
          }
        ],
        constraints: [
          "The number of nodes in the tree is in the range [1, 3 * 10^4]",
          "Node values can be negative",
          "A path can start and end at any node in the tree",
          "Each node can only be used once in a path"
        ]
      },
      {
        question: "Implement a LRU (Least Recently Used) cache.",
        examples: [
          {
            input: [
              ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
              [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
            ],
            output: [null, null, null, 1, null, -1, null, -1, 3, 4]
          }
        ],
        constraints: [
          "1 <= capacity <= 3000",
          "0 <= key <= 10^4",
          "0 <= value <= 10^5",
          "At most 2 * 10^5 calls will be made to get and put",
          "All operations should be O(1) time complexity"
        ]
      },
      {
        question: "Design a distributed system for handling real-time chat messages.",
        examples: [
          {
            input: "User A sends a message to User B in a group chat",
            output: "Message is delivered to all online users in the group"
          }
        ],
        constraints: [
          "Support millions of concurrent users",
          "Messages should be delivered in real-time (under 100ms)",
          "Ensure message ordering and consistency",
          "Handle system failures gracefully",
          "Support message history and search",
          "Implement proper security measures"
        ]
      }
    ]
  };

  const behavioralQuestions: Record<string, Question[]> = {
    easy: [
      {
        question: "Tell me about yourself."
      },
      {
        question: "What are your strengths and weaknesses?"
      },
      {
        question: "Why do you want to work at our company?"
      }
    ],
    medium: [
      {
        question: "Tell me about a time when you had to solve a difficult technical problem."
      },
      {
        question: "How do you handle conflicts in a team setting?"
      },
      {
        question: "Describe a project where you had to learn something new quickly."
      }
    ],
    hard: [
      {
        question: "Tell me about a time when you failed and how you handled it."
      },
      {
        question: "Describe a situation where you had to make a difficult decision with limited information."
      },
      {
        question: "How would you handle a situation where your team disagrees with your technical decision?"
      }
    ]
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (!settings) {
      navigate('/interview-settings');
      return;
    }

    const questions = settings.type === 'technical' 
      ? technicalQuestions[settings.difficulty]
      : behavioralQuestions[settings.difficulty];

    if (questions && questions.length > 0) {
      setCurrentQuestion(questions[0]);
      setTimer(settings.duration * 60);
    }
  }, [settings, navigate]);

  useEffect(() => {
    // Update line numbers when response changes
    const lines = userResponse.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  }, [userResponse]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const submitResponse = () => {
    // Simulate AI feedback
    const feedback = "Your response shows good understanding of the problem. Consider elaborating more on your thought process and edge cases.";
    setFeedback(feedback);

    // Save interview history
    const historyEntry = {
      type: settings.type,
      difficulty: settings.difficulty,
      question: currentQuestion.question,
      timeSpent: settings.duration * 60 - timer,
      feedback,
      date: new Date().toISOString()
    };

    // Get existing history from localStorage
    const existingHistory = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
    const updatedHistory = [...existingHistory, historyEntry];
    localStorage.setItem('interviewHistory', JSON.stringify(updatedHistory));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      
      // Insert tab character at cursor position
      const newValue = value.substring(0, start) + '\t' + value.substring(end);
      
      // Update the textarea value
      setUserResponse(newValue);
      
      // Move cursor position after the inserted tab
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
      });
    }
  };

  if (!settings) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {settings.type === 'technical' ? 'Technical' : 'Behavioral'} Mock Interview
              </h1>
              <p className="text-gray-400 capitalize">
                Difficulty: {settings.difficulty} • Duration: {settings.duration} minutes
              </p>
            </div>
            <div className="text-lg font-medium text-gray-300">
              Time Remaining: {formatTime(timer)}
            </div>
          </div>

          <div className="mb-8 bg-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-300 mb-4">Question:</h2>
            <p className="text-white text-xl mb-4">{currentQuestion.question}</p>
            
            {currentQuestion.examples && (
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-300 mb-2">Examples:</h3>
                {currentQuestion.examples.map((example, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-300">Input: {JSON.stringify(example.input)}</p>
                    <p className="text-gray-300">Output: {JSON.stringify(example.output)}</p>
                    {example.explanation && (
                      <p className="text-gray-400 text-sm mt-1">{example.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {currentQuestion.constraints && (
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-300 mb-2">Constraints:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {currentQuestion.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {settings.type === 'technical' ? (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-300">Your Code:</h2>
                <div className="flex gap-2">
                  <select 
                    className="bg-gray-700 text-white rounded-lg border-gray-600 px-3 py-2"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-700 text-gray-400 text-right pr-2 overflow-y-auto">
                  {lineNumbers.map((num) => (
                    <div key={num} className="h-6 leading-6">{num}</div>
                  ))}
                </div>
                <textarea
                  ref={textareaRef}
                  className="w-full h-96 p-4 pl-14 bg-gray-800 text-white border border-gray-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                  placeholder="Write your code here..."
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck="false"
                />
              </div>
              {userResponse && (
                <div className="mt-4 bg-gray-800 rounded-lg overflow-hidden">
                  <SyntaxHighlighter
                    language={selectedLanguage}
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, padding: '1rem' }}
                  >
                    {userResponse}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-300 mb-4">Your Response:</h2>
              <textarea
                className="w-full h-48 p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Type your response here..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />
            </div>
          )}

          {feedback && (
            <div className="mb-8 p-4 bg-blue-900/30 rounded-lg border border-blue-800">
              <h2 className="text-lg font-medium text-blue-300 mb-2">AI Feedback:</h2>
              <p className="text-gray-300">{feedback}</p>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate('/interview-settings')}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Exit Interview
            </button>
            <button
              onClick={submitResponse}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview; 