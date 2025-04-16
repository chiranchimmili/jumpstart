import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineering Intern",
    company: "TechCorp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJohnson&backgroundColor=0D8ABC",
    quote: "Jumpstart helped me land my dream internship! The platform made it so easy to find opportunities that matched my skills and interests."
  },
  {
    name: "Michael Chen",
    role: "Data Science Co-op",
    company: "DataFlow",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelChen&backgroundColor=0D8ABC",
    quote: "The AI resume suggestions were incredibly helpful. I got multiple interview offers after implementing the recommended changes."
  },
  {
    name: "Emily Rodriguez",
    role: "Frontend Developer",
    company: "WebSolutions",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyRodriguez&backgroundColor=0D8ABC",
    quote: "I found my first full-time job through Jumpstart. The application process was seamless and the support was amazing."
  },
  {
    name: "David Kim",
    role: "Backend Engineering Intern",
    company: "CloudTech",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim&backgroundColor=0D8ABC",
    quote: "The platform's focus on student opportunities made it easy to find roles that were perfect for my experience level."
  },
  {
    name: "Aisha Patel",
    role: "Product Management Intern",
    company: "InnovateX",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AishaPatel&backgroundColor=0D8ABC",
    quote: "Jumpstart's skill-based matching helped me discover roles I wouldn't have considered otherwise. It's a game-changer!"
  }
];

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Jumpstart Your Tech Career.
              <br />
              Powered by AI.
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Connect with internships, co-ops, and projects that match your skills and interests.
              Our AI-powered platform helps you find the perfect opportunity to launch your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/opportunities"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 text-lg"
              >
                Browse Opportunities
              </Link>
              <Link
                to="/student-dashboard"
                className="inline-block bg-blue-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 text-lg"
              >
                Create Profile
              </Link>
            </div>
            <p className="mt-8 text-blue-100 text-lg">
              Join thousands of students who found their dream roles through Jumpstart
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Smart Job Matching</h3>
            <p className="text-gray-600">
              Get matched with opportunities that align with your skills and career goals
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚡️</div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Quick Apply</h3>
            <p className="text-gray-600">
              Apply to multiple opportunities with just a few clicks using your profile
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">AI Resume Help</h3>
            <p className="text-gray-600">
              Get personalized suggestions to improve your resume and stand out
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Application Tracker</h3>
            <p className="text-gray-600">
              Keep track of all your applications and interviews in one place
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories from Our Students
          </h2>
          <div className="relative h-64 overflow-hidden">
            <div 
              className="absolute w-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic text-lg">"{testimonial.quote}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Jumpstart Your Career?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create your profile today and discover opportunities that match your skills and interests.
          </p>
          <Link
            to="/student-dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 