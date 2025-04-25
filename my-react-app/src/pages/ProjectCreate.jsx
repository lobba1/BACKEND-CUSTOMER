import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api/api-config';

const ProjectCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    StartDate: new Date().toISOString().split('T')[0],
    EndDate: '',
    StatusId: 0,
    ClientId: '',
    ManagerManagerId: '',  // Changed from ProjectManagerId to match backend
    ProjectId: ''          // This might be needed too
  });
  
  const [clients, setClients] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clients
        console.log('Fetching clients from:', `${API_URL}/clients`);
        const clientsResponse = await axios.get(`${API_URL}/clients`);
        console.log('Clients data:', clientsResponse.data);
        setClients(clientsResponse.data);
        
        // Try to fetch project managers - first try employees (plural)
        try {
          console.log('Trying to fetch from:', `${API_URL}/employees`);
          const employeesResponse = await axios.get(`${API_URL}/employees`);
          console.log('Employees data:', employeesResponse.data);
          setProjectManagers(employeesResponse.data);
        } catch (empError) {
          console.log('Could not fetch from /employees, trying /projects to extract managers');
          
          // Fallback: extract project managers from projects
          const projectsResponse = await axios.get(`${API_URL}/projects`);
          console.log('Projects data for manager extraction:', projectsResponse.data);
          
          // Extract unique project managers
          const uniqueManagers = [];
          const managerIds = new Set();
          
          projectsResponse.data.forEach(project => {
            // Check for different possible property names
            const managerId = project.projectManagerid || project.projectManagerId;
            const managerName = project.fullName || 
                               (project.projectManager && project.projectManager.fullName) ||
                               (project.firstName && project.lastName ? 
                                `${project.firstName} ${project.lastName}` : null);
            
            if (managerId && !managerIds.has(managerId) && managerName) {
              managerIds.add(managerId);
              uniqueManagers.push({
                id: managerId,
                fullName: managerName
              });
            }
          });
          
          console.log('Extracted project managers:', uniqueManagers);
          setProjectManagers(uniqueManagers);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Could not fetch data: ' + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started. Data:', formData);
    
    try {
      // Validation
      const missingFields = [];
      if (!formData.Title) missingFields.push('Projekttitel');
      if (!formData.Description) missingFields.push('Beskrivning');
      if (!formData.StartDate) missingFields.push('Startdatum');
      if (!formData.ClientId) missingFields.push('Kund');
      if (!formData.ManagerManagerId) missingFields.push('Projektledare');

      if (missingFields.length > 0) {
        const errorMsg = `Följande fält saknas: ${missingFields.join(', ')}`;
        console.error(errorMsg);
        setError(errorMsg);
        return;
      }

      // Prepare data
      const projectData = {
        Title: formData.Title,
        Description: formData.Description,
        StartDate: formData.StartDate,
        EndDate: formData.EndDate || null,
        StatusId: parseInt(formData.StatusId),
        ClientId: parseInt(formData.ClientId),
        ManagerManagerId: parseInt(formData.ManagerManagerId),
        ProjectId: formData.ProjectId || null
      };

      console.log('Sending project data:', projectData);

      const response = await axios.post(`${API_URL}/projects`, projectData);

      console.log('Project creation response:', response.data);
      
      navigate('/projects');
    } catch (error) {
      console.error('DETAILED ERROR creating project:', error);
      
      if (error.response) {
        console.error('Server responded with error:', {
          status: error.response.status, 
          data: error.response.data
        });
        setError(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response from server. Check backend connection.');
      } else {
        console.error('Error setting up request:', error.message);
        setError(`Request Setup Error: ${error.message}`);
      }
    }
  };

  if (loading) {
    return <div className="project-loading">Laddar...</div>;
  }

  return (
    <div className="project-container">
      <h1 className="project-title">Skapa nytt projekt</h1>
      
      {error && (
        <div className="project-error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="Title">PROJEKTTITEL</label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Description">BESKRIVNING</label>
          <textarea
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ClientId">KUND</label>
          <select
            id="ClientId"
            name="ClientId"
            value={formData.ClientId}
            onChange={handleChange}
            required
          >
            <option value="">Välj kund</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.clientName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
  <label htmlFor="ManagerManagerId">PROJEKTLEDARE</label>
  <select
    id="ManagerManagerId"
    name="ManagerManagerId"
    value={formData.ManagerManagerId}
    onChange={handleChange}
    required
  >
    <option value="">Välj projektledare</option>
    {projectManagers.map(manager => (
      <option key={manager.id} value={manager.id}>
        {manager.fullName}
      </option>
    ))}
  </select>
</div>
        <div className="form-group">
          <label htmlFor="StartDate">STARTDATUM</label>
          <input
            type="date"
            id="StartDate"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="EndDate">SLUTDATUM</label>
          <input
            type="date"
            id="EndDate"
            name="EndDate"
            value={formData.EndDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="StatusId">STATUS</label>
          <select
            id="StatusId"
            name="StatusId"
            value={formData.StatusId}
            onChange={handleChange}
            required
          >
            <option value="0">Ej påbörjad</option>
            <option value="1">Pågående</option>
            <option value="2">Pausad</option>
            <option value="3">Avslutad</option>
            <option value="4">Avbruten</option>
          </select>
        </div>

        <button type="submit" className="project-submit-button">
          Skapa projekt
        </button>
      </form>
    </div>
  );
};

export default ProjectCreate;