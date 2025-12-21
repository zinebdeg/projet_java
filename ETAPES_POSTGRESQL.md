# ✅ Étapes Après Installation de PostgreSQL

## 🎯 Résumé des Modifications Effectuées

J'ai déjà modifié automatiquement :
- ✅ Tous les fichiers `pom.xml` (remplacement MySQL → PostgreSQL)
- ✅ Tous les fichiers `application.yml` (configuration PostgreSQL)

## 📋 Étapes à Suivre Maintenant

### Étape 1 : Créer les Bases de Données PostgreSQL

**Option A : Via pgAdmin (Interface Graphique)**
1. Ouvrir **pgAdmin**
2. Se connecter au serveur PostgreSQL
3. Clic droit sur **Databases** → **Create** → **Database**
4. Créer les 4 bases de données :
   - `userdb`
   - `eventdb`
   - `reservationdb`
   - `paymentdb`

**Option B : Via Ligne de Commande (Recommandé)**

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

**Puis exécuter :**
```sql
-- Créer les 4 bases de données
CREATE DATABASE userdb;
CREATE DATABASE eventdb;
CREATE DATABASE reservationdb;
CREATE DATABASE paymentdb;

-- Vérifier qu'elles sont créées
\l

-- Quitter
\q
```

**Si vous avez un mot de passe différent :**
- Modifiez `password: postgres` dans les fichiers `application.yml`
- Remplacez par votre mot de passe

---

### Étape 2 : Vérifier la Configuration

Les fichiers sont déjà configurés avec :
- **Host** : localhost
- **Port** : 5432 (port par défaut PostgreSQL)
- **Username** : postgres
- **Password** : postgres

**⚠️ Si votre mot de passe PostgreSQL est différent :**

Modifiez dans chaque `application.yml` :
- `user-service/src/main/resources/application.yml`
- `event-service/src/main/resources/application.yml`
- `reservation-service/src/main/resources/application.yml`
- `payment-service/src/main/resources/application.yml`

Changez la ligne :
```yaml
password: postgres  # Remplacez par votre mot de passe
```

---

### Étape 3 : Compiler le Projet

```bash
# À la racine du projet
mvn clean install
```

Cela va télécharger la dépendance PostgreSQL et compiler tous les services.

---

### Étape 4 : Tester la Connexion

**Test rapide :**
```bash
# Se connecter à PostgreSQL
psql -U postgres -d userdb

# Si ça fonctionne, vous verrez :
# userdb=#
```

**Test via l'application :**

1. **Démarrer Eureka Server :**
```bash
cd eureka-server
mvn spring-boot:run
```

2. **Démarrer User Service :**
```bash
cd user-service
mvn spring-boot:run
```

3. **Vérifier les logs** - vous devriez voir :
```
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
```

Si vous voyez des erreurs de connexion, vérifiez :
- ✅ PostgreSQL est démarré
- ✅ Les bases de données sont créées
- ✅ Le mot de passe est correct dans `application.yml`

---

### Étape 5 : Vérifier les Tables Créées

**Via pgAdmin :**
1. Ouvrir pgAdmin
2. Naviguer : `userdb` → `Schemas` → `public` → `Tables`
3. Vous devriez voir la table `users` créée automatiquement

**Via Ligne de Commande :**
```bash
psql -U postgres -d userdb

# Lister les tables
\dt

# Voir la structure
\d users

# Quitter
\q
```

---

## 🚀 Démarrer Tous les Services

Une fois les bases de données créées :

1. **Eureka Server** (Terminal 1)
```bash
cd eureka-server
mvn spring-boot:run
```

2. **Config Server** (Terminal 2)
```bash
cd config-server
mvn spring-boot:run
```

3. **API Gateway** (Terminal 3)
```bash
cd api-gateway
mvn spring-boot:run
```

4. **User Service** (Terminal 4)
```bash
cd user-service
mvn spring-boot:run
```

5. **Event Service** (Terminal 5)
```bash
cd event-service
mvn spring-boot:run
```

6. **Reservation Service** (Terminal 6)
```bash
cd reservation-service
mvn spring-boot:run
```

7. **Payment Service** (Terminal 7)
```bash
cd payment-service
mvn spring-boot:run
```

---

## ⚠️ Dépannage

### Erreur : "password authentication failed"
**Solution :** Vérifiez le mot de passe dans `application.yml`

### Erreur : "database does not exist"
**Solution :** Créez les bases de données (Étape 1)

### Erreur : "connection refused"
**Solution :** Vérifiez que PostgreSQL est démarré :
- **Windows** : Services → PostgreSQL → Démarrer
- **Linux** : `sudo systemctl start postgresql`
- **Mac** : `brew services start postgresql`

### Erreur : "psql: command not found"
**Solution :** Ajoutez PostgreSQL au PATH ou utilisez pgAdmin

---

## ✅ Checklist Finale

- [ ] PostgreSQL installé
- [ ] 4 bases de données créées (userdb, eventdb, reservationdb, paymentdb)
- [ ] Mot de passe configuré dans application.yml (si différent de "postgres")
- [ ] Projet compilé (`mvn clean install`)
- [ ] Eureka Server démarré
- [ ] Services démarrés et connectés à PostgreSQL

**Tout est prêt ! 🎉**






