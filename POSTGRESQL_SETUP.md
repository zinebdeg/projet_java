# Guide Complet - Configuration PostgreSQL

## Étape 1 : Vérifier l'Installation de PostgreSQL

### Windows
1. Ouvrir **pgAdmin** (interface graphique) ou **Command Prompt**
2. Vérifier que PostgreSQL est installé :
```bash
psql --version
```

### Linux/Mac
```bash
psql --version
```

Si la commande ne fonctionne pas, ajoutez PostgreSQL au PATH ou utilisez le chemin complet.

---

## Étape 2 : Créer les Bases de Données

### Option A : Via pgAdmin (Interface Graphique)

1. Ouvrir **pgAdmin**
2. Se connecter au serveur PostgreSQL (mot de passe défini lors de l'installation)
3. Clic droit sur **Databases** → **Create** → **Database**
4. Créer les 4 bases de données :
   - `userdb`
   - `eventdb`
   - `reservationdb`
   - `paymentdb`

### Option B : Via Ligne de Commande (Recommandé)

**Windows :**
```bash
# Ouvrir Command Prompt ou PowerShell
psql -U postgres
```

**Linux/Mac :**
```bash
sudo -u postgres psql
# ou
psql -U postgres
```

**Puis exécuter ces commandes SQL :**
```sql
-- Créer les bases de données
CREATE DATABASE userdb;
CREATE DATABASE eventdb;
CREATE DATABASE reservationdb;
CREATE DATABASE paymentdb;

-- Vérifier qu'elles sont créées
\l

-- Quitter
\q
```

**Si vous avez un mot de passe :**
```bash
psql -U postgres -h localhost
# Entrer le mot de passe quand demandé
```

---

## Étape 3 : Modifier les Fichiers POM.xml

Je vais modifier automatiquement tous les POM.xml pour utiliser PostgreSQL au lieu de MySQL.

---

## Étape 4 : Modifier les Fichiers application.yml

Je vais modifier automatiquement tous les fichiers application.yml pour se connecter à PostgreSQL.

**Informations nécessaires :**
- **Host** : localhost (par défaut)
- **Port** : 5432 (par défaut PostgreSQL)
- **Username** : postgres (par défaut)
- **Password** : celui que vous avez défini lors de l'installation

---

## Étape 5 : Tester la Connexion

### Test Manuel
```bash
psql -U postgres -d userdb
```

Si ça fonctionne, vous verrez :
```
userdb=#
```

### Test via l'Application

1. Compiler le projet :
```bash
mvn clean install
```

2. Démarrer Eureka Server :
```bash
cd eureka-server
mvn spring-boot:run
```

3. Démarrer User Service :
```bash
cd user-service
mvn spring-boot:run
```

4. Vérifier les logs - vous devriez voir :
```
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
```

---

## Étape 6 : Vérifier les Tables Créées

### Via pgAdmin
1. Ouvrir pgAdmin
2. Se connecter au serveur
3. Naviguer vers : `userdb` → `Schemas` → `public` → `Tables`
4. Vous devriez voir les tables créées automatiquement par Hibernate

### Via Ligne de Commande
```bash
psql -U postgres -d userdb

# Lister les tables
\dt

# Voir la structure d'une table
\d users

# Quitter
\q
```

---

## Dépannage

### Erreur : "password authentication failed"
**Solution :** Vérifiez le mot de passe dans `application.yml`

### Erreur : "database does not exist"
**Solution :** Créez les bases de données (Étape 2)

### Erreur : "connection refused"
**Solution :** Vérifiez que PostgreSQL est démarré :
- **Windows** : Services → PostgreSQL → Démarrer
- **Linux** : `sudo systemctl start postgresql`
- **Mac** : `brew services start postgresql`

### Erreur : "port 5432 already in use"
**Solution :** Un autre service utilise le port. Changez le port dans `application.yml` ou arrêtez l'autre service.

---

## Commandes Utiles PostgreSQL

```sql
-- Se connecter à une base de données
\c userdb

-- Lister toutes les bases de données
\l

-- Lister toutes les tables
\dt

-- Voir la structure d'une table
\d nom_table

-- Exécuter une requête SQL
SELECT * FROM users;

-- Quitter
\q
```

---

## Prochaines Étapes

Une fois PostgreSQL configuré :
1. ✅ Bases de données créées
2. ✅ POM.xml modifiés
3. ✅ application.yml modifiés
4. ✅ Tester la connexion
5. ✅ Démarrer les services

**Prêt à continuer ?** Je vais maintenant modifier automatiquement tous les fichiers pour vous ! 🚀






