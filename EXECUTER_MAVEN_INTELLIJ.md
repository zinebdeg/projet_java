# Exécuter mvn clean install dans IntelliJ

## 🎯 3 Méthodes pour Exécuter Maven dans IntelliJ

---

## ✅ Méthode 1 : Via la Fenêtre Maven (LA PLUS SIMPLE)

### Étape 1 : Ouvrir la Fenêtre Maven

- À droite de l'écran, vous devriez voir l'onglet **"Maven"**
- Si vous ne le voyez pas : **View → Tool Windows → Maven**

### Étape 2 : Exécuter clean install

1. Dans la fenêtre Maven, **développez le projet racine** :
   - `event-management-platform` (le projet principal)

2. Développez **"Lifecycle"**

3. **Double-cliquez** sur :
   - `clean` (pour nettoyer)
   - `install` (pour compiler)

   Ou faites un **clic droit** sur `install` → **"Run 'event-management-platform [install]'"**

**C'est tout !** IntelliJ va exécuter la commande et vous verrez la progression en bas.

---

## ✅ Méthode 2 : Via le Terminal IntelliJ (COMMANDE MANUELLE)

### Étape 1 : Ouvrir le Terminal

- En bas de l'écran, cliquez sur l'onglet **"Terminal"**
- Ou menu : **View → Tool Windows → Terminal**

### Étape 2 : Exécuter la Commande

Dans le terminal, tapez :

```bash
mvn clean install
```

Appuyez sur **Entrée**.

**Note :** Assurez-vous d'être à la racine du projet (vous devriez voir le chemin dans le terminal).

---

## ✅ Méthode 3 : Via le Menu Run

### Étape 1 : Créer une Configuration Maven

1. En haut à droite, à côté du bouton Run (▶), cliquez sur la flèche
2. Sélectionnez **"Edit Configurations..."**
3. Cliquez sur **"+"** (plus) en haut à gauche
4. Sélectionnez **"Maven"**

### Étape 2 : Configurer

1. **Name** : `Maven: clean install`
2. **Working directory** : Cliquez sur le dossier et sélectionnez le projet racine
3. **Command line** : `clean install`
4. Cliquez sur **"OK"**

### Étape 3 : Exécuter

- Sélectionnez la configuration créée en haut à droite
- Cliquez sur le bouton **Run (▶)**

---

## 🎯 Méthode Recommandée : Fenêtre Maven

**La Méthode 1 (Fenêtre Maven)** est la plus simple car :
- ✅ Pas besoin de taper de commandes
- ✅ Visualisation claire de toutes les commandes disponibles
- ✅ Logs bien organisés
- ✅ Voir les dépendances et plugins facilement

---

## 📝 Dans Votre Cas (Basé sur l'Image)

Je vois que vous avez la fenêtre Maven ouverte à droite. Voici exactement ce qu'il faut faire :

1. **Dans la fenêtre Maven à droite**, développez :
   ```
   event-management-platform (root)
     └── Lifecycle
   ```

2. **Double-cliquez** sur :
   - `clean` (première fois)
   - Puis `install` (après clean)

3. **Regardez en bas** de l'écran : vous verrez la progression de la compilation

---

## ✅ Vérification

Une fois terminé, vous devriez voir en bas :
```
BUILD SUCCESS
```

Et l'erreur `EnableEurekaClient` devrait être résolue car toutes les dépendances seront téléchargées.

---

## 💡 Astuce

Si vous voulez exécuter `clean install` en une seule fois :

Dans la fenêtre Maven, développez "Lifecycle", puis **maintenez Ctrl** et sélectionnez à la fois `clean` et `install`, puis **clic droit → Run Maven Goal**.

Ou simplement double-cliquez sur `install` (qui exécute souvent clean automatiquement si nécessaire).

