# Journal de bord

Nom et prénom : Adam Rida
Dépôt : https://github.com/Adam-cmd64/jeu-ia
Outil utilisé (Copilot, modèle affiché) : Claude (chat), car Copilot ne fonctionnait pas sur mon compte. Claude ne lit pas mes fichiers tout seul : il m'a proposé le code à partir du sujet, et je l'ai collé moi-même dans VS Code.

Règle : tu colles ici le texte exact de tes prompts (copier-coller, pas de capture). Une entrée par défi. Ce que tu n'as pas gardé compte autant que ce que tu as gardé.

## Défi 1 - Complétion

- Commentaire ou début de code que j'ai écrit :

```
// compte les cristaux attrapés dans la variable cristaux
// affiche le nombre de cristaux attrapés sur l'écran de fin
```

- Ce que Claude a proposé : déclarer `let cristaux = 0;` en haut de jeu.js, ajouter `cristaux += 1;` dans toucherObjet après le calcul des points (donc pas pour les bombes, à cause du `return` au début), remettre `cristaux = 0;` dans demarrerPartie, et afficher le nombre dans terminerPartie. Il a aussi fallu ajouter une ligne dans index.html pour avoir un endroit où afficher le nombre sur l'écran de fin.
- Ce que j'ai accepté, modifié ou refusé, et pourquoi : j'ai tout accepté tel quel, parce que les bombes ne sont pas comptées : le return arrête la fonction avant le +1.
- Comment j'ai vérifié que ça marche : j'ai rechargé index.html et joué une partie : « CRISTAUX 8 » s'affichait sur l'écran de fin.Lorsque j'ai relancé une nouvelle partie en haut à gauche c'était vide y avait 0.

## Défi 2 - Ask

- Ma question (prompt exact) :

```
Je suis en Bachelor 1, j'ai fait un peu de Go. Explique jeu.js : comment fonctionnent la boucle du jeu, la chute des objets et la détection de l'objet attrapé ? Une phrase par partie.
```

- Ma deuxième question :

```
Comment le combo est-il remis à zéro ?
```

- Une affirmation de la réponse que j'ai vérifiée : « la vitesse de chute des objets vient de `vitesseChute` dans config.js (145 au niveau 1) ».
- Comment je l'ai vérifiée (un changement dans le code, un test dans le jeu) : j'ai mis `vitesseChute` à 500 au lieu de 145 dans config.js, j'ai rechargé le jeu et lancé une partie : les objets tombaient beaucoup plus vite dès le début. Ensuite j'ai remis 145.
- Résultat : exacte, fausse ou incomplète : exacte.

## Défi 3 - Plan

- Mon prompt en mode Plan :

```
(colle-le ici)
```

- Le plan est dans le fichier `PLAN.md`.
- Ce que j'ai changé dans le plan avant de le valider (étape retirée, ajoutée, contrainte) et pourquoi :

## Défi 4 - Agent

- Mon prompt en mode Agent :

```
(colle-le ici)
```

- Fichiers que l'agent a modifiés :
- Ce que j'ai relu dans les changements avant d'accepter :
- Ce que j'ai refusé, corrigé ou fait refaire :
- Mon jeu après l'agent (une phrase) :

## Défi 5 - Pull request et revue

- Lien de ma pull request :
- Commentaire de la revue Copilot que j'ai traité (le texte) :
- Ma décision (corrigé ou refusé) et pourquoi :
- Lien de mon jeu publié :

## Bilan (3 lignes maximum)

- Ce que l'assistant a fait mieux ou plus vite que moi :
- Ce qu'il a mal fait ou ce que j'ai dû corriger :
- Ce que je ne lui laisserais pas faire :
