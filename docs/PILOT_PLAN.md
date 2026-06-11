# PILOT_PLAN — Plan pilote produit

Date: 2026-06-11

Objectif général
-----------------
Valider que l'application apporte une valeur réelle aux familles avant d'investir davantage en développement. Le pilote doit permettre de prouver ou d'invalider rapidement les hypothèses critiques du produit à l'aide d'un protocole clair, faible coût et réplicable.

1. Objectif du pilote
---------------------
- Ce que nous cherchons à prouver:
  - Les adolescents déclarent volontairement des initiatives et utilisent le flux "Today" pour signaler des actions.
  - Les parents traitent les soumissions (Valider/Refuser) de façon régulière et rapide.
  - Les interactions textuelles (sans photos/vidéos) suffisent pour bâtir de la confiance et du changement comportemental.
  - Un onboarding ≤5 minutes suffit pour que la famille commence à utiliser l'app.

- Ce que nous cherchons à invalider:
  - Que les parents exigent systématiquement des preuves média (photos/vidéos) pour valider.
  - Que le système soit immédiatement détourné en simple marché à récompenses.
  - Que le flux de validation soit trop lourd et entraîne un abandon massif.

2. Hypothèses critiques (top 10)
--------------------------------
Pour chaque hypothèse: Gravité (Haute/Moyenne/Basse), Impact (Produit), Méthode de validation (mesure concrète).

1) Les adolescents déclarent volontairement leurs initiatives.
   - Gravité: Haute
   - Impact: Sans déclarations, la fonctionnalité clé est inutilisable.
   - Validation: % d'ados ayant déclaré ≥1 initiative sur 30 jours ; interviews qualitatifs pour motifs et friction.

2) Les parents traitent les soumissions régulièrement (≤48h, idéal ≤24h).
   - Gravité: Haute
   - Impact: Si delays >48h, perte d'engagement ado.
   - Validation: distribution des délais de traitement; % traitées en <24h.

3) Les récompenses ne deviennent pas la motivation principale (points masqués par défaut fonctionnent).
   - Gravité: Moyenne
   - Impact: Si tout tourne autour des récompenses, on perd l'objectif d'autonomie.
   - Validation: enquêtes et interviews; observation d'usage (fréquence de créations liées uniquement à récompense).

4) Onboarding <5 minutes est suffisant.
   - Gravité: Haute
   - Impact: Si onboarding long → taux d'abandon initial élevé.
   - Validation: temps moyen d'activation et % d'abandons pendant onboarding.

5) Les templates de feedback augmentent la qualité des réponses parentales.
   - Gravité: Moyenne
   - Impact: Meilleur feedback = meilleure relation parent→ado.
   - Validation: taux d'utilisation des templates et notation qualitative des ados sur utilité.

6) L'absence de preuves média ne réduit pas la confiance parentale pour valider actions simples.
   - Gravité: Moyenne
   - Impact: Si la confiance chute, parents demanderont preuves et friction augmente.
   - Validation: % de validations sans preuve et interviews parents sur confiance.

7) Les familles utilisent les libertés manuelles comme levier éducatif (et non points).
   - Gravité: Moyenne
   - Impact: Définit la roadmap produits (libertés > boutique de récompenses).
   - Validation: proportion d'attributions de libertés vs récompenses matérielles demandées.

8) Les ados lisent et comprennent les statuts (Pending/Validé/Refusé) et réagissent en conséquence.
   - Gravité: Basse
   - Impact: Influence sur l'engagement à long terme.
   - Validation: interviews ados + % de modifications suite à refus.

9) Les notifications digest (peu fréquentes) suffisent pour relancer l'utilisation.
   - Gravité: Moyenne
   - Impact: Trop peu de notifications = oubli ; trop nombreuses = churn.
   - Validation: test A/B digest vs push léger (mesure reprise d'action dans 48h).

10) Variabilité culturelle / structure familiale n'empêche pas l'adoption initiale.
   - Gravité: Moyenne
   - Impact: Si non généralisable, le produit cible devra être resserré.
   - Validation: diversité des familles recrutées et comparaison des taux d'engagement.

3. Profils de familles à recruter
---------------------------------
Recruter 5–10 familles avec diversité de situations. Idéal : 8–12 familles pour obtenir signaux cohérents.

- Famille traditionnelle (un foyer, parents cohabitant) : 1 ado 13–16 ans.
- Garde alternée / coparentalité : parent A + parent B testent flux d'invitation et décision partagée.
- Plusieurs enfants : au moins 2 enfants (un ado, un plus jeune) pour tester priorisation et gestion multi‑enfants.
- Ado très autonome : habitué à gérer son emploi du temps (tester initiatives spontanées plus riches).
- Ado peu autonome : nécessite guidage fort; tester friction et besoin de templates parentaux.

Critères pratiques de sélection : volonté de participer 30 jours, disponibilité pour 2 entretiens (début/fin), consentement pour collecte de données anonymes.

4. Plan de test sur 30 jours
---------------------------
Objectif: protocole léger, observabilité maximale et interviews structurés.

Semaine 0 (préparation, 1 semaine avant démarrage)
- Recrutement et consentement.
- Onboarding synchronisé : config famille, ajout enfant(s), paramétrage 3 libertés manuelles.
- Session d'introduction (15–30 min) avec parents + ado : expliquer règles, templates, objectifs du pilote.
- Définir indicateurs baselines (habitudes actuelles de validation).

Semaine 1 (J0–J7) — découverte & activation
- Objectifs: activation, premières déclarations et validations.
- Actions familiales : utiliser l'app quotidiennement ; ado déclare initiatives ; parents traitent dans 48h.
- Collecte: logs d'activation, #initiatives, délais de validation.
- Recherche: mini‑interview de fin de semaine (10–15 min) pour détecter friction d'onboarding.

Semaine 2 (J8–J14) — stabilisation & itération légère
- Objectifs: consolider usage, tester templates, ajuster micro‑copy si besoin.
- Actions: proposer 1 template additionnel aux parents (si usage faible) ; encourager déclaration d'initiative.
- Collecte: taux d'utilisation templates, % actions soumises par ado.

Semaine 3 (J15–J21) — tension réelle
- Objectifs: tester résilience (délais parent, volume de soumissions, conflits attendu).
- Actions: introduire une situation contrôlée (ex. une initiative volontaire importante) et observer processus de validation.
- Collecte: cas d'escalade, commentaires parents/ados.

Semaine 4 (J22–J30) — synthèse & interviews finales
- Objectifs: mesurer rétention, satisfaction, et préparer décision.
- Actions: réaliser interviews en profondeur parents (30–45 min) et ados (20–30 min).
- Collecte: métriques finales, suggestions d'amélioration, signaux de succès/échec.

Support de l'équipe produit durant tout le mois:
- Check‑ins hebdomadaires (15 min) avec chaque famille ou groupe de familles.
- Support réactif pour résoudre problèmes d'usage (max 24–48h).

5. Questions à poser aux parents (interview)
-------------------------------------------
Contexte + usage
1. Pouvez‑vous décrire en quelques phrases comment vous gérez actuellement les validations et récompenses à la maison ?
2. Combien de temps vous a pris l'onboarding aujourd'hui ? Quelles parties ont été claires/obscures ?
3. À quelle fréquence consultez‑vous l'app (ou les notifications) ?

Valeur perçue
4. Qu'est‑ce qui vous a motivé à valider (ou refuser) une soumission pendant le test ?
5. Les templates proposés ont‑ils aidé à formuler votre réponse ? Si non, pourquoi ?
6. Avez‑vous ressenti que l'outil vous faisait gagner du temps ? Donnez un exemple.

Confiance & preuves
7. Avez‑vous voulu demander des preuves (photo, vidéo) pour valider ? Si oui, pourquoi ?
8. Si vous avez demandé une preuve, comment cela a‑t‑il impacté votre décision ?

Comportement & impacts
9. Avez‑vous modifié la façon dont vous discutez avec votre ado depuis que vous utilisez l'app ? Donnez un exemple.
10. Pensez‑vous que l'outil a aidé votre ado à être plus autonome ? Pourquoi/Pourquoi pas ?

Adoption future
11. Quels seraient les freins à utiliser ce produit de façon pérenne ?
12. Quelles fonctionnalités vous sembleraient indispensables à ajouter immédiatement ?

6. Questions à poser aux adolescents (interview)
----------------------------------------------
Contexte + usage
1. As‑tu trouvé facile de déclarer une action ? Pourquoi ?
2. Combien de fois as‑tu utilisé le bouton "Soumettre" cette semaine ?

Valeur perçue
3. Quand ton parent a validé/refusé, comment t'es‑tu senti ? Explique.
4. Si ton action a été refusée, as‑tu compris pourquoi ? Le commentaire t'a‑t‑il aidé ?

Motivation
5. À quel point penses‑tu que l'initiative venait de toi (1–5) plutôt que pour obtenir une récompense ?
6. Préfères‑tu soumettre une preuve (photo) pour prouver que tu as fait l'action, ou préfères‑tu juste dire ce que tu as fait ? Pourquoi ?

Adoption & friction
7. Qu'est‑ce qui te pousse à déclarer une initiative ? Qu'est‑ce qui t'en empêche ?
8. Si tu pouvais changer une chose dans l'app pour la rendre plus utile, laquelle ?

7. Signaux de réussite
---------------------
Critères quantitatifs (seuils indicatifs pour ce pilote):
- Taux d'activation : ≥80% des familles ont complété l'onboarding initial.
- Déclarations d'initiative : ≥50% des ados ont déclaré ≥1 initiative sur 30 jours.
- Réactivité parentale : ≥60% des soumissions traitées en <48h, ≥40% en <24h.
- Rétention hebdomadaire : ≥50% des familles actives après 4 semaines.

Critères qualitatifs:
- Parents rapportent une amélioration claire des conversations parent→ado liée à l'outil.
- Ados déclarent sentir plus d'autonomie ou de responsabilité.

8. Signaux d'échec
-------------------
- Taux d'activation <50%.
- <20% des ados déclarent au moins une initiative en 30 jours.
- Délais de validation médian >72h et plaintes répétées sur la lenteur.
- Interviews qualitatives indiquant que la majorité des usages sont motivés uniquement par les récompenses matérielles.
- Familles abandonnent après 1–2 semaines pour motifs d'usabilité.

9. Décisions possibles à la fin du pilote
--------------------------------------
- Continuer (build): les hypothèses clés sont validées, construire l'app minimale et automatiser les parties manuelles.
- Pivoter: certaines hypothèses invalidées — revoir le positionnement (p.ex. centrer sur templates et coaching parental plutôt que système d'initiatives).
- Simplifier: si friction majeure, réduire scope (p.ex. désactiver points, limiter notifications, simplifier interface Parent/Teen).
- Arrêter: si les données montrent rejet massif ou incompatibilité culturelle, mettre le projet en pause.

10. Recommandation finale — plus petit produit testable
-----------------------------------------------------
Proposition: un pilote "concierge" sur 8–12 familles pendant 4–6 semaines :

- Offrir un prototype minimal (ou procédure guidée) permettant aux ados de déclarer en texte court et aux parents de Valider/Refuser avec templates.
- Traiter manuellement (concierge) les cas ambigus : l'équipe produit aide ponctuellement pour vérifier process et recueillir feedbacks riches.
- Instrumenter des métriques simples (activations, #initiatives, délais de validation, taux d'utilisation templates) et mener interviews semi‑structurées.

Pourquoi: ceci minimise le développement tout en testant les hypothèses critiques. Si les résultats sont positifs, on peut investir pour automatiser et améliorer l'expérience.

---

Après création de ce document, figer la collection `docs/` avec :

```
docs/
├── PRODUCT_CONSTITUTION.md
├── MVP_DEFINITION.md
└── PILOT_PLAN.md
```

Fin du plan pilote.
