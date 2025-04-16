import React, { useState } from 'react';
import { mockUser, mockJobs } from '../data/mockData';
import { JobPosting } from '../data/mockData';

// Mock application statuses
type ApplicationStatus = 'applied' | 'interviewing' | 'rejected' | 'accepted';

interface Application {
  job: JobPosting;
  status: ApplicationStatus;
  appliedDate: Date;
}

interface StudentProfile {
  name: string;
  email: string;
  university: string;
  major: string;
  graduationYear: string;
  skills: string[];
  resumeUrl?: string;
}

// Mock AI resume suggestions
const mockResumeSuggestions = [
  "Consider adding more specific metrics to quantify your achievements",
  "Your skills section could be more tailored to the job you're applying for",
  "Try to include more action verbs in your experience descriptions",
  "Consider adding a summary section at the top of your resume",
  "Your education section could include more relevant coursework",
];

const StudentDashboard: React.FC = () => {
  // Mock student profile data
  const [profile, setProfile] = useState<StudentProfile>({
    name: 'Jack Sparrow',
    email: 'jsparrow@gatech.edu',
    university: 'Georgia Institute of Technology',
    major: 'Computer Science',
    graduationYear: '2025',
    skills: ['JavaScript', 'React', 'Python', 'Java', 'SQL'],
  });

  // Mock applications data
  const [applications, setApplications] = useState<Application[]>([
    {
      job: mockJobs[0],
      status: 'interviewing',
      appliedDate: new Date('2025-02-15'),
    },
    {
      job: mockJobs[1],
      status: 'applied',
      appliedDate: new Date('2025-02-20'),
    },
    {
      job: mockJobs[2],
      status: 'rejected',
      appliedDate: new Date('2025-02-10'),
    },
  ]);

  const [resumeSuggestions, setResumeSuggestions] = useState<string[]>([]);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingResume(true);
      // Simulate AI processing delay
      setTimeout(() => {
        setResumeSuggestions(mockResumeSuggestions);
        setIsUploadingResume(false);
      }, 2000);
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const savedJobs = mockJobs.filter((job: JobPosting) => 
    mockUser.savedProjects.includes(job.id)
  );
  
  const completedJobs = mockJobs.filter((job: JobPosting) => 
    mockUser.completedProjects.includes(job.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">University</label>
                  <p className="mt-1 text-sm text-gray-900">{profile.university}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Major</label>
                  <p className="mt-1 text-sm text-gray-900">{profile.major}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                  <p className="mt-1 text-sm text-gray-900">{profile.graduationYear}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skills</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume</label>
                  <div className="mt-2">
                    {profile.resumeUrl ? (
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Current Resume
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500">No resume uploaded</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Upload New Resume</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Resume Suggestions */}
            {resumeSuggestions.length > 0 && (
              <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Resume Suggestions</h2>
                <ul className="space-y-3">
                  {resumeSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-green-500">✓</span>
                      <span className="ml-2 text-sm text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Applications Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Applications</h2>
              
              <div className="space-y-6">
                {applications.map((application) => (
                  <div key={application.job.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{application.job.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {application.job.company.name} • {application.job.company.location}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded">
                          {application.job.type}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded">
                          {application.job.duration}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded ${
                          application.job.difficulty === 'beginner' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {application.job.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700">Required Skills</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {application.job.skills.required.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500">
                      Applied on {application.appliedDate.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* Saved Jobs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Saved Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job: JobPosting) => (
              <div key={job.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <p className="mt-2 text-gray-600">{job.description}</p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.required.map((skill) => (
                      <span key={skill} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 