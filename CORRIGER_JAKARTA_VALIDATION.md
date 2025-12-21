# Corriger l'Erreur jakarta.validation

## ⚠️ Problème

```
java: package jakarta.validation does not exist
```

Cela signifie qu'IntelliJ ne trouve pas les dépendances de validation Jakarta.

---

## ✅ Solution : Recharger Maven et Forcer le Téléchargement

### Étape 1 : Recharger le Projet Maven dans IntelliJ

1. **Fenêtre Maven** (à droite) :
   - **Clic droit** sur le projet racine `event-management-platform`
   - Sélectionnez **"Reload project"**
   - OU cliquez sur l'icône **"Reload All Maven Projects"** (↻)

2. **Attendez** que le rechargement se termine (barre de progression en bas)

### Étape 2 : Télécharger les Dépendances Manuellement

**Dans le Terminal IntelliJ** (onglet Terminal en bas) :

```bash
mvn dependency:resolve
```

Cette commande force Maven à télécharger toutes les dépendances.

### Étape 3 : Invalider les Caches

1. Menu : **File → Invalidate Caches...**
2. Cochez toutes les options
3. Cliquez sur **"Invalidate and Restart"**
4. Attendez qu'IntelliJ redémarre

### Étape 4 : Rebuild Project

1. Menu : **Build → Rebuild Project**
2. Attendez que la compilation se termine

---

## 🔍 Vérification des Dépendances

Les dépendances `spring-boot-starter-validation` sont déjà présentes dans les pom.xml :
- ✅ user-service/pom.xml
- ✅ event-service/pom.xml
- ✅ reservation-service/pom.xml
- ✅ payment-service/pom.xml

Cette dépendance inclut automatiquement `jakarta.validation`.

---

## ✅ Si ça ne fonctionne toujours pas

### Option 1 : Nettoyer et Recompiler

Dans le Terminal IntelliJ :

```bash
mvn clean install -U
```

Le flag `-U` force Maven à vérifier les mises à jour des dépendances.

### Option 2 : Vérifier les Dépendances Téléchargées

```bash
mvn dependency:tree | findstr validation
```

Cela devrait afficher les dépendances de validation.

---

## 📝 Note Importante

`spring-boot-starter-validation` inclut automatiquement :
- `jakarta.validation-api`
- `hibernate-validator`

Donc pas besoin d'ajouter d'autres dépendances, il suffit de recharger Maven correctement.

