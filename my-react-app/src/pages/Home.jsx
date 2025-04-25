import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="project-container">
      <h1 className="project-title">Välkommen till Projekthanteringssystemet</h1>
      <p className="project-description">
        Detta system hjälper dig att hålla koll på alla dina projekt och kunder.
      </p>
      
      <div className="project-action-container">
        <Link to="/projects" className="project-button project-primary-button">
          Visa alla projekt
        </Link>
        <Link to="/projects/new" className="project-button project-secondary-button">
          Skapa nytt projekt
        </Link>
      </div>
    </div>
  );
};

export default Home;
