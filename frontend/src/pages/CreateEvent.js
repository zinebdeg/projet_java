import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './CreateEvent.css';

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    totalTickets: '',
    ticketPrice: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Vous devez être connecté');
      return;
    }

    try {
      setLoading(true);
      const eventData = {
        ...formData,
        organizerId: user.id,
        totalTickets: parseInt(formData.totalTickets),
        ticketPrice: parseFloat(formData.ticketPrice),
        eventDate: new Date(formData.eventDate).toISOString(),
      };

      const newEvent = await api.createEvent(eventData);
      navigate(`/events/${newEvent.id}`);
    } catch (err) {
      setError('Erreur lors de la création de l\'événement');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event-card">
        <h1>Créer un Nouvel Événement</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Titre de l'événement"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Description de l'événement"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="eventDate">Date et heure *</label>
              <input
                type="datetime-local"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Lieu *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Adresse ou lieu"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="totalTickets">Nombre de places *</label>
              <input
                type="number"
                id="totalTickets"
                name="totalTickets"
                value={formData.totalTickets}
                onChange={handleChange}
                required
                min="1"
                placeholder="Nombre de tickets disponibles"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ticketPrice">Prix par ticket (€) *</label>
              <input
                type="number"
                id="ticketPrice"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cancel-button"
            >
              Annuler
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Création...' : 'Créer l\'événement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

