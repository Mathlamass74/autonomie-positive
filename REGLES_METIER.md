# REGLES_METIER.md — Moteur d’autonomie positive

## 1. Vision

L’application ne doit pas seulement récompenser des tâches réalisées.

Son objectif principal est d’aider un adolescent à devenir plus autonome, sans cris, sans humiliation, sans punition numérique et sans négociation permanente.

Les points sont un outil de motivation.
Le vrai indicateur central est le **Score d’Autonomie**.

---

## 2. Principes éducatifs

### Règles fondamentales

- On récompense ce qui est bien fait.
- On valorise fortement l’initiative.
- On ne retire pas de points dans le MVP.
- Une tâche non faite vaut 0 point.
- Une tâche mal faite vaut 0 point.
- Le parent peut refuser une validation avec un commentaire constructif.
- L’application ne doit jamais humilier l’adolescent.
- Pas de classement entre enfants dans le MVP.
- Les absences planifiées ne doivent pas pénaliser l’adolescent.

---

## 3. Responsabilités

Le mot recommandé dans l’application est **Responsabilité** plutôt que **Tâche**.

Une responsabilité représente une action attendue dans la vie quotidienne.

Exemples :
- Responsable de sa chambre
- Responsable de son hygiène
- Responsable de ses devoirs
- Responsable de la table
- Responsable du lave-vaisselle

---

## 4. Domaines

Chaque responsabilité appartient à un domaine.

Domaines recommandés MVP :

| Domaine | Description |
|---|---|
| Hygiène | Dents, douche, soin personnel |
| Maison | Chambre, table, lave-vaisselle, rangement |
| École | Devoirs, sac, agenda |
| Respect | Attitude, communication, respect des règles |
| Autonomie | Préparation, anticipation, organisation |

Ces domaines servent à afficher une progression plus riche que les simples points.

---

## 5. Difficulté et points de base

Barème recommandé :

| Difficulté | Points |
|---|---:|
| Très facile | 1 |
| Facile | 2 |
| Moyen | 3 |
| Important | 5 |
| Exceptionnel | 10 |

Exemples :

| Responsabilité | Domaine | Difficulté | Points |
|---|---|---:|---:|
| Se laver les dents | Hygiène | Très facile | 1 |
| Ranger sa chambre | Maison | Facile | 2 |
| Débarrasser la table | Maison | Facile | 2 |
| Faire ses devoirs | École | Moyen | 3 |
| Vider le lave-vaisselle | Maison | Moyen | 3 |
| Grosse aide ponctuelle | Maison | Exceptionnel | 10 |

Le parent peut toujours modifier les points.

---

## 6. Statuts d’une responsabilité

Une occurrence quotidienne peut avoir les statuts suivants :

| Statut | Signification |
|---|---|
| pending | À faire |
| submitted | Soumise par l’ado |
| validated | Validée par le parent |
| rejected | Refusée par le parent |
| expired | Non réalisée dans la période |
| skipped | Ignorée volontairement par le parent |

Seul le statut `validated` donne des points.

---

## 7. Calcul des points

### 7.1 Responsabilité validée

```text
points_responsabilite = points_base × multiplicateur_actuel
```

Arrondi MVP :
```text
points_final = arrondi à l’entier le plus proche
```

Exemple :
```text
Responsabilité = 3 points
Multiplicateur = x1.2
Points = 3.6 → 4 points
```

---

### 7.2 Responsabilité refusée

```text
points = 0
```

Pas de retrait de points.

---

### 7.3 Responsabilité non faite

```text
points = 0
```

Pas de retrait de points.

---

## 8. Initiative

L’initiative est une fonctionnalité centrale.

Elle correspond à une action faite sans rappel, sans demande explicite ou avec anticipation.

Exemples :
- J’ai vidé le lave-vaisselle sans qu’on me le demande.
- J’ai préparé mon sac pour demain.
- J’ai aidé mon frère.
- J’ai rangé la table alors que ce n’était pas prévu.

### 8.1 Bonus initiative lié à une responsabilité

Formule recommandée :

```text
bonus_initiative = min(max(arrondi(points_base × 0.5), 1), 5)
```

Donc :
- minimum : +1 point,
- maximum : +5 points,
- environ 50 % des points de base.

Exemple :
```text
Débarrasser la table = 2 points
Initiative = +1 point
Total avant multiplicateur = 3 points
```

### 8.2 Initiative libre

Une initiative libre peut avoir un score choisi par le parent :

| Type d’initiative | Points |
|---|---:|
| Petite initiative | 1 |
| Bonne initiative | 2 |
| Belle initiative | 3 |
| Initiative remarquable | 5 |
| Initiative exceptionnelle | 10 |

---

## 9. Multiplicateur

Le multiplicateur récompense la régularité.
Il ne doit jamais être utilisé comme punition.

### 9.1 Valeurs recommandées

| Série positive | Multiplicateur |
|---:|---:|
| 0 à 6 jours | x1.0 |
| 7 à 13 jours | x1.1 |
| 14 à 29 jours | x1.2 |
| 30 à 59 jours | x1.3 |
| 60 à 89 jours | x1.4 |
| 90 jours et + | x1.5 |

Maximum MVP :
```text
x1.5
```

Minimum :
```text
x1.0
```

### 9.2 Série positive

Un jour est positif si :
- au moins une responsabilité attendue a été validée,
- ou une initiative a été validée,
- et aucune absence planifiée ne doit être comptée négativement.

### 9.3 Absence

Si l’enfant est absent, en vacances, chez l’autre parent ou en colonie :
- le jour ne casse pas la série,
- le jour ne l’augmente pas non plus.

### 9.4 Baisse du multiplicateur

Si plusieurs jours présents passent sans validation, le multiplicateur revient progressivement vers x1.0.

Règle MVP :
```text
Après 3 jours présents sans validation, le multiplicateur baisse d’un palier.
```

Exemple :
```text
x1.3 → x1.2
```

Il ne descend jamais sous x1.0.

---

## 10. Score d’Autonomie

Le Score d’Autonomie est l’indicateur principal du produit.

Il est calculé sur une période glissante de 30 jours, uniquement sur les jours où l’enfant est présent.

```text
Score Autonomie = 40 % Régularité + 35 % Initiative + 25 % Qualité
```

---

## 11. Sous-score Régularité

La régularité mesure si l’adolescent fait ce qui est attendu.

```text
Regularite = responsabilités_validées / responsabilités_attendues × 100
```

Exemple :
```text
40 responsabilités attendues
30 validées
Régularité = 75
```

Si aucune responsabilité n’était attendue :
```text
Regularite = null
```

Dans ce cas, elle ne doit pas pénaliser le score.

---

## 12. Sous-score Initiative

L’initiative mesure la prise d’autonomie spontanée.

Formule recommandée :

```text
Initiative = min((initiatives_validées / objectif_initiatives) × 100, 100)
```

Objectif par défaut :
```text
4 initiatives validées sur 30 jours
```

Exemple :
```text
2 initiatives validées
Objectif = 4
Initiative = 50
```

Le parent peut adapter l’objectif.

---

## 13. Sous-score Qualité

La qualité mesure le taux de validations acceptées.

```text
Qualite = validations_acceptées / soumissions_totales × 100
```

Exemple :
```text
20 soumissions
16 acceptées
Qualité = 80
```

Si aucune soumission :
```text
Qualite = null
```

---

## 14. Gestion des valeurs nulles

Si un sous-score est null, il est retiré du calcul et les poids restants sont normalisés.

Exemple :
- Régularité = 80
- Initiative = 50
- Qualité = null

Poids restants :
- Régularité : 40
- Initiative : 35

Score :
```text
(80 × 40 + 50 × 35) / (40 + 35)
= 66
```

---

## 15. Niveaux d’autonomie

| Score | Niveau |
|---:|---|
| 0 à 20 | Explorateur |
| 21 à 40 | Apprenti |
| 41 à 60 | Responsable |
| 61 à 80 | Autonome |
| 81 à 100 | Modèle |

### Description des niveaux

#### Explorateur
L’adolescent découvre le système et a encore besoin de rappels fréquents.

#### Apprenti
L’adolescent commence à comprendre les attentes et progresse.

#### Responsable
L’adolescent réalise régulièrement ce qui est attendu.

#### Autonome
L’adolescent anticipe certaines responsabilités et prend des initiatives.

#### Modèle
L’adolescent est régulier, fiable et prend souvent des initiatives.

---

## 16. Potentiel mensuel de points

Le potentiel mensuel permet au parent de fixer des récompenses réalistes.

### 16.1 Formule simple

```text
Potentiel mensuel = somme des points de base des responsabilités prévues sur les jours de présence
```

### 16.2 Formule avancée indicative

```text
Potentiel mensuel réaliste =
points_base_prévus
+ bonus_initiative_cible
+ bonus_multiplicateur_estimé
```

Pour le MVP, afficher deux valeurs :
- potentiel de base,
- potentiel avec bonus estimé.

---

## 17. Récompenses

### 17.1 Catégories

| Catégorie | Exemples |
|---|---|
| Temps écran | 30 min console, 1 film |
| Argent | 5 CHF, 10 EUR |
| Activité | cinéma, restaurant, sortie |
| Social | inviter un ami, dormir chez un ami |
| Liberté | rentrer 30 min plus tard, choisir le repas |
| Objet | petit achat, livre, accessoire |
| Autre | personnalisé |

### 17.2 Raretés

| Rareté | Fréquence indicative |
|---|---|
| Commune | plusieurs fois par semaine |
| Rare | 1 fois par mois |
| Épique | 1 fois par trimestre |
| Légendaire | 1 fois par semestre |
| Ultime | 1 fois par an |

---

## 18. Prix recommandés des récompenses

Basés sur le potentiel mensuel de points.

| Rareté | Coût recommandé |
|---|---:|
| Commune | 2 % du potentiel mensuel |
| Rare | 10 % du potentiel mensuel |
| Épique | 25 % du potentiel mensuel |
| Légendaire | 50 % du potentiel mensuel |
| Ultime | 100 % du potentiel mensuel |

Exemple :
```text
Potentiel mensuel = 400 points
Commune = 8 points
Rare = 40 points
Épique = 100 points
Légendaire = 200 points
Ultime = 400 points
```

Le parent peut modifier les coûts.

---

## 19. Plafonds de récompenses

Chaque récompense peut avoir :
- un plafond par jour,
- un plafond par semaine,
- un plafond par mois,
- un plafond par trimestre,
- un plafond par semestre,
- un plafond par an.

Exemples :
```text
Temps écran : max 120 minutes / week-end
Argent : max 50 CHF / mois
Invitation ami : max 1 / mois
Restaurant : max 1 / trimestre
```

---

## 20. Devise

La famille possède une devise par défaut :
- CHF,
- EUR,
- USD,
- etc.

La devise est configurable dans les paramètres famille.

Les récompenses de type argent utilisent la devise de la famille par défaut.

---

## 21. Anti-abus et cohérence éducative

### 21.1 L’adolescent ne peut pas
- créer ses propres récompenses,
- modifier le coût des récompenses,
- modifier ses points,
- valider lui-même une responsabilité donnant des points,
- supprimer l’historique,
- modifier son calendrier de présence.

### 21.2 Le parent doit être encouragé à
- formuler les responsabilités positivement,
- éviter les récompenses disproportionnées,
- ne pas transformer chaque geste familial en transaction,
- valoriser les initiatives non matérielles,
- laisser certains comportements hors système.

---

## 22. Journal de points

Tous les mouvements de points doivent être enregistrés dans un ledger.

Types :
- responsibility_validated
- initiative_validated
- reward_redeemed
- manual_adjustment_parent
- correction

Chaque ligne contient :
- enfant,
- points positifs ou négatifs,
- raison,
- source,
- date,
- parent validateur si applicable.

Même si le MVP ne retire pas de points pour mauvais comportement, les dépenses de récompenses sont négatives dans le ledger.

---

## 23. Règles offline-first

En mode hors ligne :
- l’adolescent peut soumettre une responsabilité,
- déclarer une initiative,
- demander une récompense,
- consulter ses points locaux,
- consulter ses responsabilités.

Mais :
- les points définitifs sont confirmés après synchronisation,
- le serveur reste source de vérité,
- les conflits sont journalisés.

---

## 24. Critères d’acceptation métier

Le moteur est correct si :
- une responsabilité validée donne les bons points,
- une responsabilité refusée donne 0,
- une absence ne casse pas la série,
- le multiplicateur ne descend jamais sous x1.0,
- le multiplicateur ne dépasse jamais x1.5,
- les initiatives donnent un bonus contrôlé,
- le score autonomie est entre 0 et 100,
- les récompenses respectent les plafonds,
- le potentiel mensuel tient compte des jours de présence,
- toutes les opérations de points sont traçables dans le ledger.

---

## 25. Priorité produit

En cas de doute, choisir toujours l’option qui :
1. encourage l’autonomie,
2. réduit les conflits,
3. respecte l’adolescent,
4. reste compréhensible pour les parents,
5. évite la punition numérique.
