# Diagramme d'Architecture - Plateforme de Gestion d'Événements

## Vue d'Ensemble

Cette plateforme implémente une architecture microservices pour la gestion d'événements (matchs de football, concerts, conférences).

## Architecture Microservices

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Frontend)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/REST
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    SPRING CLOUD GATEWAY                         │
│                    (Port 8080)                                  │
│  - Routage des requêtes                                        │
│  - Circuit Breaker (Resilience4j)                              │
│  - Load Balancing                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
│  EUREKA SERVER │  │ CONFIG SERVER  │  │   SERVICES     │
│  (Port 8761)   │  │  (Port 8888)   │  │                │
│                │  │                │  │                │
│ - Service      │  │ - Configuration│  │ - User Service │
│   Discovery    │  │   Centralisée  │  │ - Event Service│
│ - Registry     │  │                │  │ - Reservation │
└────────────────┘  └────────────────┘  │   Service      │
                                         │ - Payment      │
                                         │   Service      │
                                         │ - Notification │
                                         │   Service      │
                                         └────────────────┘
```

## Flux de Communication

### 1. Flux de Réservation et Paiement

```
Client → API Gateway → Reservation Service
                              │
                              ├─→ Event Service (vérifier disponibilité)
                              │
                              └─→ Payment Service
                                      │
                                      ├─→ Reservation Service (récupérer réservation)
                                      │
                                      └─→ Event Service (récupérer prix)
                                              │
                                              └─→ Notification Service (envoyer confirmation)
```

### 2. Communication Inter-Services

- **Synchronisation** : REST via OpenFeign
- **Découverte** : Eureka Server
- **Résilience** : Circuit Breaker (Resilience4j)
- **Configuration** : Config Server (centralisée)

## Bases de Données

Chaque microservice possède sa propre base de données MySQL :

- **userdb** : Utilisateurs, authentification, rôles
- **eventdb** : Événements, organisateurs, participants
- **reservationdb** : Réservations, tickets
- **paymentdb** : Paiements, transactions

## Technologies et Patterns

### Technologies
- Spring Boot 3.2.0
- Spring Cloud 2023.0.0
- MySQL 8.0
- Docker & Docker Compose
- Resilience4j (Circuit Breaker)
- Spring Actuator (Monitoring)

### Patterns Architecturaux
- **Microservices** : Services indépendants et découplés
- **API Gateway** : Point d'entrée unique
- **Service Discovery** : Eureka pour la découverte automatique
- **Circuit Breaker** : Gestion des pannes et résilience
- **Database per Service** : Isolation des données
- **Configuration Centralisée** : Gestion unifiée de la configuration

## Sécurité (À Implémenter)

Pour la production, ajouter :
- Spring Security
- JWT Tokens
- OAuth2
- HTTPS

## Scalabilité

- Chaque service peut être scalé indépendamment
- Load balancing via Eureka
- Base de données indépendante par service






