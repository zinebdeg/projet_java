# Guide de Démarrage Rapide

## Démarrage Local (Sans Docker)

### Étape 1 : Préparer les Bases de Données

Créer les bases de données MySQL :

```sql
CREATE DATABASE userdb;
CREATE DATABASE eventdb;
CREATE DATABASE reservationdb;
CREATE DATABASE paymentdb;
```

### Étape 2 : Compiler le Projet

```bash
mvn clean install
```

### Étape 3 : Démarrer les Services dans l'Ordre

**Terminal 1 - Eureka Server**
```bash
cd eureka-server
mvn spring-boot:run
```
Attendre que le service démarre (http://localhost:8761)

**Terminal 2 - Config Server**
```bash
cd config-server
mvn spring-boot:run
```

**Terminal 3 - API Gateway**
```bash
cd api-gateway
mvn spring-boot:run
```

**Terminal 4 - User Service**
```bash
cd user-service
mvn spring-boot:run
```

**Terminal 5 - Event Service**
```bash
cd event-service
mvn spring-boot:run
```

**Terminal 6 - Reservation Service**
```bash
cd reservation-service
mvn spring-boot:run
```

**Terminal 7 - Payment Service**
```bash
cd payment-service
mvn spring-boot:run
```

**Terminal 8 - Notification Service (Optionnel)**
```bash
cd notification-service
mvn spring-boot:run
```

### Étape 4 : Vérifier le Démarrage

1. Ouvrir Eureka Dashboard : http://localhost:8761
2. Vérifier que tous les services sont enregistrés
3. Tester l'API Gateway : http://localhost:8080

## Démarrage avec Docker Compose

### Prérequis
- Docker et Docker Compose installés

### Étapes

1. **Compiler tous les projets**
```bash
mvn clean install
```

2. **Démarrer tous les services**
```bash
docker-compose up -d
```

3. **Vérifier les logs**
```bash
docker-compose logs -f
```

4. **Arrêter les services**
```bash
docker-compose down
```

## Tests des Endpoints

### 1. Créer un Utilisateur
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "USER"
  }'
```

### 2. Créer un Événement
```bash
curl -X POST http://localhost:8080/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Match de Football",
    "description": "PSG vs Marseille",
    "eventDate": "2025-12-31T20:00:00",
    "location": "Parc des Princes",
    "totalTickets": 40000,
    "ticketPrice": 50.0,
    "organizerId": 1,
    "participants": "PSG, Marseille"
  }'
```

### 3. Créer une Réservation
```bash
curl -X POST http://localhost:8080/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": 1,
    "userId": 1,
    "numberOfTickets": 2
  }'
```

### 4. Traiter un Paiement
```bash
curl -X POST http://localhost:8080/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "reservationId": 1,
    "userId": 1
  }'
```

## Ports des Services

- Eureka Server: 8761
- Config Server: 8888
- API Gateway: 8080
- User Service: 8081
- Event Service: 8082
- Reservation Service: 8083
- Payment Service: 8084
- Notification Service: 8085

## Dépannage

### Les services ne démarrent pas
1. Vérifier que MySQL est démarré
2. Vérifier que les ports ne sont pas déjà utilisés
3. Vérifier les logs dans chaque terminal

### Eureka ne trouve pas les services
1. Attendre quelques secondes après le démarrage
2. Vérifier que les services sont bien configurés pour se connecter à Eureka
3. Vérifier les URLs dans les fichiers application.yml

### Erreurs de connexion à la base de données
1. Vérifier que MySQL est démarré
2. Vérifier les credentials dans application.yml
3. Vérifier que les bases de données existent






