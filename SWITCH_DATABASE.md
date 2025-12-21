# Guide de Remplacement de MySQL

## Option 1 : Utiliser H2 (Recommandé pour développement/test)

### Avantages
- ✅ Pas d'installation nécessaire
- ✅ Démarrage rapide
- ✅ Parfait pour les tests
- ✅ Console web intégrée pour visualiser les données

### Étapes

#### 1. Modifier les POM.xml de tous les services

Dans `user-service/pom.xml`, `event-service/pom.xml`, `reservation-service/pom.xml`, `payment-service/pom.xml` :

**Remplacer :**
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

**Par :**
```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

#### 2. Modifier les fichiers application.yml

Remplacer la section `datasource` dans chaque service :

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:userdb  # userdb, eventdb, reservationdb, paymentdb
    username: sa
    password: 
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
      path: /h2-console
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.H2Dialect
```

#### 3. Accéder à la console H2

Après démarrage, accédez à :
- User Service : http://localhost:8081/h2-console
- Event Service : http://localhost:8082/h2-console
- Reservation Service : http://localhost:8083/h2-console
- Payment Service : http://localhost:8084/h2-console

**Paramètres de connexion :**
- JDBC URL: `jdbc:h2:mem:userdb` (ou eventdb, reservationdb, paymentdb)
- Username: `sa`
- Password: (vide)

---

## Option 2 : Utiliser PostgreSQL (Recommandé pour production)

### Étapes

#### 1. Installer PostgreSQL

**Windows :**
- Télécharger depuis : https://www.postgresql.org/download/windows/
- Ou utiliser Docker : `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15`

**Linux/Mac :**
```bash
# Ubuntu/Debian
sudo apt-get install postgresql

# Mac
brew install postgresql
```

#### 2. Créer les bases de données

```bash
psql -U postgres

CREATE DATABASE userdb;
CREATE DATABASE eventdb;
CREATE DATABASE reservationdb;
CREATE DATABASE paymentdb;
\q
```

#### 3. Modifier les POM.xml

**Remplacer MySQL par PostgreSQL :**
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

#### 4. Modifier les fichiers application.yml

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/userdb
    username: postgres
    password: postgres
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```

---

## Option 3 : Utiliser les profils Spring (Recommandé)

Vous pouvez avoir plusieurs configurations et choisir au démarrage !

### 1. Créer plusieurs fichiers application-*.yml

- `application.yml` (par défaut - MySQL)
- `application-h2.yml` (H2)
- `application-postgres.yml` (PostgreSQL)

### 2. Démarrer avec un profil spécifique

```bash
# Avec H2
mvn spring-boot:run -Dspring-boot.run.profiles=h2

# Avec PostgreSQL
mvn spring-boot:run -Dspring-boot.run.profiles=postgres

# Avec MySQL (par défaut)
mvn spring-boot:run
```

### 3. Ou dans application.yml, ajouter :

```yaml
spring:
  profiles:
    active: h2  # ou postgres, ou mysql
```

---

## Comparaison Rapide

| Critère | MySQL | PostgreSQL | H2 |
|---------|-------|------------|-----|
| **Installation** | ⚠️ Nécessaire | ⚠️ Nécessaire | ✅ Aucune |
| **Production** | ✅ Oui | ✅ Oui | ❌ Non |
| **Développement** | ✅ Oui | ✅ Oui | ✅ Parfait |
| **Performance** | ✅ Bonne | ✅ Excellente | ⚠️ Limité |
| **Complexité** | ⚠️ Moyenne | ⚠️ Moyenne | ✅ Simple |

---

## Recommandation Finale

**Pour votre projet de contrôle JEE :**

1. **Développement/Test** : Utilisez **H2** (rapide, pas d'installation)
2. **Démonstration** : Utilisez **PostgreSQL** (plus professionnel)
3. **Production** : Utilisez **PostgreSQL** ou **MySQL**

---

## Script de Migration Rapide

Si vous voulez que je modifie automatiquement tous les fichiers pour utiliser H2 ou PostgreSQL, dites-moi simplement :
- "Remplace par H2"
- "Remplace par PostgreSQL"

Et je ferai les modifications dans tous les services ! 🚀






