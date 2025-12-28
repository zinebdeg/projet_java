import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await api.getEvents();
      setEvents(data || []);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des événements');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date non définie';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
        <div className="loading-container">
          <div className="loading">Chargement des événements...</div>
        </div>
    );
  }

  return (
      <div className="events-container">
        <div className="events-header">
          <h1>Événements Disponibles</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        {events.length === 0 ? (
            <div className="no-events">
              <p>Aucun événement disponible pour le moment.</p>
            </div>
        ) : (
            <div className="events-grid">
              {events.map((event) => (
                  <div key={event.id} className="event-card">
                    <div className="event-image">
                      {event.image ? (
                          <img src={event.image} alt={event.title} />
                      ) : (
                          <div className="placeholder-image">
                            <span>🎭</span>
                          </div>
                      )}
                    </div>

                    <div className="event-content">
                      <div className="event-header">
                        <h2>{event.title}</h2>
                        <span className={`event-status ${event.status ? 'status-active' : ''}`}>
                    {event.status || 'DISPONIBLE'}
                  </span>
                      </div>

                      <p className="event-description">
                        {event.description ?
                            (event.description.length > 100
                                ? `${event.description.substring(0, 100)}...`
                                : event.description)
                            : 'Aucune description disponible'}
                      </p>

                      <div className="event-details">
                        <div className="event-detail">
                          <span className="detail-label">📅 Date:</span>
                          <span className="detail-value">{formatDate(event.date)}</span>
                        </div>

                        <div className="event-detail">
                          <span className="detail-label">📍 Lieu:</span>
                          <span className="detail-value">{event.location || 'Non spécifié'}</span>
                        </div>

                        <div className="event-detail">
                          <span className="detail-label">💰 Prix:</span>
                          <span className="detail-value price">
                      {event.price ? `${event.price.toFixed(2)} €` : 'Gratuit'}
                    </span>
                        </div>

                        {event.availableTickets !== undefined && (
                            <div className="event-detail">
                              <span className="detail-label">🎟️ Places:</span>
                              <span className="detail-value">
                        {event.availableTickets} disponible{event.availableTickets > 1 ? 's' : ''}
                      </span>
                            </div>
                        )}
                      </div>

                      <Link to={`/events/${event.id}`} className="event-button">
                        Voir les détails
                      </Link>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default Events;