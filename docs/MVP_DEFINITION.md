# MVP_DEFINITION — AutonomiePositive

Version: 1.0
Date: 2026-06-11

Objectif: définir le MVP le plus simple possible qui respecte la Constitution Produit et les contraintes (config <5min, pas de photos/vidéos/IA, pas d'algorithmes opaques, pas de comparaisons entre enfants).

CONTRAINTE FORTE: aucune métrique compliquée visible, pas de leaderboard, pas de médias. Toute automatisation doit être explicite et contrôlable par le parent.

---

# 1. Fonctionnalités indispensables (scope MVP)

1. Création rapide de la famille et ajout d'un enfant (onboarding en 2 écrans).
2. Liste simple de Responsabilités (titre, fréquence minimale : quotidien/hebdo/ponctuel, points optionnels masqués).
3. Flow Ado — Today : voir responsabilités du jour, bouton unique pour "Soumettre" (texte court obligatoire : « j'ai fait X ») ou marquer comme fait si pas de validation requise.
4. Flow Parent — File de validations : liste triée par date des soumissions, chaque item montre texte de l'ado + actions : Valider / Refuser (champ texte court obligatoire, ou template rapide).
5. Déclaration d'Initiative (ado) : formulaire court (quoi, pourquoi) — parent reçoit en file pour validation.
6. Permissions/Libertés manuelles : parent peut accorder/débloquer 3 privilèges simples (ex. plus de temps d'écran, sortie), définis manuellement lors du setup.
7. Journal d'événements minimal : enregistrement horodaté des actions (soumission, validation) pour transparence (visible aux parents, historique 30j).
8. Micro‑copy pédagogique : templates de validation positive et de refus constructif pré‑écrits pour guider parents.

---

# 2. Fonctionnalités à repousser (post‑MVP)

1. Automatisation de la confiance par score composite.
2. Recommandations algorithmiques automatiques sur délégation de libertés.
3. Système de points visible/monétisé et boutique complexe de récompenses.
4. Photos / vidéos comme preuves.
5. Multi‑famille et coparentalité avancée (à simplifier au départ).

---

# 3. Fonctionnalités à supprimer (ne pas implémenter pour le MVP)

1. Leaderboards, comparaisons inter‑enfants ou tout affichage public des performances.
2. Notifications push fréquentes prescriptives (only digests/minimal nudges).
3. Récompenses matérielles automatisées.

---

# 4. Parcours parent (MVP simple)

1. Onboarding (≤2 minutes) : créer famille → ajouter enfant (nom, âge approximatif) → accepter règles de confidentialité.
2. Écran d'accueil parent : vue condensée — file de validations (3 plus récentes), 3 metrics simples (initiatives validées 30j, responsabilités respectées sans rappel 30j, demandes de récompense en attente).
3. Traiter une soumission : lire texte de l'ado → Valider (bouton) ou Refuser (champ texte ou template). Validation en 1 action.
4. Débloquer une liberté : bouton « Accorder privilège » (choix dans liste manuelle) avec durée optionnelle.
5. Réglages minima : notification quotidienne digest, templates de messages, masquer/activer points (par défaut masqués).

Contrainte clé: tout doit être exécutable en ≤5 minutes de setup.

---

# 5. Parcours adolescent (MVP simple)

1. Onboarding ultra‑court : entrer code famille ou accepter invite, voir responsabilités du jour.
2. Today : liste claire des responsabilités ; pour chaque responsabilité : action unique "Soumettre" qui ouvre petit champ texte (obligatoire) décrivant l'action (ou cocher si pas besoin de validation).
3. Déclarer initiative : bouton visible, formulaire 2 champs (quoi, pourquoi) — envoyer au parent.
4. Voir statut : items montrent statut (Pending / Validé / Refusé) et commentaire parent si présent.

Expérience : aucune photo/vidéo demandée ; tout texte court pour limiter friction et surveillance.

---

# 6. Métriques visibles (simples, compréhensibles)

Affichées aux parents et adolescent (selon contexte) :

1. Initiatives validées (30 j) — nombre entier.
2. Responsabilités tenues sans rappel (30 j) — nombre entier.
3. Demandes en attente (count).

Règle : aucun score composite automatique ; pas de notation qualitative affichée comme « confiance » sans validation parentale.

---

# 7. Métriques invisibles (collectées pour recherche/pilote uniquement)

1. Logs d'usage anonymes (taux soumission, délai de validation) pour analyse produit.
2. Retention et churn (families active/inactive) pour mesurer viabilité.

Ces métriques sont internes, non visibles aux familles, et utilisées uniquement pour itération produit et tests. Aucune métrique individuelle ne doit être exposée publiquement.

---

# 8. Libertés débloquées (MVP)

Libertés manuelles que le parent peut attribuer (exemples) :

1. Plus de temps d'écran (durée et fréquence définies par le parent).
2. Choix d'une activité (ex. décider film du weekend).
3. Responsabilité élargie ponctuelle (ex. gérer la liste de courses pour une sortie).

Important: ces libertés sont accordées manuellement et non automatiquement par l'algorithme ; chaque attribution est horodatée et réversible.

---

# 9. Rôle exact des initiatives (MVP)

1. Signal principal d'autonomie intrinsèque : déclarées par l'ado, décrites en texte court.
2. Priorité de traitement parent : apparaissent en haut de la file ; validation valorise l'initiative.
3. Impact : une initiative validée augmente la confiance perçue (signal qualitatif) mais aucune métrique composite n'est calculée automatiquement.
4. Modalités : parent doit fournir un commentaire court (optionnel) ou utiliser template positif.

---

# 10. Hypothèses à tester (utilisateurs réels)

1. Les ados accepteront de déclarer des initiatives via un champ texte court (friction minimale). 
2. Les parents traiteront les soumissions si la validation tient ≤ 5s par item (action rapide). 
3. Un onboarding <5min suffit pour lancer usage régulier. 
4. Masquer les points réduit la transformation du produit en système de récompenses. 
5. L'absence de photos/vidéo ne réduit pas la confiance parentale pour valider des actions simples.
6. Les templates de feedback courts augmentent la qualité des refus/validations (adoption par parents). 
7. Les familles utiliseront les libertés manuelles comme levier éducatif (au lieu de points). 

Test plan : prototypage rapide et 5–10 familles pilotes pendant 4–6 semaines.

---

# 11. Les 10 plus gros risques du MVP

1. Adoption faible des initiatives par les ados (risque : fonction clé vide). — Gravité : forte.
2. Parents n'utilisent pas les templates et refusent de changer leur posture (conflit persistant). — Gravité : forte.
3. Configuration perçue trop complexe malgré efforts (abandon initial). — Gravité : forte.
4. Transformations non durables après 2–3 mois (effet nouveauté). — Gravité : forte.
5. Communication parent→ado insuffisante (templates non utilisés) — dégradation de l'expérience. — Gravité : moyenne.
6. Les metrics visibles sont mal interprétées et causent anxiété chez les parents. — Gravité : moyenne.
7. Les familles détournent l'outil en système de récompenses informel (usage inattendu). — Gravité : moyenne.
8. Notifications mal réglées (trop nombreuses) → churn. — Gravité : moyenne.
9. Problèmes de confidentialité liés aux textes (ex: infos sensibles saisies dans champ texte). — Gravité : moyenne.
10. Variabilité culturelle (fonction non applicable à tous les foyers) → rejet. — Gravité : moyenne.

---

# Recommandation finale

Tester avant de construire.

Raisons : le MVP proposé contient plusieurs hypothèses comportementales fortes (initiative ado, validation parent, acceptation sans preuves média) qui nécessitent des tests utilisateurs rapides et à faible coût. Construire un prototype cliquable ou un pilote manuel (concierge MVP) pour 5–10 familles pendant 4–6 semaines permettra de valider les hypothèses, ajuster wording/templates et définir les règles opérationnelles (quels privilèges, cadence de notification, format exact des champs).

Si les tests confirment les hypothèses clés (1,2,3 listées ci‑dessus), alors construire l'app minimale telle que définie. Sinon, reconsidérer l'approche (repenser certaines parties du concept).

---

Document versionnée : `docs/MVP_DEFINITION.md`
