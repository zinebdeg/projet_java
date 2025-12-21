import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎫 Gestion d'Événements
        </Link>
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/events" className="navbar-link">
                Événements
              </Link>
              <Link to="/my-reservations" className="navbar-link">
                Mes Réservations
              </Link>
              <Link to="/create-event" className="navbar-link">
                Créer un Événement
              </Link>
              <div className="navbar-user">
                <span className="navbar-username">{user?.username}</span>
                <button onClick={handleLogout} className="navbar-button">
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Connexion
              </Link>
              <Link to="/register" className="navbar-link">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

