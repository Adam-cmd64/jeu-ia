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
Je veux ajouter un cristal de glace, plus rare que le doré. Quand on l'attrape, tous les objets ralentissent pendant 4 secondes, puis reprennent leur vitesse. Respecte les règles de .github/copilot-instructions.md. Propose un plan sans modifier le code.
```

- Le plan est dans le fichier `PLAN.md`.
- Ce que j'ai changé dans le plan avant de le valider (étape retirée, ajoutée, contrainte) et pourquoi : j'ai retiré l'étape 7 (le son), parce qu'il n'est pas demandé et que ça limite les lignes ajoutées. Claude a signalé que le JavaScript fait déjà 604 lignes alors que la règle dit moins de 600 : j'ai décidé d'accepter de dépasser, parce que la fonctionnalité compte plus. J'ai ajouté une ligne « Comment vérifier dans le jeu » : jouer normalement jusqu'à attraper un cristal de glace et regarder si tout ralentit pendant 4 secondes. J'ai choisi ces modifications parmi des options que Claude m'a proposées, et c'est Claude qui a écrit le fichier.

## Défi 4 - Agent

- Mon prompt en mode Agent (avec Claude à la place de l'agent Copilot) :

Premier prompt : j'ai demandé à Claude d'appliquer PLAN.md (« vasy fait »).

Deuxième prompt, en 4 blocs (construit à partir d'un modèle de Claude, avec mes choix : thème voiture-foot, nom ROCKET BALL, bouclier au trophée) :

```
Objectif : ajoute un bouclier qui absorbe la prochaine bombe, visible dans le HUD. Change aussi le thème du jeu en voiture-foot, avec ROCKET BALL comme nom du jeu.
Contexte : jeu web en JavaScript simple (jeu.js, config.js, dessin.js). Les cristaux deviennent des ballons, le doré un trophée, la glace un ballon gelé, et les bombes des voitures adverses (démolition).
Contraintes : respecte .github/copilot-instructions.md, les réglages restent dans config.js, on obtient le bouclier en attrapant un trophée (doré).
Format : explique en 2 phrases ce que tu changes et dis comment vérifier dans le jeu.
```

- Fichiers que l'agent a modifiés : config.js, jeu.js, dessin.js, index.html (et .github/copilot-instructions.md pour ajouter mes deux lignes de thème).
- Ce que j'ai relu dans les changements avant d'accepter : j'ai testé chaque version dans le jeu : le cristal de glace et le ralenti, puis le thème (titre ROCKET BALL, ballons, voitures, trophée) et le bouclier (il absorbe une voiture, puis la voiture suivante enlève bien une vie).
- Ce que j'ai refusé, corrigé ou fait refaire : dans la première version du cristal de glace, le bleu se distinguait mal du cyan et je ne voyais pas « GEL » ni de chrono. Je l'ai dit à Claude (« le bleu ne se distingue pas trop oui , et Gel ne s'affiche pas, genre y a pas de chrono »). Il a mis la glace en blanc, plus grosse, avec des étincelles, et un chrono « GEL x s » en haut de l'écran. Pour tester, il a mis la glace à 30 % puis l'a remise à 2 % avant le commit. Commits : « defi 4 : cristal de glace » puis « defi 4 : glace plus visible et chrono du gel ».
- Mon jeu après l'agent (une phrase) : ROCKET BALL, un jeu voiture-foot où on attrape des ballons et des trophées (qui donnent un bouclier), où le ballon gelé ralentit tout pendant 4 secondes, et où il faut éviter les voitures adverses.

## Défi 5 - Pull request et revue

- Lien de ma pull request : https://github.com/Adam-cmd64/jeu-ia/pull/1
- Commentaire de la revue Copilot que j'ai traité (le texte) : Copilot n'était pas proposé comme relecteur sur mon compte, donc la revue a été faite par Claude et postée sur la PR. Remarque traitée : « Hitbox des voitures (jeu.js, estAttrape) : la voiture est dessinée sur 2,6 fois son rayon en largeur, mais la collision n'utilise que la moitié du rayon de chaque côté. On peut toucher visuellement une voiture sans perdre de vie. »
- Ma décision (corrigé ou refusé) et pourquoi : corrigé (commit « defi 5 : hitbox des voitures (revue) »), parce que c'est bizarre de toucher une voiture sans perdre de vie. J'ai refusé la remarque sur la limite des 600 lignes, parce que j'avais déjà décidé au défi 3 d'accepter de dépasser. Les remarques sur le README et l'indentation ne sont pas retenues. Ma réponse est écrite sur la PR.
- Lien de mon jeu publié : https://adam-cmd64.github.io/jeu-ia/

## Bilan (3 lignes maximum)

- Ce que l'assistant a fait mieux ou plus vite que moi : expliquer le code (la boucle, la chute des objets et le combo) simplement.
- Ce qu'il a mal fait ou ce que j'ai dû corriger : la couleur du cristal de glace, trop proche du cyan, et le « GEL » qu'on ne voyait pas.
- Ce que je ne lui laisserais pas faire : décider à ma place ; les choix (thème, corrections, refus) doivent rester les miens.
