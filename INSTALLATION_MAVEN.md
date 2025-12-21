# Guide d'Installation de Maven sur Windows

## 🎯 Solution Rapide : Installer Maven

### Étape 1 : Télécharger Maven

1. Allez sur : https://maven.apache.org/download.cgi
2. Téléchargez le fichier **apache-maven-3.9.x-bin.zip** (version la plus récente)
3. Extrayez le fichier ZIP dans un dossier, par exemple :
   ```
   C:\Program Files\Apache\maven
   ```
   Vous devriez avoir un dossier comme : `C:\Program Files\Apache\maven\apache-maven-3.9.5`

### Étape 2 : Configurer les Variables d'Environnement

1. **Ouvrir les Variables d'Environnement :**
   - Appuyez sur `Windows + R`
   - Tapez : `sysdm.cpl` et appuyez sur Entrée
   - Cliquez sur l'onglet **"Avancé"**
   - Cliquez sur **"Variables d'environnement"**

2. **Ajouter Maven au PATH :**
   - Dans "Variables système", trouvez la variable **Path**
   - Cliquez sur **"Modifier"**
   - Cliquez sur **"Nouveau"**
   - Ajoutez le chemin vers le dossier `bin` de Maven :
     ```
     C:\Program Files\Apache\maven\apache-maven-3.9.5\bin
     ```
   - Cliquez sur **"OK"** partout

3. **Créer la variable MAVEN_HOME (optionnel mais recommandé) :**
   - Dans "Variables système", cliquez sur **"Nouvelle"**
   - Nom : `MAVEN_HOME`
   - Valeur : `C:\Program Files\Apache\maven\apache-maven-3.9.5`
   - Cliquez sur **"OK"**

### Étape 3 : Vérifier l'Installation

**Important :** Fermez et rouvrez votre terminal après avoir modifié les variables d'environnement.

Dans un nouveau terminal (Command Prompt ou PowerShell), testez :

```bash
mvn -version
```

Vous devriez voir quelque chose comme :
```
Apache Maven 3.9.5
Maven home: C:\Program Files\Apache\maven\apache-maven-3.9.5
Java version: 17.0.x
```

### ✅ Si ça fonctionne, vous pouvez maintenant :

```bash
cd C:\Users\user\Downloads\event-management-platform
mvn clean install
```

---

## 🔄 Alternative 1 : Utiliser un IDE (Plus Simple)

Si vous avez **IntelliJ IDEA** ou **Eclipse** :

### IntelliJ IDEA :
1. Ouvrez le projet dans IntelliJ IDEA
2. Le projet sera automatiquement importé par Maven
3. Vous pouvez compiler avec : `Build > Build Project` (Ctrl+F9)
4. Vous pouvez exécuter les services avec le bouton "Run" à côté de chaque `@SpringBootApplication`

### Eclipse :
1. Ouvrez Eclipse
2. File > Import > Existing Maven Projects
3. Sélectionnez le dossier du projet
4. Eclipse téléchargera Maven automatiquement

---

## 🔄 Alternative 2 : Utiliser Chocolatey (Si installé)

Si vous avez Chocolatey installé sur Windows :

```bash
choco install maven
```

---

## 🔄 Alternative 3 : Vérifier si Java est installé

Maven nécessite Java. Vérifiez d'abord :

```bash
java -version
```

Si Java n'est pas installé :
- Téléchargez Java 17 depuis : https://adoptium.net/
- Installez-le et ajoutez-le au PATH

---

## ❓ Dépannage

### "mvn n'est pas reconnu" après installation

1. **Fermez complètement tous les terminaux**
2. **Rouvrez un nouveau terminal**
3. Vérifiez que le PATH est correct :
   ```bash
   echo %PATH%
   ```
   Vous devriez voir le chemin vers Maven

### Erreur "JAVA_HOME is not set"

1. Trouvez où Java est installé (généralement : `C:\Program Files\Java\jdk-17`)
2. Créez une variable d'environnement :
   - Nom : `JAVA_HOME`
   - Valeur : `C:\Program Files\Java\jdk-17`

---

## 📝 Notes

- **Fermez toujours vos terminaux** après avoir modifié les variables d'environnement
- Maven téléchargera automatiquement les dépendances lors de la première compilation
- La première compilation peut prendre 5-10 minutes

---

## ✅ Une fois Maven installé, continuez avec :

Consultez le fichier `DEMARRAGE.md` pour démarrer l'application complète.

