# Résoudre les Erreurs Maven après clean install

## ⚠️ Problème

Après avoir exécuté `mvn clean install`, IntelliJ affiche toujours :
- `cannot find symbol: EnableEurekaClient`
- `cannot find symbol: EnableConfigServer`

Cela signifie qu'IntelliJ n'a pas rechargé les dépendances Maven correctement.

---

## ✅ Solution : Forcer IntelliJ à Recharger Maven

### Étape 1 : Recharger le Projet Maven

1. **Dans la fenêtre Maven** (à droite) :
   - Faites un **clic droit** sur le projet racine `event-management-platform`
   - Sélectionnez **"Reload project"**
   
   **OU**
   
   - Cliquez sur l'icône **"Reload All Maven Projects"** (icône de rafraîchissement ↻ en haut de la fenêtre Maven)

2. **Attendez** que le rechargement se termine (vous verrez une barre de progression en bas)

### Étape 2 : Invalider les Caches d'IntelliJ

1. Menu : **File → Invalidate Caches...**
2. Cochez toutes les options :
   - ✅ Clear file system cache and Local History
   - ✅ Clear downloaded shared indexes
   - ✅ Clear VCS Log caches and indexes
3. Cliquez sur **"Invalidate and Restart"**
4. IntelliJ va redémarrer automatiquement

### Étape 3 : Attendre que le Projet se Recharge

Après le redémarrage :
1. IntelliJ va recharger automatiquement le projet
2. **Attendez** que l'indexation se termine (barre en bas à droite)
3. Les dépendances devraient maintenant être reconnues

---

## ✅ Solution Alternative : Vérifier les Dépendances dans le Terminal

Si les erreurs persistent, vérifiez que Maven a bien téléchargé les dépendances :

### Dans le Terminal IntelliJ (en bas)

1. Cliquez sur l'onglet **"Terminal"** en bas
2. Exécutez :

```bash
mvn dependency:resolve
```

3. Attendez que cela se termine
4. Ensuite, dans IntelliJ, faites **File → Invalidate Caches → Invalidate and Restart**

---

## ✅ Solution 3 : Vérifier que les Dépendances sont Téléchargées

### Vérifier le Dossier Maven Local

1. Dans le Terminal IntelliJ, exécutez :

```bash
echo %USERPROFILE%\.m2\repository\org\springframework\cloud
```

2. Cela devrait afficher un chemin vers le dossier des dépendances Spring Cloud
3. Si le dossier existe et contient des fichiers, les dépendances sont téléchargées

---

## ✅ Solution 4 : Rebuild Project

Après avoir invalidé les caches :

1. Menu : **Build → Rebuild Project**
2. Attendez que la compilation se termine
3. Les erreurs devraient disparaître

---

## 🔍 Vérification

Après avoir fait toutes ces étapes, vérifiez :

1. Ouvrez `ConfigServerApplication.java`
2. Placez votre curseur sur `EnableEurekaClient`
3. Appuyez sur **`Ctrl + B`** (ou Clic droit → Go to Declaration)
4. Si IntelliJ ouvre le fichier source de la classe → **✅ C'est résolu !**
5. Si IntelliJ affiche "Cannot find declaration" → Continuez avec les solutions ci-dessous

---

## 🚨 Si Rien ne Fonctionne

### Option 1 : Supprimer le Dossier .idea

1. **Fermez IntelliJ**
2. Allez dans le dossier du projet : `C:\Users\user\Downloads\event-management-platform`
3. **Supprimez** le dossier `.idea` (c'est un dossier caché, affichez les fichiers cachés)
4. **Rouvrez IntelliJ**
5. **File → Open** → Sélectionnez le projet
6. IntelliJ va recréer les fichiers de configuration

### Option 2 : Supprimer les Dossiers target

Dans le Terminal IntelliJ :

```bash
# Supprimer tous les dossiers target
Get-ChildItem -Path . -Filter target -Recurse -Directory | Remove-Item -Recurse -Force

# Puis rebuild
mvn clean install
```

Puis dans IntelliJ : **Build → Rebuild Project**

---

## 📝 Étapes Recommandées (dans l'ordre)

1. ✅ **Fenêtre Maven** → Clic droit sur projet → **"Reload project"**
2. ✅ **File → Invalidate Caches → Invalidate and Restart**
3. ✅ **Attendre** que l'indexation se termine
4. ✅ **Build → Rebuild Project**
5. ✅ Vérifier que les erreurs ont disparu

---

## 💡 Note Importante

Avec **Spring Cloud 2023.0.0** et **Spring Boot 3.2.0**, `@EnableEurekaClient` est **encore disponible** mais peut être optionnel. Cependant, il devrait fonctionner normalement si les dépendances sont correctement chargées.

---

## ✅ Si Ça Ne Fonctionne Toujours Pas

Essayez de supprimer temporairement `@EnableEurekaClient` pour voir si le projet compile sans cette annotation. Si oui, vous pouvez la laisser supprimée (Spring Boot 3 la détecte automatiquement dans certains cas).

Mais d'abord, essayez les étapes ci-dessus dans l'ordre.

