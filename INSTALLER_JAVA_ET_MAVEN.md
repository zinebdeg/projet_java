# Installation Complète : Java + Maven

## 🎯 Problème Actuel

- ✅ Maven est installé (via Chocolatey)
- ❌ Java n'est PAS installé
- ❌ JAVA_HOME n'est pas configuré

---

## 🚀 Solution : Installer Java avec Chocolatey

### Étape 1 : Installer Java

**Ouvrez PowerShell en tant qu'Administrateur** :
- Clic droit sur le menu Démarrer
- Sélectionnez **"Terminal (Administrateur)"** ou **"Windows PowerShell (Administrateur)"**
- Cliquez sur **"Oui"**

Dans le terminal administrateur, exécutez :

```powershell
choco install openjdk17 -y
```

Cette commande va :
- ✅ Télécharger Java 17
- ✅ L'installer automatiquement
- ✅ Configurer JAVA_HOME automatiquement
- ✅ Ajouter Java au PATH

**Attendez que l'installation se termine** (peut prendre quelques minutes).

### Étape 2 : Redémarrer le Terminal

**Fermez COMPLÈTEMENT tous les terminaux et ouvrez-en un nouveau** (normal, pas administrateur).

### Étape 3 : Vérifier l'Installation

Dans le nouveau terminal, testez :

```powershell
# Vérifier Java
java -version

# Vérifier JAVA_HOME
echo $env:JAVA_HOME

# Vérifier Maven (devrait maintenant fonctionner)
mvn -version
```

**Résultat attendu :**

```
openjdk version "17.0.x"
OpenJDK Runtime Environment (build 17.0.x)
OpenJDK 64-Bit Server VM (build 17.0.x, mixed mode)
```

Et pour Maven :

```
Apache Maven 3.9.x
Maven home: ...
Java version: 17.0.x
Java home: C:\Program Files\Eclipse Adoptium\jdk-17.x.x
```

---

## ✅ Si tout fonctionne

Vous pouvez maintenant compiler votre projet :

```powershell
cd C:\Users\user\Downloads\event-management-platform
mvn clean install
```

---

## ⚠️ Si JAVA_HOME n'est toujours pas défini

Si après l'installation de Java, `echo $env:JAVA_HOME` retourne vide, configurez-le manuellement :

### Trouver le Chemin de Java

```powershell
where.exe java
```

Cela devrait donner quelque chose comme :
```
C:\Program Files\Eclipse Adoptium\jdk-17.0.9+9\bin\java.exe
```

### Configurer JAVA_HOME

1. **Appuyez sur** `Windows + R`
2. **Tapez** : `sysdm.cpl` puis Entrée
3. Onglet **"Avancé"** → **"Variables d'environnement"**
4. Dans **"Variables système"**, cliquez sur **"Nouvelle"**
5. **Nom** : `JAVA_HOME`
6. **Valeur** : Le chemin jusqu'au dossier `jdk-17.x.x` (sans `\bin\java.exe`)
   - Exemple : `C:\Program Files\Eclipse Adoptium\jdk-17.0.9+9`
7. Cliquez sur **"OK"** partout
8. **Fermez et rouvrez le terminal**

---

## 📝 Alternative : Installation Manuelle de Java

Si Chocolatey ne fonctionne pas :

1. **Téléchargez Java 17** :
   - Allez sur : https://adoptium.net/
   - Téléchargez **JDK 17** pour Windows x64
   - Installez le fichier `.msi`

2. **Notez le chemin d'installation** (généralement : `C:\Program Files\Eclipse Adoptium\jdk-17.x.x`)

3. **Configurez JAVA_HOME** (voir instructions ci-dessus)

4. **Ajoutez Java au PATH** :
   - Dans les Variables d'environnement
   - Variable **"Path"** → **"Modifier"** → **"Nouveau"**
   - Ajoutez : `C:\Program Files\Eclipse Adoptium\jdk-17.x.x\bin`

---

## 🎯 Résumé des Commandes

**Dans PowerShell Administrateur :**

```powershell
# Installer Java 17
choco install openjdk17 -y
```

**Puis fermez et rouvrez le terminal, et testez :**

```powershell
java -version
mvn -version
```

Si les deux commandes fonctionnent, vous êtes prêt ! 🎉

