# Architecture

L'atlas est une application statique React, TypeScript strict et Vite, avec
Three.js, React Three Fiber et Drei pour la scène. Les responsabilités restent
séparées afin de faciliter l'apprentissage, la revue et les corrections.

## Données et domaine

- `src/data/missions.ts` contient le catalogue éditorial : états datés, objectifs,
  instruments, découvertes, étapes et sources officielles.
- `src/data/celestialBodies.ts` contient les propriétés physiques des astres.
- `src/data/ephemerides.json` embarque les positions et trajectoires JPL Horizons
  à une date de référence explicite, avec les requêtes sources et leur couverture.
- `src/data/visualAssets.ts` et `spacecraftModels.ts` décrivent les ressources
  visuelles locales, leurs crédits et leurs limites.
- `src/domain/` définit les types, les calculs de distances et de délai lumineux,
  ainsi que les fonctions de recherche, filtrage et navigation dans le catalogue.

Les calculs physiques utilisent les coordonnées héliocentriques en UA, sans
objets Three.js. Une position indisponible reste indisponible : le domaine ne
l'extrapole pas et ne la remplace pas par la position de la planète cible.

## Transformation et rendu

`src/display/` prépare les valeurs de la scène : compression radiale des UA,
conversion des axes, dimensions exagérées, placement lisible des repères,
séparation des portions de trajectoire avant/après l'instantané et cadrage de
la caméra. `getRouteView` calcule le cadre du parcours sélectionné. Ces choix
visuels ne servent jamais au calcul des distances affichées dans les fiches.

`src/components/scene/` compose les astres, les repères, les lignes et les
interactions de caméra. La trajectoire de la mission sélectionnée distingue les
échantillons antérieurs par un trait continu et les suivants par des pointillés.
Un repère de contexte sans coordonnées scientifiques reste explicitement distinct.

`SpacecraftModel` charge le GLB officiel à la sélection avec `useGLTF` et
`Suspense`. Les décodeurs Draco sont locaux dans `public/models/draco/`. Un repère
prend le relais pendant le chargement ou en cas d'erreur. L'échelle et la pose
du véhicule sont illustratives. Les textures planétaires sont également locales.

Les composants DOM de `src/components/` assurent la recherche, les listes, les
fiches, les crédits et le panneau de méthode. Ils proposent une navigation au
clavier en complément de la sélection dans la scène.

## État et actualisation

`src/App.tsx` conserve l'état React : sélection, filtres, panneaux, étiquettes,
trajectoires et modes de cadrage. Le fragment `#mission=identifiant` synchronise
la sélection avec une URL partageable, sans routage côté serveur. Il n'y a pas
de bibliothèque d'état global, de backend ou de base de données.

`scripts/fetch-ephemerides.mjs` interroge Horizons séquentiellement puis génère
le fichier statique. La révision du catalogue et de ses sources est séparée de
la récupération des coordonnées. L'application déployée ne sollicite aucune
API scientifique ou d'IA : une nouvelle édition exige une mise à jour des
données et une nouvelle construction Vite.

## Vérification et livraison

Vitest couvre notamment les données, les transformations, les limites de
couverture et les calculs ; React Testing Library vérifie les parcours DOM.
Le comportement WebGL, les modèles et les cadrages font aussi l'objet d'une
vérification visuelle. Les commandes de formatage, lint, TypeScript, tests et
construction sont listées dans le [README](../README.md).

Vite produit `dist`, servi statiquement par Vercel, sans clé ni secret.
Les changements doivent rester compréhensibles et limités au besoin courant,
sans abstractions ou infrastructure réservées à d'éventuelles phases futures.
Les [notes d'éphémérides](ephemerides.md) et de [modèles 3D](spacecraft-models.md)
détaillent les conventions scientifiques et la provenance des ressources.
