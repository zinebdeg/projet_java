import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './ReservationDetail.css';

const ReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reservation, setReservation] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReservation();
  }, [id]);

  const loadReservation = async () => {
    try {
      setLoading(true);
      const reservationData = await api.getReservationById(id);
      setReservation(reservationData);
      
      if (reservationData?.eventId) {
        const eventData = await api.getEventById(reservationData.eventId);
        setEvent(eventData);
      }
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement de la réservation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!reservation || !event) return;

    try {
      setProcessing(true);
      setError('');
      const payment = await api.processPayment({
        reservationId: reservation.id,
        userId: user.id,
        amount: event.ticketPrice * reservation.numberOfTickets,
      });
      
      if (payment.status === 'SUCCESS') {
        navigate('/my-reservations');
      } else {
        setError('Le paiement a échoué');
      }
    } catch (err) {
      setError('Erreur lors du traitement du paiement');
      console.error(err);
    } finally {
      setProcessing(false);
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

  if (!reservation) {
    return <div className="error-message">Réservation non trouvée</div>;
  }

  const totalAmount = event ? event.ticketPrice * reservation.numberOfTickets : 0;
  const needsPayment = reservation.status === 'PENDING';

  return (
    <div className="reservation-detail-container">
      <button onClick={() => navigate('/my-reservations')} className="back-button">
        ← Retour
      </button>
      <div className="reservation-detail-card">
        <h1>Détails de la Réservation</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="reservation-info">
          <div className="info-section">
            <h2>Informations de réservation</h2>
            <div className="info-item">
              <span className="info-label">Statut:</span>
              <span className={`status status-${reservation.status?.toLowerCase()}`}>
                {reservation.status || 'PENDING'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Nombre de tickets:</span>
              <span className="info-value">{reservation.numberOfTickets}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Date de réservation:</span>
              <span className="info-value">{formatDate(reservation.reservationDate)}</span>
            </div>
          </div>
          {event && (
            <div className="info-section">
              <h2>Événement</h2>
              <div className="info-item">
                <span className="info-label">Titre:</span>
                <span className="info-value">{event.title}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date:</span>
                <span className="info-value">{formatDate(event.eventDate)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Lieu:</span>
                <span className="info-value">{event.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Prix par ticket:</span>
                <span className="info-value price">{event.ticketPrice?.toFixed(2)} €</span>
              </div>
            </div>
          )}
          <div className="payment-section">
            <h2>Paiement</h2>
            <div className="total-amount">
              <span>Montant total:</span>
              <strong>{totalAmount.toFixed(2)} €</strong>
            </div>
            {needsPayment && (
              <button
                onClick={handlePayment}
                disabled={processing}
                className="pay-button"
              >
                {processing ? 'Traitement...' : 'Payer maintenant'}
              </button>
            )}
            {reservation.status === 'CONFIRMED' && (
              <div className="success-message">✅ Réservation confirmée et payée</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;

