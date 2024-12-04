import { v4 as uuidv4 } from 'uuid';

// Mock data for initial setup
const mockProjects = [
  {
    id: '1',
    title: 'Sistema de Monitorización IoT',
    description: 'Sistema de monitorización ambiental utilizando sensores IoT y análisis de datos en tiempo real.',
    category: {
      id: '1',
      name: 'Tecnología e Innovación',
      description: 'Proyectos tecnológicos innovadores',
      maxParticipants: 4,
      minCorrections: 2,
      requirements: ['Memoria técnica', 'Presupuesto', 'Video demostrativo'],
      cutoffScore: 7,
      totalBudget: 10000,
      rubric: {
        id: '1',
        sections: [
          // ... (mantener las secciones de rúbrica existentes)
        ],
        totalScore: 60
      }
    },
    center: 'IES Tecnológico',
    department: 'Informática',
    status: 'submitted', // Cambiado de 'reviewing' a 'submitted'
    submissionDate: '2024-03-01',
    lastModified: '2024-03-15',
    presenters: ['1', '2'],
    reviewers: [], // Eliminados los revisores
    score: null, // Eliminada la puntuación
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
      description: 'Proyectos de innovación educativa',
      maxParticipants: 4,
      minCorrections: 2,
      requirements: ['Memoria técnica', 'Guía didáctica', 'Demo funcional'],
      cutoffScore: 7,
      totalBudget: 8000,
      rubric: {
        // ... (mantener la rúbrica existente)
      }
    },
    center: 'IES Innovación',
    department: 'Pedagogía',
    status: 'submitted',
    submissionDate: '2024-03-10',
    lastModified: '2024-03-10',
    presenters: ['4'],
    reviewers: [], // Eliminados los revisores
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
  },
  {
    id: '3',
    title: 'Gestión de Residuos Inteligente',
    description: 'Sistema de optimización para la gestión y reciclaje de residuos en centros educativos.',
    category: {
      id: '3',
      name: 'Sostenibilidad',
      description: 'Proyectos enfocados en sostenibilidad y medio ambiente',
      maxParticipants: 4,
      minCorrections: 2,
      requirements: ['Memoria técnica', 'Estudio de impacto ambiental'],
      cutoffScore: 7,
      totalBudget: 12000,
      rubric: {
        // ... (mantener la rúbrica existente)
      }
    },
    center: 'IES Tecnológico',
    department: 'Medio Ambiente',
    status: 'draft',
    lastModified: '2024-03-12',
    presenters: ['5', '6'],
    reviewers: [], // Eliminados los revisores
    documents: [
      {
        id: '3',
        name: 'Borrador Inicial',
        type: 'pdf',
        url: '/documents/borrador.pdf',
        uploadDate: '2024-03-12',
        status: 'pending'
      }
    ],
    convocatoriaId: '1'
  }
];

// Guardar los proyectos actualizados en localStorage
localStorage.setItem('projects', JSON.stringify(mockProjects));

// Limpiar las asignaciones de revisores
localStorage.setItem('project_reviewers', JSON.stringify({}));

// Limpiar las revisiones existentes
localStorage.setItem('project_reviews', JSON.stringify({}));

console.log('Base de datos reiniciada con éxito');