# Modèles 3D des véhicules

Ressources récupérées le **26 septembre 2026**. Six modèles NASA couvrent sept
missions, les deux Voyager partageant un même modèle. Les fichiers GLB sont
conservés sans modification et regroupent leur géométrie, leurs matériaux et
leurs éventuelles textures. Aucun modèle généré n'est présenté comme un modèle
officiel.

## Provenance et crédits

| Fichier local | Modèle officiel et source | Crédit de la source | Octets |
| --- | --- | --- | ---: |
| `public/models/parker-solar-probe.glb` | [Parker Solar Probe](https://science.nasa.gov/3d-resources/parker-solar-probe/) | NASA / Matthew J. Garcia | 443 572 |
| `public/models/voyager.glb` | [Voyager Probe (A)](https://science.nasa.gov/3d-resources/voyager-probe-a/) | NASA / Christopher R. Meaney | 285 936 |
| `public/models/new-horizons.glb` | [New Horizons 3D Model](https://science.nasa.gov/resource/new-horizons-3d-model/) | NASA Visualization Technology Applications and Development (VTAD) | 3 293 532 |
| `public/models/juno.glb` | [Juno (B)](https://science.nasa.gov/3d-resources/juno-b/) | NASA — 3D Resources ; pas d'auteur individuel indiqué sur cette page | 262 360 |
| `public/models/osiris-rex.glb` | [OSIRIS-REx](https://science.nasa.gov/3d-resources/origins-spectral-interpretation-resource-identification-and-security-regolith-explorer-osiris-rex/) | NASA / Christopher R. Meaney | 1 281 308 |
| `public/models/perseverance.glb` | [Mars 2020 Perseverance Rover](https://science.nasa.gov/3d-resources/mars-2020-perseverance-rover/) | NASA / Jet Propulsion Laboratory | 4 987 176 |

Total GLB : **10 553 884 octets** (10,55 Mo décimaux), avant compression HTTP.

Les cinq modèles de la collection NASA 3D Resources proviennent du
[dépôt officiel NASA, révision `11ebb4ee043715aefbba6aeec8a61746fad67fa7`](https://github.com/nasa/NASA-3D-Resources/tree/11ebb4ee043715aefbba6aeec8a61746fad67fa7/3D%20Models).
Les noms de répertoires et de fichiers originaux sont ceux de la colonne « Modèle
officiel » ; OSIRIS-REx est classé sous son intitulé développé dans ce dépôt.
New Horizons provient du
[GLB lié par sa page NASA](https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/n/New_Horizons.glb).

## Conditions d'utilisation

Les [règles NASA pour les images et médias](https://www.nasa.gov/nasa-brand-center/images-and-media/)
autorisent généralement l'usage informatif ou éducatif de ses fichiers 3D, sous
réserve des droits signalés de tiers et sans suggérer un soutien de la NASA.
Le [dépôt NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources) décrit ses
ressources comme gratuites et sans copyright. Ce n'est pas une licence Creative
Commons : les sources et crédits sont donc conservés explicitement. Les marques
et logos NASA ne sont pas une autorisation d'utiliser la NASA comme marque de
l'atlas. Aucun droit spécifique de tiers n'a été signalé sur les pages des modèles
retenus.

## Interprétation et limites

- Ce sont des représentations de véhicules réels. Leur orientation, leur échelle
  d'affichage et leur configuration ne décrivent pas la télémétrie en temps réel.
- Voyager 1 et Voyager 2 utilisent la même illustration du véhicule de leur
  famille. Les différences éventuelles de configuration ne sont pas modélisées.
- Le fichier OSIRIS-REx illustre le véhicule réutilisé pour OSIRIS-APEX. Il peut
  montrer une configuration antérieure au largage de la capsule de retour en
  septembre 2023 ; la notice du modèle l'indique.
- Le modèle Perseverance représente le rover. Son affichage dans l'atlas ne décrit
  ni sa pose actuelle ni son parcours local sur Mars.
- Aucun modèle n'est substitué à celui d'une autre sonde lorsque la ressource
  manque. Le GLB officiel Europa Clipper consulté faisait environ 34 Mo ; il n'a
  pas été intégré au budget de chargement actuel.

## Chargement et décompression

Le registre `src/data/spacecraftModels.ts` contient les URL locales, les crédits et
les liens officiels destinés à l'interface. Charger uniquement le modèle
sélectionné. Une erreur de chargement doit laisser disponibles le repère de mission
et les informations scientifiques.

Cinq fichiers utilisent `KHR_draco_mesh_compression`. Les décodeurs fournis par
**Three.js 0.185.1**, déjà présent dans le projet, sont copiés sans modification
depuis `node_modules/three/examples/jsm/libs/draco/gltf/` vers
`public/models/draco/`. Ils n'ajoutent aucune dépendance de production et pèsent
environ 760 ko. Leur [licence Apache 2.0](https://github.com/google/draco/blob/main/LICENSE)
et la notice de Three.js sont distribuées dans le même répertoire.

Passer `spacecraftModelDecoderPath` comme second paramètre de `useGLTF` pour
charger ces décodeurs localement. Cela évite de dépendre du CDN Draco par défaut.
Les fichiers tiers de ce répertoire ne doivent pas être reformatés.

## Intégrité des téléchargements

Empreintes SHA-256 des fichiers conservés :

| Fichier | SHA-256 |
| --- | --- |
| `parker-solar-probe.glb` | `4d26e84efd29a78c5d07e474f6272bb111668b58da5a7555e305a65c72ddb1c5` |
| `voyager.glb` | `7cf8eefb5a0fca9e4e1b0d1e51c37433124169183e5dbfd2d8034af902311821` |
| `new-horizons.glb` | `cf152d8cea17c4a83711041cb0d29ca1d980bfafa084ada2656569ea92cdd73f` |
| `juno.glb` | `8a410b5eaf99660a339cf86398d61534a89bc84a2c43e3c103ad22fb31d7ef93` |
| `osiris-rex.glb` | `ef8e0429ee4dd8e918908923d5efdc6d3576b9216cc8e16533b50dd28c196bca` |
| `perseverance.glb` | `10db7c03a5e63a5a3b3e7baa6243aa4918ba045fa8ff0a731d0217491adc727f` |

Les tests du registre vérifient les en-têtes GLB 2.0, les longueurs des blocs, la
présence de géométrie, l'absence de dépendances de texture externes, les crédits,
le décodeur local et le budget de fichiers. Ils ne remplacent pas une vérification
visuelle du rendu WebGL.
