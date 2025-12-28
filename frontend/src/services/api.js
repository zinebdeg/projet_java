const API_BASE = "http://localhost:8080";

export const userAPI = {
  login: async (username, password) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Échec de la connexion');
    }

    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Échec de l\'inscription');
    }

    return response.json();
  },

  getProfile: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/api/users/profile`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  }
};

export const eventAPI = {
  getAllEvents: async () => {
    const response = await fetch(`${API_BASE}/api/events`);
    return response.json();
  },

  getEventById: async (id) => {
    const response = await fetch(`${API_BASE}/api/events/${id}`);
    return response.json();
  },

  createEvent: async (eventData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    return response.json();
  }
};

// ======================
// EXPORT PAR DÉFAUT POUR COMPATIBILITÉ
// ======================

const api = {
  // Méthodes d'authentification
  authenticate: async (username, password) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Échec de la connexion');
    }

    const data = await response.json();
    // Sauvegarder le token si présent
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Échec de l\'inscription');
    }

    return response.json();
  },

  // Méthodes d'événements
  getEvents: async () => {
    const response = await fetch(`${API_BASE}/api/events`);
    return response.json();
  },

  getEvent: async (id) => {
    const response = await fetch(`${API_BASE}/api/events/${id}`);
    return response.json();
  },

  createEvent: async (eventData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    return response.json();
  }
};

export default api;