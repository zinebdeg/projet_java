# Configuration de Java pour Maven

## 🔍 Problème : JAVA_HOME n'est pas défini

Maven nécessite Java et la variable d'environnement `JAVA_HOME` doit pointer vers l'installation de Java.

---

## ✅ Solution : Installer et Configurer Java

### Étape 1 : Vérifier si Java est Installé

Dans PowerShell, exécutez :

```powershell
java -version
```

**Résultats possibles :**

#### ✅ Si vous voyez une version (ex: "openjdk version 17.0.x")
→ Java est installé, passez à **Étape 2** pour configurer JAVA_HOME

#### ❌ Si vous voyez "java n'est pas reconnu..."
→ Java n'est pas installé, passez à **Étape 1.1** pour l'installer

---

### Étape 1.1 : Installer Java (Si nécessaire)

#### Option A : Installer avec Chocolatey (Recommandé)

Dans PowerShell en tant qu'Administrateur :

```powershell
# Installer Java 17 (version recommandée)
choco install openjdk17 -y
```

#### Option B : Télécharger Manuellement

1. Allez sur : https://adoptium.net/
2. Choisissez :
   - Version : **17 (LTS)** ou supérieure
   - Operating System : **Windows**
   - Architecture : **x64**
3. Téléchargez le fichier `.msi`
4. Installez-le (gardez le chemin par défaut, généralement `C:\Program Files\Eclipse Adoptium\`)

**Après l'installation, fermez et rouvrez le terminal.**

---

### Étape 2 : Trouver le Chemin de Java

Dans PowerShell, exécutez :

```powershell
where.exe java
```

Cela vous donnera un chemin comme :
```
C:\Program Files\Eclipse Adoptium\jdk-17.0.9+9\bin\java.exe
```

**Important :** Notez le chemin jusqu'au dossier `jdk-17.x.x` (sans `\bin\java.exe`)

Exemple : `C:\Program Files\Eclipse Adoptium\jdk-17.0.9+9`

---

### Étape 3 : Configurer JAVA_HOME

#### Méthode 1 : Via l'Interface Graphique (Recommandé)

1. **Appuyez sur** `Windows + R`
2. **Tapez** : `sysdm.cpl` puis Entrée
3. Cliquez sur l'onglet **"Avancé"**
4. Cliquez sur **"Variables d'environnement"** (en bas)
5. Dans **"Variables système"**, cliquez sur **"Nouvelle"**
6. **Nom de la variable** : `JAVA_HOME`
7. **Valeur de la variable** : Collez le chemin trouvé à l'étape 2 (ex: `C:\Program Files\Eclipse Adoptium\jdk-17.0.9+9`)
8. Cliquez sur **"OK"**
9. **Vérifiez aussi la variable Path** :
   - Trouvez **"Path"** dans "Variables système"
   - Cliquez sur **"Modifier"**
   - Vérifiez qu'il y a : `%JAVA_HOME%\bin` ou le chemin direct vers `\bin`
   - Si ce n'est pas là, ajoutez-le avec **"Nouveau"**
10. Cliquez sur **"OK"** sur toutes les fenêtres

#### Méthode 2 : Via PowerShell (Administrateur)

Ouvrez PowerShell **en tant qu'Administrateur** :

```powershell
# Remplacez le chemin par votre chemin Java réel
[Environment]::SetEnvironmentVariable(
    "JAVA_HOME",
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.9+9",
    "Machine"
)

# Ajouter Java au PATH si ce n'est pas déjà fait
$javaPath = "C:\Program Files\Eclipse Adoptium\jdk-17.0.9+9\bin"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
if ($currentPath -notlike "*$javaPath*") {
    [Environment]::SetEnvironmentVariable(
        "Path",
        "$currentPath;$javaPath",
        "Machine"
    )
}
```

**Remplacez le chemin par votre chemin réel !**

---

### Étape 4 : Redémarrer le Terminal

**TRÈS IMPORTANT :**
1. **Fermez COMPLÈTEMENT** tous les terminaux PowerShell/CMD
2. **Ouvrez un nouveau terminal**
3. Testez :

```powershell
# Vérifier Java
java -version

# Vérifier JAVA_HOME
echo $env:JAVA_HOME

# Vérifier Maven
mvn -version
```

Vous devriez maintenant voir :
```
Apache Maven 3.9.x
Maven home: ...
Java version: 17.0.x, vendor: Eclipse Adoptium
Java home: C:\Program Files\Eclipse Adoptium\jdk-17.0.x.x
```

---

## 🔍 Commandes de Diagnostic

Si ça ne fonctionne toujours pas, exécutez ces commandes :

```powershell
# Vérifier Java
java -version

# Trouver où Java est installé
where.exe java

# Vérifier JAVA_HOME (doit afficher un chemin)
echo $env:JAVA_HOME

# Vérifier le PATH
$env:Path -split ';' | Select-String -Pattern "java|jdk"
```

---

## ⚡ Solution Rapide : Installation Complète avec Chocolatey

Si vous voulez installer Java et Maven d'un coup :

Dans PowerShell en tant qu'Administrateur :

```powershell
# Installer Java 17
choco install openjdk17 -y

# Installer Maven (si pas déjà fait)
choco install maven -y

# Redémarrer le terminal après
```

Chocolatey devrait configurer JAVA_HOME automatiquement, mais vérifiez avec `echo $env:JAVA_HOME` après avoir redémarré le terminal.

---

## ✅ Vérification Finale

Une fois Java et JAVA_HOME configurés, testez :

```powershell
cd C:\Users\user\Downloads\event-management-platform
mvn clean install
```

Cela devrait maintenant fonctionner ! 🎉

