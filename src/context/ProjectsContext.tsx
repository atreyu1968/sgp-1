import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types/project';

interface ProjectsContextType {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

// Initial mock data
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Sistema de Monitorización IoT',
    description: 'Sistema de monitorización ambiental utilizando sensores IoT y análisis de datos en tiempo real.',
    category: {
      id: '1',
      name: 'Tecnología e Innovación',
      minCorrections: 2
    },
    center: 'IES Tecnológico',
    department: 'Informática',
    status: 'reviewing',
    submissionDate: '2024-03-01',
    lastModified: '2024-03-15',
    presenters: ['1', '2'],
    reviewers: ['3'],
    score: 8.5,
    documents: [
      {
        id: '1',
        name: 'Memoria Técnica',
        type: 'pdf',
        url: '/documents/memoria.pdf',
        uploadDate: '2024-03-01',
        status: 'approved'
      }
    ],
    convocatoriaId: '1'
  },
  {
    id: '2',
    title: 'Plataforma de Aprendizaje Adaptativo',
    description: 'Sistema educativo que adapta el contenido según el progreso y necesidades del estudiante.',
    category: {
      id: '2',
      name: 'Educación Digital',
      minCorrections: 2
    },
    center: 'IES Innovación',
    department: 'Pedagogía',
    status: 'submitted',
    submissionDate: '2024-03-10',
    lastModified: '2024-03-10',
    presenters: ['4'],
    reviewers: [],
    documents: [
      {
        id: '2',
        name: 'Propuesta Pedagógica',
        type: 'pdf',
        url: '/documents/propuesta.pdf',
        uploadDate: '2024-03-10',
        status: 'pending'
      }
    ],
    convocatoriaId: '1'
  }
];

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(initialProjects);
      localStorage.setItem('projects', JSON.stringify(initialProjects));
    }
  }, []);

  const addProject = (project: Project) => {
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const updateProject = (id: string, projectUpdate: Partial<Project>) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, ...projectUpdate } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};