# AGENTS.md — AutonomiePositive

## 1. Rôle de Codex

Tu es l’agent de développement principal du projet **AutonomiePositive**, une application mobile/tablette destinée à aider les parents à accompagner des adolescents vers plus d’autonomie grâce à l’éducation positive.

Le projet doit être pensé comme un produit commercialisable :
- architecture propre,
- sécurité dès le départ,
- données locales utilisables hors ligne,
- synchronisation cloud dès qu’Internet est disponible,
- multilingue,
- accessible,
- maintenable,
- testable,
- évolutif.

Tu dois privilégier la qualité, la lisibilité et la simplicité plutôt qu’une complexité inutile.

---

## 2. Vision produit

L’application permet aux parents de définir des règles, routines, tâches, attitudes attendues et récompenses.

L’adolescent gagne des points quand une action est faite correctement ou prise en initiative. Il ne perd pas de points si l’action est mal faite ou non faite. Le principe éducatif est basé sur le renforcement positif :
- on récompense ce qui est bien fait,
- on valorise l’autonomie,
- on évite la punition numérique,
- on rend les attentes claires,
- on rend les progrès visibles.

Les points peuvent être échangés contre des récompenses définies par les parents : temps d’écran, argent de poche, sortie, restaurant, invitation d’un ami, activité spéciale, etc.

---

## 3. Public cible

### Parents
Ils configurent :
- les enfants,
- les routines,
- les tâches,
- les règles d’évaluation,
- les récompenses,
- les plafonds,
- les périodes de présence,
- les langues,
- les paramètres de sécurité.

### Adolescents
Ils voient :
- leurs tâches du jour,
- leur progression,
- leurs points,
- leur multiplicateur,
- les récompenses disponibles,
- les récompenses déjà demandées,
- l’historique de leurs progrès.

---

## 4. Principes fonctionnels obligatoires

### 4.1 Tâches

Une tâche doit pouvoir contenir :
- titre,
- description,
- catégorie,
- fréquence,
- jours concernés,
- heure indicative,
- points de base,
- possibilité d’initiative,
- besoin de validation parentale,
- preuve optionnelle,
- checklist optionnelle,
- enfant(s) assigné(s),
- statut : à faire, soumis, validé, refusé, ignoré, expiré.

Exemples :
- se laver les dents,
- ranger sa chambre,
- mettre la table,
- débarrasser,
- faire ses devoirs,
- vider le lave-vaisselle,
- prendre une douche,
- avoir une attitude respectueuse.

### 4.2 Points

Règle de base recommandée :
- tâche bien faite : +2 points ou valeur définie par le parent,
- tâche non faite : 0 point,
- tâche mal faite : 0 point,
- initiative validée : bonus configurable, par défaut +2 points.

Ne jamais retirer de points dans le MVP.

### 4.3 Multiplicateur

Un multiplicateur peut augmenter quand l’enfant enchaîne des validations positives.

Exemple :
- 3 validations consécutives : x1.1,
- 7 validations consécutives : x1.2,
- 14 validations consécutives : x1.3.

Si la régularité baisse, le multiplicateur redescend progressivement à x1.0.
Il ne descend jamais sous x1.0.

La logique doit être configurable.

### 4.4 Récompenses

Une récompense contient :
- titre,
- description,
- catégorie,
- coût en points,
- rareté,
- plafond par période,
- période : jour, semaine, mois, trimestre, semestre, année,
- type : écran, argent, activité, social, privilège, autre,
- devise éventuelle,
- validation parentale obligatoire,
- disponibilité.

Exemples :
- 30 minutes d’écran,
- inviter un ami à dormir,
- restaurant,
- 5 CHF / EUR,
- sortie spéciale.

### 4.5 Raretés recommandées

Utiliser une rareté paramétrable :
- Commun : fréquent, 1 ou plusieurs fois par semaine,
- Rare : environ 1 fois par mois,
- Épique : environ 1 fois par trimestre,
- Légendaire : environ 1 fois par semestre,
- Ultime : environ 1 fois par an.

Ne pas utiliser une rareté qui rend l’enfant frustré ou démotivé.

### 4.6 Calcul du potentiel mensuel

L’application doit pouvoir estimer le maximum de points atteignables sur une période selon :
- les tâches planifiées,
- les points par tâche,
- les jours de présence,
- les bonus possibles,
- les multiplicateurs,
- les exceptions : vacances, colonie, garde alternée.

Cet indicateur aide le parent à fixer des coûts de récompense réalistes.

---

## 5. Exigences techniques

### 5.1 Stack recommandée

Frontend mobile/tablette :
- React Native avec Expo,
- TypeScript,
- Expo Router,
- Zustand ou Redux Toolkit pour l’état local,
- React Hook Form + Zod pour les formulaires,
- i18next pour le multilingue,
- NativeWind ou Tamagui pour l’UI.

Base locale :
- SQLite local via expo-sqlite,
- couche repository claire,
- migrations versionnées.

Backend :
- Supabase recommandé pour le MVP commercialisable :
  - PostgreSQL,
  - Auth,
  - Row Level Security,
  - Storage,
  - Edge Functions si besoin,
  - Realtime plus tard si nécessaire.

Alternative plus avancée :
- NestJS + PostgreSQL + Prisma + Redis + S3 compatible.

Pour le MVP, privilégier Supabase afin de gagner du temps.

### 5.2 Offline-first

L’app doit fonctionner sans Internet pour :
- consulter les tâches,
- valider ou soumettre une tâche,
- voir les points locaux,
- demander une récompense,
- consulter l’historique local.

Quand Internet revient :
- synchroniser les changements,
- détecter les conflits,
- résoudre les conflits avec stratégie claire.

Stratégie MVP :
- table `sync_queue`,
- chaque action locale crée un événement,
- les événements sont envoyés au serveur quand disponible,
- le serveur applique les règles,
- le client récupère l’état consolidé.

### 5.3 Sécurité

Obligatoire :
- séparation parent / enfant,
- rôles,
- Row Level Security côté Supabase,
- aucune donnée d’une famille ne doit être accessible à une autre,
- validation serveur des points,
- ne jamais faire confiance uniquement au client,
- journaliser les actions sensibles,
- consentement parental,
- suppression de compte et export de données,
- stockage minimal des données personnelles.

### 5.4 Données sensibles

L’application traite des données liées à des mineurs. Il faut donc appliquer :
- minimisation des données,
- pseudonymes possibles pour les enfants,
- pas de tracking publicitaire dans le MVP,
- analytics anonymisés uniquement,
- consentement explicite des parents,
- politique de confidentialité,
- conformité RGPD / Suisse nLPD à prévoir.

### 5.5 Accessibilité

Obligatoire :
- contrastes suffisants,
- textes lisibles,
- tailles dynamiques,
- navigation clavier/screen reader autant que possible,
- labels d’accessibilité,
- pas d’information uniquement par couleur,
- mode tablette et mobile,
- composants tactiles assez grands.

### 5.6 Multilingue

Prévoir dès le début :
- français,
- anglais,
- allemand,
- italien plus tard.

Toutes les chaînes doivent passer par i18next.
Aucun texte utilisateur visible ne doit être codé en dur.

### 5.7 Tests

Minimum :
- tests unitaires pour la logique de points,
- tests unitaires pour le multiplicateur,
- tests unitaires pour les plafonds de récompense,
- tests unitaires pour le calcul de potentiel mensuel,
- tests d’intégration repositories,
- tests E2E plus tard avec Maestro ou Detox.

---

## 6. Architecture attendue

Structure indicative :

```txt
/src
  /app
    /(auth)
    /(parent)
    /(teen)
    /(shared)
  /components
  /features
    /tasks
    /rewards
    /points
    /children
    /families
    /sync
    /settings
  /domain
    /entities
    /services
    /rules
  /infrastructure
    /db
    /repositories
    /supabase
    /sync
  /i18n
  /theme
  /utils
  /tests
```

Règle :
- la logique métier doit être dans `/domain`,
- l’UI ne doit pas calculer directement les points,
- les accès DB doivent passer par des repositories,
- les types doivent être stricts.

---

## 7. Modèle de données minimum

Entités principales :
- User
- Family
- FamilyMember
- ChildProfile
- TaskTemplate
- TaskOccurrence
- TaskSubmission
- TaskValidation
- PointsLedger
- Reward
- RewardRedemption
- PresenceCalendar
- BonusRule
- MultiplierRule
- SyncEvent
- AuditLog

Le `PointsLedger` est obligatoire : ne pas stocker seulement un total de points. Chaque mouvement doit être traçable.

---

## 8. Règles de développement

Avant chaque modification importante :
1. Lire ce fichier.
2. Lire le cahier des charges.
3. Proposer un plan court.
4. Implémenter par petits commits logiques.
5. Ajouter ou adapter les tests.
6. Vérifier TypeScript.
7. Vérifier lint.
8. Ne pas casser l’offline-first.

Ne jamais :
- stocker de secrets dans le code,
- contourner les règles de sécurité,
- coder des textes en dur,
- calculer les points uniquement côté client,
- supprimer des données sans migration ou audit,
- ajouter une dépendance lourde sans justification.

---

## 9. Définition du MVP

Le MVP doit inclure :
- création famille,
- profil parent,
- profil adolescent,
- tâches personnalisées,
- fréquence simple,
- validation parentale,
- points,
- bonus initiative,
- multiplicateur simple,
- récompenses personnalisées,
- plafonds,
- demandes de récompense,
- mode hors ligne basique,
- synchronisation cloud,
- français et anglais,
- thème responsive mobile/tablette.

---

## 10. Priorité absolue

Le produit doit rester aligné avec l’éducation positive.

Ne pas créer une application de surveillance punitive.
Ne pas humilier l’enfant.
Ne pas afficher de classements entre enfants par défaut.
Ne pas pousser à la compétition malsaine.
Ne pas retirer de points dans le MVP.
Mettre en avant les progrès, l’autonomie et l’encouragement.
