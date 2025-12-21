# Guide de Vérification et Installation de Maven

## 🔍 Étape 1 : Vérifier si Maven est Installé

Dans votre terminal PowerShell, testez :

```powershell
# Vérifier si Maven existe quelque part
where.exe mvn
```

**Résultats possibles :**
- ✅ Si vous voyez un chemin → Maven est installé mais pas dans le PATH
- ❌ Si vous voyez "INFO: Could not find files" → Maven n'est pas installé

---

## 📦 Étape 2 : Vérifier si Java est Installé

Maven nécessite Java. Vérifiez d'abord :

```powershell
java -version
```

Si Java n'est pas installé, installez-le d'abord depuis : https://adoptium.net/

---

## 🔧 Étape 3 : Installation Complète de Maven (Étape par Étape)

### 3.1 Télécharger Maven

1. Allez sur : https://maven.apache.org/download.cgi
2. Téléchargez **apache-maven-3.9.6-bin.zip** (ou la version la plus récente)
3. **Notez où vous téléchargez le fichier** (probablement dans `Downloads`)

### 3.2 Extraire Maven

1. **Créez un dossier** pour Maven (recommandé) :
   ```
   C:\Program Files\Apache
   ```

2. **Extrayez le fichier ZIP** :
   - Clic droit sur `apache-maven-3.9.6-bin.zip`
   - **Extraire tout...**
   - Choisissez comme destination : `C:\Program Files\Apache`
   - Vous devriez avoir : `C:\Program Files\Apache\apache-maven-3.9.6`

### 3.3 Ajouter Maven au PATH (IMPORTANT)

#### Option A : Via l'Interface Graphique (Recommandé)

1. **Ouvrir les Variables d'Environnement :**
   - Appuyez sur `Windows + X`
   - Cliquez sur **"Système"**
   - Cliquez sur **"Paramètres système avancés"** (à droite)
   - Cliquez sur **"Variables d'environnement"** (en bas)

2. **Modifier la variable Path :**
   - Dans **"Variables système"** (pas "Variables utilisateur")
   - Trouvez la variable nommée **"Path"**
   - Cliquez sur **"Modifier"**
   - Cliquez sur **"Nouveau"**
   - Ajoutez exactement (remplacez 3.9.6 par votre version si différente) :
     ```
     C:\Program Files\Apache\apache-maven-3.9.6\bin
     ```
   - Cliquez sur **"OK"** sur toutes les fenêtres

#### Option B : Via PowerShell (Administrateur)

Ouvrez PowerShell **en tant qu'Administrateur** (clic droit → "Exécuter en tant qu'administrateur") :

```powershell
# Ajouter Maven au PATH système
[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", "Machine") + ";C:\Program Files\Apache\apache-maven-3.9.6\bin",
    "Machine"
)
```

### 3.4 Créer MAVEN_HOME (Optionnel mais Recommandé)

Dans les Variables d'Environnement :

1. Cliquez sur **"Nouvelle"** (dans Variables système)
2. Nom de la variable : `MAVEN_HOME`
3. Valeur de la variable : `C:\Program Files\Apache\apache-maven-3.9.6`
4. Cliquez sur **"OK"**

### 3.5 Vérifier l'Installation

**TRÈS IMPORTANT : Fermez COMPLÈTEMENT tous les terminaux PowerShell/CMD et rouvrez-en un nouveau.**

Dans le nouveau terminal, testez :

```powershell
mvn -version
```

Vous devriez voir :
```
Apache Maven 3.9.6
Maven home: C:\Program Files\Apache\apache-maven-3.9.6
Java version: 17.0.x, vendor: Eclipse Adoptium
```

---

## ✅ Si ça ne fonctionne toujours pas

### Vérification 1 : Le chemin est-il correct ?

Vérifiez que le dossier existe vraiment :

```powershell
Test-Path "C:\Program Files\Apache\apache-maven-3.9.6\bin\mvn.cmd"
```

Si cela retourne `False`, le chemin est incorrect ou Maven n'est pas extrait au bon endroit.

### Vérification 2 : Voir le PATH actuel

```powershell
$env:Path -split ';' | Select-String -Pattern "maven"
```

Cela devrait afficher le chemin vers Maven. Si rien n'apparaît, le PATH n'a pas été mis à jour.

### Vérification 3 : Chemin avec espaces

Si vous avez installé Maven dans un chemin avec espaces, utilisez des guillemets dans le PATH.

---

## 🚀 Solution Alternative : Utiliser Chocolatey (Plus Simple)

Si vous avez des difficultés avec l'installation manuelle, utilisez **Chocolatey** :

### Installer Chocolatey d'abord :

Ouvrez PowerShell **en tant qu'Administrateur** et exécutez :

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Puis installer Maven :

```powershell
choco install maven
```

Cela installera et configurera Maven automatiquement.

---

## 🎯 Solution Alternative : Utiliser un IDE

Si vous continuez à avoir des problèmes, utilisez **IntelliJ IDEA** qui gère Maven automatiquement :

Consultez le fichier `DEMARRAGE_SANS_MAVEN.md` pour les instructions.

---

## 📝 Commandes de Diagnostic

Exécutez ces commandes dans PowerShell et partagez les résultats si vous avez besoin d'aide :

```powershell
# Vérifier Java
java -version

# Vérifier le PATH
$env:Path -split ';' | Select-String -Pattern "maven|apache"

# Vérifier si mvn.cmd existe
where.exe mvn

# Vérifier la version de PowerShell
$PSVersionTable.PSVersion
```

