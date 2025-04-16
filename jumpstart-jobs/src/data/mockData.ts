export interface JobPosting {
  id: string;
  title: string;
  company: {
    name: string;
    location: string;
  };
  description: string;
  duration: string;
  type: 'internship' | 'co-op' | 'full-time' | 'project';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: {
    required: string[];
    preferred: string[];
  };
  compensation: {
    type: 'hourly' | 'fixed' | 'salary';
    amount: string;
  };
}

export interface Skill {
  name: string;
  progress: number;
  totalProjects: number;
  completedProjects: number;
}

export interface User {
  name: string;
  savedProjects: string[];
  completedProjects: string[];
  skills: Skill[];
}

export const mockJobs: JobPosting[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: {
      name: 'TechCorp',
      location: 'San Francisco, CA',
    },
    description: 'Join our engineering team to work on cutting-edge web applications. You\'ll collaborate with senior engineers to build and maintain our core products.',
    duration: '3 months',
    type: 'internship',
    difficulty: 'intermediate',
    skills: {
      required: ['JavaScript', 'React', 'TypeScript'],
      preferred: ['Node.js', 'AWS', 'Docker'],
    },
    compensation: {
      type: 'hourly',
      amount: '$35/hour',
    },
  },
  {
    id: '2',
    title: 'AI Chat Bot Development Project',
    company: {
      name: 'AI Solutions Inc',
      location: 'Remote',
    },
    description: 'Develop a conversational AI chatbot using natural language processing. The project involves training models and implementing a user-friendly interface.',
    duration: '2 weeks',
    type: 'project',
    difficulty: 'advanced',
    skills: {
      required: ['Python', 'Machine Learning', 'NLP'],
      preferred: ['TensorFlow', 'PyTorch', 'Flask'],
    },
    compensation: {
      type: 'fixed',
      amount: '$1,000',
    },
  },
  {
    id: '3',
    title: 'Frontend Developer Co-op',
    company: {
      name: 'WebCraft Studios',
      location: 'Boston, MA',
    },
    description: 'Work on our client-facing web applications. This co-op position offers hands-on experience with modern frontend technologies and agile development practices.',
    duration: '6 months',
    type: 'co-op',
    difficulty: 'intermediate',
    skills: {
      required: ['HTML', 'CSS', 'JavaScript', 'React'],
      preferred: ['Next.js', 'Tailwind CSS', 'GraphQL'],
    },
    compensation: {
      type: 'hourly',
      amount: '$30/hour',
    },
  },
  {
    id: '4',
    title: 'E-commerce Website Feature',
    company: {
      name: 'ShopSmart',
      location: 'Remote',
    },
    description: 'Implement a new product recommendation feature for our e-commerce platform. This project involves both frontend and backend development.',
    duration: '1 week',
    type: 'project',
    difficulty: 'beginner',
    skills: {
      required: ['JavaScript', 'Node.js', 'MongoDB'],
      preferred: ['Express.js', 'React', 'Redux'],
    },
    compensation: {
      type: 'fixed',
      amount: '$500',
    },
  },
  {
    id: '5',
    title: 'Junior Full Stack Developer',
    company: {
      name: 'InnovateTech',
      location: 'New York, NY',
    },
    description: 'Join our growing team as a full stack developer. You\'ll work on both frontend and backend features, with opportunities to learn and grow.',
    duration: 'Full-time',
    type: 'full-time',
    difficulty: 'intermediate',
    skills: {
      required: ['JavaScript', 'Python', 'SQL', 'React'],
      preferred: ['Django', 'PostgreSQL', 'AWS'],
    },
    compensation: {
      type: 'salary',
      amount: '$75,000/year',
    },
  },
  {
    id: '6',
    title: 'Mobile App Analytics Dashboard',
    company: {
      name: 'DataInsights',
      location: 'Remote',
    },
    description: 'Create a dashboard to visualize user analytics for our mobile app. This project involves data processing and visualization.',
    duration: '3 weeks',
    type: 'project',
    difficulty: 'intermediate',
    skills: {
      required: ['JavaScript', 'D3.js', 'React'],
      preferred: ['TypeScript', 'Redux', 'Chart.js'],
    },
    compensation: {
      type: 'fixed',
      amount: '$1,500',
    },
  },
  {
    id: '7',
    title: 'Backend Engineering Intern',
    company: {
      name: 'CloudScale',
      location: 'Seattle, WA',
    },
    description: 'Work on our cloud infrastructure and backend services. Learn about microservices architecture and cloud computing.',
    duration: '4 months',
    type: 'internship',
    difficulty: 'advanced',
    skills: {
      required: ['Python', 'Java', 'SQL'],
      preferred: ['AWS', 'Docker', 'Kubernetes'],
    },
    compensation: {
      type: 'hourly',
      amount: '$40/hour',
    },
  },
  {
    id: '8',
    title: 'API Documentation Website',
    company: {
      name: 'DevTools Inc',
      location: 'Remote',
    },
    description: 'Create a modern documentation website for our API. This project involves creating a user-friendly interface for our API documentation.',
    duration: '2 weeks',
    type: 'project',
    difficulty: 'beginner',
    skills: {
      required: ['HTML', 'CSS', 'JavaScript'],
      preferred: ['Vue.js', 'Markdown', 'Swagger'],
    },
    compensation: {
      type: 'fixed',
      amount: '$800',
    },
  },
  {
    id: '9',
    title: 'Data Science Co-op',
    company: {
      name: 'AnalyticsPro',
      location: 'Chicago, IL',
    },
    description: 'Work with our data science team to analyze customer behavior and develop predictive models.',
    duration: '8 months',
    type: 'co-op',
    difficulty: 'advanced',
    skills: {
      required: ['Python', 'R', 'SQL', 'Machine Learning'],
      preferred: ['TensorFlow', 'Pandas', 'Tableau'],
    },
    compensation: {
      type: 'hourly',
      amount: '$35/hour',
    },
  },
  {
    id: '10',
    title: 'Automated Testing Suite',
    company: {
      name: 'QualityFirst',
      location: 'Remote',
    },
    description: 'Develop an automated testing suite for our web application. This project involves creating comprehensive test cases and automation scripts.',
    duration: '2 weeks',
    type: 'project',
    difficulty: 'intermediate',
    skills: {
      required: ['JavaScript', 'Selenium', 'Jest'],
      preferred: ['TypeScript', 'Cypress', 'Mocha'],
    },
    compensation: {
      type: 'fixed',
      amount: '$1,200',
    },
  },
];

export const mockUser: User = {
  name: 'Alex Chen',
  savedProjects: ['1', '3'],
  completedProjects: ['2', '5'],
  skills: [
    {
      name: 'Frontend',
      progress: 60,
      totalProjects: 5,
      completedProjects: 3,
    },
    {
      name: 'Backend',
      progress: 40,
      totalProjects: 5,
      completedProjects: 2,
    },
    {
      name: 'DevOps',
      progress: 20,
      totalProjects: 5,
      completedProjects: 1,
    },
  ],
}; 