import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [reserving, setReserving] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const data = await api.getEventById(id);
      setEvent(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement de l\'événement');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (numberOfTickets < 1 || numberOfTickets > 4) {
      setError('Vous pouvez réserver entre 1 et 4 tickets');
      return;
    }

    try {
      setReserving(true);
      setError('');
      const reservation = await api.createReservation({
        eventId: parseInt(id),
        userId: user.id,
        numberOfTickets: numberOfTickets,
      });
      navigate(`/reservation/${reservation.id}`);
    } catch (err) {
      setError('Erreur lors de la réservation. Vérifiez la disponibilité.');
      console.error(err);
    } finally {
      setReserving(false);
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
    return <div className="loading">Chargement...</div>;
  }

  if (!event) {
    return <div className="error-message">Événement non trouvé</div>;
  }

  return (
    <div className="event-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Retour
      </button>
      <div className="event-detail-card">
        <div className="event-detail-header">
          <h1>{event.title}</h1>
          <span className={`event-status status-${event.status?.toLowerCase()}`}>
            {event.status || 'ACTIVE'}
          </span>
        </div>
        <p className="event-description">{event.description}</p>
        <div className="event-info-grid">
          <div className="info-item">
            <span className="info-label">📅 Date et heure</span>
            <span className="info-value">{formatDate(event.eventDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">📍 Lieu</span>
            <span className="info-value">{event.location}</span>
          </div>
          <div className="info-item">
            <span className="info-label">💰 Prix par ticket</span>
            <span className="info-value price">{event.ticketPrice?.toFixed(2)} €</span>
          </div>
          <div className="info-item">
            <span className="info-label">🎟️ Places disponibles</span>
            <span className="info-value">{event.totalTickets || 0}</span>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        {isAuthenticated && (
          <div className="reservation-section">
            <h2>Réserver des tickets</h2>
            <div className="ticket-selector">
              <label htmlFor="tickets">Nombre de tickets (max 4):</label>
              <input
                type="number"
                id="tickets"
                min="1"
                max="4"
                value={numberOfTickets}
                onChange={(e) => setNumberOfTickets(parseInt(e.target.value) || 1)}
                className="ticket-input"
              />
              <div className="total-price">
                Total: <strong>{(event.ticketPrice * numberOfTickets).toFixed(2)} €</strong>
              </div>
            </div>
            <button
              onClick={handleReservation}
              disabled={reserving || numberOfTickets < 1 || numberOfTickets > 4}
              className="reserve-button"
            >
              {reserving ? 'Réservation...' : 'Réserver'}
            </button>
          </div>
        )}
        {!isAuthenticated && (
          <div className="login-prompt">
            <p>Vous devez être connecté pour réserver des tickets.</p>
            <button onClick={() => navigate('/login')} className="login-button">
              Se connecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;

