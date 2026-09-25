import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? projects[id] : null;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (!project) {
    return (
      <main className="section" style={{ marginTop: '70px' }}>
        <div className="container reveal active">
          <h1>Project Not Found</h1>
          <p>Sorry, the project you're looking for doesn't exist.</p>
          <div style={{ marginTop: '3rem' }}>
            <button 
              type="button" 
              onClick={handleBack} 
              className="btn shine-effect"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              &larr; Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section" style={{ marginTop: '70px' }}>
      <div className="container reveal active">
        {/* Top Back Action */}
        <div style={{ marginBottom: '2rem' }}>
          <button 
            type="button" 
            onClick={handleBack} 
            className="btn shine-effect"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              cursor: 'pointer',
              padding: '0.65rem 1.4rem',
              fontSize: '0.85rem'
            }}
          >
            &larr; Back to Projects
          </button>
        </div>

        <div id="project-details-content">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{project.title}</h1>
          <div style={{ background: 'var(--gray)', padding: '2rem', borderRadius: '1rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Overview</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{project.description}</p>
            
            {project.tech && project.tech.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Technologies & Tools</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {project.tech.map((t, index) => (
                    <span key={index} className="platform-tag shine-effect" style={{ fontSize: '0.85rem', padding: '0.35rem 0.8rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <h2 style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>Key Features & Achievements</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {project.details.map((detail, index) => (
                <li key={index} style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 0 }}>&bull;</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '3rem' }}>
          <button 
            type="button" 
            onClick={handleBack} 
            className="btn shine-effect"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          >
            &larr; Back to Projects
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
