# Cahier des charges — AutonomiePositive

## 1. Résumé

AutonomiePositive est une application mobile et tablette destinée aux familles qui souhaitent aider leurs adolescents à devenir plus autonomes grâce à des routines, des tâches, des objectifs et des récompenses basés sur le renforcement positif.

L’application permet aux parents de créer des règles de vie concrètes, d’attribuer des points lorsque les actions sont réalisées correctement, de valoriser les initiatives, puis de permettre à l’adolescent d’échanger ses points contre des récompenses définies par la famille.

---

## 2. Objectifs

### Objectifs principaux
- Rendre l’adolescent plus autonome.
- Réduire les conflits autour des tâches quotidiennes.
- Clarifier les attentes des parents.
- Valoriser les efforts et les initiatives.
- Donner une visibilité simple sur les progrès.
- Permettre un fonctionnement hors ligne.

### Objectifs secondaires
- Gérer les familles séparées ou les gardes alternées.
- Adapter les récompenses au potentiel réel de points.
- Prévoir une commercialisation future.
- Prévoir la conformité RGPD / Suisse nLPD.
- Prévoir le multilingue et l’accessibilité dès le départ.

---

## 3. Public cible

### Cible principale
Parents d’adolescents de 10 à 17 ans.

### Utilisateurs secondaires
Adolescents utilisant l’application pour suivre leurs tâches, points et récompenses.

### Cas particuliers
- garde alternée,
- familles nombreuses,
- enfants absents certains jours,
- enfants avec besoins spécifiques,
- parents souhaitant éviter les systèmes punitifs.

---

## 4. Proposition de valeur

Contrairement à une simple application de corvées, AutonomiePositive est pensée pour :
- les adolescents,
- l’autonomie,
- la responsabilisation,
- la récompense positive,
- les familles avec calendrier de présence variable,
- une utilisation hors ligne,
- une configuration réaliste des récompenses selon les points atteignables.

---

## 5. Fonctionnalités MVP

### 5.1 Compte et famille
- Création de compte parent.
- Création d’une famille.
- Ajout d’un ou plusieurs adolescents.
- Rôles : parent, adolescent.
- Code d’invitation pour connecter l’app adolescent.

### 5.2 Tâches
- Créer une tâche.
- Modifier une tâche.
- Supprimer ou désactiver une tâche.
- Définir une fréquence.
- Définir les jours concernés.
- Définir des points.
- Définir si la tâche nécessite validation parentale.
- Définir si l’initiative est possible.
- Ajouter une checklist.
- Afficher les tâches du jour côté adolescent.

### 5.3 Validation
- L’adolescent marque une tâche comme faite.
- Le parent valide ou refuse.
- Si validée, les points sont ajoutés.
- Si refusée, aucun point n’est ajouté.
- Le parent peut ajouter un commentaire constructif.

### 5.4 Initiative
- L’adolescent peut déclarer une initiative.
- Le parent valide ou refuse.
- Si validée, bonus de points.

### 5.5 Points
- Historique complet des points.
- Total disponible.
- Points gagnés par période.
- Points dépensés.
- Multiplicateur visible.
- Aucun point négatif dans le MVP.

### 5.6 Multiplicateur
- Augmentation progressive en cas de régularité.
- Retour progressif vers x1.0 en cas de baisse.
- Jamais inférieur à x1.0.
- Règles paramétrables.

### 5.7 Récompenses
- Création de récompenses personnalisées.
- Coût en points.
- Type de récompense.
- Rareté.
- Plafond par période.
- Demande de récompense par l’adolescent.
- Validation parentale.
- Historique des récompenses utilisées.

### 5.8 Présence
- Définition des jours de présence.
- Gestion des absences.
- Impact sur le potentiel de points.

### 5.9 Potentiel de points
- Calcul du maximum de points possible sur une période.
- Aide à la tarification des récompenses.
- Recommandation indicative de coût selon rareté.

### 5.10 Offline
- Consultation et actions principales disponibles hors ligne.
- Synchronisation quand Internet revient.
- File d’attente locale des actions.

---

## 6. Fonctionnalités post-MVP

- Notifications push.
- Suggestions intelligentes de tâches selon l’âge.
- Templates de routines.
- Mode coparent.
- Statistiques avancées.
- Export PDF.
- IA d’aide à la formulation positive.
- Gestion de plusieurs foyers.
- Abonnement premium.
- Marketplace de récompenses ou routines.
- Intégration calendrier.
- Widgets iOS / Android.

---

## 7. Règles métier

### 7.1 Attribution des points
Une tâche validée donne :
`points finaux = points de base + bonus initiative éventuel`, puis application du multiplicateur si actif.

Les arrondis doivent être définis. Recommandation MVP :
- arrondir à l’entier inférieur ou supérieur selon paramètre,
- par défaut arrondi à l’entier le plus proche.

### 7.2 Refus
Un refus ne donne pas de points.
Il ne retire pas de points.

### 7.3 Multiplicateur
Le multiplicateur récompense la régularité.
Il ne doit pas devenir trop puissant.
Recommandation :
- maximum MVP : x1.5,
- retour à x1.0 si plusieurs jours sans validation attendue,
- ne pas pénaliser les absences planifiées.

### 7.4 Récompenses
Une récompense ne peut être demandée que si :
- l’adolescent a assez de points,
- le plafond de période n’est pas atteint,
- la récompense est active,
- le parent valide la demande si nécessaire.

### 7.5 Présence
Les jours d’absence planifiés ne doivent pas diminuer artificiellement les performances.

---

## 8. Modèle économique potentiel

### Option recommandée
Freemium :
- gratuit : 1 famille, 1 enfant, tâches limitées, récompenses limitées,
- premium : plusieurs enfants, statistiques, templates, coparent, sauvegarde avancée, IA, export.

### Prix indicatif
- mensuel : 4.99 à 7.99 CHF/EUR,
- annuel : 39 à 69 CHF/EUR.

À valider par étude de marché.

---

## 9. Stack technique recommandée

### Mobile
- React Native
- Expo
- TypeScript
- Expo Router
- i18next
- SQLite local
- Zustand
- Zod
- React Hook Form

### Backend MVP
- Supabase
- PostgreSQL
- Auth
- Row Level Security
- Storage
- Edge Functions si besoin

### Tests
- Vitest ou Jest
- Testing Library
- Maestro ou Detox plus tard

### CI/CD
- GitHub Actions
- EAS Build
- EAS Submit

---

## 10. Écrans MVP

### Parent
- Onboarding
- Création famille
- Liste enfants
- Dashboard enfant
- Création tâche
- Liste tâches
- Validation des tâches
- Création récompense
- Liste récompenses
- Demandes de récompenses
- Calendrier de présence
- Paramètres

### Adolescent
- Onboarding par code
- Accueil du jour
- Tâches du jour
- Soumettre une tâche
- Déclarer une initiative
- Points
- Boutique de récompenses
- Historique

---

## 11. Sécurité et conformité

Obligatoire :
- authentification sécurisée,
- RLS côté serveur,
- isolation stricte des familles,
- validation serveur des points,
- audit des actions sensibles,
- suppression de compte,
- export des données,
- consentement parental,
- politique de confidentialité,
- CGU,
- minimisation des données.

Données mineurs :
- ne pas collecter plus que nécessaire,
- éviter date de naissance exacte si âge approximatif suffit,
- éviter publicité ciblée,
- éviter analytics invasif.

---

## 12. Accessibilité

- Support tailles de texte dynamiques.
- Contrastes WCAG AA.
- Labels screen reader.
- Boutons tactiles suffisamment grands.
- Pas d’information uniquement par couleur.
- Navigation simple.
- Langage positif et clair.

---

## 13. Multilingue

Langues MVP :
- français,
- anglais.

Prévoir :
- allemand,
- italien.

Règle :
aucun texte visible ne doit être codé en dur.

---

## 14. Critères d’acceptation MVP

Le MVP est acceptable si :
- un parent peut créer une famille,
- un adolescent peut rejoindre la famille,
- le parent peut créer des tâches,
- l’adolescent peut les soumettre,
- le parent peut valider,
- les points sont calculés correctement,
- une récompense peut être demandée,
- les plafonds sont respectés,
- l’app fonctionne sans Internet pour les actions principales,
- la synchronisation fonctionne,
- les données d’une famille sont isolées,
- l’interface fonctionne sur mobile et tablette,
- français et anglais sont disponibles.

---

## 15. Risques

### Produit
- Trop de gamification peut infantiliser les ados.
- Trop de paramètres peut perdre les parents.
- Mauvais barèmes peuvent démotiver.
- Récompenses trop chères ou trop faciles.

### Technique
- Offline-first plus complexe qu’une app connectée.
- Synchronisation et conflits à bien cadrer.
- Sécurité mineurs critique.
- Notifications et multi-device à prévoir proprement.

### Éthique
- Ne pas transformer l’app en outil de contrôle humiliant.
- Ne pas créer de compétition malsaine.
- Ne pas pénaliser les absences légitimes.
- Ne pas favoriser uniquement les récompenses matérielles.

---

## 16. Décisions MVP recommandées

Pour avancer vite :
- React Native + Expo.
- Supabase.
- SQLite local.
- Pas de retrait de points.
- Pas de classement entre enfants.
- Validation parentale obligatoire au début.
- Français + anglais.
- Multiplicateur simple.
- Récompenses paramétrables.
- Offline-first basique mais réel.
