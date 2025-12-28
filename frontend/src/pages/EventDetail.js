import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tickets, setTickets] = useState(1);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const data = await api.getEvent(id);
      setEvent(data);
      setError('');
    } catch (err) {
      setError('Événement non trouvé');
      console.error('Error loading event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Veuillez vous connecter pour réserver');
        return;
      }

      const reservationData = {
        eventId: event.id,
        userId: 1, // À remplacer par l'ID de l'utilisateur connecté
        tickets: tickets,
        totalPrice: event.price * tickets
      };

      // Ici, vous appelleriez l'API de réservation
      // Pour l'instant, simulation
      alert(`Réservation de ${tickets} billet(s) pour "${event.title}" confirmée !`);

    } catch (err) {
      console.error('Reservation error:', err);
      alert('Erreur lors de la réservation');
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
          <div className="loading">Chargement de l'événement...</div>
        </div>
    );
  }

  if (error || !event) {
    return (
        <div className="error-container">
          <div className="error-message">
            <h2>Événement non trouvé</h2>
            <p>L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link to="/events" className="back-button">
              ← Retour aux événements
            </Link>
          </div>
        </div>
    );
  }

  return (
      <div className="event-detail-container">
        <div className="event-detail-header">
          <Link to="/events" className="back-link">
            ← Retour aux événements
          </Link>
          <h1>{event.title}</h1>
        </div>

        <div className="event-detail-content">
          <div className="event-detail-left">
            <div className="event-image">
              {event.image ? (
                  <img src={event.image} alt={event.title} />
              ) : (
                  <div className="placeholder-image">
                    <span>🎭</span>
                  </div>
              )}
            </div>

            <div className="event-description-box">
              <h3>Description</h3>
              <p>{event.description || 'Aucune description disponible.'}</p>
            </div>
          </div>

          <div className="event-detail-right">
            <div className="event-info-card">
              <h3>Détails de l'événement</h3>

              <div className="info-item">
                <span className="info-label">📅 Date et heure :</span>
                <span className="info-value">{formatDate(event.date)}</span>
              </div>

              <div className="info-item">
                <span className="info-label">📍 Lieu :</span>
                <span className="info-value">{event.location || 'Non spécifié'}</span>
              </div>

              <div className="info-item">
                <span className="info-label">💰 Prix :</span>
                <span className="info-value price">{event.price ? `${event.price.toFixed(2)} €` : 'Gratuit'}</span>
              </div>

              <div className="info-item">
                <span className="info-label">🎟️ Places disponibles :</span>
                <span className="info-value">{event.availableTickets || 0}</span>
              </div>

              <div className="info-item">
                <span className="info-label">📊 Catégorie :</span>
                <span className="info-value">{event.category || 'Général'}</span>
              </div>

              {/* Section réservation */}
              <div className="reservation-section">
                <h3>Réserver des billets</h3>

                <div className="ticket-selector">
                  <label>Nombre de billets :</label>
                  <div className="ticket-controls">
                    <button
                        onClick={() => setTickets(Math.max(1, tickets - 1))}
                        disabled={tickets <= 1}
                    >
                      −
                    </button>
                    <span className="ticket-count">{tickets}</span>
                    <button
                        onClick={() => setTickets(tickets + 1)}
                        disabled={tickets >= (event.availableTickets || 5)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="price-summary">
                  <div className="price-item">
                    <span>{tickets} × {event.price ? `${event.price.toFixed(2)} €` : 'Gratuit'}</span>
                    <span>{event.price ? (event.price * tickets).toFixed(2) : '0.00'} €</span>
                  </div>
                  <div className="price-total">
                    <span>Total :</span>
                    <span className="total-amount">
                    {event.price ? (event.price * tickets).toFixed(2) : '0.00'} €
                  </span>
                  </div>
                </div>

                <button
                    className="reserve-button"
                    onClick={handleReservation}
                    disabled={!event.availableTickets || event.availableTickets <= 0}
                >
                  {!event.availableTickets || event.availableTickets <= 0
                      ? 'COMPLET'
                      : `Réserver ${tickets} billet${tickets > 1 ? 's' : ''}`}
                </button>

                {(!event.availableTickets || event.availableTickets <= 0) && (
                    <p className="sold-out-message">Désolé, cet événement est complet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EventDetail;