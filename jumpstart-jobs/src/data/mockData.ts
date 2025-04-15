export interface JobPosting {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
    location: string;
  };
  description: string;
  duration: string;
  type: 'internship' | 'part-time' | 'contract' | 'project';
  difficulty: 'beginner' | 'intermediate';
  skills: {
    required: string[];
    preferred: string[];
  };
  compensation: {
    type: 'hourly' | 'fixed' | 'range';
    amount: string;
  };
  isSaved?: boolean;
  isCompleted?: boolean;
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
    title: 'Frontend Developer Intern',
    company: {
      name: 'TechStart Solutions',
      location: 'Remote',
    },
    description: 'Join our team to help build modern web applications using React. You\'ll work on real features that impact our customers, with guidance from senior developers. Perfect for students looking to gain practical experience in frontend development.',
    duration: '3 months',
    type: 'internship',
    difficulty: 'beginner',
    skills: {
      required: ['React', 'JavaScript', 'HTML', 'CSS'],
      preferred: ['TypeScript', 'Tailwind CSS', 'Git']
    },
    compensation: {
      type: 'hourly',
      amount: '$20-25/hour'
    }
  },
  {
    id: '2',
    title: 'Backend Developer (Part-Time)',
    company: {
      name: 'DataFlow Systems',
      location: 'San Francisco, CA (Hybrid)',
    },
    description: 'Help build and maintain our REST APIs and microservices. You\'ll work with our engineering team to implement new features, optimize database queries, and ensure high performance of our backend systems.',
    duration: '6 months',
    type: 'part-time',
    difficulty: 'intermediate',
    skills: {
      required: ['Node.js', 'Express', 'SQL', 'REST APIs'],
      preferred: ['MongoDB', 'Docker', 'AWS']
    },
    compensation: {
      type: 'hourly',
      amount: '$30-35/hour'
    }
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: {
      name: 'InnovateLab',
      location: 'New York, NY (Remote)',
    },
    description: 'Work on an exciting startup project building a data visualization platform. You\'ll contribute to both frontend and backend development, working with modern technologies and best practices.',
    duration: '4 months',
    type: 'contract',
    difficulty: 'intermediate',
    skills: {
      required: ['React', 'Node.js', 'PostgreSQL', 'RESTful APIs'],
      preferred: ['D3.js', 'GraphQL', 'AWS']
    },
    compensation: {
      type: 'fixed',
      amount: '$8,000 total'
    }
  },
  {
    id: '4',
    title: 'Mobile App Developer',
    company: {
      name: 'AppWorks Inc.',
      location: 'Remote',
    },
    description: 'Develop features for our React Native mobile app. Perfect opportunity for students interested in mobile development. You\'ll work on user-facing features and integrate with backend APIs.',
    duration: '3 months',
    type: 'internship',
    difficulty: 'beginner',
    skills: {
      required: ['React Native', 'JavaScript', 'REST APIs'],
      preferred: ['TypeScript', 'Redux', 'Mobile Development']
    },
    compensation: {
      type: 'hourly',
      amount: '$22-28/hour'
    }
  },
  {
    id: '5',
    title: 'DevOps Engineering Intern',
    company: {
      name: 'CloudTech Solutions',
      location: 'Seattle, WA (Hybrid)',
    },
    description: 'Learn cloud infrastructure and DevOps practices hands-on. You\'ll work with our team to manage cloud resources, implement CI/CD pipelines, and automate deployment processes.',
    duration: '6 months',
    type: 'internship',
    difficulty: 'intermediate',
    skills: {
      required: ['Linux', 'Git', 'Basic Programming'],
      preferred: ['AWS', 'Docker', 'Jenkins', 'Terraform']
    },
    compensation: {
      type: 'hourly',
      amount: '$25-30/hour'
    }
  },
  {
    id: '6',
    title: 'AI Chat Bot Development Project',
    company: {
      name: 'EduTech Innovations',
      location: 'Remote',
    },
    description: 'Build a custom AI chatbot for an educational platform. You\'ll integrate with OpenAI\'s API to create a bot that helps students with programming questions. Great opportunity to gain experience with AI and API integration.',
    duration: '2 weeks',
    type: 'project',
    difficulty: 'intermediate',
    skills: {
      required: ['Python', 'REST APIs', 'Basic ML/AI concepts'],
      preferred: ['OpenAI API', 'FastAPI', 'Docker']
    },
    compensation: {
      type: 'fixed',
      amount: '$1,000 total'
    }
  },
  {
    id: '7',
    title: 'E-commerce Website Feature',
    company: {
      name: 'ShopLocal',
      location: 'Remote',
    },
    description: 'Implement a wishlist feature for a local e-commerce platform. You\'ll work on both frontend and backend components, including database design and UI implementation. Perfect for gaining full-stack development experience.',
    duration: '1 week',
    type: 'project',
    difficulty: 'beginner',
    skills: {
      required: ['React', 'Node.js', 'SQL'],
      preferred: ['Redux', 'TypeScript', 'Stripe API']
    },
    compensation: {
      type: 'fixed',
      amount: '$500 total'
    }
  },
  {
    id: '8',
    title: 'Mobile App Analytics Dashboard',
    company: {
      name: 'AppMetrics',
      location: 'Remote',
    },
    description: 'Create a real-time analytics dashboard for a mobile app. You\'ll work with real data to build interactive charts and graphs showing user engagement metrics. Great opportunity to learn data visualization.',
    duration: '3 weeks',
    type: 'project',
    difficulty: 'beginner',
    skills: {
      required: ['JavaScript', 'Chart.js', 'HTML/CSS'],
      preferred: ['React', 'D3.js', 'Firebase']
    },
    compensation: {
      type: 'fixed',
      amount: '$1,500 total'
    }
  },
  {
    id: '9',
    title: 'API Documentation Website',
    company: {
      name: 'DevDocs Pro',
      location: 'Remote',
    },
    description: 'Build a modern, responsive documentation website for a public API. You\'ll create interactive API examples, implement search functionality, and ensure mobile compatibility. Perfect for learning technical documentation and frontend development.',
    duration: '2 weeks',
    type: 'project',
    difficulty: 'beginner',
    skills: {
      required: ['HTML/CSS', 'JavaScript', 'Technical Writing'],
      preferred: ['React', 'Docusaurus', 'OpenAPI/Swagger']
    },
    compensation: {
      type: 'fixed',
      amount: '$800 total'
    }
  },
  {
    id: '10',
    title: 'Automated Testing Suite',
    company: {
      name: 'QualityFirst Software',
      location: 'Remote',
    },
    description: 'Develop an automated testing suite for a web application. You\'ll write end-to-end tests, set up CI/CD integration, and create test documentation. Great for learning software testing and automation.',
    duration: '2 weeks',
    type: 'project',
    difficulty: 'intermediate',
    skills: {
      required: ['JavaScript', 'Cypress', 'Git'],
      preferred: ['GitHub Actions', 'Jest', 'TypeScript']
    },
    compensation: {
      type: 'fixed',
      amount: '$1,200 total'
    }
  }
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