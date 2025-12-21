import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './MyReservations.css';

const MyReservations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadReservations();
  }, [user, navigate]);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await api.getReservationsByUser(user.id);
      setReservations(data || []);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement de vos réservations');
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="loading">Chargement de vos réservations...</div>;
  }

  return (
    <div className="reservations-container">
      <div className="reservations-header">
        <h1>Mes Réservations</h1>
      </div>
      {error && <div className="error-message">{error}</div>}
      {reservations.length === 0 ? (
        <div className="no-reservations">
          <p>Vous n'avez aucune réservation pour le moment.</p>
          <Link to="/events" className="browse-events-button">
            Parcourir les événements
          </Link>
        </div>
      ) : (
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-header">
                <h3>Réservation #{reservation.id}</h3>
                <span className={`status status-${reservation.status?.toLowerCase()}`}>
                  {reservation.status || 'PENDING'}
                </span>
              </div>
              <div className="reservation-details">
                <div className="detail-item">
                  <span className="detail-label">Nombre de tickets:</span>
                  <span>{reservation.numberOfTickets}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date de réservation:</span>
                  <span>{formatDate(reservation.reservationDate)}</span>
                </div>
              </div>
              <Link to={`/reservation/${reservation.id}`} className="view-details-button">
                Voir les détails
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;

