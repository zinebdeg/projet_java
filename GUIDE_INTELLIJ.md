# Guide Complet : Utiliser IntelliJ IDEA

## 🎯 Compilation et Exécution dans IntelliJ

Vous avez **2 options principales** pour compiler et exécuter :

---

## ✅ Option 1 : Utiliser les Menus de IntelliJ (RECOMMANDÉ)

### Compiler le Projet

1. **Ouvrez IntelliJ IDEA**
2. **Ouvrez votre projet** :
   - File → Open
   - Sélectionnez : `C:\Users\user\Downloads\event-management-platform`
   - Cliquez sur "OK" puis "Trust Project"

3. **Attendez** que IntelliJ :
   - Télécharge Maven automatiquement (si nécessaire)
   - Télécharge toutes les dépendances
   - Indexe le projet

4. **Compiler** :
   - Menu : **Build → Build Project**
   - Ou raccourci clavier : **`Ctrl + F9`** (Windows)
   - Vous verrez la progression en bas de l'écran

### Exécuter les Services

Pour chaque service, vous pouvez exécuter directement depuis IntelliJ :

#### Méthode 1 : Bouton Run

1. **Ouvrez le fichier principal** du service :
   - Exemple : `eureka-server/src/main/java/com/eventmanagement/eureka/EurekaServerApplication.java`

2. **Cliquez sur le bouton vert "▶ Run"** à gauche du code
   - Ou faites un **clic droit** sur le fichier → **Run 'EurekaServerApplication'**

3. **Répétez pour chaque service** dans des onglets séparés

#### Méthode 2 : Configuration Run

1. En haut à droite, cliquez sur **"Add Configuration..."** (ou **"Run" → "Edit Configurations..."**)
2. Cliquez sur **"+"** (plus)
3. Sélectionnez **"Spring Boot"**
4. Configurez :
   - **Name** : Eureka Server (ou nom du service)
   - **Main class** : Cliquez sur la loupe et cherchez `EurekaServerApplication`
   - **Module** : eureka-server
5. Cliquez sur **"OK"**
6. Répétez pour chaque service

### Ordre d'Exécution des Services

1. ✅ **Eureka Server** → `EurekaServerApplication.java`
2. ✅ **Config Server** → `ConfigServerApplication.java`
3. ✅ **API Gateway** → `ApiGatewayApplication.java`
4. ✅ **User Service** → `UserServiceApplication.java`
5. ✅ **Event Service** → `EventServiceApplication.java`
6. ✅ **Reservation Service** → `ReservationServiceApplication.java`
7. ✅ **Payment Service** → `PaymentServiceApplication.java`

**Note :** Attendez que chaque service démarre avant de lancer le suivant.

---

## ✅ Option 2 : Utiliser le Terminal dans IntelliJ

Si vous préférez utiliser le terminal intégré :

### Ouvrir le Terminal

1. En bas de l'écran, cliquez sur l'onglet **"Terminal"**
   - Ou menu : **View → Tool Windows → Terminal**

### Compiler avec Maven

Dans le terminal IntelliJ, vous pouvez utiliser les commandes Maven :

```bash
# Compiler tout le projet
mvn clean install

# Compiler un service spécifique
cd eureka-server
mvn spring-boot:run
```

**Mais** : IntelliJ gère Maven automatiquement, donc vous n'avez généralement **pas besoin** d'utiliser le terminal !

---

## 🎯 Comparaison

| Action | Menu IntelliJ | Terminal IntelliJ | Terminal Windows |
|--------|---------------|-------------------|------------------|
| Compiler | ✅ Build → Build Project | ✅ mvn clean install | ✅ mvn clean install |
| Exécuter un service | ✅ Bouton Run | ✅ mvn spring-boot:run | ✅ mvn spring-boot:run |
| Voir les logs | ✅ En bas dans "Run" | ✅ Dans le terminal | ✅ Dans le terminal |
| Debug | ✅ Bouton Debug | ❌ Plus difficile | ❌ Plus difficile |

---

## 💡 Recommandation

**Utilisez les menus et boutons d'IntelliJ** car :
- ✅ Plus simple et visuel
- ✅ Debugging intégré
- ✅ Gestion automatique de Maven
- ✅ Logs mieux organisés
- ✅ Arrêt facile (bouton Stop)

**Utilisez le terminal uniquement si** :
- Vous préférez la ligne de commande
- Vous voulez exécuter des commandes Maven spécifiques

---

## 📝 Étapes Complètes dans IntelliJ

### 1. Ouvrir le Projet

1. File → Open
2. Sélectionnez : `C:\Users\user\Downloads\event-management-platform`
3. Cliquez sur "Trust Project"

### 2. Attendre l'Indexation

IntelliJ va automatiquement :
- Détecter que c'est un projet Maven
- Télécharger les dépendances
- Indexer le code

**Cela peut prendre 2-5 minutes la première fois.**

### 3. Compiler

- Menu : **Build → Build Project** (ou `Ctrl + F9`)

### 4. Exécuter les Services

Pour chaque service :
1. Ouvrez le fichier `*Application.java`
2. Cliquez sur le bouton **▶ Run** à gauche
3. Attendez que le service démarre

### 5. Vérifier

- Ouvrez votre navigateur : http://localhost:8761
- Vous devriez voir Eureka Dashboard avec tous les services enregistrés

### 6. Démarrer le Frontend (dans un terminal externe)

Ouvrez un terminal Windows (pas IntelliJ) :

```bash
cd C:\Users\user\Downloads\event-management-platform\frontend
npm install
npm start
```

---

## 🐛 Dépannage dans IntelliJ

### Le bouton Run n'apparaît pas

- Vérifiez que le fichier contient `@SpringBootApplication`
- Essayez : Clic droit sur le fichier → Run

### Erreur "Cannot find module"

- Menu : **File → Invalidate Caches → Invalidate and Restart**
- Laissez IntelliJ recharger le projet

### Maven ne télécharge pas les dépendances

- Menu : **View → Tool Windows → Maven**
- Cliquez sur l'icône de rafraîchissement (reload)

---

## ✅ Résumé

**Pour compiler :** 
- Utilisez **Build → Build Project** (ou `Ctrl + F9`)

**Pour exécuter :**
- Utilisez le **bouton ▶ Run** à côté de chaque `*Application.java`

**Vous n'avez PAS besoin d'utiliser le terminal dans IntelliJ**, sauf si vous préférez !

