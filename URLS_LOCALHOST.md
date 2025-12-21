# 📍 URLs Localhost - Plateforme de Gestion d'Événements

## 🎯 URLs Principales

### Frontend (Interface Utilisateur)
```
http://localhost:3000
```
**Description :** Interface React pour interagir avec l'application
**Comment accéder :** 
- Ouvrez votre navigateur
- Tapez : `http://localhost:3000`

---

## 🔧 Services Backend

### 1. Eureka Server (Service Discovery)
```
http://localhost:8761
```
**Description :** Dashboard pour voir tous les services enregistrés
**Quand utiliser :** Vérifier que tous les services sont démarrés et enregistrés

---

### 2. API Gateway (Point d'Entrée Principal)
```
http://localhost:8080
```
**Description :** Point d'entrée unique pour toutes les requêtes API
**Exemples d'URLs :**
- `http://localhost:8080/api/events` - Liste des événements
- `http://localhost:8080/api/users/register` - Inscription
- `http://localhost:8080/api/users/authenticate` - Connexion

---

### 3. Config Server
```
http://localhost:8888
```
**Description :** Serveur de configuration centralisé
**Note :** Généralement utilisé en interne par les autres services

---

## 🔌 Microservices Individuels

### User Service
```
http://localhost:8081
```
**Endpoints :**
- `http://localhost:8081/users/register` - Inscription
- `http://localhost:8081/users/authenticate` - Connexion
- `http://localhost:8081/users` - Liste des utilisateurs
- `http://localhost:8081/users/{id}` - Utilisateur par ID

---

### Event Service
```
http://localhost:8082
```
**Endpoints :**
- `http://localhost:8082/events` - Liste des événements
- `http://localhost:8082/events/{id}` - Événement par ID
- `http://localhost:8082/events` (POST) - Créer un événement

---

### Reservation Service
```
http://localhost:8083
```
**Endpoints :**
- `http://localhost:8083/reservations` - Liste des réservations
- `http://localhost:8083/reservations/{id}` - Réservation par ID
- `http://localhost:8083/reservations/user/{userId}` - Réservations d'un utilisateur

---

### Payment Service
```
http://localhost:8084
```
**Endpoints :**
- `http://localhost:8084/payments` - Liste des paiements
- `http://localhost:8084/payments/{id}` - Paiement par ID
- `http://localhost:8084/payments/user/{userId}` - Paiements d'un utilisateur

---

### Notification Service
```
http://localhost:8085
```
**Endpoints :**
- `http://localhost:8085/notifications/send` - Envoyer une notification

---

## 📊 Résumé des Ports

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| **Frontend React** | 3000 | http://localhost:3000 | Interface utilisateur |
| **Eureka Server** | 8761 | http://localhost:8761 | Dashboard services |
| **API Gateway** | 8080 | http://localhost:8080 | Point d'entrée API |
| **Config Server** | 8888 | http://localhost:8888 | Configuration |
| **User Service** | 8081 | http://localhost:8081 | Gestion utilisateurs |
| **Event Service** | 8082 | http://localhost:8082 | Gestion événements |
| **Reservation Service** | 8083 | http://localhost:8083 | Gestion réservations |
| **Payment Service** | 8084 | http://localhost:8084 | Gestion paiements |
| **Notification Service** | 8085 | http://localhost:8085 | Notifications |

---

## 🎯 URLs les Plus Utilisées

### Pour Développement
1. **Frontend :** http://localhost:3000
2. **Eureka Dashboard :** http://localhost:8761
3. **API Gateway :** http://localhost:8080

### Pour Tester les APIs (via API Gateway)
- **Événements :** http://localhost:8080/api/events
- **Inscription :** http://localhost:8080/api/users/register
- **Connexion :** http://localhost:8080/api/users/authenticate
- **Réservations :** http://localhost:8080/api/reservations
- **Paiements :** http://localhost:8080/api/payments

---

## 🔍 Comment Vérifier si un Service est Démarré

### Méthode 1 : Eureka Dashboard
1. Ouvrez : http://localhost:8761
2. Vérifiez que tous les services apparaissent dans la liste

### Méthode 2 : Tester l'Endpoint
Ouvrez dans votre navigateur ou avec curl :
```bash
# Tester l'API Gateway
curl http://localhost:8080/api/events

# Tester un service directement
curl http://localhost:8082/events
```

---

## ✅ Ordre de Démarrage Recommandé

1. **Eureka Server** → http://localhost:8761 (vérifier qu'il démarre)
2. **Config Server** → http://localhost:8888
3. **API Gateway** → http://localhost:8080
4. **User Service** → http://localhost:8081
5. **Event Service** → http://localhost:8082
6. **Reservation Service** → http://localhost:8083
7. **Payment Service** → http://localhost:8084
8. **Frontend** → http://localhost:3000

---

## 🎨 Accès Frontend

Une fois tous les services démarrés :

1. **Ouvrez votre navigateur**
2. **Tapez :** `http://localhost:3000`
3. Vous verrez l'interface utilisateur React

---

## 📝 Notes

- Tous les services doivent être démarrés pour que l'application fonctionne complètement
- L'API Gateway (port 8080) route les requêtes vers les microservices appropriés
- Le frontend (port 3000) communique avec l'API Gateway (port 8080)
- Eureka Dashboard permet de voir l'état de tous les services

