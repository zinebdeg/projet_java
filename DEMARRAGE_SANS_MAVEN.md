# Guide de Démarrage SANS Maven (Avec IDE)

Si vous ne pouvez pas installer Maven en ligne de commande, utilisez un IDE qui gère Maven automatiquement.

## 🎯 Option Recommandée : IntelliJ IDEA Community Edition (Gratuit)

### Étape 1 : Installer IntelliJ IDEA

1. Téléchargez IntelliJ IDEA Community Edition (gratuit) :
   https://www.jetbrains.com/idea/download/

2. Installez-le

### Étape 2 : Ouvrir le Projet

1. Lancez IntelliJ IDEA
2. **File > Open**
3. Sélectionnez le dossier : `C:\Users\user\Downloads\event-management-platform`
4. IntelliJ détectera automatiquement que c'est un projet Maven
5. Cliquez sur **"Trust Project"**

### Étape 3 : Attendre le Téléchargement des Dépendances

IntelliJ va automatiquement :
- Télécharger Maven (si nécessaire)
- Télécharger toutes les dépendances
- Indexer le projet

Cela peut prendre quelques minutes la première fois.

### Étape 4 : Compiler le Projet

1. Dans IntelliJ, allez dans le menu : **Build > Build Project**
   - Ou utilisez le raccourci : `Ctrl + F9`

2. Attendez que la compilation se termine (barre en bas)

### Étape 5 : Démarrer les Services

Pour chaque service, vous pouvez :

**Méthode 1 : Via le menu Run**
1. Ouvrez le fichier principal de chaque service (ex: `UserServiceApplication.java`)
2. Cliquez sur le bouton vert "Run" à gauche du code
3. Ou utilisez le raccourci : `Shift + F10`

**Méthode 2 : Via les Configurations**
1. En haut à droite, cliquez sur **"Add Configuration..."**
2. Cliquez sur **"+"** et sélectionnez **"Spring Boot"**
3. Choisissez le module (ex: user-service)
4. Cliquez sur **"OK"**
5. Répétez pour chaque service

### Services à Démarrer (dans l'ordre) :

1. ✅ **eureka-server** → `EurekaServerApplication.java`
2. ✅ **config-server** → `ConfigServerApplication.java`
3. ✅ **api-gateway** → `ApiGatewayApplication.java`
4. ✅ **user-service** → `UserServiceApplication.java`
5. ✅ **event-service** → `EventServiceApplication.java`
6. ✅ **reservation-service** → `ReservationServiceApplication.java`
7. ✅ **payment-service** → `PaymentServiceApplication.java`

### Étape 6 : Vérifier

1. Ouvrez dans votre navigateur : http://localhost:8761
2. Vous devriez voir tous les services enregistrés

### Étape 7 : Démarrer le Frontend

Ouvrez un terminal dans IntelliJ (Terminal en bas) ou un terminal Windows :

```bash
cd frontend
npm install
npm start
```

---

## 🔄 Option Alternative : Eclipse

### Étape 1 : Installer Eclipse

1. Téléchargez Eclipse IDE for Enterprise Java and Web Developers :
   https://www.eclipse.org/downloads/

2. Installez-le

### Étape 2 : Importer le Projet Maven

1. **File > Import**
2. **Maven > Existing Maven Projects**
3. Sélectionnez le dossier : `C:\Users\user\Downloads\event-management-platform`
4. Cliquez sur **"Finish"**

### Étape 3 : Compiler

- Eclipse compile automatiquement
- Si nécessaire : **Project > Clean... > Clean all projects**

### Étape 4 : Exécuter les Services

Pour chaque service :
1. Faites un clic droit sur le fichier principal (ex: `UserServiceApplication.java`)
2. **Run As > Spring Boot App**

---

## 📝 Notes Importantes

- Les IDE téléchargent automatiquement Maven et les dépendances
- Vous pouvez voir la progression dans la barre en bas
- La première fois peut prendre 5-10 minutes
- Assurez-vous que PostgreSQL est démarré avant de lancer les services

---

## ✅ Avantages des IDE

- ✅ Pas besoin d'installer Maven manuellement
- ✅ Interface graphique intuitive
- ✅ Debugging intégré
- ✅ Gestion automatique des dépendances
- ✅ Coloration syntaxique
- ✅ Auto-complétion

---

## 🔄 Si vous préférez quand même installer Maven

Consultez le fichier `INSTALLATION_MAVEN.md` pour les instructions complètes.

