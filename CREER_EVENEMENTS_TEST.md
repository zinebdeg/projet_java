# Créer des Événements de Test

## 🎯 Solution 1 : Permettre à Tous les Utilisateurs de Créer des Événements (Temporaire pour Test)

J'ai modifié la navbar pour permettre à tous les utilisateurs connectés de créer des événements, pas seulement les ORGANIZER/ADMIN.

---

## ✅ Solution 2 : Créer un Événement via le Frontend

### Étapes :

1. **Connectez-vous** avec votre compte (testuser123)

2. Dans la navbar, cliquez sur **"Créer un Événement"**

3. **Remplissez le formulaire** avec les informations suivantes :

   **Exemple d'événement de test :**
   - **Titre** : Match de Football - PSG vs Marseille
   - **Description** : Un match passionnant entre PSG et Marseille au Parc des Princes
   - **Date et heure** : Sélectionnez une date future (ex: dans 1 mois)
   - **Lieu** : Parc des Princes, Paris
   - **Nombre de places** : 100
   - **Prix par ticket** : 50.00

4. Cliquez sur **"Créer l'événement"**

5. L'événement sera créé et vous serez redirigé vers la page de détails

---

## ✅ Solution 3 : Créer des Événements via l'API (Postman ou curl)

### Via curl (Terminal)

```bash
curl -X POST http://localhost:8080/api/events \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Concert de Rock\",
    \"description\": \"Un concert de rock exceptionnel\",
    \"eventDate\": \"2025-02-15T20:00:00\",
    \"location\": \"Zénith de Paris\",
    \"totalTickets\": 200,
    \"ticketPrice\": 75.50,
    \"organizerId\": 1
  }"
```

**Remplacez `organizerId: 1` par l'ID de votre utilisateur** (probablement 1 si c'est le premier utilisateur créé)

---

## ✅ Solution 4 : Vérifier l'ID de Votre Utilisateur

Pour connaître votre ID d'utilisateur :

1. **Ouvrez la console du navigateur** (F12)
2. Allez dans l'onglet **Console**
3. Tapez :
   ```javascript
   console.log(JSON.parse(localStorage.getItem('user')))
   ```
4. Vous verrez votre utilisateur avec son `id`

---

## 📝 Exemples d'Événements à Créer

### Événement 1 : Match de Football
```json
{
  "title": "Match de Football - PSG vs Marseille",
  "description": "Match de championnat entre PSG et Marseille",
  "eventDate": "2025-03-01T20:00:00",
  "location": "Parc des Princes, Paris",
  "totalTickets": 40000,
  "ticketPrice": 50.00,
  "organizerId": 1
}
```

### Événement 2 : Concert
```json
{
  "title": "Concert de Rock",
  "description": "Concert de rock avec plusieurs groupes",
  "eventDate": "2025-03-15T19:30:00",
  "location": "Zénith de Paris",
  "totalTickets": 5000,
  "ticketPrice": 75.00,
  "organizerId": 1
}
```

### Événement 3 : Conférence
```json
{
  "title": "Conférence sur l'Intelligence Artificielle",
  "description": "Conférence sur les dernières tendances en IA",
  "eventDate": "2025-02-20T14:00:00",
  "location": "Palais des Congrès, Paris",
  "totalTickets": 500,
  "ticketPrice": 30.00,
  "organizerId": 1
}
```

---

## 🔍 Vérifier les Événements Créés

Une fois les événements créés :

1. Allez sur : http://localhost:3000/events
2. Vous devriez voir tous les événements créés

---

## 📝 Note sur les Réservations

Les réservations s'afficheront uniquement **après avoir réservé des tickets** pour un événement. C'est normal qu'elles soient vides au début.

---

## ✅ Ordre Recommandé

1. ✅ Créer votre compte (fait)
2. ✅ Créer un ou plusieurs événements (à faire)
3. ✅ Voir les événements sur la page /events
4. ✅ Réserver des tickets pour un événement
5. ✅ Voir vos réservations dans "Mes Réservations"

