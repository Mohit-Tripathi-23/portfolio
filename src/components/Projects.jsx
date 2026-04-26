import React, { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Mohit-Tripathi-23/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        // Filter out forks or keep them, just showing top 6 updated
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <div className="projects-grid">
            {repos.map(repo => (
              <div key={repo.id} className="project-card glass animate-fade-in">
                <div className="project-header">
                  <h3>{repo.name}</h3>
                  <div className="project-links">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <p className="project-desc">
                  {repo.description || 'No description available for this repository.'}
                </p>
                
                <div className="project-footer">
                  <div className="project-tech">
                    {repo.language && <span className="tech-tag">{repo.language}</span>}
                  </div>
                  <div className="project-stats">
                    <span><Star size={16} /> {repo.stargazers_count}</span>
                    <span><GitFork size={16} /> {repo.forks_count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="projects-more">
          <a href="https://github.com/Mohit-Tripathi-23" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
