# 🚀 Démarrer l'Application - Guide Complet

## 📋 Étapes pour Démarrer l'Application

---

## ✅ Étape 1 : Vérifier que PostgreSQL est Démarré

1. Vérifiez que PostgreSQL est démarré sur votre machine
2. Les bases de données doivent exister : `userdb`, `eventdb`, `reservationdb`, `paymentdb`

---

## 🎯 Étape 2 : Démarrer les Services Backend (dans l'ordre)

Dans IntelliJ, vous devez démarrer chaque service. Vous pouvez les exécuter **un par un** ou **plusieurs en même temps** dans des onglets séparés.

### Ordre de Démarrage Recommandé :

#### 1. **Eureka Server** (Obligatoire en premier)
- Ouvrez : `eureka-server/src/main/java/com/eventmanagement/eureka/EurekaServerApplication.java`
- Cliquez sur le bouton **▶ Run** (vert) à gauche
- **Attendez** que vous voyiez : `Started EurekaServerApplication`
- URL : http://localhost:8761

#### 2. **Config Server**
- Ouvrez : `config-server/src/main/java/com/eventmanagement/config/ConfigServerApplication.java`
- Cliquez sur **▶ Run**
- URL : http://localhost:8888

#### 3. **API Gateway**
- Ouvrez : `api-gateway/src/main/java/com/eventmanagement/gateway/ApiGatewayApplication.java`
- Cliquez sur **▶ Run**
- URL : http://localhost:8080

#### 4. **User Service**
- Ouvrez : `user-service/src/main/java/com/eventmanagement/user/UserServiceApplication.java`
- Cliquez sur **▶ Run**
- URL : http://localhost:8081

#### 5. **Event Service**
- Ouvrez : `event-service/src/main/java/com/eventmanagement/event/EventServiceApplication.java`
- Cliquez sur **▶ Run**
- URL : http://localhost:8082

#### 6. **Reservation Service**
- Ouvrez : `reservation-service/src/main/java/com/eventmanagement/reservation/ReservationServiceApplication.java`
- Cliquez sur **▶ Run**
- URL : http://localhost:8083

#### 7. **Payment Service**
- Ouvrez : `payment-service/src/main/java/com/eventmanagement/payment/PaymentServiceApplication.java`
- Cliquez sur **▶ Run**
- URL : http://localhost:8084

#### 8. **Notification Service** (Optionnel)
- Ouvrez : `notification-service/src/main/java/com/eventmanagement/notification/NotificationServiceApplication.java`
- Cliquez sur **▶ Run**
- URL : http://localhost:8085

---

## 🎨 Étape 3 : Démarrer le Frontend React

### Option 1 : Dans IntelliJ Terminal

1. Dans IntelliJ, ouvrez le **Terminal** (en bas)
2. Exécutez :

```bash
cd frontend
npm install
npm start
```

### Option 2 : Dans un Terminal Windows Séparé

1. Ouvrez un nouveau terminal Windows (CMD ou PowerShell)
2. Naviguez vers le projet :

```bash
cd C:\Users\user\Downloads\event-management-platform\frontend
npm install
npm start
```

**Note :** La première fois, `npm install` peut prendre quelques minutes.

---

## ✅ Étape 4 : Vérifier que Tout Fonctionne

### 1. Vérifier Eureka Dashboard

Ouvrez votre navigateur et allez sur :
```
http://localhost:8761
```

Vous devriez voir tous les services enregistrés :
- ✅ API-GATEWAY
- ✅ CONFIG-SERVER
- ✅ USER-SERVICE
- ✅ EVENT-SERVICE
- ✅ RESERVATION-SERVICE
- ✅ PAYMENT-SERVICE
- ✅ NOTIFICATION-SERVICE (si démarré)

### 2. Accéder au Frontend

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000
```

Vous devriez voir l'interface utilisateur de l'application !

---

## 🎯 Utilisation de l'Application

Une fois le frontend ouvert (http://localhost:3000) :

1. **Inscription** : Créez un nouveau compte
2. **Connexion** : Connectez-vous avec vos identifiants
3. **Voir les événements** : Parcourez la liste des événements
4. **Réserver** : Réservez des tickets pour un événement
5. **Payer** : Finalisez le paiement de vos réservations

---

## 📊 Résumé des URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Interface utilisateur |
| **Eureka** | http://localhost:8761 | Dashboard des services |
| **API Gateway** | http://localhost:8080 | Point d'entrée API |

---

## ⚠️ Problèmes Courants

### Les services ne s'enregistrent pas dans Eureka

- Vérifiez que Eureka Server est démarré en premier
- Attendez quelques secondes entre chaque démarrage de service
- Vérifiez les logs dans chaque onglet Run

### Le frontend ne se connecte pas au backend

- Vérifiez que l'API Gateway est démarré (port 8080)
- Vérifiez que tous les services sont enregistrés dans Eureka
- Vérifiez la console du navigateur pour les erreurs

### Erreur de connexion à PostgreSQL

- Vérifiez que PostgreSQL est démarré
- Vérifiez que les bases de données existent
- Vérifiez le mot de passe dans `application.yml` (zineb123)

---

## 💡 Astuce

Pour arrêter un service :
- Dans IntelliJ, dans l'onglet Run en bas, cliquez sur le bouton **Stop** (carré rouge) à côté du service

Pour démarrer plusieurs services en même temps :
- Vous pouvez cliquer sur Run pour plusieurs services, ils s'exécuteront dans des onglets séparés en bas

---

## ✅ Checklist de Démarrage

- [ ] PostgreSQL est démarré
- [ ] Eureka Server est démarré (port 8761)
- [ ] Config Server est démarré (port 8888)
- [ ] API Gateway est démarré (port 8080)
- [ ] User Service est démarré (port 8081)
- [ ] Event Service est démarré (port 8082)
- [ ] Reservation Service est démarré (port 8083)
- [ ] Payment Service est démarré (port 8084)
- [ ] Frontend est démarré (port 3000)
- [ ] Eureka Dashboard montre tous les services
- [ ] Frontend s'affiche dans le navigateur

---

🎉 **Une fois tout démarré, votre application est prête à être utilisée !**

