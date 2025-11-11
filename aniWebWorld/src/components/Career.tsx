import { useState } from 'react';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  location: string;
  description: string[];
  achievements?: string[];
  technologies?: string[];
  companyLogo?: string;
  keyHighlight?: string;
}

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

const projectsData: ProjectItem[] = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and TypeScript, featuring smooth animations and responsive design.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://github.com/ani-poroorkara/ani-poroorkara.github.io",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "ML Research Project",
    description: "Deep learning model for computer vision applications, achieving state-of-the-art results in object detection.",
    technologies: ["Python", "PyTorch", "Computer Vision", "Deep Learning"],
    link: "https://github.com/your-research-project",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Enterprise Dashboard",
    description: "Full-stack application for business analytics and reporting, handling large-scale data visualization.",
    technologies: ["React", "Node.js", "D3.js", "PostgreSQL"],
    link: "https://github.com/your-dashboard-project",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
  }
];

const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: "2023 - Present",
    title: "Machine Learning Engineer",
    company: "Ernst & Young",
    location: "Dallas, TX",
    description: [
      "Leading ML model development and deployment for enterprise solutions",
      "Optimizing data pipelines and ETL processes for improved efficiency",
      "Collaborating with cross-functional teams to deliver AI solutions"
    ],
    achievements: [
      "Reduced model inference time by 40% through optimization",
      "Led a team of 5 engineers in successful project delivery",
      "Implemented automated CI/CD pipeline for ML models"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "AWS", "Azure"],
    companyLogo: "https://images.unsplash.com/photo-1633419798683-5d9c69072c71?w=800&auto=format&fit=crop&q=60",
    keyHighlight: "40% Performance Improvement"
  },
  {
    id: 2,
    year: "2021 - 2023",
    title: "Graduate Research Assistant",
    company: "University of Texas at Arlington",
    location: "Arlington, TX",
    description: [
      "Conducted research in deep learning applications for computer vision",
      "Published papers in top-tier conferences",
      "Mentored undergraduate students in ML projects"
    ],
    achievements: [
      "Published 3 papers in leading conferences",
      "Developed novel computer vision algorithm",
      "Secured $50,000 in research funding"
    ],
    technologies: ["Python", "Deep Learning", "Computer Vision", "Research"],
    companyLogo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=60",
    keyHighlight: "3 Research Publications"
  },
  {
    id: 3,
    year: "2019 - 2021",
    title: "Software Engineer",
    company: "Tata Consultancy Services",
    location: "Mumbai, India",
    description: [
      "Developed and maintained enterprise software solutions",
      "Led a team of 4 developers in successful project delivery",
      "Implemented automated testing and CI/CD pipelines"
    ],
    achievements: [
      "Reduced deployment time by 60%",
      "Increased test coverage to 90%",
      "Mentored 3 junior developers"
    ],
    technologies: ["Java", "Spring Boot", "React", "Jenkins", "Docker"],
    companyLogo: "https://images.unsplash.com/photo-1661774156349-dde04a5c98fe?w=800&auto=format&fit=crop&q=60",
    keyHighlight: "60% Faster Deployments"
  }
];

const Career = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<'experience' | 'projects'>('experience');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-12 md:pb-32">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Professional Journey</h1>

      {/* Section Navigation */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-1">
          {(['experience', 'projects'] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === section
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Container with Sections */}
      <div className="w-full mb-16">
        {/* Experience Section */}
        <div 
          className={`w-full transition-opacity duration-500 ${
            activeSection === 'experience' 
              ? 'block opacity-100' 
              : 'hidden opacity-0'
          }`}
        >
          {/* Experience items */}
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div 
                  key={index}
                  className="relative"
                >
                  {/* Date */}
                  <div className="text-sm text-white/60 mb-4 text-center">{item.year}</div>

                  {/* Content */}
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/15 transition-all cursor-pointer"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <div className="text-white/90">{item.company}</div>
                      <div className="text-white/60 text-sm">{item.location}</div>
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ${
                      expandedIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="space-y-4">
                        {/* Description */}
                        <div>
                          <h4 className="text-white/90 font-medium mb-2">Role Overview</h4>
                          <ul className="space-y-2 text-white/80">
                            {item.description.map((desc, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Achievements */}
                        {item.achievements && (
                          <div>
                            <h4 className="text-white/90 font-medium mb-2">Key Achievements</h4>
                            <ul className="space-y-2 text-white/80">
                              {item.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Technologies */}
                      {item.technologies && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {item.technologies.map((tech, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1 bg-white/20 rounded-full text-sm text-white/90"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button 
                      className="mt-4 text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1"
                    >
                      {expandedIndex === index ? 'Show less' : 'Learn more'}
                      <svg 
                        className={`w-4 h-4 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div 
          className={`w-full transition-opacity duration-500 ${
            activeSection === 'projects' 
              ? 'block opacity-100' 
              : 'hidden opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-lg overflow-hidden hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
              >
                {project.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/80 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-white/20 rounded-full text-xs text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-white/60 hover:text-white text-sm transition-colors"
                    >
                      View Project
                      <svg 
                        className="w-4 h-4 ml-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;