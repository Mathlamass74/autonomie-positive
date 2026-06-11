**Remarque sur les clés étrangères**

- Les Foreign Keys ne sont pas ajoutées dans cette phase (choix volontaire).
- C'est un point important pour la robustesse et l'intégrité référentielle à traiter ultérieurement (indexation, contraintes ON DELETE/UPDATE, migrations).
- Action future recommandée : ajouter FK et tests d'intégrité après validation des schémas et des performances.
