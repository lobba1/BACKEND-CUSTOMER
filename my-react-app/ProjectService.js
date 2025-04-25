const API_URL = 'http://localhost:5173/';

// Get all projects
export const getAllProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getAllProjects:', error);
    throw error;
  }
};

// Get project by ID
export const getProjectById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch project with ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getProjectById:', error);
    throw error;
  }
};

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in createProject:', error);
    throw error;
  }
};

// Update an existing project
export const updateProject = async (projectData) => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update project with ID: ${projectData.id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in updateProject:', error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete project with ID: ${id}`);
    }
    return true;
  } catch (error) {
    console.error('Error in deleteProject:', error);
    throw error;
  }
};

// File: services/customerService.js
const CUSTOMER_API_URL = 'https://localhost:7100/api';

// Get all customers
export const getAllCustomers = async () => {
  try {
    const response = await fetch(`${CUSTOMER_API_URL}/customers`);
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getAllCustomers:', error);
    throw error;
  }
};

// Get customer by ID
export const getCustomerById = async (id) => {
  try {
    const response = await fetch(`${CUSTOMER_API_URL}/customers/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch customer with ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getCustomerById:', error);
    throw error;
  }
};