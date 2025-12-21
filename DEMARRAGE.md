# Guide de Démarrage - Application Complète

## 🚀 Démarrage Rapide

### Prérequis
- ✅ Java 17 installé
- ✅ Maven installé
- ✅ PostgreSQL installé et démarré
- ✅ Node.js et npm installés (pour le frontend)

---

## 📋 Étape 1 : Vérifier PostgreSQL

Assurez-vous que PostgreSQL est démarré et que les bases de données existent :

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Vérifier les bases de données
\l

# Vous devriez voir : userdb, eventdb, reservationdb, paymentdb
# Si elles n'existent pas, créez-les :
CREATE DATABASE userdb;
CREATE DATABASE eventdb;
CREATE DATABASE reservationdb;
CREATE DATABASE paymentdb;

# Quitter
\q
```

---

## 🔧 Étape 2 : Compiler le Backend (Java/Maven)

Ouvrez un terminal à la racine du projet :

```bash
# Se placer à la racine du projet
cd C:\Users\user\Downloads\event-management-platform

# Compiler tous les services
mvn clean install
```

**⚠️ Important :** Cette étape peut prendre quelques minutes la première fois.

---

## 🌐 Étape 3 : Démarrer les Services Backend

Vous devez démarrer les services dans l'ordre. **Ouvrez 6 terminaux différents** :

### Terminal 1 - Eureka Server (Port 8761)
```bash
cd eureka-server
mvn spring-boot:run
```
Attendez que vous voyiez : `Started EurekaServerApplication`

---

### Terminal 2 - Config Server (Port 8888)
```bash
cd config-server
mvn spring-boot:run
```

---

### Terminal 3 - API Gateway (Port 8080)
```bash
cd api-gateway
mvn spring-boot:run
```

---

### Terminal 4 - User Service (Port 8081)
```bash
cd user-service
mvn spring-boot:run
```

---

### Terminal 5 - Event Service (Port 8082)
```bash
cd event-service
mvn spring-boot:run
```

---

### Terminal 6 - Reservation Service (Port 8083)
```bash
cd reservation-service
mvn spring-boot:run
```

---

### Terminal 7 - Payment Service (Port 8084)
```bash
cd payment-service
mvn spring-boot:run
```

---

### Terminal 8 - Notification Service (Port 8085) - Optionnel
```bash
cd notification-service
mvn spring-boot:run
```

---

## ✅ Étape 4 : Vérifier que les Services sont Démarrés

1. **Ouvrir Eureka Dashboard** dans votre navigateur :
   ```
   http://localhost:8761
   ```
   Vous devriez voir tous les services enregistrés.

2. **Tester l'API Gateway** :
   ```bash
   curl http://localhost:8080/api/events
   ```

---

## 🎨 Étape 5 : Démarrer le Frontend (React)

Ouvrez un **nouveau terminal** :

```bash
# Se placer dans le dossier frontend
cd frontend

# Installer les dépendances (première fois seulement)
npm install

# Démarrer l'application React
npm start
```

L'application frontend sera accessible sur : **http://localhost:3000**

---

## 📊 Résumé des Ports

| Service | Port | URL |
|---------|------|-----|
| Eureka Server | 8761 | http://localhost:8761 |
| Config Server | 8888 | http://localhost:8888 |
| API Gateway | 8080 | http://localhost:8080 |
| User Service | 8081 | http://localhost:8081 |
| Event Service | 8082 | http://localhost:8082 |
| Reservation Service | 8083 | http://localhost:8083 |
| Payment Service | 8084 | http://localhost:8084 |
| Notification Service | 8085 | http://localhost:8085 |
| Frontend React | 3000 | http://localhost:3000 |

---

## 🎯 Ordre de Démarrage Recommandé

1. ✅ PostgreSQL (vérifier qu'il est démarré)
2. ✅ Eureka Server
3. ✅ Config Server
4. ✅ API Gateway
5. ✅ User Service
6. ✅ Event Service
7. ✅ Reservation Service
8. ✅ Payment Service
9. ✅ Frontend React

---

## 🛠️ Commandes Utiles

### Vérifier qu'un port est utilisé
```bash
# Windows
netstat -ano | findstr :8080

# Linux/Mac
lsof -i :8080
```

### Arrêter un service
Dans le terminal du service, appuyez sur `Ctrl + C`

### Voir les logs d'un service
Les logs apparaissent dans le terminal où vous avez démarré le service.

---

## 🐛 Dépannage

### Erreur : "Port already in use"
Un autre processus utilise le port. Arrêtez-le ou changez le port dans `application.yml`.

### Erreur : "Connection refused" (PostgreSQL)
```bash
# Vérifier que PostgreSQL est démarré (Windows)
# Services → PostgreSQL → Démarrer
```

### Erreur : "Cannot find module" (Frontend)
```bash
cd frontend
npm install
```

### Les services ne s'enregistrent pas dans Eureka
- Vérifiez que Eureka Server est démarré en premier
- Attendez quelques secondes entre chaque démarrage de service
- Vérifiez les logs pour les erreurs de connexion

---

## ✅ Test Final

1. Ouvrir http://localhost:3000 dans votre navigateur
2. Cliquer sur "Inscription" pour créer un compte
3. Se connecter avec vos identifiants
4. Voir les événements disponibles
5. Réserver un ticket

**Tout fonctionne ? 🎉 Votre application est prête !**

