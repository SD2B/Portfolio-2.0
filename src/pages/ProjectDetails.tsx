import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projects[id] : null;

  if (!project) {
    return (
      <main className="section" style={{ marginTop: '70px' }}>
        <div className="container reveal active">
          <h1>Project Not Found</h1>
          <p>Sorry, the project you're looking for doesn't exist.</p>
          <div style={{ marginTop: '3rem' }}>
            <Link to="/#projects" className="btn">&larr; Back to Home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section" style={{ marginTop: '70px' }}>
      <div className="container reveal active">
        <div id="project-details-content">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{project.title}</h1>
          <div style={{ background: 'var(--gray)', padding: '2rem', borderRadius: '1rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Overview</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{project.description}</p>
            
            <h2 style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>Key Features</h2>
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
          <Link to="/#projects" className="btn">&larr; Back to Projects</Link>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
