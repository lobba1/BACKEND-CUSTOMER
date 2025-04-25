import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api/api-config';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 0,
    clientId: ''
  });
  
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hämta projektet och klienterna parallellt
        console.log(`Försöker hämta projekt med ID: ${id}`);
        const [projectResponse, clientsResponse] = await Promise.all([
          axios.get(`${API_URL}/projects/${id}`),
          axios.get(`${API_URL}/clients`)
        ]);
        
        console.log('Projekt hämtat:', projectResponse.data);
        console.log('Klienter hämtade:', clientsResponse.data);
        
        const projectData = projectResponse.data;
        
        // AI
        const formattedStartDate = new Date(projectData.startDate).toISOString().split('T')[0];
        const formattedEndDate = projectData.endDate
          ? new Date(projectData.endDate).toISOString().split('T')[0]
          : '';
        
        setFormData({
          id: projectData.id,
          name: projectData.name,
          description: projectData.description,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          status: projectData.status,
          clientId: projectData.clientId
        });
        
        setClients(clientsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Fel vid hämtning av data:', error);
        // AI
        if (error.response) {
          // Servern svarade med en status-kod utanför 2xx
          console.error('Server svarade med fel:', error.response.status, error.response.data);
          setError(`API-fel: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
          // Begäran gjordes men inget svar mottogs
          console.error('Ingen respons från servern:', error.request);
          setError('Kunde inte kontakta API-servern. Kontrollera att backend-servern är igång.');
        } else {
          // Något annat fele
          console.error('Felmeddelande:', error.message);
          setError(`Fel: ${error.message}`);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validering
      if (!!formData.name && !!formData.description && !!formData.startDate ) {
        setError('Vänligen fyll i alla obligatoriska fält.');
        return;
      }

      // Uppdatera projektet
      console.log('Skickar uppdaterad projektdata:', formData);
      await axios.put(`${API_URL}/projects/${id}`, {
        ...formData,
        clientId: parseInt(formData.clientId),
        status: parseInt(1)
  
      });
      
      //tillbaka till projektlistan
      navigate('/projects');
    } catch (error) {
      console.error('Fel vid uppdatering av projekt:', error);
      // felhantering
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
  };

  if (loading) {
    return <div className="project-loading">Laddar projektinformation...</div>;
  }
  console.log(clients)

  return (
    <div className="project-container">
      <h1 className="project-title">REDIGERA PROJEKT </h1>
      
      {error && (
        <div className="project-error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="name">PROJEKTNUMMER </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.id}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">BESKRIVNING </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="clientId">KLIENT </label>
          <select
            id="clientId"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            required
          >
            {clients.map(client =>  { 
              return (
              <option key={client.id} value={client.id}>
                {client.clientName }
              </option>
            )})}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="startDate">STARTDATUM </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">SLUTDATUM (valfritt)</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="project-form-buttons">
          <button
            className="project-save-button"
            type="submit"
          >
            Spara ändringar
          </button>
          <button
            className="project-cancel-button"
            type="button"
            onClick={() => navigate('/projects')}
          >
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectEdit;