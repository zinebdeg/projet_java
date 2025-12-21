const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        // Essayer de lire le message d'erreur du backend
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // Si pas de JSON, utiliser le message par défaut
        }
        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }
      if (response.status === 204) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // User APIs
  async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: userData,
    });
  }

  async authenticate(username, password) {
    return this.request('/users/authenticate', {
      method: 'POST',
      body: { username, password },
    });
  }

  async getUserById(id) {
    return this.request(`/users/${id}`);
  }

  // Event APIs
  async getEvents() {
    return this.request('/events');
  }

  async getEventById(id) {
    return this.request(`/events/${id}`);
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: eventData,
    });
  }

  async updateEvent(id, eventData) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: eventData,
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Reservation APIs
  async createReservation(reservationData) {
    return this.request('/reservations', {
      method: 'POST',
      body: reservationData,
    });
  }

  async getReservationById(id) {
    return this.request(`/reservations/${id}`);
  }

  async getReservationsByUser(userId) {
    return this.request(`/reservations/user/${userId}`);
  }

  async confirmReservation(id) {
    return this.request(`/reservations/${id}/confirm`, {
      method: 'PUT',
    });
  }

  async cancelReservation(id) {
    return this.request(`/reservations/${id}/cancel`, {
      method: 'PUT',
    });
  }

  // Payment APIs
  async processPayment(paymentData) {
    return this.request('/payments', {
      method: 'POST',
      body: paymentData,
    });
  }

  async getPaymentsByUser(userId) {
    return this.request(`/payments/user/${userId}`);
  }
}

export default new ApiService();

