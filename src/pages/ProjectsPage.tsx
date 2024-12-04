import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Wand2 } from 'lucide-react';
import ProjectsList from '../components/projects/ProjectsList';
import ProjectWizard from '../components/projects/ProjectWizard';
import ProjectDetails from '../components/projects/ProjectDetails';
import ReviewsList from '../components/reviews/ReviewsList';
import ReviewerAssignmentModal from '../components/projects/ReviewerAssignmentModal';
import { Project } from '../types/project';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../context/ProjectsContext';

const mockConvocatoria = {
  id: '1',
  title: 'Convocatoria 2024',
  categories: [
    {
      id: '1',
      name: 'Tecnología e Innovación',
      description: 'Proyectos tecnológicos innovadores',
      requirements: ['Memoria técnica', 'Presupuesto', 'Video demostrativo']
    }
  ]
};

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projects, updateProject } = useProjects();
  const [showWizard, setShowWizard] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewerModal, setShowReviewerModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleEditProject = (id: string) => {
    navigate(`/projects/edit/${id}`);
  };

  const handleNewProject = () => {
    navigate('/projects/new');
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setShowDetails(true);
  };

  const handleViewReviews = (project: Project) => {
    setSelectedProject(project);
    setShowReviews(true);
  };

  const handleAssignReviewers = (project: Project) => {
    setSelectedProject(project);
    setShowReviewerModal(true);
  };

  const handleSaveProject = async (projectData: Partial<Project>, status: string) => {
    console.log('Saving project:', projectData, status);
    setShowWizard(false);
  };

  const handleSaveReviewers = async (reviewerIds: string[]) => {
    if (!selectedProject) return;
    try {
      updateProject(selectedProject.id, { reviewers: reviewerIds });
      setShowReviewerModal(false);
      setSelectedProject(null);
    } catch (error) {
      console.error('Error saving reviewers:', error);
      alert('Error al guardar los correctores');
    }
  };

  const canUseWizard = user?.role === 'presenter' || user?.role === 'admin' || user?.role === 'coordinator';

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
        <div className="flex items-center space-x-4">
          {canUseWizard && (
            <button
              onClick={() => setShowWizard(true)}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <Wand2 size={20} />
              <span>Asistente de presentación</span>
            </button>
          )}
          <button
            onClick={handleNewProject}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nuevo proyecto</span>
          </button>
        </div>
      </div>

      <ProjectsList
        projects={projects}
        onEditProject={handleEditProject}
        onNewProject={handleNewProject}
        onViewProject={handleViewProject}
        onViewReviews={handleViewReviews}
        onAssignReviewers={handleAssignReviewers}
      />

      {showWizard && (
        <ProjectWizard
          convocatoria={mockConvocatoria}
          onClose={() => setShowWizard(false)}
          onSave={handleSaveProject}
        />
      )}

      {selectedProject && showDetails && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => {
            setSelectedProject(null);
            setShowDetails(false);
          }}
        />
      )}

      {selectedProject && showReviews && (
        <ReviewsList
          project={selectedProject}
          reviews={[]}
          assignedReviewers={[]}
          onClose={() => {
            setSelectedProject(null);
            setShowReviews(false);
          }}
          onViewReview={() => {}}
          onEditReview={() => {}}
          onDeleteReview={() => {}}
          onNewReview={() => {}}
        />
      )}

      {selectedProject && showReviewerModal && (
        <ReviewerAssignmentModal
          project={selectedProject}
          onClose={() => {
            setShowReviewerModal(false);
            setSelectedProject(null);
          }}
          onSave={handleSaveReviewers}
        />
      )}
    </div>
  );
};

export default ProjectsPage;