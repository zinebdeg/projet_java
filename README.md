# Plateforme de Gestion d'Événements - Architecture Microservices

## Description du Projet

Ce projet implémente une plateforme de gestion d'événements (matchs de football, concerts, conférences) basée sur une architecture microservices utilisant Spring Boot et Spring Cloud.

## Architecture

Le projet est organisé en plusieurs microservices indépendants :

### Infrastructure Spring Cloud

1. **Eureka Server** (Port 8761)
   - Service de découverte de services
   - Permet aux microservices de s'enregistrer et de se découvrir

2. **Config Server** (Port 8888)
   - Configuration centralisée pour tous les microservices

3. **API Gateway** (Port 8080)
   - Point d'entrée unique pour toutes les requêtes
   - Routage vers les différents microservices
   - Circuit Breaker avec Resilience4j

### Microservices Métier

4. **User Service** (Port 8081)
   - Gestion des comptes utilisateurs
   - Inscription, authentification
   - Gestion des rôles (USER, ORGANIZER, ADMIN)
   - Base de données : `userdb`

5. **Event Service** (Port 8082)
   - CRUD complet des événements
   - Gestion des organisateurs et participants
   - Base de données : `eventdb`

6. **Reservation Service** (Port 8083)
   - Gestion des réservations de tickets
   - Vérification de disponibilité
   - Limite de 4 tickets par utilisateur
   - Base de données : `reservationdb`

7. **Payment Service** (Port 8084)
   - Simulation de paiement
   - Calcul automatique du montant total
   - Gestion des statuts de paiement (SUCCESS, FAILED)
   - Base de données : `paymentdb`

8. **Notification Service** (Port 8085) - Bonus
   - Envoi d'emails/SMS
   - Notifications lors des réservations et paiements

## Technologies Utilisées

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Cloud 2023.0.0**
- **Spring Cloud Netflix Eureka** (Service Discovery)
- **Spring Cloud Gateway** (API Gateway)
- **Spring Cloud Config** (Configuration Server)
- **Spring Data JPA**
- **MySQL 8.0**
- **OpenFeign** (Communication inter-services)
- **Resilience4j** (Circuit Breaker)
- **Spring Actuator** (Monitoring)
- **Maven** (Gestion des dépendances)

## Prérequis

- Java JDK 17 ou supérieur
- Maven 3.6+
- MySQL 8.0 (ou Docker pour utiliser docker-compose)
- Docker et Docker Compose (optionnel, pour le déploiement)

## Installation et Démarrage

### Option 1 : Démarrage Local (Sans Docker)

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd event-management-platform
   ```

2. **Créer les bases de données MySQL**
   ```sql
   CREATE DATABASE userdb;
   CREATE DATABASE eventdb;
   CREATE DATABASE reservationdb;
   CREATE DATABASE paymentdb;
   ```

3. **Configurer les connexions MySQL** dans les fichiers `application.yml` de chaque service

4. **Compiler le projet**
   ```bash
   mvn clean install
   ```

5. **Démarrer les services dans l'ordre suivant :**
   ```bash
   # Terminal 1 - Eureka Server
   cd eureka-server
   mvn spring-boot:run

   # Terminal 2 - Config Server
   cd config-server
   mvn spring-boot:run

   # Terminal 3 - API Gateway
   cd api-gateway
   mvn spring-boot:run

   # Terminal 4 - User Service
   cd user-service
   mvn spring-boot:run

   # Terminal 5 - Event Service
   cd event-service
   mvn spring-boot:run

   # Terminal 6 - Reservation Service
   cd reservation-service
   mvn spring-boot:run

   # Terminal 7 - Payment Service
   cd payment-service
   mvn spring-boot:run

   # Terminal 8 - Notification Service
   cd notification-service
   mvn spring-boot:run
   ```

### Option 2 : Démarrage avec Docker Compose

1. **Compiler tous les projets**
   ```bash
   mvn clean install
   ```

2. **Démarrer tous les services**
   ```bash
   docker-compose up -d
   ```

3. **Vérifier les services**
   - Eureka Dashboard : http://localhost:8761
   - API Gateway : http://localhost:8080

## Endpoints API

Tous les endpoints sont accessibles via l'API Gateway à `http://localhost:8080`

### User Service
- `POST /api/users/register` - Inscription
- `POST /api/users/authenticate` - Authentification
- `GET /api/users/{id}` - Obtenir un utilisateur
- `GET /api/users` - Liste des utilisateurs

### Event Service
- `POST /api/events` - Créer un événement
- `GET /api/events/{id}` - Obtenir un événement
- `GET /api/events` - Liste des événements
- `PUT /api/events/{id}` - Modifier un événement
- `DELETE /api/events/{id}` - Supprimer un événement

### Reservation Service
- `POST /api/reservations` - Créer une réservation
- `GET /api/reservations/{id}` - Obtenir une réservation
- `GET /api/reservations/user/{userId}` - Réservations d'un utilisateur
- `PUT /api/reservations/{id}/confirm` - Confirmer une réservation
- `PUT /api/reservations/{id}/cancel` - Annuler une réservation

### Payment Service
- `POST /api/payments` - Traiter un paiement
- `GET /api/payments/{id}` - Obtenir un paiement
- `GET /api/payments/user/{userId}` - Paiements d'un utilisateur

### Notification Service
- `POST /api/notifications/send` - Envoyer une notification

## Structure du Projet

```
event-management-platform/
├── pom.xml                          # POM parent
├── docker-compose.yml               # Configuration Docker Compose
├── eureka-server/                   # Service Discovery
├── config-server/                   # Configuration Server
├── api-gateway/                     # API Gateway
├── user-service/                    # Service Utilisateur
├── event-service/                   # Service Événement
├── reservation-service/             # Service Réservation
├── payment-service/                 # Service Paiement
└── notification-service/            # Service Notification (Bonus)
```

## Fonctionnalités Implémentées

### Contraintes Techniques Respectées
- ✅ Chaque microservice a sa propre base de données MySQL
- ✅ Communication synchrone via REST avec OpenFeign
- ✅ Service Discovery avec Eureka
- ✅ API Gateway comme point d'entrée unique
- ✅ Configuration centralisée avec Config Server
- ✅ Circuit Breaker avec Resilience4j
- ✅ Monitoring avec Spring Actuator

### Fonctionnalités Métier
- ✅ Gestion des utilisateurs (inscription, authentification, rôles)
- ✅ CRUD complet des événements
- ✅ Gestion des réservations avec vérification de disponibilité
- ✅ Limite de 4 tickets par réservation
- ✅ Simulation de paiement avec calcul automatique
- ✅ Gestion des statuts (réservation, paiement)

### Bonus Implémentés
- ✅ Service Notification (emails/SMS)
- ✅ Docker Compose pour le déploiement

## Diagramme d'Architecture

```
                    ┌─────────────┐
                    │   Client    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ API Gateway │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌──────▼──────┐    ┌─────▼─────┐
   │ Eureka  │      │   Config    │    │  Services │
   │ Server  │      │   Server    │    │  (8 MS)   │
   └─────────┘      └─────────────┘    └───────────┘
```

## Notes Importantes

1. **Mots de passe** : Dans un environnement de production, les mots de passe doivent être hashés (BCrypt recommandé)
2. **Sécurité** : Spring Security et JWT peuvent être ajoutés pour sécuriser les endpoints
3. **Configuration Email** : Configurer les credentials SMTP dans `notification-service/application.yml` pour l'envoi d'emails réels
4. **Base de données** : Les bases de données sont créées automatiquement si elles n'existent pas

## Auteur

Projet réalisé dans le cadre d'un contrôle JEE - Architecture Microservices

## Licence

Ce projet est à des fins éducatives.






