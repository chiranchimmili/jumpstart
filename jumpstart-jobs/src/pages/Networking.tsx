import React, { useState } from 'react';
import { MagnifyingGlassIcon, BuildingOfficeIcon, AcademicCapIcon, CodeBracketIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface Professional {
  id: string;
  name: string;
  role: string;
  company: string;
  school?: string;
  skills: string[];
  imageUrl?: string;
  matchScore?: number;
  email: string;
}

interface Filter {
  company: string;
  role: string;
  skills: string[];
  isAlumni: boolean;
  school: string;
}

// Mock data with additional professionals
const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Maya R.',
    role: 'Software Engineer',
    company: 'Stripe',
    school: 'Georgia Tech',
    skills: ['Python', 'Flask', 'PostgreSQL'],
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    matchScore: 95,
    email: 'maya.r@stripe.com'
  },
  {
    id: '2',
    name: 'James L.',
    role: 'Senior Frontend Engineer',
    company: 'Meta',
    school: 'MIT',
    skills: ['React', 'TypeScript', 'GraphQL'],
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    matchScore: 88,
    email: 'james.l@meta.com'
  },
  {
    id: '3',
    name: 'Sarah K.',
    role: 'Data Scientist',
    company: 'Google',
    school: 'Stanford',
    skills: ['Python', 'TensorFlow', 'SQL'],
    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    matchScore: 82,
    email: 'sarah.k@google.com'
  },
  {
    id: '4',
    name: 'Alex M.',
    role: 'Product Manager',
    company: 'Amazon',
    school: 'Georgia Tech',
    skills: ['Product Strategy', 'Agile', 'Data Analysis'],
    imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
    matchScore: 78,
    email: 'alex.m@amazon.com'
  },
  {
    id: '5',
    name: 'Emily T.',
    role: 'Software Engineer',
    company: 'Google',
    school: 'Harvard',
    skills: ['JavaScript', 'React', 'Node.js'],
    imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
    matchScore: 90,
    email: 'emily.t@google.com'
  },
  {
    id: '6',
    name: 'Michael B.',
    role: 'Data Analyst',
    company: 'Meta',
    school: 'Stanford',
    skills: ['SQL', 'Python', 'Tableau'],
    imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
    matchScore: 85,
    email: 'michael.b@meta.com'
  },
  {
    id: '7',
    name: 'Olivia P.',
    role: 'Software Developer',
    company: 'Amazon',
    school: 'Yale',
    skills: ['Java', 'Spring', 'Microservices'],
    imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
    matchScore: 88,
    email: 'olivia.p@amazon.com'
  },
  {
    id: '8',
    name: 'Liam N.',
    role: 'Data Scientist',
    company: 'Google',
    school: 'Stanford',
    skills: ['R', 'Machine Learning', 'Data Visualization'],
    imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
    matchScore: 92,
    email: 'liam.n@google.com'
  },
  {
    id: '9',
    name: 'Sophia L.',
    role: 'UX Designer',
    company: 'Meta',
    school: 'Harvard',
    skills: ['User Experience', 'Prototyping', 'User Testing'],
    imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    matchScore: 85,
    email: 'sophia.l@meta.com'
  },
  {
    id: '10',
    name: 'Noah J.',
    role: 'Product Manager',
    company: 'Stripe',
    school: 'Georgia Tech',
    skills: ['Agile', 'Scrum', 'Stakeholder Management'],
    imageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
    matchScore: 80,
    email: 'noah.j@stripe.com'
  },
  {
    id: '11',
    name: 'Ava S.',
    role: 'Frontend Developer',
    company: 'Amazon',
    school: 'Yale',
    skills: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
    matchScore: 87,
    email: 'ava.s@amazon.com'
  }
];

const Networking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filter>({
    company: '',
    role: '',
    skills: [],
    isAlumni: false,
    school: ''
  });
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);

  const handleReachOut = (professional: Professional) => {
    setSelectedProfessional(professional);
    setIsModalOpen(true);
  };

  // Function to filter professionals based on search and filters
  const filteredProfessionals = mockProfessionals.filter((professional) => {
    const matchesSearch = professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          professional.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          professional.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompany = filters.company ? professional.company === filters.company : true;
    const matchesRole = filters.role ? professional.role === filters.role : true;
    const matchesSchool = filters.school ? professional.school === filters.school : true;
    const matchesAlumni = filters.isAlumni ? professional.school !== undefined : true;

    return matchesSearch && matchesCompany && matchesRole && matchesSchool && matchesAlumni;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Network with Industry Professionals</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search & Filters */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, company, or role..."
                    className="w-full bg-gray-50 rounded-lg pl-10 pr-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Company</label>
                  <select
                    className="w-full bg-gray-50 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                    value={filters.company}
                    onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                  >
                    <option value="">All Companies</option>
                    <option value="Google">Google</option>
                    <option value="Meta">Meta</option>
                    <option value="Stripe">Stripe</option>
                    <option value="Amazon">Amazon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Role</label>
                  <select
                    className="w-full bg-gray-50 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                    value={filters.role}
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                  >
                    <option value="">All Roles</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Product Manager">Product Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">School</label>
                  <select
                    className="w-full bg-gray-50 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                    value={filters.school}
                    onChange={(e) => setFilters({ ...filters, school: e.target.value })}
                  >
                    <option value="">All Schools</option>
                    <option value="Georgia Tech">Georgia Tech</option>
                    <option value="MIT">MIT</option>
                    <option value="Stanford">Stanford</option>
                    <option value="Harvard">Harvard</option>
                    <option value="Yale">Yale</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProfessionals.map((professional) => (
                <div key={professional.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-4">
                    <img
                      src={professional.imageUrl}
                      alt={professional.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{professional.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <BuildingOfficeIcon className="mr-2 w-5 h-5" />
                        <span>{professional.role} @ {professional.company}</span>
                      </div>
                      {professional.school && (
                        <div className="flex items-center text-gray-600 mb-2">
                          <AcademicCapIcon className="mr-2 w-5 h-5" />
                          <span>{professional.school} Alumni</span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-600 mb-2">
                        <EnvelopeIcon className="mr-2 w-5 h-5" />
                        <span>{professional.email}</span>
                      </div>
                      <button
                        onClick={() => handleReachOut(professional)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1.5 flex items-center justify-center gap-2 transition-colors text-sm"
                      >
                        <EnvelopeIcon className="w-4 h-4" />
                        Reach Out
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Smart Matches */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Top Matches for You</h2>
              <div className="space-y-4">
                {mockProfessionals.slice(0, 3).map((professional) => (
                  <div key={professional.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <img
                      src={professional.imageUrl}
                      alt={professional.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{professional.name}</h4>
                      <p className="text-sm text-gray-600">{professional.role}</p>
                      <div className="text-xs text-blue-600">{professional.matchScore}% match</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidance Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <button
                className="flex items-center justify-between w-full text-xl font-semibold mb-4"
                onClick={() => setIsGuidanceOpen(!isGuidanceOpen)}
              >
                <span>How to Reach Out Professionally</span>
                <span>{isGuidanceOpen ? '−' : '+'}</span>
              </button>
              {isGuidanceOpen && (
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="font-medium mb-2">1. Do Your Research</h4>
                    <p className="text-sm">Review their profile and find common ground before reaching out.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Be Specific</h4>
                    <p className="text-sm">Mention why you're reaching out and what you'd like to learn.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Keep it Brief</h4>
                    <p className="text-sm">Respect their time with a concise, clear message.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">4. Follow Up</h4>
                    <p className="text-sm">If you don't hear back in a week, send one polite follow-up.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Outreach Modal */}
      {isModalOpen && selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Message Template</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              <p className="text-gray-600">
                Hi {selectedProfessional.name.split('.')[0]},
                <br /><br />
                I'm a current CS student interested in {selectedProfessional.role.toLowerCase()} roles. 
                I saw you work at {selectedProfessional.company} — I'd love to ask for a bit of advice 
                or any tips you might have for early career folks.
                <br /><br />
                Best regards
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Hi ${selectedProfessional.name.split('.')[0]},\n\nI'm a current CS student interested in ${selectedProfessional.role.toLowerCase()} roles. I saw you work at ${selectedProfessional.company} — I'd love to ask for a bit of advice or any tips you might have for early career folks.\n\nBest regards`
                  );
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
              >
                Copy Message
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-4 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Networking; 