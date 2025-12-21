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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="loading">Chargement des événements...</div>;
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>Événements Disponibles</h1>
      </div>
      {error && <div className="error-message">{error}</div>}
      {events.length === 0 ? (
        <div className="no-events">Aucun événement disponible pour le moment.</div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <h2>{event.title}</h2>
                <span className={`event-status status-${event.status?.toLowerCase()}`}>
                  {event.status || 'ACTIVE'}
                </span>
              </div>
              <p className="event-description">{event.description}</p>
              <div className="event-details">
                <div className="event-detail">
                  <span className="detail-label">📅 Date:</span>
                  <span>{formatDate(event.eventDate)}</span>
                </div>
                <div className="event-detail">
                  <span className="detail-label">📍 Lieu:</span>
                  <span>{event.location}</span>
                </div>
                <div className="event-detail">
                  <span className="detail-label">🎫 Prix:</span>
                  <span className="price">{event.ticketPrice?.toFixed(2)} €</span>
                </div>
                <div className="event-detail">
                  <span className="detail-label">🎟️ Places disponibles:</span>
                  <span>{event.totalTickets || 0}</span>
                </div>
              </div>
              <Link to={`/events/${event.id}`} className="event-button">
                Voir les détails
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;

