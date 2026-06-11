# APPLICATION_ARCHITECTURE — Architecture fonctionnelle (MVP)

Date: 2026-06-11

But: transformer le modèle métier en architecture fonctionnelle complète. Ce document expose modules, cas d'utilisation, permissions, flux principaux et exceptionnels, écrans, états, notifications, dépendances et ordre optimal de développement. Aucune considération technique (code, bases, frameworks) n'est incluse : uniquement le périmètre fonctionnel demandé.

1. Modules fonctionnels
------------------------
- Family & Onboarding: création de la Family, invitations, paramètres globaux (langue, templates, visibilité des points).
- Users: gestion des acteurs `Parent` et `Teen` (profils, rôles, préférences, statut actif/inactif).
- Responsibilities: définition, planification, réalisation et suivi des tâches récurrentes ou ponctuelles.
- Initiatives: déclaration d'initiatives par les Teens, suivi de statut (Pending/Validé/Refusé).
- Validation Queue: file de traitement des soumissions (initiatives + responsabilités nécessitant validation) pour les Parents.
- Rewards & Requests: catalogue simple de récompenses définies par parent, demandes par Teen et traitement.
- Freedoms: définition et attribution des libertés (politiques, niveaux, expiration, révocation).
- Trust & Events: historique immuable des signaux de confiance (TrustEvent) et journalisation d'actions importantes.
- Presence & Availability: gestion des périodes de présence/absence (vacances, garde alternée) et adaptation des délais/notifications.
- Templates & Microcopy: bibliothèque de messages et templates pédagogiques pour Valider/Refuser.
- Notifications & Scheduling: règles d'envoi (digest, alertes), déclencheurs et fréquence.
- Observability (produit): métriques internes pour le pilote (activations, délais, taux d'utilisation templates) — visible seulement pour l'équipe produit.
- Support / Concierge: flux manuel pour accompagner familles pilotes (actions humaines, corrections, relances).

2. Cas d'utilisation Parent
---------------------------
- Onboarder la famille: créer Family, ajouter parent(s), ajouter Teen(s), définir 2–3 libertés initiales et paramètres.
- Traiter la file de validations: consulter la liste, lire la soumission (texte), Valider ou Refuser (commentaire obligatoire pour refus), marquer comme traité.
- Gérer Responsibilities: créer/éditer/archiver responsabilités, définir fréquence et besoinValidation.
- Gérer Rewards: créer rewards simples (titre, type, plafond), consulter demandes, approuver/refuser demandes.
- Attribuer/Revoquer Freedoms: choisir liberté, définir durée/niveau, accorder ou révoquer pour un Teen.
- Consulter l'historique (TrustEvents): revoir dernières actions (30j) pour contexte.
- Configurer templates et notifications: activer/désactiver templates, régler digest.
- Gérer PresencePeriod pour un Teen: signaler absences/vacances afin d'ajuster attentes.

3. Cas d'utilisation Adolescent
-------------------------------
- Onboarder (recevoir invite / rejoindre Family).
- Voir Today: lister responsabilités du jour et initiatives personnelles; statut clair (à faire, soumis, validé, refusé).
- Soumettre réalisation d'une Responsibility: cocher ou remplir un court texte pour soumission.
- Déclarer Initiative: remplir 2 champs (quoi, pourquoi) et envoyer au Parent.
- Demander Reward: créer une RewardRequest pour une reward existante.
- Consulter Freedoms actives et statut des RewardRequests.
- Recevoir feedback parent (commentaire de validation/refus) et resoumettre si nécessaire.

4. Permissions
--------------
- Roles principaux: `Parent`, `Teen`.
- Parent: créer/éditer Family, créer/édite Responsibilities, définir Rewards/Freedoms, traiter Validations et RewardRequests, configurer templates et PresencePeriod.
- Teen: soumettre réalisations, déclarer Initiatives, créer RewardRequest, consulter statuts et Freedoms reçues.
- Coparentalité: plusieurs Parents peuvent exécuter les mêmes actions; règle produit à décider pour quorum (voir Questions ouvertes dans DOMAIN_MODEL). MVP: toute décision d'un Parent suffit.
- Restrictions:
  - Seul un Parent peut accorder ou révoquer Freedoms et approuver Rewards.
  - Les Teens ne peuvent pas modifier responsibilities globales ni créer Rewards.

5. Flux principaux
------------------
- Onboarding Family
  - Acteurs: Parent → Family & Users
  - Étapes: création Family → ajout Parent(s) → ajout Teen(s) → réglages initiaux → ready.

- Flux Today (Responsibility sans validation)
  - Acteurs: Teen
  - Étapes: Teen voit listes du jour → marque comme fait → TrustEvent créé (si besoinValidation=false) → historique parent consultable.

- Flux Responsibility → Validation
  - Acteurs: Teen, Parent
  - Étapes: Teen soumet réalisation (texte) → soumission en file → Parent traite → ValidationAccepted or ValidationRefused → TrustEvent + notification Teen.

- Flux Initiative
  - Acteurs: Teen, Parent
  - Étapes: Teen déclare initiative → statu Pending → Parent lit → Valide/Refuse (commentaire si refus) → si validé → TrustEvent et éventuellement signal pour Reward/Freedom.

- Flux RewardRequest
  - Acteurs: Teen, Parent
  - Étapes: Teen demande reward → mise en file chez Parent → Parent approuve/refuse → reward accordée (FreedomLevel ou action externe) ou refusée.

- Flux FreedomGrant
  - Acteurs: Parent
  - Étapes: Parent sélectionne liberté → définit durée/niveau → attribue à Teen → FreedomLevel active → expiration/révocation possible.

6. Flux exceptionnels
---------------------
- Validation non traitée (délai dépassé)
  - Détection: délai >72h sans décision → alerte au Parent secondaire / digest d'alerte.
  - Effet: escalade optionnelle (notification autom.) ou marquage pour intervention Concierge.

- Conflit coparental (décisions contradictoires)
  - Détection: Parent A valide, Parent B refuse.
  - Effet (MVP): conserver historique des deux décisions, marquer l'item comme traité par le premier décideur; escalade hors‑app ou via Concierge pour résolution.

- RewardRequest dépassant plafond
  - Détection: demande viole plafond défini.
  - Effet: bloquer demande et informer le Parent; proposer modification ou remplacement.

- Teen en PresencePeriod (absent)
  - Effet: étendre délais de validation, suspendre notifications ou regrouper en digest.

- Initiative résubmise après refus
  - Étapes: Teen modifie et resoumet → nouvelle Validation en file (historique conserve refus + nouvel essai).

- Récompense expirée avant utilisation
  - Effet: RewardRequest passe à Expirée, notification au Teen et Parent, option pour créer nouvelle demande.

7. Écrans du MVP
-----------------
Parent (principaux):
- Onboarding / Family Setup
- Parent Dashboard (vue condensée: file de validations, 3 metrics simples, accès rapides)
- Validation Queue (liste, filtres par Teen/date)
- Responsibilities (liste + éditeur)
- Rewards & Requests (catalogue + demandes)
- Settings & Templates

Adolescent (principaux):
- Teen Onboarding / Join Family
- Today (responsibilities du jour, boutons Soumettre)
- Initiatives (déclarer / statut)
- Rewards (statut demandes)
- Progress / History (vue simple des TrustEvents)

Communs:
- Notification Center / Inbox
- Profile / PresencePeriod

8. États de chaque écran
------------------------
Pour chaque écran, prévoir ces états standards (exemples appliqués à Validation Queue, Today et Dashboard):
- Loading: chargement initial des données.
- Empty: aucun élément (ex: aucune validation en attente).
- List with items: affichage normal avec éléments (pending, urgent, nouveaux).
- Item selected / detail: vue détaillée d'une soumission/initiative.
- Action in progress: traitement en cours (valider/refuser en attente de confirmation).
- Success: action terminée, feedback visuel (ex: "Validation enregistrée").
- Error / Offline: message et option retry; comportement strict pour actions critiques (prévenir perte de données).

Exemples concrets:
- Validation Queue
  - Empty: "Aucune soumission" ; CTA pédagogique.
  - List: tri par date, badge Pending/OlderThan48h.
  - Detail: montrer texte ado, date, boutons Valider/Refuser, template.

- Today (Teen)
  - Empty: encouragement / suggestion d'initiative.
  - List: responsabilités du jour, bouton Soumettre ou cocher.

- Parent Dashboard
  - Condensé: 3 metrics (initiatives validées 30j, tâches sans rappel 30j, demandes en attente) + quick links.

9. Notifications
-----------------
Types et règles (MVP):
- Digest quotidien (paramétrable) — résumé des soumissions et demandes en attente.
- Alerte immédiate (optionnelle) — pour soumissions marquées urgentes ou après x heures non traitées.
- Confirmation utilisateur — notification au Teen lors d'une ValidationAccepted/Refused.
- Notification de FreedomGranted / RewardGranted.

Principes:
- Par défaut: digest peu intrusif. Notifications immédiates opt‑in.
- Destinataires: Parent(s) pour file de validation; Teen pour résultat de validation et Freedoms/Recompenses.
- Fréquence: digest quotidien + escalades seules en cas de non‑traitement prolongé.

10. Dépendances entre modules
-----------------------------
- Initiatives dépend de Users (Teen) et Notifications; produit une entrée pour Validation Queue; si validée, écrit dans Trust & Events.
- Responsibilities dépend de Users (Parent/Teen), Presence & Availability pour adapter délais, et Validation Queue si needValidation=true.
- Validation Queue dépend d'Initiatives et ResponsibilitySubmissions, Templates pour microcopy, Notifications pour alerter Parents, et Trust & Events pour historiser.
- Rewards & Requests dépend de Users, Validation results (si règles), et Freedoms si la reward est une liberté.
- Freedoms dépend de Parent actions, Presence (pour durées) et Trust & Events pour historique.
- Presence & Availability influence Notifications, Validation timeouts et l'affichage des écrans (suspension/retard).
- Templates & Microcopy est utilisé par Validation Queue et Notifications.
- Observability (produit) dépend de tous les modules opérationnels pour collecter métriques internes.
- Support / Concierge peut écrire/mettre à jour éléments dans la Validation Queue et Trust & Events (opérations manuelles durant pilote).

Ordre optimal de développement (slicing minimal et séquentiel)
-----------------------------------------------------------
But: livrer un incrément testable le plus vite possible qui valide hypothèses produit.

Phase 1 — Noyau d'activation et usage minimal (valide l'hypothèse d'initiation)
- Family & Onboarding (création Family, ajout Parent/Teen, réglages de base).
- Today (Teen) pour visualiser responsabilités du jour et soumettre sans validation (needValidation=false path).
- Trust & Events basique pour historiser actions simples.

Livrable Phase 1: Teens peuvent déclarer actions; Parents peuvent voir historique; premières métriques collectées.

Phase 2 — Validation humaine (flux parent essentiel)
- Validation Queue (Parent) avec actions Valider/Refuser et templates minimal.
- Initiatives (déclaration + file Pending).
- Notifications digest minimal et confirmations pour Teens.

Livrable Phase 2: flux end‑to‑end Initiative → Validation, Parent actionnable, Teens reçevant feedback.

Phase 3 — Libertés et récompenses simples
- Freedoms + FreedomLevel (attribution manuelle, expiration, révocation).
- Rewards & RewardRequest (catalogue simple, demandes, plafonds basiques).

Livrable Phase 3: parents peuvent récompenser via Freedoms/Rewards; mesurer effet comportemental.

Phase 4 — Présence, règles et exception handling
- Presence & Availability (vacances, garde alternée handling), escalades pour validations non traitées, règles de plafonds et expirations.

Phase 5 — Observability & Pilot support
- Templates enrichis, Observability (métriques internes), Support/Concierge tools pour piloter familles.

Phase 6 — Polissage produit
- Interface, microcopy, gestion multi‑parent avancée et décisions sur Questions ouvertes (quorum, règles auto pour rewards), décisions sur visibilité longue des TrustEvents.

Remarques finales
-----------------
- Chaque phase doit être testée en pilote (concierge) avant d'investir dans automatisations lourdes.
- Les décisions sur coparentalité, règles automatiques pour rewards et quorum doivent être prises avant Phase 4 car elles impactent invariants et flux exceptionnels.
- Ce document vise à lever toute ambiguïté produit pour commencer l'implémentation fonctionnelle sans décisions techniques.
