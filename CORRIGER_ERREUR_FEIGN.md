# Corriger l'Erreur Feign dans Payment et Reservation Services

## ✅ Correction Appliquée

J'ai corrigé les clients Feign en ajoutant le nom explicite des paramètres dans `@PathVariable`.

**Avant :**
```java
@GetMapping("/events/{id}")
EventDTO getEventById(@PathVariable Long id);
```

**Après :**
```java
@GetMapping("/events/{id}")
EventDTO getEventById(@PathVariable("id") Long id);
```

Cette correction a été appliquée dans :
- ✅ `payment-service/EventServiceClient.java`
- ✅ `payment-service/ReservationServiceClient.java`
- ✅ `reservation-service/EventServiceClient.java`

---

## 🚀 Prochaines Étapes

### 1. Recompiler les Services

Dans IntelliJ :

1. **Build → Rebuild Project**
2. Attendez que la compilation se termine

### 2. Redémarrer les Services en Erreur

1. **Arrêtez** les services PaymentService et ReservationService (bouton Stop dans l'onglet Run)
2. **Redémarrez-les** en cliquant sur ▶ Run

### 3. Vérifier l'Ordre de Démarrage

Assurez-vous que les services sont démarrés dans cet ordre :

1. ✅ **Eureka Server** (déjà démarré)
2. ✅ **Event Service** (déjà démarré)
3. ✅ **Reservation Service** (à redémarrer)
4. ✅ **Payment Service** (à redémarrer)

**Important :** ReservationService a besoin de EventService, et PaymentService a besoin de ReservationService et EventService.

---

## 🔍 Si l'Erreur Persiste

### Option 1 : Vérifier que Event Service est Démarré

ReservationService et PaymentService ont besoin de EventService. Assurez-vous qu'EventService est bien démarré et visible dans Eureka (http://localhost:8761).

### Option 2 : Ajouter une Configuration Feign

Si les services ont encore des problèmes de connexion, vous pouvez ajouter une configuration pour retarder l'initialisation :

Dans `application.yml` de chaque service concerné, ajoutez :

```yaml
feign:
  client:
    config:
      default:
        connectTimeout: 5000
        readTimeout: 5000
```

Mais normalement, avec la correction des @PathVariable, cela devrait fonctionner.

---

## ✅ Vérification

Après avoir redémarré les services, vérifiez :

1. **Eureka Dashboard** : http://localhost:8761
   - Tous les services devraient être enregistrés (en vert)

2. **Les services ne devraient plus avoir d'erreurs** dans la liste des services d'IntelliJ

---

## 💡 Note

L'erreur `parseAndValidateMetadata` dans Feign était due au fait que Feign ne pouvait pas correctement parser les métadonnées des annotations `@PathVariable` sans nom explicite. En ajoutant `@PathVariable("id")` au lieu de juste `@PathVariable`, Feign peut maintenant correctement mapper les paramètres.

