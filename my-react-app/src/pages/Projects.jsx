import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api/api-config';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      console.log('Hämtar projekt från:', `${API_URL}/projects`);
      const response = await axios.get(`${API_URL}/projects`);
      console.log('Projekt hämtade:', response.data);
      
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Fel vid hämtning av projekt:', error);
      
      // Detaljerad felhantering
      if (error.response) {
        console.error('Server svarade med fel:', error.response.status, error.response.data);
        setError(`API-fel: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        console.error('Ingen respons från servern:', error.request);
        setError('Kunde inte kontakta API-servern. Kontrollera att backend-servern är igång.');
      } else {
        console.error('Felmeddelande:', error.message);
        setError(`Fel: ${error.message}`);
      }
      
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Är du säker på att du vill ta bort detta projekt?')) {
      try {
        console.log('Tar bort projekt med ID:', id);
        await axios.delete(`${API_URL}/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Fel vid borttagning av projekt:', error);
        
        // Detaljerad felhantering
        if (error.response) {
          console.error('Server svarade med fel:', error.response.status, error.response.data);
          setError(`API-fel: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
          console.error('Ingen respons från servern:', error.request);
          setError('Kunde inte kontakta API-servern. Kontrollera att backend-servern är igång.');
        } else {
          console.error('Felmeddelande:', error.message);
          setError(`Fel: ${error.message}`);
        }
      }
    }
  };
//AI
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 0: // NotStarted
        return 'project-status-not-started';
      case 1: // InProgress
        return 'project-status-in-progress';
      case 2: // OnHold
        return 'project-status-on-hold';
      case 3: // Completed
        return 'project-status-completed';
      case 4: // Cancelled
        return 'project-status-cancelled';
      default:
        return 'project-status-unknown';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Ej påbörjad';
      case 1: return 'Pågående';
      case 2: return 'Pausad';
      case 3: return 'Avslutad';
      case 4: return 'Avbruten';
      default: return 'Okänd';
    }
  };

  if (loading) {
    return <div className="project-loading">Laddar projekt...</div>;
  }

  return (
    <div className="project-container">
      <div className="project-header">
        <h1 className="project-title">Projektlista</h1>
        <Link 
          to="/projects/new" 
          className="project-create-button"
        >
          Skapa nytt projekt
        </Link>
      </div>

      {error && (
        <div className="project-error-message">
          {error}
        </div>
      )}

      {projects.length === 0 && !error ? (
        <p className="project-empty-message">Inga projekt hittades.</p>
      ) : (//AI
        <div className="project-table-container">
          <table className="project-table">
            <thead className="project-table-header">
              <tr>
                <th className="project-table-cell project-table-header-cell">Namn</th>
                <th className="project-table-cell project-table-header-cell">Beskrivning</th>
                <th className="project-table-cell project-table-header-cell">Kund</th>
                <th className="project-table-cell project-table-header-cell">Startdatum</th>
                <th className="project-table-cell project-table-header-cell">Slutdatum</th>
                <th className="project-table-cell project-table-header-cell">Status</th>
                <th className="project-table-cell project-table-header-cell">Åtgärder</th>
              </tr>
            </thead>
            <tbody>
  {projects.map((project) => (
    <tr key={project.id} className="project-table-row">
      <td className="project-table-cell">{project.name}</td>
      <td className="project-table-cell">{project.description}</td>
      <td className="project-table-cell">{project.clientName}</td>
      <td className="project-table-cell">{new Date(project.startDate).toLocaleDateString()}</td>
      <td className="project-table-cell">
        {project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}
      </td>
      <td className="project-table-cell">
        <span className={`project-status-badge ${getStatusBadgeClass(project.status)}`}>
          {getStatusText(project.status)}
        </span>
      </td>
      <td className="project-table-cell">
        <div className="project-actions">
          <Link 
            to={`/projects/edit/${project.id}`}
            className="project-edit-button"
          >
            Redigera
          </Link>
          <button
            onClick={() => handleDelete(project.id)}
            className="project-delete-button"
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

export default Projects;