# Dépannage - Erreur lors de l'Inscription

## ✅ Corrections Appliquées

J'ai ajouté la configuration CORS pour l'API Gateway afin de permettre les requêtes depuis le frontend React (http://localhost:3000).

---

## 🔄 Prochaines Étapes

### 1. Redémarrer l'API Gateway

Dans IntelliJ :

1. **Arrêtez** l'API Gateway (bouton Stop dans l'onglet Run)
2. **Redémarrez** l'API Gateway en cliquant sur ▶ Run

### 2. Vérifier la Console du Navigateur

1. Ouvrez le frontend : http://localhost:3000
2. Ouvrez la **Console du Navigateur** :
   - Appuyez sur **F12** (ou clic droit → Inspecter)
   - Allez dans l'onglet **Console**
3. Essayez de vous inscrire à nouveau
4. Regardez les messages d'erreur dans la console

Les messages d'erreur vous diront exactement quel est le problème :
- Erreur CORS
- Erreur de connexion au serveur
- Erreur de validation

---

## 🔍 Vérifications à Faire

### Vérification 1 : Services Backend Démarrés

Assurez-vous que ces services sont démarrés :
- ✅ Eureka Server (port 8761)
- ✅ API Gateway (port 8080) - **Important !**
- ✅ User Service (port 8081) - **Important !**

### Vérification 2 : Vérifier Eureka Dashboard

1. Ouvrez : http://localhost:8761
2. Vérifiez que **API-GATEWAY** et **USER-SERVICE** sont enregistrés (en vert)

### Vérification 3 : Tester l'API Directement

Ouvrez dans votre navigateur ou avec curl :

```
http://localhost:8080/api/users
```

Si vous voyez une liste (même vide) ou une erreur JSON, c'est que l'API Gateway fonctionne.

---

## 🐛 Erreurs Possibles et Solutions

### Erreur : "Impossible de se connecter au serveur"

**Solution :**
- Vérifiez que l'API Gateway est démarré (port 8080)
- Vérifiez dans Eureka que USER-SERVICE est enregistré

### Erreur : "Nom d'utilisateur ou email déjà utilisé"

**Solution :**
- Essayez avec un autre nom d'utilisateur ou email
- C'est normal si vous avez déjà créé un compte avec ces informations

### Erreur CORS dans la Console

**Solution :**
- J'ai ajouté la configuration CORS
- **Redémarrez l'API Gateway** pour que les changements prennent effet

### Erreur 400 Bad Request

**Solution :**
- Vérifiez que tous les champs sont remplis :
  - Nom d'utilisateur (3-20 caractères)
  - Email (format valide)
  - Mot de passe (au moins 6 caractères)
  - Confirmation du mot de passe

---

## 📝 Informations pour le Débogage

Après avoir redémarré l'API Gateway, essayez à nouveau l'inscription et regardez :

1. **Console du Navigateur (F12)** : Pour voir les erreurs exactes
2. **Logs de l'API Gateway** : Dans IntelliJ, dans l'onglet Run de l'API Gateway
3. **Logs du User Service** : Dans IntelliJ, dans l'onglet Run du User Service

Ces logs vous donneront l'erreur exacte.

---

## ✅ Test Rapide

Après avoir redémarré l'API Gateway, testez l'inscription avec :

- **Nom d'utilisateur** : testuser123
- **Email** : test@example.com
- **Mot de passe** : password123
- **Confirmer mot de passe** : password123

Si ça ne fonctionne toujours pas, ouvrez la console du navigateur (F12) et copiez le message d'erreur exact.

