# DOMAIN_MODEL — Modèle métier (MVP)

Date: 2026-06-11

But: décrire, en termes métier uniquement, les entités, leurs attributs, relations, règles et événements nécessaires pour comprendre le domaine produit avant toute conception technique.

ENTITÉS
========

Family
------
- Définition: Un foyer, ensemble logique représentant une unité familiale utilisant l'application.
- Rôle: Conteneur organisationnel des parents, adolescents, règles et paramètres partagés.
- Attributs métier:
  - id métier (identifiant logique)
  - nom de la famille
  - code d'invitation (ou méthode d'association)
  - langue/préférences (p.ex. FR/EN)
  - paramètres globaux (ex: templates activés, points visibles/masqués, notifications digest activées)
  - date de création
- Cycle de vie:
  - Création (par un parent lors de l'onboarding)
  - Configuration initiale (ajout d'enfants, choix de réglages)
  - Activation (famille active si au moins une interaction enregistrée)
  - Gel/Archivage (si inactivité prolongée ou suppression explicite)

Parent
------
- Définition: Un adulte responsable au sein d'une Family, habilité à valider ou refuser les actions des Teens.
- Rôle: Prendre des décisions de validation, configurer libertés et récompenses, définir templates et paramètres.
- Attributs métier:
  - id métier
  - nom / pseudo
  - rôle (ex: administrateur principal, co‑parent)
  - préférences de notification
  - opt‑in templates pédagogiques
  - statut actif/inactif
- Cycle de vie:
  - Invitation / création (lié à une Family)
  - Activation (confirme compte et accepte règles)
  - Participation (actionne validations, accorde libertés)
  - Désactivation (retire accès ou archive)

Teen
----
- Définition: Un adolescent membre d'une Family qui déclare des initiatives et soumet des réalisations.
- Rôle: Déclarer initiatives, soumettre réalisations, consulter statuts et récompenses.
- Attributs métier:
  - id métier
  - nom / pseudo
  - âge approximatif
  - statut (actif/inactif)
  - préférences (notifications, anonymisation du nom)
  - historique d'initiatives et validations
- Cycle de vie:
  - Ajout à la Family (onboarding)
  - Usage (déclarations, soumissions)
  - Périodes d'absence (voir PresencePeriod)
  - Sortie (suppression ou transfert)

Responsibility (Responsabilité)
--------------------------------
- Définition: Une tâche ou routine attendue d'un Teen (ex: ranger chambre, sortir les poubelles).
- Rôle: Objet sur lequel le Teen peut agir quotidiennement/hebdomadairement et, selon la configuration, soumettre pour validation.
- Attributs métier:
  - id métier
  - titre
  - description (optionnelle)
  - fréquence (quotidien, hebdomadaire, ponctuel)
  - besoinValidation (booléen) — si true la soumission doit être validée par un Parent
  - points optionnels (masqués par défaut)
  - actif/inactif
  - créateur (Parent)
- Cycle de vie:
  - Création (Parent)
  - Programmation / répétition selon fréquence
  - Réalisation signalée (soumission ou check‑in)
  - Éventuelle validation (créée une Validation)
  - Archivage/suppression

Initiative
----------
- Définition: Une action déclarative volontairement proposée par un Teen (ex: proposer d'aider un voisin).
- Rôle: Signal d'autonomie intrinsèque — déclenche un flux de validation parentale.
- Attributs métier:
  - id métier
  - auteur (Teen)
  - titre / court libellé
  - description (quoi, pourquoi) — champ texte court obligatoire
  - date de déclaration
  - statut (Pending, Validé, Refusé)
  - commentaire(s) parentaux (optionnels)
  - lié éventuellement à une RewardRequest ou à un TrustEvent
- Cycle de vie:
  - Déclaration (par Teen)
  - Notification / mise en file chez Parent
  - Validation ou refus (par Parent) → crée un événement Validation
  - Si validée, peut générer TrustEvent ou récompense selon règles

Validation
----------
- Définition: Action formelle d'un Parent acceptant ou refusant une soumission (issue d'une Responsibility ou d'une Initiative).
- Rôle: Décider de la véracité/acceptabilité d'une réalisation et fournir un feedback.
- Attributs métier:
  - id métier
  - cible (Reference vers Initiative ou réalisation de Responsibility)
  - parent (acteur)
  - décision (Accepté / Refusé)
  - commentaire (texte court, obligatoire pour un refus selon MVP)
  - date de décision
  - délai entre soumission et décision
- Cycle de vie:
  - Création lors du traitement d'une soumission
  - Notification au Teen du résultat
  - Historisation pour transparence (TrustEvent)

Reward (Récompense)
-------------------
- Définition: Objet symbolique (ou privilège prédéfini) que le Teen peut obtenir suite à certaines validations.
- Rôle: Incitation facultative configurée par Parent (dans MVP, simple et manuelle).
- Attributs métier:
  - id métier
  - titre / description
  - type (ex: privilège temporel, objet physique, activité)
  - coût en points (optionnel) / ou règle d'attribution (p.ex. après X validations)
  - plafond (optionnel) — nombre maximal par période
  - actif/inactif
  - date d'expiration (optionnel)
- Cycle de vie:
  - Définition par Parent
  - Demande par Teen via RewardRequest
  - Approbation par Parent (peut être automatique si règles remplies)
  - Attribution (marque comme accordée) ou expiration

RewardRequest (Demande de récompense)
----------------------------------
- Définition: Demande explicite du Teen pour obtenir une Reward.
- Rôle: Flux formel pour réclamer une récompense liée à validations ou points.
- Attributs métier:
  - id métier
  - demandeur (Teen)
  - reward ciblée
  - date de demande
  - statut (Pending, Accordée, Refusée, Expirée)
  - commentaire parent (si traité)
- Cycle de vie:
  - Création par Teen
  - Mise en file pour révision par Parent
  - Décision parentale → Validation/Refus
  - Exécution (remise) ou expiration

Freedom (Liberté)
------------------
- Définition: Privilège ou permission que le Parent peut accorder à un Teen (ex: temps d'écran prolongé, choisir film du weekend).
- Rôle: Levier éducatif manuel pour récompenser autonomie et responsabilités.
- Attributs métier:
  - id métier
  - nom / description
  - paramétrage (durée, fréquence, conditions)
  - révocable (booléen)
  - actif/inactif
- Cycle de vie:
  - Définition par Parent
  - Attribution (grant) à un Teen → créé un FreedomLevel actif
  - Expiration ou révocation

FreedomLevel
-------------
- Définition: Instance d'une Freedom attribuée à un Teen, avec durée et niveau (p.ex. temps additionnel de 30 minutes).
- Rôle: Représente l'état effectif d'une liberté accordée.
- Attributs métier:
  - id métier
  - freedom (référence à Freedom)
  - bénéficiaire (Teen)
  - niveau / granularité (p.ex. minutes, accès particulier)
  - date de début
  - date de fin (optionnelle)
  - statut (active, expirée, révoquée)
- Cycle de vie:
  - Création lors de l'attribution par Parent
  - Période active
  - Expiration ou révocation

TrustEvent
----------
- Définition: Enregistrement immuable d'une action servant de signal de confiance (ex: initiative validée, responsabilité tenue sans rappel).
- Rôle: Historique utilisé pour analyser comportement et servir d'indicateur qualitatif (interne uniquement dans MVP).
- Attributs métier:
  - id métier
  - type (InitiativeValidée, ResponsibilityCompleted, ValidationRefusée, FreedomGranted, RewardGranted)
  - source (Teen ou Parent)
  - cible (référence à entité concernée)
  - date et métadonnées (délai de validation, commentaire bref)
- Cycle de vie:
  - Généré à la suite d'un événement (validation, attribution)
  - Stocké pour historique (visible aux Parents)

PresencePeriod (Période de présence/absence)
------------------------------------------------
- Définition: Période temporelle pendant laquelle un Teen est disponible/présent (ex: vacances, séjour chez l'autre parent, absence temporaire).
- Rôle: Ajuster règles d'attentes et notifications (ex: ne pas attendre validation immédiate pendant vacances).
- Attributs métier:
  - id métier
  - sujet (Teen)
  - date de début
  - date de fin
  - type (vacances, séjour coparental, maladie, autre)
  - notes (optionnel)
- Cycle de vie:
  - Création par Parent (ou Teen selon règles)
  - Période active
  - Fin automatique à date de fin ou clôture manuelle


RELATIONS
=========

- Family 1..* Parents
  - Une Family contient au moins un Parent; plusieurs Parents possibles (coparentalité).
- Family 1..* Teens
  - Une Family contient un ou plusieurs Teens.
- Parent 1..* Responsibility
  - Les Parents créent et maintiennent les Responsibilities.
- Teen -> Responsibility (many-to-many via occurrences)
  - Un Teen peut être assigné à plusieurs Responsibilities; chaque occurrence génère des soumissions.
- Teen 0..* Initiative
  - Les Teens déclarent des Initiatives.
- Initiative 1 Validation (0..1 until decision)
  - Chaque Initiative passe par une Validation réalisée par un Parent.
- ResponsibilitySubmission -> Validation
  - Une réalisation liée à une Responsibility peut engendrer une Validation.
- Reward 0..* RewardRequest
  - Les Teens demandent des Rewards via RewardRequest.
- RewardRequest -> Validation (Parent décision)
  - Les RewardRequests sont approuvées ou refusées par Parent.
- Parent -> Freedom (définit)
  - Les Parents créent Freedom et peuvent attribuer FreedomLevel aux Teens.
- FreedomLevel -> Teen
  - Une FreedomLevel appartient à un Teen (est attribuée à).
- Validation / RewardGrant / FreedomGrant génèrent TrustEvent
  - Ces actions stockent un TrustEvent pour historisation.
- PresencePeriod lié au Teen
  - Chaque Teen peut avoir plusieurs PresencePeriods définissant disponibilité.


RÈGLES MÉTIER (MVP)
===================

- Une Initiative déclarée par un Teen doit être traitée (Validée ou Refusée) par au moins un Parent.
  - Délai cible: <48 heures (objectif de produit), idéalement <24 heures.

- Une soumission de Responsibility configurée avec needValidation=true nécessite une Validation pour être considérée comme "validée".

- Un refus de Validation doit être accompagné d'un commentaire court (constructif) — obligation pour le MVP.

- Les RewardRequests sont traitées séparément des Validations d'Initiative; une Reward peut être accordée automatiquement seulement si une règle explicite l'autorise (par exemple: X validations récentes), sinon décision parentale requise.

- Une Reward peut avoir un plafond (nombre maximal accordable sur une période) si le Parent le définit.

- Les Freedoms sont accordées manuellement par un Parent ; toute attribution est horodatée et réversible.

- Les TrustEvents sont immuables et servent d'historique lisible par les Parents (période d'historique par défaut 30j visible dans MVP).

- Points et systèmes quantitatifs sont masqués par défaut et ne doivent pas être utilisés comme signal principal dans le MVP.


ÉVÉNEMENTS MÉTIER
=================

Décrire chaque événement, son déclencheur et son effet métier.

- ResponsibilityRealized: Un Teen marque une responsabilité comme réalisée.
  - Déclencheur: action du Teen (soumission ou check‑in).
  - Effet: création d'une entrée de soumission; si needValidation=false → création de TrustEvent; si needValidation=true → file de Validation.

- InitiativeDeclared: Un Teen déclare une initiative.
  - Déclencheur: action du Teen (formulaire envoyé).
  - Effet: création d'Initiative (statut Pending), notification Parent, création possible de TrustEvent après validation.

- ValidationAccepted: Un Parent accepte une soumission/initiative.
  - Déclencheur: décision Parent.
  - Effet: statut mis à Validé; création d'un TrustEvent; si règle de reward remplie → placer RewardRequest en état auto‑accordé ou signaler au Parent.

- ValidationRefused: Un Parent refuse une soumission/initiative.
  - Déclencheur: décision Parent avec commentaire.
  - Effet: statut mis à Refusé; création d'un TrustEvent; notification Teen avec commentaire; possibilité d'itération (resoumission).

- RewardRequested: Teen demande une récompense.
  - Déclencheur: action Teen.
  - Effet: création de RewardRequest (Pending), file Parent.

- RewardGranted: Parent accorde la récompense.
  - Déclencheur: décision Parent (ou règle automatique si définie).
  - Effet: création d'un TrustEvent; marquage RewardRequest comme Accordée; éventuelle réduction du stock/plafond.

- FreedomGranted: Parent accorde une liberté.
  - Déclencheur: action Parent.
  - Effet: création d'un FreedomLevel (active), notification Teen, historique TrustEvent.


INVARIANTS (NE DOIVENT JAMAIS ÊTRE VIOLÉS)
=========================================

- Toute Validation portant statut Validé ou Refusé doit référencer un Parent acteur.
- Toute Initiative doit avoir un auteur (Teen) et une date de déclaration.
- Une RewardRequest ne doit pas être automatiquement marquée comme accordée sans être liée à une règle explicite ou à une décision Parent.
- Les Freedoms attribuées ne doivent pas dépasser la granularité définie par le Parent (p.ex. durée maximale).
- Un TrustEvent horodaté doit toujours lier l'événement à son objet source (Initiative, Validation, Reward, Freedom).
- Les commentaires de refus doivent exister pour les refus (contrainte métier pour MVP) — sinon la décision est invalide.


CAS PARTICULIERS
=================

- Garde alternée / Coparentalité:
  - Plusieurs Parents (p.ex. parent A et parent B) peuvent avoir des droits sur le même Teen; il faut définir quelle décision est nécessaire :
    - Option MVP simple : toute décision d'un parent (un des parents) suffit pour valider/refuser.
    - Option stricte (non‑MVP) : exige l'accord des deux parents — à décider (voir Questions ouvertes).
  - PresencePeriod peut refléter le fait que le Teen est chez l'autre parent; règles d'attente adaptées (p.ex. délai de validation prolongé).

- Plusieurs parents actifs:
  - Autorité partagée : conflits résolus hors‑application dans MVP, mais l'historique doit conserver tous les actes de chaque parent.

- Plusieurs enfants:
  - Priorisation des notifications et file de validations doit permettre trier par enfant; Rewards et Freedoms sont attribuées par enfant.

- Absence temporaire / Vacances:
  - PresencePeriod marque la période ; notifications et attentes de validation peuvent être suspendues ou augmentées en délai.

- Récompense expirée:
  - Si une Reward a une date d'expiration, une RewardRequest non utilisée après expiration passe en Expirée et notifie Teen et Parent.


QUESTIONS OUVERTES
==================

Ces points nécessitent décision produit avant conception technique:

1. Coparentalité: une décision d'un seul parent suffit‑elle pour valider/refuser, ou faut‑il quorum ?
2. Règles automatiques pour récompenses: autoriser des règles simples (ex: X validations → récompense) dès le MVP ou garder tout manuel ?
3. Plafonds et budget: qui définit et comment suivre (p.ex. plafond hebdo pour une Reward) — visibilité parentale exigée.
4. Politique d'archivage des TrustEvents: durée d'historique visible (MVP propose 30 jours) — besoin de retention plus longue ?
5. Gestion des conflits parentaux: comment refléter et résoudre des décisions contradictoires dans l'historique ?
6. Exigence de preuve: dans quels cas un parent peut demander une preuve média (autorisé mais non‑supporté dans MVP) ?
7. Règles d'escalade pour validations non traitées (ex: alerte à l'autre parent après 72h) — activer dans MVP ?
8. Droits de modification pour Teens (édition d'une Initiative après déclaration) — autoriser resubmission ?
9. Granularité des Freedoms: faut‑il des templates de Freedoms standard ou tout libre ?
10. Politique de confidentialité pour champs texte (ex: infos sensibles) — modération/automatisation non prévue dans MVP.


CONCLUSION
==========

Ce document décrit le modèle métier destiné à cadrer le développement ultérieur. Il identifie entités, relations, règles, événements, invariants, cas particuliers et questions ouvertes. Une fois les décisions sur les Questions ouvertes prises, le modèle pourra être finalisé et traduit en schéma technique.
