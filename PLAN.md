# Plan : cristal de glace

Plan proposé par Claude (en mode « plan », sans modifier le code), puis modifié par moi. Mes changements sont dans la dernière partie.

## Idée

Un nouveau type d'objet `GLACE`, plus rare que le doré. Quand on l'attrape, un chronomètre `chronoGlace` démarre pour 4 secondes : tant qu'il tourne, tous les objets descendent moins vite.

## Étapes

1. **config.js : réglages** (les réglages restent dans config.js, règle de `.github/copilot-instructions.md`)
   - ajouter `const GLACE = "glace";`
   - ajouter une couleur `glace` dans `COULEURS` (bleu pâle, par exemple `#9fdcff`)
   - dans `REGLAGES` : `hasardGlace: 0.02` (plus rare que le doré à 0.05), `dureeGlace: 4` (secondes), `ralentiGlace: 0.4` (les objets vont à 40 % de leur vitesse)
2. **jeu.js : création de l'objet**
   - ajouter `let chronoGlace = 0;` en haut, et le remettre à 0 dans `demarrerPartie`
   - dans `creerObjet`, ajouter une chance de tirer `GLACE` (avant le tirage du doré)
3. **jeu.js : effet quand on l'attrape**
   - dans `toucherObjet`, si l'objet est `GLACE` : `chronoGlace = REGLAGES.dureeGlace`, flash bleu et texte « GEL »
   - il donne 10 points comme un cristal normal et compte dans `cristaux`
4. **jeu.js : ralentissement**
   - dans `mettreAJour`, faire baisser `chronoGlace` avec `dt`
   - dans la boucle des objets, multiplier la descente par `REGLAGES.ralentiGlace` quand `chronoGlace > 0`
   - les objets gardent leur vraie vitesse, donc ils la reprennent tout seuls quand le chronomètre arrive à 0
5. **jeu.js : s'il tombe sans être attrapé**
   - pas de vie perdue, juste un texte « GLACE PERDUE » (comme le doré)
6. **dessin.js : apparence**
   - réutiliser `dessinerCristal` avec la couleur glace, sans créer une nouvelle fonction (règle : ne pas dupliquer une fonction)
7. ~~**audio.js : un son spécial pour le gel** (optionnel)~~ **retirée par moi**

Vérification technique : `node --check` sur chaque fichier JS modifié.

## Mes modifications

- **Étape 7 retirée (le son)** : le son n'est pas demandé dans le sujet, et ça limite le nombre de lignes ajoutées.
- **Limite des 600 lignes** : le JavaScript fait déjà 604 lignes après le défi 1. J'accepte de dépasser un peu, parce que la fonctionnalité compte plus que la limite.
- **Comment vérifier dans le jeu** : jouer normalement jusqu'à attraper un cristal de glace (bleu pâle), puis regarder si tous les objets ralentissent pendant environ 4 secondes et reprennent ensuite leur vitesse normale.
