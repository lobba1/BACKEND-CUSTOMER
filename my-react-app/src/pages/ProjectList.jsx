import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'https://localhost:7061/api';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      console.log('Fetching from URL:', `${API_URL}/projects`);
      const response = await axios.get(`${API_URL}/projects`, {
        timeout: 5000
      });
      console.log('Projects data:', response.data);
      
      // Log the first project to see the structure
      if (response.data && response.data.length > 0) {
        console.log('First project structure:', response.data[0]);
        console.log('Properties:', Object.keys(response.data[0]));
      }
      
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('FULL ERROR:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response,
        request: error.request
      });
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Är du säker på att du vill ta bort detta projekt?')) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Fel vid borttagning av projekt:', error);
      }
    }
  };
//AI
  const getStatusBadgeClass = (status) => {
    // ... (keep the existing logic)
  };

  const getStatusText = (status) => {
    // ... (keep the existing logic)
  };

  if (loading) {
    return <div className="project-loading">Laddar projekt...</div>;
  }

  return (
    <div>
      <div className="project-header">
        <h1 className="project-title">Projektlista</h1>
        <Link to="/projects/new" className="project-create-button">
          Skapa nytt projekt
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="project-empty-message">Inga projekt hittades.</p>
      ) : (
        <div className="project-table-container">
          <table className="project-table">
            <thead className="project-table-header">
              <tr>
                <th className="project-table-cell project-table-header-cell">Namn</th>
                <th className="project-table-cell project-table-header-cell">Beskrivning</th>
                <th className="project-table-cell project-table-header-cell client-column">Kund</th>
                <th className="project-table-cell project-table-header-cell">Startdatum</th>
                <th className="project-table-cell project-table-header-cell">Slutdatum</th>
                <th className="project-table-cell project-table-header-cell">Status</th>
                <th className="project-table-cell project-table-header-cell">Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="project-table-row">
                  <td className="project-table-cell">{project.title || project.Title}</td>
                  <td className="project-table-cell">{project.description || project.Description}</td>
                  <td className="project-table-cell client-column">
                    {project.clientName || (project.client && project.client.clientName)}
                  </td>
                  <td className="project-table-cell">
                    {project.startDate ? new Date(project.startDate).toLocaleDateString() : 
                     (project.StartDate ? new Date(project.StartDate).toLocaleDateString() : '-')}
                  </td>
                  <td className="project-table-cell">
                    {project.endDate ? new Date(project.endDate).toLocaleDateString() : 
                     (project.EndDate ? new Date(project.EndDate).toLocaleDateString() : '-')}
                  </td>
                  <td className="project-table-cell">
                    <span className={`project-status-badge ${getStatusBadgeClass(project.status || project.statusId || project.StatusId)}`}>
                      {getStatusText(project.status || project.statusId || project.StatusId)}
                    </span>
                  </td>
                  <td className="project-table-cell">
                    <div className="project-actions">
                      <Link
                        to={`/projects/edit/${project.id}`}
                        className="project-action-button edit-button"
                      >
                        Redigera
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="project-action-button delete-button"
                      >
                        Ta bort
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectList;