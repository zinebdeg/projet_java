# Frontend - Plateforme de Gestion d'Événements

Interface utilisateur React pour la plateforme de gestion d'événements.

## 🚀 Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn
- Le backend doit être démarré et accessible sur `http://localhost:8080`

### Étapes d'installation

1. **Installer les dépendances**
```bash
cd frontend
npm install
```

2. **Démarrer le serveur de développement**
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Barre de navigation
│   │   └── Navbar.css
│   ├── context/
│   │   └── AuthContext.js     # Gestion de l'authentification
│   ├── pages/
│   │   ├── Home.js            # Page d'accueil
│   │   ├── Login.js           # Page de connexion
│   │   ├── Register.js        # Page d'inscription
│   │   ├── Events.js          # Liste des événements
│   │   ├── EventDetail.js     # Détails d'un événement
│   │   ├── CreateEvent.js     # Créer un événement
│   │   ├── MyReservations.js  # Mes réservations
│   │   └── ReservationDetail.js  # Détails d'une réservation
│   ├── services/
│   │   └── api.js             # Service API pour communiquer avec le backend
│   ├── App.js                 # Composant principal avec routing
│   └── index.js               # Point d'entrée de l'application
└── package.json
```

## 🎯 Fonctionnalités

### Authentification
- **Inscription** : Création d'un nouveau compte utilisateur
- **Connexion** : Authentification avec nom d'utilisateur et mot de passe
- **Gestion de session** : Stockage de l'utilisateur connecté dans localStorage

### Gestion des Événements
- **Liste des événements** : Affichage de tous les événements disponibles
- **Détails d'un événement** : Informations complètes d'un événement
- **Création d'événements** : Pour les organisateurs (ORGANIZER) et admins (ADMIN)

### Réservations
- **Réservation de tickets** : Réserver entre 1 et 4 tickets par événement
- **Mes réservations** : Liste de toutes les réservations de l'utilisateur
- **Détails de réservation** : Informations complètes et paiement

### Paiement
- **Traitement du paiement** : Paiement d'une réservation en attente
- **Statut du paiement** : Suivi du statut (SUCCESS, FAILED)

## 🔧 Configuration

### URL de l'API
Par défaut, l'application se connecte à l'API Gateway sur `http://localhost:8080`.

Pour modifier l'URL de l'API, éditez le fichier `src/services/api.js` :

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 📦 Build de Production

Pour créer une version de production :

```bash
npm run build
```

Les fichiers optimisés seront créés dans le dossier `build/`.

## 🛠️ Technologies Utilisées

- **React 18** : Bibliothèque UI
- **React Router DOM 6** : Routage
- **Context API** : Gestion d'état (authentification)
- **Fetch API** : Appels HTTP vers le backend

## 🔐 Rôles Utilisateurs

- **USER** : Utilisateur standard (peut réserver des tickets)
- **ORGANIZER** : Organisateur (peut créer des événements)
- **ADMIN** : Administrateur (accès complet)

## 📝 Notes

- L'application nécessite que le backend soit démarré et accessible
- L'authentification est gérée via localStorage (les informations de session persistent après fermeture du navigateur)
- Les mots de passe sont envoyés en clair au backend (le backend doit gérer le hachage)

## 🐛 Dépannage

### L'application ne se connecte pas au backend
- Vérifiez que le backend est démarré sur le port 8080
- Vérifiez les CORS dans la configuration du backend
- Vérifiez que l'API Gateway est accessible

### Erreurs CORS
Si vous rencontrez des erreurs CORS, assurez-vous que le backend autorise les requêtes depuis `http://localhost:3000`.

## 📄 Licence

Ce projet fait partie de la plateforme de gestion d'événements.

