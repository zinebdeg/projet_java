import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalEvents: 0,
        upcomingEvents: 0,
        totalReservations: 0,
        totalSpent: 0
    });

    useEffect(() => {
        // Simuler le chargement des statistiques
        loadDashboardStats();
    }, []);

    const loadDashboardStats = async () => {
        // Données mockées
        setStats({
            totalEvents: 15,
            upcomingEvents: 3,
            totalReservations: 8,
            totalSpent: 420.50
        });
    };

    const recentActivities = [
        { id: 1, type: 'reservation', event: 'Concert de Rock', date: '2024-02-10T14:30:00', status: 'success' },
        { id: 2, type: 'login', event: 'Connexion', date: '2024-02-10T09:15:00', status: 'info' },
        { id: 3, type: 'profile', event: 'Mise à jour du profil', date: '2024-02-09T16:45:00', status: 'info' },
        { id: 4, type: 'reservation', event: 'Conférence Tech', date: '2024-02-08T11:20:00', status: 'success' },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'reservation': return '🎫';
            case 'login': return '🔐';
            case 'profile': return '👤';
            default: return '📝';
        }
    };

    return (
        <div className="dashboard-container">
            {/* En-tête du dashboard */}
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h1>Bonjour, {user?.username || 'Utilisateur'} 👋</h1>
                    <p>Bienvenue sur votre tableau de bord. Gérez vos événements et réservations.</p>
                </div>
                <div className="user-info">
                    <div className="avatar">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-details">
                        <span className="user-name">{user?.username || 'Utilisateur'}</span>
                        <span className="user-role">{user?.role === 'ADMIN' ? 'Administrateur' : 'Utilisateur'}</span>
                    </div>
                </div>
            </div>

            {/* Statistiques */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                        <span className="stat-number">{stats.totalEvents}</span>
                        <span className="stat-label">Événements au total</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-content">
                        <span className="stat-number">{stats.upcomingEvents}</span>
                        <span className="stat-label">Événements à venir</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🎟️</div>
                    <div className="stat-content">
                        <span className="stat-number">{stats.totalReservations}</span>
                        <span className="stat-label">Réservations</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <span className="stat-number">{stats.totalSpent.toFixed(2)} €</span>
                        <span className="stat-label">Total dépensé</span>
                    </div>
                </div>
            </div>

            {/* Actions rapides */}
            <div className="quick-actions">
                <h2>Actions rapides</h2>
                <div className="actions-grid">
                    <Link to="/events" className="action-card">
                        <div className="action-icon">🔍</div>
                        <h3>Explorer les événements</h3>
                        <p>Découvrez de nouveaux événements</p>
                    </Link>

                    <Link to="/my-reservations" className="action-card">
                        <div className="action-icon">📋</div>
                        <h3>Mes réservations</h3>
                        <p>Gérez vos réservations</p>
                    </Link>

                    <Link to="/create-event" className="action-card">
                        <div className="action-icon">✨</div>
                        <h3>Créer un événement</h3>
                        <p>Organisez votre propre événement</p>
                    </Link>

                    <Link to="/profile" className="action-card">
                        <div className="action-icon">👤</div>
                        <h3>Mon profil</h3>
                        <p>Modifiez vos informations</p>
                    </Link>
                </div>
            </div>

            {/* Activités récentes */}
            <div className="recent-activities">
                <h2>Activités récentes</h2>
                <div className="activities-list">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="activity-item">
                            <div className="activity-icon">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="activity-content">
                                <h4>
                                    {activity.type === 'reservation' ? 'Nouvelle réservation' :
                                        activity.type === 'login' ? 'Connexion réussie' :
                                            'Mise à jour du profil'}
                                </h4>
                                <p>{activity.event}</p>
                            </div>
                            <div className="activity-time">
                                {formatDate(activity.date)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Événements à venir */}
            <div className="upcoming-events">
                <div className="section-header">
                    <h2>Événements à venir</h2>
                    <Link to="/events" className="view-all">Voir tout →</Link>
                </div>
                <div className="events-preview">
                    <div className="event-preview-card">
                        <div className="event-preview-date">
                            <span className="day">15</span>
                            <span className="month">Mars</span>
                        </div>
                        <div className="event-preview-content">
                            <h3>Concert de Rock</h3>
                            <p>Paris, Accor Arena • 20h00</p>
                        </div>
                        <Link to="/events/1" className="event-preview-button">
                            Détails
                        </Link>
                    </div>

                    <div className="event-preview-card">
                        <div className="event-preview-date">
                            <span className="day">22</span>
                            <span className="month">Mars</span>
                        </div>
                        <div className="event-preview-content">
                            <h3>Festival de Jazz</h3>
                            <p>Lyon, Auditorium • 19h30</p>
                        </div>
                        <Link to="/events/2" className="event-preview-button">
                            Détails
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;