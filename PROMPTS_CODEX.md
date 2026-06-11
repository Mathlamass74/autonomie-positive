# Prompts Codex — AutonomiePositive

## Prompt 1 — Initialisation du projet

Tu vas créer une application mobile/tablette appelée AutonomiePositive.

Lis obligatoirement `AGENTS.md` et `CAHIER_DES_CHARGES.md` avant de coder.

Objectif :
- créer le squelette React Native Expo en TypeScript,
- installer Expo Router,
- préparer l’architecture `/src`,
- préparer i18next,
- préparer un thème simple,
- créer les premiers écrans placeholder parent/adolescent,
- ajouter un README avec les commandes.

Contraintes :
- aucun texte visible codé en dur hors fichiers i18n,
- TypeScript strict,
- architecture propre,
- pas de logique métier dans les composants UI.

À la fin :
- donne les commandes pour lancer l’app,
- liste les fichiers créés,
- explique les prochains fichiers à implémenter.

---

## Prompt 2 — Modèle métier et règles de points

Lis `AGENTS.md` et `CAHIER_DES_CHARGES.md`.

Implémente la couche domaine pour :
- TaskTemplate,
- TaskOccurrence,
- TaskSubmission,
- TaskValidation,
- PointsLedger,
- Reward,
- RewardRedemption,
- PresenceCalendar,
- BonusRule,
- MultiplierRule.

Ajoute les services métier :
- calcul des points,
- bonus initiative,
- multiplicateur,
- plafonds de récompenses,
- potentiel mensuel de points.

Ajoute des tests unitaires complets.

Important :
- aucun point négatif,
- le multiplicateur ne descend jamais sous x1.0,
- les absences planifiées ne pénalisent pas l’adolescent,
- la logique doit être indépendante de React Native.

---

## Prompt 3 — Base locale SQLite

Lis `AGENTS.md` et `CAHIER_DES_CHARGES.md`.

Implémente la base locale SQLite :
- migrations versionnées,
- tables principales,
- repositories,
- seed de démonstration,
- couche `sync_queue`.

Contraintes :
- pas d’accès direct SQLite depuis l’UI,
- toutes les actions passent par des repositories,
- prévoir `created_at`, `updated_at`, `deleted_at`,
- prévoir un identifiant UUID local,
- prévoir un champ `sync_status`.

Ajoute des tests si possible.

---

## Prompt 4 — Écrans parent MVP

Lis `AGENTS.md` et `CAHIER_DES_CHARGES.md`.

Crée les écrans parent MVP :
- dashboard famille,
- liste des enfants,
- dashboard enfant,
- liste des tâches,
- création/modification tâche,
- validations en attente,
- liste récompenses,
- création/modification récompense,
- demandes de récompense,
- calendrier de présence,
- paramètres.

Utilise des composants réutilisables.
Respecte l’accessibilité.
Tous les textes doivent passer par i18next.

---

## Prompt 5 — Écrans adolescent MVP

Lis `AGENTS.md` et `CAHIER_DES_CHARGES.md`.

Crée les écrans adolescent MVP :
- accueil du jour,
- tâches du jour,
- détail d’une tâche,
- soumission d’une tâche,
- déclaration d’initiative,
- points disponibles,
- boutique de récompenses,
- demande de récompense,
- historique.

L’interface doit être adaptée aux adolescents :
- pas trop enfantine,
- claire,
- motivante,
- visuellement agréable,
- pas punitive.

Tous les textes doivent passer par i18next.

---

## Prompt 6 — Supabase et sécurité

Lis `AGENTS.md` et `CAHIER_DES_CHARGES.md`.

Prépare l’intégration Supabase :
- schéma SQL PostgreSQL,
- tables,
- relations,
- index,
- Row Level Security,
- policies par famille et rôle,
- auth parent,
- invitation adolescent,
- storage optionnel pour preuves.

Important :
- aucune famille ne peut lire les données d’une autre,
- le client ne doit pas pouvoir manipuler librement les points,
- les mouvements de points doivent passer par une fonction sécurisée ou une validation serveur,
- fournir les migrations SQL.

---

## Prompt 7 — Synchronisation offline-first

Lis `AGENTS.md` et `CAHIER_DES_CHARGES.md`.

Implémente la synchronisation offline-first :
- détection réseau,
- file d’attente locale `sync_queue`,
- push des événements locaux,
- pull de l’état serveur,
- résolution simple des conflits,
- statut visible dans l’UI.

Stratégie MVP :
- last-write-wins pour les champs non critiques,
- serveur source de vérité pour les points,
- actions de points sous forme de ledger,
- journalisation des conflits.

Ajoute des tests de synchronisation.

---

## Prompt 8 — Multilingue et accessibilité

Lis `AGENTS.md` et `CAHIER_DES_CHARGES.md`.

Finalise :
- français,
- anglais,
- structure prête pour allemand et italien,
- labels d’accessibilité,
- tailles dynamiques,
- contrastes,
- textes non stigmatisants,
- pas d’information uniquement par couleur.

Fais un audit rapide des écrans existants et corrige les problèmes.

---

## Prompt 9 — Préparation commercialisation

Lis `AGENTS.md` et `CAHIER_DES_CHARGES.md`.

Prépare les bases produit :
- écran confidentialité,
- écran consentement parental,
- suppression de compte,
- export de données,
- mentions légales placeholder,
- CGU placeholder,
- politique de confidentialité placeholder,
- structure d’abonnement future sans l’activer.

Ne pas intégrer de paiement réel pour l’instant.
Préparer uniquement l’architecture.

---

## Prompt 10 — Qualité finale MVP

Lis `AGENTS.md` et `CAHIER_DES_CHARGES.md`.

Fais une revue complète :
- TypeScript,
- lint,
- tests,
- architecture,
- sécurité,
- accessibilité,
- i18n,
- offline-first,
- cohérence produit.

Corrige les problèmes trouvés.
Fournis une checklist de ce qui est prêt et de ce qui reste à faire.
