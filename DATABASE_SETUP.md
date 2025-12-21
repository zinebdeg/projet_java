# Configuration des Bases de Données - Alternatives à MySQL

## Option 1 : PostgreSQL (Recommandé pour la production)

### Avantages
- Open source et robuste
- Excellent pour les applications d'entreprise
- Supporte les transactions complexes
- Meilleure performance pour les requêtes complexes

### Configuration

#### 1. Modifier les POM.xml (remplacer MySQL par PostgreSQL)

Dans chaque service (`user-service`, `event-service`, `reservation-service`, `payment-service`), remplacer :

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

Par :

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

#### 2. Modifier les fichiers application.yml

Remplacer la section `datasource` :

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

#### 3. Créer les bases de données PostgreSQL

```sql
CREATE DATABASE userdb;
CREATE DATABASE eventdb;
CREATE DATABASE reservationdb;
CREATE DATABASE paymentdb;
```

#### 4. Docker Compose avec PostgreSQL

Remplacer les services MySQL dans `docker-compose.yml` :

```yaml
postgres-user:
  image: postgres:15
  container_name: postgres-user
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
    POSTGRES_DB: userdb
  ports:
    - "5432:5432"
  networks:
    - event-network
```

---

## Option 2 : H2 Database (Pour développement/test)

### Avantages
- Base de données en mémoire (pas d'installation nécessaire)
- Parfait pour les tests et le développement rapide
- Compatible avec SQL standard
- Pas besoin de serveur de base de données

### Configuration

#### 1. Modifier les POM.xml

Remplacer MySQL par H2 :

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

#### 2. Modifier les fichiers application.yml

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:userdb
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

**Note** : Avec H2, vous pouvez accéder à la console H2 via : `http://localhost:8081/h2-console`

---

## Option 3 : MongoDB (NoSQL)

### Avantages
- Flexible pour les données non structurées
- Scalabilité horizontale
- Pas besoin de schéma prédéfini

### Configuration

#### 1. Modifier les POM.xml

Remplacer JPA par MongoDB :

```xml
<!-- Supprimer spring-boot-starter-data-jpa -->
<!-- Supprimer mysql-connector -->

<!-- Ajouter MongoDB -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

#### 2. Modifier les fichiers application.yml

```yaml
spring:
  data:
    mongodb:
      host: localhost
      port: 27017
      database: userdb
```

#### 3. Modifier les entités

Remplacer `@Entity` par `@Document` et `@Id` reste le même.

---

## Option 4 : MariaDB (Compatible MySQL)

### Avantages
- Compatible avec MySQL (même syntaxe SQL)
- Open source
- Meilleures performances dans certains cas

### Configuration

#### 1. Modifier les POM.xml

```xml
<dependency>
    <groupId>org.mariadb.jdbc</groupId>
    <artifactId>mariadb-java-client</artifactId>
    <version>3.2.0</version>
</dependency>
```

#### 2. Modifier les fichiers application.yml

```yaml
spring:
  datasource:
    url: jdbc:mariadb://localhost:3306/userdb
    username: root
    password: root
    driver-class-name: org.mariadb.jdbc.Driver
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MariaDBDialect
```

---

## Comparaison Rapide

| Base de données | Type | Installation | Production | Développement |
|----------------|------|--------------|------------|---------------|
| **PostgreSQL** | SQL | Moyenne | ✅ Excellent | ✅ Bon |
| **H2** | SQL | Aucune | ❌ Non | ✅ Parfait |
| **MongoDB** | NoSQL | Moyenne | ✅ Excellent | ✅ Bon |
| **MariaDB** | SQL | Moyenne | ✅ Excellent | ✅ Bon |
| **MySQL** | SQL | Moyenne | ✅ Excellent | ✅ Bon |

---

## Recommandation

- **Pour le développement/test** : Utilisez **H2** (rapide, pas d'installation)
- **Pour la production** : Utilisez **PostgreSQL** (robuste, performant)
- **Pour des données flexibles** : Utilisez **MongoDB** (si vous avez besoin de NoSQL)






