# Catalogue des missions

Revue documentaire : **26 septembre 2026**. Les données sont dans `src/data/missions.ts`. Le catalogue comprend **56 fiches** : 34 en opérations, 10 en voyage, 10 consacrées à l’exploitation scientifique de données et 2 dont l’activité actuelle n’a pas pu être confirmée. Les catégories ne constituent pas une télémétrie en direct.

## Périmètre et unité de comptage

L’atlas couvre l’exploration robotique des planètes, de la Lune, des petits corps, du Soleil et de l’héliosphère. Il inclut les missions NASA, ESA, JAXA, ISRO, CNSA, KARI/KASA, l’Agence spatiale des Émirats et les collaborations internationales. Les observatoires solaires en orbite terrestre sont pertinents pour ce périmètre, malgré leur proximité avec la Terre.

Une fiche représente une mission ou un véhicule navigable : les deux sondes ESCAPADE ont chacune une fiche ; PUNCH regroupe quatre satellites, Proba-3 deux véhicules, THEMIS-ARTEMIS les deux sondes lunaires P1/P2, et Chang’e-4 l’atterrisseur et Yutu-2. Les totaux de fiches ne sont donc pas des totaux physiques de véhicules. Le catalogue est large, mais **ne constitue pas un registre exhaustif de tous les engins encore capables d’émettre**.

Les anciennes missions présentes ont un intérêt scientifique documenté dans des analyses récentes : retours d’échantillons Chang’e-5/6, DART, InSight, MAVEN, Akatsuki, Chandrayaan-3, SLIM, Blue Ghost 1 et Zhurong. Leur présence ne signifie pas que leurs véhicules fonctionnent encore. Toutes les archives de missions historiques ne sont pas recensées.

## Statut, date et preuves

- `statusDate` date la publication ou l’événement qui soutient le statut. `statusNote` explique cette preuve et ses limites. Elle n’est jamais remplacée par la date de consultation pour faire paraître une source récente.
- Une page institutionnelle active sans bulletin daté est signalée explicitement ; la date affichée peut alors être celle d’un événement historique identifié. Pour DSCOVR, la date est celle de la dernière mise à jour éditoriale affichée par NASA, distincte d’un bulletin opérationnel.
- Les missions solaires communes utilisent la [flotte NASA de janvier 2026](https://svs.gsfc.nasa.gov/5609/) et leur page de mission. Cette source ne constitue pas une confirmation quotidienne de leur santé.
- `operating` et `cruise` décrivent le dernier état documenté. `uncertain` évite de transformer une absence de nouvelles en confirmation d’activité : Chang’e-4 et Queqiao-2 conservent ce statut.
- `analysis` désigne l’exploitation scientifique de données ou d’échantillons. Elle peut concerner un véhicule définitivement arrêté, un rover sans nouvelle activité confirmée ou une mission de retour d’échantillons dont les prolongations du véhicule ne sont pas documentées ici.
- Les résultats `findings` sont acquis et sourcés individuellement. Les objectifs et résultats espérés restent dans `science` et `phase`. Un tableau de résultats vide signifie que cette fiche ne présente pas encore de résultat vérifié, pas que la mission n’en a produit aucun.
- Les événements `planned` sont prévus, y compris lorsqu’une échéance ancienne manque de confirmation. Seuls les événements confirmés sont `achieved`.
- Les dates de lancement sont en UTC lorsqu’un décalage change le jour civil ; certaines agences utilisent la date locale. Les notes signalent les cas pertinents.

Les sources principales sont des pages d’agences, des communiqués institutionnels, des rapports annuels ou des publications hébergées par ces organismes. Les résumés français sont des reformulations. Les tests vérifient la présence de sources HTTPS institutionnelles, la cohérence des identifiants et dates et les statuts des missions terminées ; ils ne remplacent pas la vérification scientifique des textes ou un contrôle permanent de disponibilité des liens.

## Corrections de statut importantes

- [MAVEN a officiellement terminé sa mission le 3 juin 2026](https://www.nasa.gov/news-release/nasa-says-farewell-to-maven-mars-mission-hosts-media-call-today/), après la perte de contact du 6 décembre 2025. Les éphémérides encore disponibles ne prouvent pas une activité.
- [Akatsuki a terminé ses opérations en septembre 2025](https://cosmos.isas.jaxa.jp/?p=9368). Elle reste présente pour sa science de Vénus.
- La page générale de Juno conserve une ancienne échéance de septembre 2025 ; les [publications de mission de mai 2026](https://science.nasa.gov/mission/juno/stories/) documentent des observations postérieures. Cette contradiction est expliquée dans la fiche.
- La [participation de la NASA à CAPSTONE se termine en juin 2026](https://www.nasa.gov/smallspacecraft/capstone/), tandis que la source annonce la poursuite de démonstrations par l’opérateur. La fiche ne prolonge pas artificiellement le programme NASA.
- [Tianwen-2 est arrivée à proximité de Kamoʻoalewa en juillet 2026](https://www.cnsa.gov.cn/n6758823/n6758838/c10760422/content.html). Elle est en opérations près de sa cible ; aucun retour d’échantillons accompli n’est annoncé.
- Le [survol terrestre de JUICE du 28 septembre 2026](https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_to_fly_past_Earth_for_third_gravity_assist) est encore prévu à la date de revue.
- SWFO-L1 conserve cet identifiant stable dans le code et les trajectoires ; son nom affiché est SOLAR-1. [Le coronographe CCOR-2 a été déclaré opérationnel en juin 2026](https://swpc-drupal.woc.noaa.gov/news/solar-1-ccor-2-now-fully-operational-and-our-webpage), ce qui ne signifie pas que tous les instruments ont nécessairement le même statut.

## Exclusions et limites connues

Les missions seulement planifiées, dont MMX, Dragonfly, NEO Surveyor, VERITAS, DAVINCI, EnVision et Rosalind Franklin, ne sont pas présentées comme déjà lancées. L’ajout d’une mission à venir nécessite de confirmer son lancement et son état à la prochaine revue. La même règle s’applique à Chang’e-7 : un calendrier annoncé ne constitue pas une preuve de vol.

Chang’e-3, Queqiao-1 et les prolongations éventuelles des orbiteurs Chang’e-5/6 ne disposent pas ici d’une confirmation d’activité scientifique suffisamment récente. Les deux retours d’échantillons figurent uniquement dans la catégorie analyse. Les petits engins secondaires, relais lunaires et CubeSats ne sont pas tous couverts. Les missions sans exploitation scientifique retenue pour cette sélection, comme les atterrisseurs IM-1/IM-2, Lunar Trailblazer ou les tentatives d’atterrissage ayant échoué, ne sont pas ajoutées pour gonfler le total.

Les satellites de télécommunication, d’observation terrestre et de navigation, les missions habitées, et les grands observatoires astrophysiques comme Hubble ou Webb sont hors de ce périmètre. MMS, les satellites météorologiques GOES et d’autres missions essentiellement magnétosphériques ne sont pas recensés systématiquement ; la sélection solaire privilégie l’observation du Soleil, le vent solaire et l’héliosphère.

Les positions et trajectoires sont documentées séparément dans [ephemerides.md](ephemerides.md). L’existence d’une trajectoire JPL ne vaut pas confirmation de fonctionnement. L’absence d’éphémérides publiques ne vaut pas fin de mission. Les Voyager ont quitté l’héliosphère, mais cette limite n’est pas la frontière gravitationnelle du Système solaire.

## Mise à jour

Pour ajouter ou revoir une fiche, consulter les dernières nouvelles de l’opérateur, conserver la date de la preuve, sourcer les affirmations et distinguer mission, véhicule et résultats d’archives. Une extension annoncée, une fin d’opérations, une perte de contact ou une arrivée à destination justifie une révision du statut. Réviser ensuite le total ci-dessus et lancer les tests du catalogue. Les agences ne publient pas de registre mondial unique, homogène et constamment à jour : une revue régulière reste nécessaire.
