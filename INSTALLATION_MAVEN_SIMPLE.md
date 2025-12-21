# Guide SIMPLIFIÉ - Installation de Maven sur Windows

## 🎯 Méthode la Plus Simple : Utiliser Chocolatey

### Étape 1 : Installer Chocolatey (Gestionnaire de Paquets Windows)

1. **Ouvrez PowerShell en tant qu'Administrateur** :
   - Clic droit sur le menu Démarrer
   - Sélectionnez **"Windows PowerShell (Administrateur)"** ou **"Terminal (Administrateur)"**
   - Cliquez sur **"Oui"** quand Windows demande la permission

2. **Copiez et collez cette commande complète** dans PowerShell :

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

3. Attendez que l'installation se termine (quelques secondes)

### Étape 2 : Installer Maven avec Chocolatey

Dans le même PowerShell (administrateur), exécutez :

```powershell
choco install maven -y
```

Cette commande va :
- ✅ Télécharger Maven automatiquement
- ✅ L'installer au bon endroit
- ✅ L'ajouter au PATH automatiquement

### Étape 3 : Redémarrer le Terminal

1. **Fermez complètement** tous les terminaux PowerShell/CMD
2. **Ouvrez un nouveau terminal** (normal, pas administrateur)
3. Testez :

```powershell
mvn -version
```

Si vous voyez la version de Maven, **c'est réussi ! 🎉**

---

## 🔄 Méthode Alternative : Installation Manuelle (Si Chocolatey ne fonctionne pas)

### Étape 1 : Télécharger Maven

1. Allez sur : https://maven.apache.org/download.cgi
2. Sous **"Files"**, cliquez sur : **apache-maven-3.9.6-bin.zip**
3. Le fichier se télécharge dans votre dossier `Downloads`

### Étape 2 : Extraire le Fichier

1. Allez dans `C:\Program Files\`
2. Créez un nouveau dossier nommé **"Apache"** (s'il n'existe pas)
3. Ouvrez le dossier **"Apache"**
4. Retournez dans `Downloads`
5. Faites un **clic droit** sur `apache-maven-3.9.6-bin.zip`
6. Sélectionnez **"Extraire tout..."**
7. Choisissez comme destination : `C:\Program Files\Apache`
8. Cliquez sur **"Extraire"**

Vous devriez maintenant avoir : `C:\Program Files\Apache\apache-maven-3.9.6`

### Étape 3 : Ajouter au PATH

1. **Appuyez sur** `Windows + R`
2. **Tapez** : `sysdm.cpl` puis Entrée
3. Cliquez sur l'onglet **"Avancé"**
4. Cliquez sur **"Variables d'environnement"** (en bas)
5. Dans **"Variables système"** (pas "Variables utilisateur"), trouvez **"Path"**
6. Cliquez sur **"Path"** puis sur **"Modifier"**
7. Cliquez sur **"Nouveau"**
8. **Collez exactement** :
   ```
   C:\Program Files\Apache\apache-maven-3.9.6\bin
   ```
9. Cliquez sur **"OK"** sur TOUTES les fenêtres ouvertes

### Étape 4 : Redémarrer le Terminal

1. **Fermez TOUS les terminaux** (PowerShell, CMD, etc.)
2. **Ouvrez un nouveau terminal**
3. Testez :

```powershell
mvn -version
```

---

## ⚠️ Si ça ne fonctionne toujours pas

### Vérification 1 : Le dossier existe-t-il ?

Dans PowerShell, testez :

```powershell
Test-Path "C:\Program Files\Apache\apache-maven-3.9.6\bin\mvn.cmd"
```

- ✅ Si ça retourne `True` → Le dossier existe, le problème est le PATH
- ❌ Si ça retourne `False` → Le dossier n'existe pas, vérifiez l'extraction

### Vérification 2 : Voir le PATH actuel

```powershell
$env:Path
```

Cherchez si vous voyez `maven` ou `apache-maven` dans la liste.

---

## 🎯 Solution RECOMMANDÉE : Utiliser IntelliJ IDEA

Si l'installation de Maven vous pose trop de problèmes, **utilisez IntelliJ IDEA** qui gère Maven automatiquement :

1. **Téléchargez IntelliJ IDEA Community** (gratuit) :
   https://www.jetbrains.com/idea/download/

2. **Installez-le**

3. **Ouvrez le projet** :
   - File → Open
   - Sélectionnez : `C:\Users\user\Downloads\event-management-platform`

4. IntelliJ va :
   - ✅ Détecter automatiquement que c'est un projet Maven
   - ✅ Télécharger Maven automatiquement
   - ✅ Télécharger toutes les dépendances
   - ✅ Vous permettre de compiler et exécuter facilement

**Cette méthode est la plus simple et évite tous les problèmes de PATH !**

---

## ✅ Une fois Maven installé

Retournez dans le projet et exécutez :

```powershell
cd C:\Users\user\Downloads\event-management-platform
mvn clean install
```

Ensuite, consultez `DEMARRAGE.md` pour démarrer tous les services.

