# Retouche PDF

Modifier le texte d'un PDF **en gardant ses polices d'origine**, directement dans le navigateur.
Web app installable (PWA), comme Platine. Le PDF ne quitte jamais ton appareil.

## Ce que ça fait

- **Modifier** : clique sur un texte, tape, Entrée pour valider (Échap pour annuler). Garde le clic et glisse pour déplacer un texte. Flèches pour ajuster (Maj = plus grand pas).
- **Mêmes polices** : le texte modifié est réécrit avec la police **intégrée au PDF** (TrueType, CFF, Type3, polices découpées par Chrome…), à la même taille, la même couleur et la même position. L'aperçu affiché est le vrai rendu du PDF modifié.
- Si une lettre n'existe pas dans la police intégrée (un PDF ne contient souvent que les lettres déjà utilisées), seule cette lettre passe dans la police standard la plus proche (Helvetica, Times ou Courier). Le panneau le signale.
- **Ajouter** du texte : clique sur la page. La police et la taille proposées sont celles du document.
- **Masquer** une zone : trace un rectangle (logo, tampon…). Sa couleur reprend celle du fond.
- **Rechercher et remplacer** dans tout le document.
- **Annuler / rétablir** (⌘Z / ⇧⌘Z), zoom, glisser-déposer d'un PDF, ⌘S pour enregistrer.
- **Enregistrer** :
  - *PDF modifiable* : texte sélectionnable, polices d'origine. L'ancien texte est recouvert mais reste caché dans le fichier (un copier-coller peut le retrouver).
  - *PDF aplati* : chaque page devient une image haute définition, l'ancien texte disparaît vraiment.

## Limites actuelles

- Les PDF protégés par leur auteur (chiffrés) ne peuvent pas être modifiés.
- Les PDF scannés (images) n'ont pas de texte modifiable : on peut masquer et ajouter du texte.
- Une modification se fait ligne par ligne (pas de reflow de paragraphe).

## Installer

- **Mac (Safari)** : ouvre le lien, puis menu **Fichier → Ajouter au Dock**.
- **Mac (Chrome)** : icône d'installation à droite de la barre d'adresse.
- **iPhone (Safari)** : Partager → Sur l'écran d'accueil.

## Mettre à jour

À chaque mise à jour, augmente le numéro de build au même chiffre à trois endroits : `index.html` (`BUILD`), `sw.js` (`retouche-build-N`) et `version.json`.

## Bibliothèques

[PDF.js](https://mozilla.github.io/pdf.js/) (Apache 2.0) pour l'affichage, [pdf-lib](https://pdf-lib.js.org/) (MIT) pour l'écriture. Copiées dans `lib/` pour marcher hors connexion.
