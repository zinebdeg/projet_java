# 🚀 INSTALLER JAVA MAINTENANT - Instructions Pas à Pas

## ⚠️ Situation Actuelle
- ❌ Java n'est PAS installé
- ❌ Maven ne peut pas fonctionner sans Java

---

## 📦 Option 1 : Installer Java avec Chocolatey (RECOMMANDÉ)

### Étape 1 : Ouvrir PowerShell en Administrateur

1. **Appuyez sur** `Windows + X`
2. Cliquez sur **"Terminal (Administrateur)"** ou **"Windows PowerShell (Administrateur)"**
3. Cliquez sur **"Oui"** quand Windows demande la permission

**IMPORTANT :** Vous DEVEZ être en administrateur pour installer des logiciels !

### Étape 2 : Vérifier si Chocolatey est Installé

Dans le terminal administrateur, tapez :

```powershell
choco --version
```

**Si vous voyez une version** → Chocolatey est installé, passez à l'Étape 3

**Si vous voyez une erreur** → Installez Chocolatey d'abord :

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Attendez que l'installation se termine.

### Étape 3 : Installer Java 17

Dans le même terminal administrateur, exécutez :

```powershell
choco install openjdk17 -y
```

**Attendez que l'installation se termine** (peut prendre 2-5 minutes).

Vous devriez voir : "Chocolatey installed 1/1 packages."

### Étape 4 : FERMER et ROUVRIR le Terminal

**TRÈS IMPORTANT :**
1. Fermez TOUS les terminaux (même celui en administrateur)
2. Ouvrez un NOUVEAU terminal (normal, pas besoin d'administrateur)
3. Testez :

```powershell
java -version
```

**Vous devriez voir :**
```
openjdk version "17.0.x"
...
```

Si oui, testez Maven :
```powershell
mvn -version
```

---

## 📥 Option 2 : Installation Manuelle de Java (Si Chocolatey ne fonctionne pas)

### Étape 1 : Télécharger Java

1. Ouvrez votre navigateur
2. Allez sur : **https://adoptium.net/temurin/releases/**
3. Choisissez :
   - **Version** : 17 (LTS)
   - **Operating System** : Windows
   - **Architecture** : x64
   - **Package Type** : JDK
4. Cliquez sur le bouton de téléchargement (fichier `.msi`)
5. Le fichier se télécharge dans votre dossier `Downloads`

### Étape 2 : Installer Java

1. Allez dans votre dossier `Downloads`
2. Double-cliquez sur le fichier `.msi` (ex: `OpenJDK17U-jdk_x64_windows_hotspot_17.0.9_9.msi`)
3. Suivez l'assistant d'installation :
   - Cliquez sur **"Next"**
   - Acceptez les conditions (cliquez sur la case)
   - Cliquez sur **"Next"**
   - **GARDEZ LE CHEMIN PAR DÉFAUT** (généralement `C:\Program Files\Eclipse Adoptium\jdk-17.x.x`)
   - Cliquez sur **"Install"**
   - Cliquez sur **"Finish"**

### Étape 3 : Configurer JAVA_HOME

1. **Appuyez sur** `Windows + R`
2. **Tapez** : `sysdm.cpl` puis appuyez sur Entrée
3. Cliquez sur l'onglet **"Avancé"**
4. Cliquez sur **"Variables d'environnement"** (bouton en bas)
5. Dans la section **"Variables système"** (pas "Variables utilisateur") :
   - Cliquez sur **"Nouvelle"**
   - **Nom de la variable** : `JAVA_HOME`
   - **Valeur de la variable** : `C:\Program Files\Eclipse Adoptium\jdk-17.0.9+9`
     - ⚠️ **Remplacez `17.0.9+9` par votre version réelle** si différente
     - Vous pouvez trouver le chemin exact dans : `C:\Program Files\Eclipse Adoptium\`
   - Cliquez sur **"OK"**

6. **Ajouter Java au PATH** :
   - Dans "Variables système", trouvez **"Path"**
   - Cliquez sur **"Path"** puis sur **"Modifier"**
   - Cliquez sur **"Nouveau"**
   - Ajoutez : `%JAVA_HOME%\bin`
   - Ou directement : `C:\Program Files\Eclipse Adoptium\jdk-17.0.9+9\bin`
   - Cliquez sur **"OK"** partout

### Étape 4 : Redémarrer le Terminal

1. **Fermez TOUS les terminaux**
2. **Ouvrez un nouveau terminal**
3. Testez :

```powershell
java -version
mvn -version
```

---

## ✅ Vérification Finale

Une fois Java installé, exécutez ces commandes dans un NOUVEAU terminal :

```powershell
# Vérifier Java
java -version

# Vérifier JAVA_HOME
echo $env:JAVA_HOME

# Vérifier Maven
mvn -version
```

**Tout devrait fonctionner maintenant !**

---

## 🎯 Si Vous Avez Besoin d'Aide

Exécutez ces commandes et partagez les résultats :

```powershell
# Vérifier si Java est quelque part
where.exe java

# Vérifier le PATH
$env:Path -split ';' | Select-String -Pattern "java|jdk"

# Vérifier JAVA_HOME
echo $env:JAVA_HOME
```

---

## 💡 Astuce

Si vous continuez à avoir des problèmes, **utilisez IntelliJ IDEA** qui installe et configure Java automatiquement. Consultez `DEMARRAGE_SANS_MAVEN.md` pour les instructions.

