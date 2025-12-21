# 🎯 Comment Accéder à l'Application

## ✅ C'est Normal que les Liens Eureka soient Vides !

Dans Eureka Dashboard (http://localhost:8761), quand vous cliquez sur les liens des services, les pages sont **vides** parce que ce sont des **APIs REST**, pas des interfaces web.

C'est **normal** et **attendu** ! ✅

---

## 🎨 Accéder à l'Application : Le Frontend React

### Pour Utiliser l'Application, Ouvrez le Frontend :

```
http://localhost:3000
```

C'est là que vous trouverez l'**interface utilisateur complète** de l'application !

---

## 🚀 Démarrer le Frontend (si pas encore fait)

### Dans le Terminal IntelliJ ou un Terminal Windows :

```bash
cd C:\Users\user\Downloads\event-management-platform\frontend
npm install
npm start
```

Le frontend s'ouvrira automatiquement dans votre navigateur sur **http://localhost:3000**

---

## 🎯 Que Faire sur le Frontend (http://localhost:3000)

1. **Inscription** : Créez un nouveau compte utilisateur
2. **Connexion** : Connectez-vous avec vos identifiants
3. **Voir les Événements** : Parcourez la liste des événements disponibles
4. **Réserver des Tickets** : Réservez des tickets pour un événement
5. **Payer** : Finalisez le paiement de vos réservations
6. **Voir Mes Réservations** : Consultez vos réservations

---

## 🔧 Tester les APIs Directement (Optionnel)

Si vous voulez tester les APIs REST directement, utilisez l'**API Gateway** :

### URL de Base : http://localhost:8080/api

### Exemples d'Endpoints :

#### 1. Créer un Utilisateur (POST)
```
http://localhost:8080/api/users/register
```

**Avec curl ou Postman :**
```json
POST http://localhost:8080/api/users/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### 2. Voir les Événements (GET)
```
http://localhost:8080/api/events
```

Ouvrez cette URL dans votre navigateur pour voir la liste des événements (au format JSON).

#### 3. Connexion (POST)
```
http://localhost:8080/api/users/authenticate
```

---

## 📊 Vérification Complète

### ✅ Checklist :

- [x] Tous les services sont enregistrés dans Eureka (http://localhost:8761)
- [ ] Frontend est démarré (http://localhost:3000)
- [ ] Vous pouvez accéder au frontend dans votre navigateur
- [ ] Vous pouvez créer un compte et vous connecter

---

## 💡 Résumé

| URL | Description | À Utiliser Pour |
|-----|-------------|-----------------|
| **http://localhost:8761** | Eureka Dashboard | Vérifier que les services sont démarrés |
| **http://localhost:3000** | Frontend React | **Utiliser l'application** (interface utilisateur) |
| **http://localhost:8080** | API Gateway | Tester les APIs REST directement |

---

## 🎉 Pour Utiliser l'Application

**Ouvrez simplement :** 
```
http://localhost:3000
```

C'est là que se trouve l'interface utilisateur complète de votre application ! 🚀

Les services backend (qui apparaissent dans Eureka) sont les APIs qui alimentent le frontend. C'est pour ça qu'ils ne montrent rien quand vous cliquez dessus - ce sont des APIs, pas des sites web.

---

## 🔍 Si le Frontend n'est pas Démarré

Dans le Terminal :

```bash
cd frontend
npm start
```

Puis ouvrez **http://localhost:3000** dans votre navigateur.

