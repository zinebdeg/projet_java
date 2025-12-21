# Ajouter des Données de Test

## 🎯 Situation Actuelle

- ✅ Votre compte utilisateur est créé
- ❌ Aucun événement dans la base de données (c'est normal au début)
- ❌ Aucune réservation (normal, vous devez d'abord créer des événements puis réserver)

---

## ✅ Solution : Créer des Événements via le Frontend

### Méthode la Plus Simple

1. **Connectez-vous** avec votre compte sur http://localhost:3000

2. **Dans la navbar**, cliquez sur **"Créer un Événement"**
   - J'ai modifié le code pour que tous les utilisateurs puissent créer des événements (temporairement pour les tests)

3. **Remplissez le formulaire** avec ces informations d'exemple :

   **Événement 1 :**
   - Titre : `Match de Football - PSG vs Marseille`
   - Description : `Un match passionnant entre PSG et Marseille`
   - Date et heure : Sélectionnez une date future (ex: dans 1 mois à 20h00)
   - Lieu : `Parc des Princes, Paris`
   - Nombre de places : `100`
   - Prix par ticket : `50`

   Cliquez sur **"Créer l'événement"**

4. **Créez un deuxième événement** pour avoir plus de choix :

   **Événement 2 :**
   - Titre : `Concert de Rock`
   - Description : `Concert avec plusieurs groupes de rock`
   - Date et heure : Une autre date future
   - Lieu : `Zénith de Paris`
   - Nombre de places : `200`
   - Prix par ticket : `75`

5. **Retournez sur la page "Événements"**
   - Vous devriez maintenant voir les événements que vous avez créés

---

## ✅ Tester le Flux Complet

Une fois les événements créés :

1. **Voir les événements** : http://localhost:3000/events
   - Vous devriez voir vos événements

2. **Réserver des tickets** :
   - Cliquez sur "Voir les détails" d'un événement
   - Choisissez le nombre de tickets (1-4)
   - Cliquez sur "Réserver"

3. **Payer la réservation** :
   - Sur la page de détails de la réservation
   - Cliquez sur "Payer maintenant"

4. **Voir vos réservations** :
   - Cliquez sur "Mes Réservations" dans la navbar
   - Vous verrez vos réservations

---

## 🔍 Si Vous Ne Voyez Toujours Pas les Événements

### Vérification 1 : Console du Navigateur

1. Ouvrez la console (F12)
2. Allez dans l'onglet **Console**
3. Regardez s'il y a des erreurs lors du chargement de la page /events

### Vérification 2 : Tester l'API Directement

Ouvrez dans votre navigateur :
```
http://localhost:8080/api/events
```

Vous devriez voir une liste d'événements au format JSON (même si c'est `[]` si vide)

### Vérification 3 : Logs du Backend

Dans IntelliJ, regardez les logs de **Event Service** pour voir s'il y a des erreurs

---

## 📝 Note

**Les réservations seront vides** tant que vous n'avez pas réservé de tickets. C'est normal !

Créez d'abord des événements, puis réservez des tickets pour voir vos réservations.

