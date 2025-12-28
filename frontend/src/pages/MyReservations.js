import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyReservations.css';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simuler le chargement des réservations
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);

      // Données mockées (à remplacer par un appel API plus tard)
      const mockReservations = [
        {
          id: 1,
          eventId: 1,
          eventTitle: "Concert de Rock",
          eventDate: "2024-03-15T20:00:00",
          tickets: 2,
          totalPrice: 150,
          status: "CONFIRMED",
          reservationDate: "2024-02-10T14:30:00"
        },
        {
          id: 2,
          eventId: 2,
          eventTitle: "Conférence Tech",
          eventDate: "2024-02-15T09:00:00",
          tickets: 1,
          totalPrice: 30,
          status: "CONFIRMED",
          reservationDate: "2024-01-25T11:20:00"
        }
      ];

      setReservations(mockReservations);
      setError('');

    } catch (err) {
      setError('Impossible de charger vos réservations');
      console.error('Error loading reservations:', err);
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

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED': return 'status-confirmed';
      case 'PENDING': return 'status-pending';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'status-default';
    }
  };

  if (loading) {
    return (
        <div className="loading-container">
          <div className="loading">Chargement de vos réservations...</div>
        </div>
    );
  }

  return (
      <div className="reservations-container">
        <div className="reservations-header">
          <h1>Mes Réservations</h1>
          <p>Retrouvez ici toutes vos réservations passées et à venir</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {reservations.length === 0 ? (
            <div className="no-reservations">
              <div className="empty-state">
                <div className="empty-icon">🎫</div>
                <h3>Vous n'avez aucune réservation</h3>
                <p>Commencez par explorer les événements disponibles et réservez vos places !</p>
                <Link to="/events" className="explore-button">
                  Parcourir les événements
                </Link>
              </div>
            </div>
        ) : (
            <>
              <div className="reservations-stats">
                <div className="stat-card">
                  <span className="stat-number">{reservations.length}</span>
                  <span className="stat-label">Réservations totales</span>
                </div>
                <div className="stat-card">
              <span className="stat-number">
                {reservations.filter(r => r.status === 'CONFIRMED').length}
              </span>
                  <span className="stat-label">Confirmées</span>
                </div>
                <div className="stat-card">
              <span className="stat-number">
                {new Set(reservations.map(r => r.eventId)).size}
              </span>
                  <span className="stat-label">Événements différents</span>
                </div>
              </div>

              <div className="reservations-list">
                {reservations.map((reservation) => (
                    <div key={reservation.id} className="reservation-card">
                      <div className="reservation-header">
                        <div className="reservation-title">
                          <h3>{reservation.eventTitle}</h3>
                          <span className={`reservation-status ${getStatusColor(reservation.status)}`}>
                      {reservation.status === 'CONFIRMED' ? 'Confirmée' : reservation.status}
                    </span>
                        </div>
                        <div className="reservation-id">
                          Réf: #{reservation.id.toString().padStart(6, '0')}
                        </div>
                      </div>

                      <div className="reservation-details">
                        <div className="detail-row">
                          <div className="detail-item">
                            <span className="detail-label">📅 Date de l'événement :</span>
                            <span className="detail-value">{formatDate(reservation.eventDate)}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">📅 Date de réservation :</span>
                            <span className="detail-value">{formatDate(reservation.reservationDate)}</span>
                          </div>
                        </div>

                        <div className="detail-row">
                          <div className="detail-item">
                            <span className="detail-label">🎟️ Nombre de billets :</span>
                            <span className="detail-value">{reservation.tickets} billet{reservation.tickets > 1 ? 's' : ''}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">💰 Prix total :</span>
                            <span className="detail-value price">{reservation.totalPrice.toFixed(2)} €</span>
                          </div>
                        </div>
                      </div>

                      <div className="reservation-actions">
                        <Link
                            to={`/events/${reservation.eventId}`}
                            className="action-button view-event"
                        >
                          Voir l'événement
                        </Link>
                        <Link
                            to={`/reservation/${reservation.id}`}
                            className="action-button view-details"
                        >
                          Détails de la réservation
                        </Link>
                        {reservation.status === 'CONFIRMED' && (
                            <button className="action-button cancel-button">
                              Annuler
                            </button>
                        )}
                      </div>
                    </div>
                ))}
              </div>
            </>
        )}
      </div>
  );
};

export default MyReservations;