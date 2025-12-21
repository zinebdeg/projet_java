import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Plateforme de Gestion d'Événements</h1>
        <p>Découvrez et réservez vos événements préférés</p>
        {isAuthenticated ? (
          <div className="home-actions">
            <Link to="/events" className="primary-button">
              Voir les événements
            </Link>
            <Link to="/my-reservations" className="secondary-button">
              Mes réservations
            </Link>
          </div>
        ) : (
          <div className="home-actions">
            <Link to="/register" className="primary-button">
              S'inscrire
            </Link>
            <Link to="/login" className="secondary-button">
              Se connecter
            </Link>
          </div>
        )}
      </div>
      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🎫</div>
          <h3>Réservation facile</h3>
          <p>Réservez vos tickets en quelques clics</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Gestion d'événements</h3>
          <p>Créez et gérez vos événements facilement</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Paiement sécurisé</h3>
          <p>Paiement rapide et sécurisé</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

