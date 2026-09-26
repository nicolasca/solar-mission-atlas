import type {
  Mission,
  MissionEvent,
  ScientificFinding,
} from '../domain/mission';

export const CATALOGUE_REVIEW_DATE = '2026-09-26';

const nasa = (slug: string) => `https://science.nasa.gov/mission/${slug}/`;
const fleet = 'https://svs.gsfc.nasa.gov/5609';
const fleetNote =
  "Included in NASA's January 2026 fleet; its mission page lists it as active. This catalogue reflects documented status, not live telemetry.";
const source = (label: string, url: string) => ({ label, url });
const finding = (text: string, sourceUrl: string): ScientificFinding => ({
  text,
  sourceUrl,
});
const event = (
  date: string,
  title: string,
  sourceUrl: string,
  kind: MissionEvent['kind'] = 'achieved',
): MissionEvent => ({ date, title, sourceUrl, kind });

// Every entry carries its own dated evidence. A publication date is not a live health check.
// Groups of vehicles (Proba-3, Chang'e-4) stay grouped unless individual navigation is useful.
export const missions: readonly Mission[] = [
  {
    id: 'parker-solar-probe',
    name: 'Parker Solar Probe',
    agencies: ['NASA'],
    launchDate: '2018-08-12',
    status: 'operating',
    statusDate: '2026-09-10',
    phase: 'Passages through the solar corona',
    region: 'sun',
    targetBodyId: 'sun',
    primaryTarget: 'Solar corona and solar wind',
    statusNote:
      'The signal received on 7 September confirms normal operation after the 29th perihelion; an extension through 2029 has been announced.',
    description:
      "Protected by a heat shield, the spacecraft flies directly through the Sun's outer atmosphere.",
    science:
      'Understand why the corona is so hot and how the solar wind accelerates, two fundamental questions in space weather.',
    instruments: [
      'FIELDS · electric and magnetic fields',
      'SWEAP · plasma',
      'WISPR · imaging',
      'ISʘIS · energetic particles',
    ],
    findings: [
      finding(
        'The first direct passages through the solar corona linked magnetic structures to the origin of the solar wind.',
        nasa('parker-solar-probe'),
      ),
    ],
    events: [
      event(
        '2026-09-04',
        '29th close approach to the Sun',
        'https://science.nasa.gov/blogs/parker-solar-probe/2026/09/10/after-latest-swing-past-sun-nasas-parker-solar-probe-checks-in/',
      ),
    ],
    sourceUrl: nasa('parker-solar-probe'),
    sources: [
      source('NASA · mission', nasa('parker-solar-probe')),
      source(
        'NASA · 10 September 2026 update',
        'https://science.nasa.gov/blogs/parker-solar-probe/2026/09/10/after-latest-swing-past-sun-nasas-parker-solar-probe-checks-in/',
      ),
    ],
  },
  {
    id: 'solar-orbiter',
    name: 'Solar Orbiter',
    agencies: ['ESA', 'NASA'],
    launchDate: '2020-02-10',
    status: 'operating',
    statusDate: '2026-01-21',
    phase: 'Solar observations outside the ecliptic plane',
    region: 'sun',
    targetBodyId: 'sun',
    primaryTarget: 'Sun and polar regions',
    statusNote:
      'ESA reports results in January 2026; the next Venus flyby is scheduled for 24 December 2026.',
    description:
      'Solar Orbiter combines solar imaging with local plasma measurements from an increasingly inclined orbit.',
    science:
      'Connect surface activity to the heliosphere and use polar observations to understand the solar magnetic cycle.',
    instruments: [
      'EUI · ultraviolet',
      'PHI · magnetic field',
      'SPICE · spectrometer',
      'MAG / SWA · in situ measurements',
    ],
    findings: [
      finding(
        "The first views of the Sun's poles were published in June 2025.",
        'https://www.esa.int/Science_Exploration/Space_Science/Solar_Orbiter',
      ),
    ],
    events: [
      event(
        '2026-12-24',
        'Venus flyby to increase orbital inclination',
        'https://www.esa.int/Science_Exploration/Space_Science/Solar_Orbiter/Solar_Orbiter_perihelia_and_flybys',
        'planned',
      ),
    ],
    sourceUrl:
      'https://www.esa.int/Science_Exploration/Space_Science/Solar_Orbiter',
    sources: [
      source(
        'ESA · mission and results',
        'https://www.esa.int/Science_Exploration/Space_Science/Solar_Orbiter',
      ),
      source(
        'ESA · orbital schedule',
        'https://www.esa.int/Science_Exploration/Space_Science/Solar_Orbiter/Solar_Orbiter_perihelia_and_flybys',
      ),
    ],
  },
  {
    id: 'bepicolombo',
    name: 'BepiColombo',
    agencies: ['ESA', 'JAXA'],
    launchDate: '2018-10-20',
    expectedArrival: {
      date: '2026-11-21',
      description: 'Mercury · orbit capture',
      sourceUrl:
        'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo/Latest_updates_BepiColombo_s_arrival_at_Mercury',
    },
    status: 'cruise',
    statusDate: '2026-09-24',
    phase: 'Final approach to Mercury',
    region: 'mercury',
    targetBodyId: 'mercury',
    primaryTarget: 'Mercury',
    statusNote:
      "ESA's September 2026 page describes Mercury arrival as upcoming; orbital science operations have not yet begun.",
    description:
      'Two complementary orbiters travel together: MPO to study the planet and Mio to study its magnetosphere.',
    science:
      "Explain the origin of Mercury's large metallic core, its magnetic field and its evolution close to the Sun.",
    instruments: [
      'MPO · imaging, spectroscopy and altimetry',
      'Mio · plasma and magnetic fields',
    ],
    findings: [
      finding(
        'The flybys returned close-up surface images and measurements of the magnetic environment.',
        'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo',
      ),
    ],
    events: [],
    sourceUrl:
      'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo',
    sources: [
      source(
        'ESA · BepiColombo updates',
        'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo',
      ),
      source(
        'ESA · mission profile',
        'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo_overview2',
      ),
      source(
        'ESA · Mercury arrival schedule',
        'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo/Latest_updates_BepiColombo_s_arrival_at_Mercury',
      ),
    ],
  },
  {
    id: 'juice',
    name: 'JUICE',
    agencies: ['ESA', 'NASA', 'JAXA'],
    launchDate: '2023-04-14',
    expectedArrival: {
      date: '2031-07',
      description: 'Jupiter · orbit insertion',
      sourceUrl:
        'https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_factsheet',
    },
    status: 'cruise',
    statusDate: '2026-09-21',
    phase: "Cruise to Jupiter's icy moons",
    region: 'jupiter',
    targetBodyId: 'jupiter',
    primaryTarget: 'Ganymede, Callisto and Europa',
    statusNote:
      'On 21 September 2026, ESA confirmed preparations for the 28 September Earth flyby; Jupiter arrival is planned for 2031.',
    description:
      'JUICE will explore the Jovian system before entering orbit around Ganymede.',
    science:
      'Assess ocean-moon environments, their ice and their interactions with Jupiter; no findings at the destination are available yet.',
    instruments: [
      'RIME · radar',
      'JANUS · camera',
      'MAJIS · spectrometer',
      'GALA · altimeter',
      'J-MAG · magnetometer',
    ],
    findings: [],
    events: [
      event(
        '2026-09-28',
        'Planned Earth flyby',
        'https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_to_fly_past_Earth_for_third_gravity_assist',
        'planned',
      ),
      event(
        '2031-07',
        'Planned arrival in the Jupiter system',
        'https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_factsheet',
        'planned',
      ),
    ],
    sourceUrl:
      'https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_factsheet',
    sources: [
      source(
        'ESA · September 2026 Earth flyby',
        'https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_to_fly_past_Earth_for_third_gravity_assist',
      ),
      source(
        'ESA · JUICE factsheet',
        'https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_factsheet',
      ),
    ],
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    agencies: ['NASA'],
    launchDate: '2024-10-14',
    expectedArrival: {
      date: '2030-04',
      description: 'Jupiter · orbit insertion, followed by Europa flybys',
      sourceUrl: nasa('europa-clipper'),
    },
    status: 'cruise',
    statusDate: '2025-03-28',
    phase: 'Cruise to Europa',
    region: 'jupiter',
    targetBodyId: 'jupiter',
    primaryTarget: 'Europa, a moon of Jupiter',
    statusNote:
      'NASA confirms the 1 March 2025 Mars flyby; the mission profile includes an Earth gravity assist in December 2026 and Jupiter arrival in 2030.',
    description:
      'The spacecraft will orbit Jupiter and make dozens of flybys of Europa.',
    science:
      'Measure ice thickness and structure, investigate the ocean and assess habitability. The mission is not designed to detect life directly.',
    instruments: [
      'REASON · radar',
      'EIS · cameras',
      'MISE · spectrometer',
      'ECM · magnetometer',
      'MASPEX / SUDA · ejected material',
    ],
    findings: [],
    events: [
      event(
        '2030-04',
        'Planned arrival at Jupiter',
        nasa('europa-clipper'),
        'planned',
      ),
    ],
    sourceUrl: nasa('europa-clipper'),
    sources: [
      source(
        'NASA · confirmed Mars flyby',
        'https://science.nasa.gov/blog/visiting-mars-on-the-way-to-the-outer-solar-system/',
      ),
      source('NASA · Europa Clipper', nasa('europa-clipper')),
    ],
  },
  {
    id: 'psyche',
    name: 'Psyche',
    agencies: ['NASA'],
    launchDate: '2023-10-13',
    expectedArrival: {
      date: '2029-08',
      description: '(16) Psyche · orbit insertion',
      sourceUrl: nasa('psyche'),
    },
    status: 'cruise',
    statusDate: '2026-07-17',
    phase: 'After the Mars flyby, en route to asteroid Psyche',
    region: 'small-bodies',
    targetBodyId: 'sun',
    primaryTarget: '(16) Psyche',
    statusNote:
      "NASA's July update confirms the 15 May 2026 Mars flyby; asteroid arrival is planned for 2029.",
    description:
      'An electrically propelled spacecraft will explore a metal-rich asteroid in the main belt.',
    science:
      'Test whether Psyche exposes the remains of an ancient planetary core or formed through another process.',
    instruments: [
      'Multispectral imager',
      'Gamma-ray and neutron spectrometer',
      'Magnetometer',
    ],
    findings: [],
    events: [
      event(
        '2026-05-15',
        'Mars gravity assist',
        'https://science.nasa.gov/blogs/psyche/2026/07/17/nasas-psyche-mission-delivers-mars-flyby-data-time-lapse-video/',
      ),
      event(
        '2029-08',
        'Planned rendezvous with Psyche',
        nasa('psyche'),
        'planned',
      ),
    ],
    sourceUrl: nasa('psyche'),
    sources: [
      source('NASA · mission', nasa('psyche')),
      source(
        'NASA · Mars flyby',
        'https://science.nasa.gov/blogs/psyche/2026/07/17/nasas-psyche-mission-delivers-mars-flyby-data-time-lapse-video/',
      ),
    ],
  },
  {
    id: 'lucy',
    name: 'Lucy',
    agencies: ['NASA'],
    launchDate: '2021-10-16',
    expectedArrival: {
      date: '2027-08',
      description: 'Eurybates and Queta · first Trojan flybys',
      sourceUrl: nasa('lucy'),
    },
    status: 'cruise',
    statusDate: '2025-04-20',
    phase: "Cruise to Jupiter's Trojan asteroids",
    region: 'small-bodies',
    targetBodyId: 'sun',
    primaryTarget: 'Trojan asteroids',
    statusNote:
      "NASA's mission profile confirms the April 2025 Donaldjohanson flyby and describes preparations for the Trojan encounters.",
    description:
      'Lucy makes a series of flybys of small bodies that preserve evidence of planetary formation.',
    science:
      'Compare Trojan geology, colours and multiple-body systems to test scenarios for the migration of the giant planets.',
    instruments: [
      'L’LORRI · camera',
      'L’Ralph · imaging and spectroscopy',
      'L’TES · thermal infrared',
    ],
    findings: [
      finding(
        'The Dinkinesh flyby revealed Selam, a satellite made of two lobes in contact.',
        nasa('lucy'),
      ),
    ],
    events: [
      event('2025-04-20', 'Donaldjohanson flyby', nasa('lucy')),
      event('2027-08', 'First Trojan encounters', nasa('lucy'), 'planned'),
    ],
    sourceUrl: nasa('lucy'),
    sources: [source('NASA · trajectory and discoveries', nasa('lucy'))],
  },
  {
    id: 'hera',
    name: 'Hera',
    agencies: ['ESA'],
    launchDate: '2024-10-07',
    expectedArrival: {
      date: '2026-11',
      description: 'Didymos and Dimorphos · rendezvous',
      sourceUrl:
        'https://www.esa.int/Space_Safety/Hera/A_hitchhiker_s_guide_to_Hera_s_target_asteroids',
    },
    status: 'cruise',
    statusDate: '2026-03-17',
    phase: 'Rendezvous with Didymos and Dimorphos',
    region: 'small-bodies',
    targetBodyId: 'sun',
    primaryTarget: 'Didymos / Dimorphos',
    statusNote:
      "ESA's 17 March release confirms the February–March 2026 manoeuvre that put Hera on course for Didymos.",
    description:
      'Hera and two accompanying CubeSats will examine the asteroid system struck by DART.',
    science:
      'Measure mass, structure and impact effects to turn an asteroid-deflection demonstration into a planetary-defence method.',
    instruments: [
      'AFC · cameras',
      'TIRI · infrared',
      'PALT · altimeter',
      'Juventas and Milani CubeSats',
    ],
    findings: [],
    events: [
      event(
        '2026-11',
        'Planned arrival at the Didymos system',
        'https://www.esa.int/Space_Safety/Hera/A_hitchhiker_s_guide_to_Hera_s_target_asteroids',
        'planned',
      ),
    ],
    sourceUrl: 'https://www.esa.int/Space_Safety/Hera/Hera_mission_overview',
    sources: [
      source(
        'ESA · Hera mission',
        'https://www.esa.int/Space_Safety/Hera/Hera_mission_overview',
      ),
      source(
        'ESA · 2026 manoeuvre',
        'https://www.esa.int/Space_in_Member_States/Germany/Hera_auf_Kurs_zum_Rendezvous_mit_ihrem_Asteroiden',
      ),
      source(
        'ESA · planned arrival, September 2026',
        'https://www.esa.int/Space_Safety/Hera/A_hitchhiker_s_guide_to_Hera_s_target_asteroids',
      ),
    ],
  },
  {
    id: 'osiris-apex',
    name: 'OSIRIS-APEX',
    agencies: ['NASA'],
    launchDate: '2016-09-08',
    expectedArrival: {
      date: '2029-06',
      description: 'Apophis · rendezvous',
      sourceUrl: nasa('osiris-apex'),
    },
    status: 'cruise',
    statusDate: '2023-09-24',
    phase: 'Cruise to Apophis; Bennu samples under study on Earth',
    region: 'small-bodies',
    targetBodyId: 'sun',
    primaryTarget: 'Apophis / Bennu sample science',
    statusNote:
      "The former OSIRIS-REx continues toward Apophis after delivering its capsule in 2023. NASA's mission profile gives an arrival in 2029.",
    description:
      'The spacecraft returned samples from Bennu and will study Apophis after its close approach to Earth.',
    science:
      "Observe the effects of Earth's tides on Apophis and investigate primitive materials through the Bennu samples.",
    instruments: [
      'OCAMS · cameras',
      'OVIRS / OTES · spectrometers',
      'OLA · laser altimeter',
    ],
    findings: [
      finding(
        'The Bennu samples contain amino acids and all five nucleobases; this is not a detection of life.',
        'https://ntrs.nasa.gov/api/citations/20250010870/downloads/GlavinPrebioticSTI.pdf',
      ),
    ],
    events: [
      event(
        '2023-09-24',
        'Bennu capsule delivered to Earth',
        nasa('osiris-rex'),
      ),
      event(
        '2029-06',
        'Planned Apophis encounter',
        nasa('osiris-apex'),
        'planned',
      ),
    ],
    sourceUrl: nasa('osiris-apex'),
    sources: [
      source('NASA · OSIRIS-APEX', nasa('osiris-apex')),
      source('NASA · Bennu sample return', nasa('osiris-rex')),
      source(
        'Scientific publication · organic compounds in Bennu samples',
        'https://ntrs.nasa.gov/api/citations/20250010870/downloads/GlavinPrebioticSTI.pdf',
      ),
    ],
  },
  {
    id: 'hayabusa2',
    name: 'Hayabusa2',
    agencies: ['JAXA'],
    launchDate: '2014-12-03',
    expectedArrival: {
      date: '2031-07',
      description: '1998 KY26 · extended-mission rendezvous',
      sourceUrl:
        'https://www.hayabusa2.jaxa.jp/en/topics/2026_TorifuneCamp2s_e/',
    },
    status: 'cruise',
    statusDate: '2026-07-06',
    phase: 'Extended mission after the Torifune flyby',
    region: 'small-bodies',
    targetBodyId: 'sun',
    primaryTarget: 'Small asteroids / Ryugu samples',
    statusNote:
      'JAXA confirms the 5 July 2026 Torifune flyby and normal spacecraft operation after the encounter.',
    description:
      'After returning grains from Ryugu, Hayabusa2 continues toward other small asteroids.',
    science:
      "Compare Ryugu's primitive materials with other small bodies and study rapidly rotating asteroids.",
    instruments: [
      'ONC · cameras',
      'NIRS3 · infrared',
      'TIR · thermal imaging',
      'LIDAR · distance',
    ],
    findings: [
      finding(
        'The July 2026 flyby returned images and scientific data from Torifune.',
        'https://global.jaxa.jp/press/2026/07/20260706-3_e.html',
      ),
      finding(
        'The Ryugu capsule returned to Earth in December 2020; the samples are available for laboratory analysis.',
        'https://www.isas.jaxa.jp/missions/spacecraft/current/hayabusa2',
      ),
    ],
    events: [
      event(
        '2026-07-05',
        'Torifune flyby',
        'https://global.jaxa.jp/press/2026/07/20260706-3_e.html',
      ),
      event(
        '2020-12-06',
        'Ryugu sample return',
        'https://www.isas.jaxa.jp/missions/spacecraft/current/hayabusa2',
      ),
    ],
    sourceUrl: 'https://www.isas.jaxa.jp/missions/spacecraft/current/hayabusa2',
    sources: [
      source(
        'JAXA · Torifune in July 2026',
        'https://global.jaxa.jp/press/2026/07/20260706-3_e.html',
      ),
      source(
        'JAXA · current mission',
        'https://www.isas.jaxa.jp/missions/spacecraft/current/hayabusa2',
      ),
      source(
        'JAXA · extended-mission schedule',
        'https://www.hayabusa2.jaxa.jp/en/topics/2026_TorifuneCamp2s_e/',
      ),
    ],
  },
  {
    id: 'tianwen-2',
    name: 'Tianwen-2',
    agencies: ['CNSA'],
    launchDate: '2025-05-28',
    status: 'operating',
    statusDate: '2026-07-06',
    phase: 'Close reconnaissance of Kamoʻoalewa',
    region: 'small-bodies',
    targetBodyId: 'sun',
    primaryTarget: '(469219) Kamoʻoalewa / 2016 HO3',
    statusNote:
      'On 6 July 2026, CNSA announced arrival about 20 km from the asteroid and the start of scientific exploration. Launch was on 29 May in China, 28 May UTC.',
    description:
      "China's first asteroid sample-return mission, followed by a planned comet exploration phase.",
    science:
      "Measure Kamoʻoalewa's shape, composition and structure to prepare sample collection and investigate its origin.",
    instruments: [
      'Navigation and scientific imaging',
      'Spectroscopy',
      'Sample collection system',
    ],
    findings: [
      finding(
        "Close-range images reduced uncertainty in the asteroid's position from hundreds of kilometres to about a kilometre.",
        'https://www.cnsa.gov.cn/n6758823/n6758838/c10760422/content.html',
      ),
    ],
    events: [
      event(
        '2026-07-02',
        'Asteroid image obtained from about 20 km',
        'https://www.cnsa.gov.cn/n6758823/n6758838/c10760422/content.html',
      ),
    ],
    sourceUrl:
      'https://www.cnsa.gov.cn/n6758823/n6758838/c10760422/content.html',
    sources: [
      source(
        'CNSA · July 2026 rendezvous',
        'https://www.cnsa.gov.cn/n6758823/n6758838/c10760422/content.html',
      ),
    ],
  },
  ...(['blue', 'gold'] as const).map((vehicle): Mission => ({
    id: `escapade-${vehicle}`,
    name: `ESCAPADE · ${vehicle === 'blue' ? 'Blue' : 'Gold'}`,
    agencies: ['NASA', 'UC Berkeley'],
    launchDate: '2025-11-13',
    expectedArrival: {
      date: '2027-09',
      description: 'Mars · orbit insertion',
      sourceUrl: 'https://escapade.ssl.berkeley.edu/mission-design/',
    },
    status: 'cruise',
    statusDate: '2026-01-07',
    phase: 'Loitering near Earth before departure for Mars',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: "Mars's magnetosphere and atmospheric escape",
    statusNote:
      'In January 2026, NASA confirmed trajectory corrections for both spacecraft. Interplanetary departure is planned for November 2026; they are not yet in Mars orbit.',
    description:
      'Blue and Gold will observe the Martian environment simultaneously from two positions.',
    science:
      "Distinguish changes over time from changes across space, then quantify the solar wind's effect on atmospheric loss at Mars.",
    instruments: [
      'Magnetometer',
      'Ion and electron analysers',
      'Langmuir probe',
    ],
    findings: [],
    events: [
      event(
        '2026-11',
        'Earth gravity assist and departure for Mars',
        'https://escapade.ssl.berkeley.edu/mission-design/',
        'planned',
      ),
      event(
        '2027-09',
        'Planned Mars arrival',
        'https://ciencia.nasa.gov/sistema-solar/mision-escapade-de-la-nasa-esta-lista-para-estudiar-la-meteorologia-espacial-desde-la-tierra-hasta-marte/',
        'planned',
      ),
    ],
    sourceUrl:
      'https://www.nasa.gov/news-release/nasa-blue-origin-launch-two-spacecraft-to-study-mars-solar-wind/',
    sources: [
      source(
        'NASA · launch of both spacecraft',
        'https://www.nasa.gov/news-release/nasa-blue-origin-launch-two-spacecraft-to-study-mars-solar-wind/',
      ),
      source(
        'NASA · manoeuvre updates',
        'https://science.nasa.gov/blogs/escapade/',
      ),
      source(
        'UC Berkeley · flight plan',
        'https://escapade.ssl.berkeley.edu/mission-design/',
      ),
      source(
        'NASA · planned schedule',
        'https://ciencia.nasa.gov/sistema-solar/mision-escapade-de-la-nasa-esta-lista-para-estudiar-la-meteorologia-espacial-desde-la-tierra-hasta-marte/',
      ),
    ],
  })),
  {
    id: 'new-horizons',
    name: 'New Horizons',
    agencies: ['NASA'],
    launchDate: '2006-01-19',
    status: 'operating',
    statusDate: '2026-06-23',
    phase: 'Kuiper Belt and distant heliosphere',
    region: 'outer',
    targetBodyId: 'sun',
    primaryTarget: 'Kuiper Belt',
    statusNote:
      'A healthy wake-up was confirmed on 23 June 2026 after 321 days of hibernation; long periods of dormancy are part of the mission.',
    description:
      "After Pluto and Arrokoth, the spacecraft explores the Sun's distant environment.",
    science:
      'Study primitive small bodies, dust and plasma at the edge of the planetary system.',
    instruments: [
      'LORRI · camera',
      'Ralph · spectrometer',
      'Alice · ultraviolet',
      'SWAP / PEPSSI · particles',
      'SDC · dust',
    ],
    findings: [
      finding(
        'Pluto has complex geology; the Arrokoth flyby revealed a two-lobed small body that provides evidence about planetesimal assembly.',
        nasa('new-horizons'),
      ),
    ],
    events: [event('2019-01-01', 'Arrokoth flyby', nasa('new-horizons'))],
    sourceUrl: nasa('new-horizons'),
    sources: [
      source('NASA · mission and discoveries', nasa('new-horizons')),
      source(
        'NASA · June 2026 wake-up',
        'https://science.nasa.gov/missions/new-horizons/nasas-new-horizons-spacecraft-wakes-from-hibernation-in-good-health/',
      ),
    ],
  },
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    agencies: ['NASA'],
    launchDate: '1977-09-05',
    status: 'operating',
    statusDate: '2026-04-17',
    phase: 'Measurements in interstellar space',
    region: 'outer',
    targetBodyId: 'sun',
    primaryTarget: 'Beyond the heliopause',
    statusNote:
      'NASA announced the planned shutdown of LECP on 17 April 2026 to conserve energy. The number of operating instruments decreases as available power falls.',
    description:
      'The most distant human-made object measures interstellar space after crossing the heliopause in 2012.',
    science:
      'Directly sample fields and plasma outside the bubble dominated by the solar wind.',
    instruments: ['MAG · magnetometer', 'PWS · plasma waves'],
    findings: [
      finding(
        'Crossing the heliopause provided the first direct measurements of this boundary and the medium beyond it.',
        nasa('voyager'),
      ),
    ],
    events: [event('2012-08-25', 'Heliopause crossing', nasa('voyager'))],
    sourceUrl: nasa('voyager'),
    sources: [
      source('NASA · Voyager programme', nasa('voyager')),
      source(
        'JPL · power conservation in 2026',
        'https://www.jpl.nasa.gov/news/nasa-shuts-off-instrument-on-voyager-1-to-keep-spacecraft-operating/',
      ),
    ],
  },
  {
    id: 'voyager-2',
    name: 'Voyager 2',
    agencies: ['NASA'],
    launchDate: '1977-08-20',
    status: 'operating',
    statusDate: '2026-08-04',
    phase: 'Measurements in interstellar space',
    region: 'outer',
    targetBodyId: 'sun',
    primaryTarget: 'Beyond the heliopause',
    statusNote:
      "NASA's August 2026 update reports that three scientific instruments can continue operating following further power savings.",
    description:
      'The only spacecraft to fly past Uranus and Neptune, Voyager 2 continues its journey after crossing the heliopause in 2018.',
    science:
      'Compare two widely separated heliopause crossings and monitor interactions between the Sun and the interstellar medium.',
    instruments: [
      'MAG · magnetometer',
      'PWS · plasma waves',
      'CRS · cosmic rays',
    ],
    findings: [
      finding(
        "The flybys revealed the rings, moons and magnetospheres of Uranus and Neptune; the second heliopause crossing complements Voyager 1's measurements.",
        nasa('voyager'),
      ),
    ],
    events: [event('2018-11-05', 'Heliopause crossing', nasa('voyager'))],
    sourceUrl: nasa('voyager'),
    sources: [
      source('NASA · Voyager programme', nasa('voyager')),
      source(
        'JPL · instruments in August 2026',
        'https://www.jpl.nasa.gov/news/nasa-engineers-help-prolong-voyager-2s-science-mission/',
      ),
    ],
  },
  {
    id: 'juno',
    name: 'Juno',
    agencies: ['NASA'],
    launchDate: '2011-08-05',
    status: 'operating',
    statusDate: '2026-05-05',
    phase: 'Polar orbit around Jupiter',
    region: 'jupiter',
    targetBodyId: 'jupiter',
    primaryTarget: 'Jupiter and its moons',
    statusNote:
      'NASA published an image acquired on 1 May 2026, confirming operations beyond the former September 2025 end date still shown on some overview pages.',
    description:
      "Juno regularly passes close above Jupiter's clouds and also observes its moons.",
    science:
      "Probe the giant planet's interior, storms and magnetic field to understand its formation.",
    instruments: [
      'MWR · microwave radiometer',
      'JunoCam · camera',
      'JIRAM · infrared',
      'MAG · magnetometer',
    ],
    findings: [
      finding(
        "The mission revealed networks of polar cyclones and the depth of Jupiter's winds; flybys also document volcanism on Io.",
        nasa('juno'),
      ),
    ],
    events: [
      event(
        '2026-05-01',
        'Close observation of the moon Thebe',
        'https://science.nasa.gov/mission/juno/stories/',
      ),
    ],
    sourceUrl: nasa('juno'),
    sources: [
      source('NASA · objectives and results', nasa('juno')),
      source(
        'NASA · dated 2026 observations',
        'https://science.nasa.gov/mission/juno/stories/',
      ),
    ],
  },
  {
    id: 'mars-odyssey',
    name: '2001 Mars Odyssey',
    agencies: ['NASA'],
    launchDate: '2001-04-07',
    status: 'operating',
    statusDate: '2026-04-07',
    phase: 'Thermal mapping and Mars communications relay',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: "Mars's surface and atmosphere",
    statusNote:
      "NASA's page marks 25 years since launch and lists the mission as active; the anniversary is not a daily health measurement.",
    description:
      'The oldest Mars orbiter still in operation observes rocks, clouds and ice while relaying rover communications.',
    science:
      'Map composition and thermal properties and monitor seasonal changes.',
    instruments: [
      'THEMIS · thermal camera',
      'GRS · gamma-ray measurement archive',
    ],
    findings: [
      finding(
        'Odyssey produced a global map of elements and minerals and identified large hydrogen reservoirs associated with subsurface ice.',
        nasa('odyssey'),
      ),
    ],
    events: [event('2001-10-24', 'Mars orbit insertion', nasa('odyssey'))],
    sourceUrl: nasa('odyssey'),
    sources: [
      source('NASA · active mission and 25-year review', nasa('odyssey')),
    ],
  },
  {
    id: 'mars-reconnaissance-orbiter',
    name: 'Mars Reconnaissance Orbiter',
    agencies: ['NASA'],
    launchDate: '2005-08-12',
    status: 'operating',
    statusDate: '2026-06-13',
    phase: 'High-resolution imaging and rover relay',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: "Mars's surface, subsurface and climate",
    statusNote:
      'A NASA observation from 13 June 2026 shows Perseverance from orbit. Not all original instruments are necessarily still in use.',
    description:
      'MRO images Martian landscapes at high resolution and carries a large share of scientific communications.',
    science:
      'Reconstruct the history of water and compare surface changes over the years.',
    instruments: [
      'HiRISE · high-resolution imaging',
      'CTX · context imaging',
      'SHARAD · radar',
      'MCS · atmosphere',
    ],
    findings: [
      finding(
        'Observations track new impacts, ice and water-related mineral deposits while guiding surface exploration.',
        nasa('mars-reconnaissance-orbiter'),
      ),
    ],
    events: [
      event(
        '2006-03-10',
        'Arrival in Mars orbit',
        nasa('mars-reconnaissance-orbiter'),
      ),
    ],
    sourceUrl: nasa('mars-reconnaissance-orbiter'),
    sources: [
      source('NASA · MRO', nasa('mars-reconnaissance-orbiter')),
      source(
        'NASA · recent observations',
        'https://science.nasa.gov/mission/mars-reconnaissance-orbiter/stories/',
      ),
    ],
  },
  {
    id: 'mars-express',
    name: 'Mars Express',
    agencies: ['ESA'],
    launchDate: '2003-06-02',
    status: 'operating',
    statusDate: '2026-09-16',
    phase: 'Martian atmosphere, geology and subsurface',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: 'Mars and Phobos',
    statusNote:
      "ESA's page lists the mission as operational and publishes new images in September 2026.",
    description:
      'The first European orbiter around Mars provides a global, three-dimensional view of the planet.',
    science:
      'Reconstruct the history of water, map minerals and probe buried ice.',
    instruments: [
      'HRSC · stereo camera',
      'MARSIS · radar',
      'OMEGA · mineralogy',
      'SPICAM · atmosphere',
    ],
    findings: [
      finding(
        'Its mineral and elevation maps document a once-wetter planet and potentially habitable environments.',
        'https://www.esa.int/Science_Exploration/Space_Science/Mars_Express',
      ),
    ],
    events: [
      event(
        '2003-12-25',
        'Mars orbit insertion',
        'https://www.esa.int/Science_Exploration/Space_Science/Mars_Express',
      ),
    ],
    sourceUrl:
      'https://www.esa.int/Science_Exploration/Space_Science/Mars_Express',
    sources: [
      source(
        'ESA · Mars Express status and results',
        'https://www.esa.int/Science_Exploration/Space_Science/Mars_Express',
      ),
    ],
  },
  {
    id: 'trace-gas-orbiter',
    name: 'ExoMars Trace Gas Orbiter',
    agencies: ['ESA', 'Roscosmos'],
    launchDate: '2016-03-14',
    status: 'operating',
    statusDate: '2026-03-05',
    phase: 'Trace gases in the Martian atmosphere and communications relay',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: "Mars's atmosphere",
    statusNote:
      'ESA describes joint observations with Mars Express in March 2026. Roscosmos is a historical partner in the mission launched in 2016.',
    description:
      'TGO searches for gases present in very small quantities and observes the circulation of atmospheric water.',
    science:
      'Distinguish geological and chemical processes that alter the atmosphere; a single gas is not evidence of life.',
    instruments: [
      'NOMAD / ACS · spectrometers',
      'CaSSIS · stereo camera',
      'FREND · neutrons',
    ],
    findings: [
      finding(
        'TGO and Mars Express observations show how an unusual dust storm promotes water escape.',
        'https://blogs.esa.int/to-mars-and-back/2026/02/02/an-unusual-dust-storm-reveals-how-mars-lost-some-of-its-water/',
      ),
    ],
    events: [],
    sourceUrl:
      'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/ExoMars',
    sources: [
      source(
        'ESA · ExoMars',
        'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/ExoMars',
      ),
      source(
        'ESA · joint observations in 2026',
        'https://www.esa.int/ESA_Multimedia/Images/2026/03/Mars_Express_and_ExoMars_TGO_probe_Mars_s_atmosphere',
      ),
      source(
        'ESA · water escape',
        'https://blogs.esa.int/to-mars-and-back/2026/02/02/an-unusual-dust-storm-reveals-how-mars-lost-some-of-its-water/',
      ),
    ],
  },
  {
    id: 'hope',
    name: 'Hope · Al-Amal',
    agencies: ['UAE Space Agency', 'MBRSC'],
    launchDate: '2020-07-19',
    status: 'operating',
    statusDate: '2026-07-19',
    phase: 'Global Martian weather',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: 'Martian atmosphere and Deimos',
    statusNote:
      'In July 2026, the UAE Space Agency confirmed an extension through 2028. Launch was on 20 July in Japan, 19 July UTC.',
    description:
      'Hope observes Mars at different times of day to connect weather with gas escape to space.',
    science:
      'Understand how the lower and upper atmosphere interact across the seasons.',
    instruments: ['EXI · camera', 'EMIRS · infrared', 'EMUS · ultraviolet'],
    findings: [
      finding(
        'Observations of Deimos and Martian auroras complement global atmospheric measurements; the data are public.',
        'https://space.gov.ae/en/projects-and-initiatives/space-exploration/emirates-mars-mission',
      ),
    ],
    events: [
      event(
        '2028',
        'End of the currently announced extension',
        'https://space.gov.ae/en/media-center/news/19/7/2026/hope-probe-marks-six-years-of-scientific-leadership-in-mars-exploration',
        'planned',
      ),
    ],
    sourceUrl:
      'https://space.gov.ae/en/projects-and-initiatives/space-exploration/emirates-mars-mission',
    sources: [
      source(
        'UAE Space Agency · mission',
        'https://space.gov.ae/en/projects-and-initiatives/space-exploration/emirates-mars-mission',
      ),
      source(
        'UAE Space Agency · 2026 review',
        'https://space.gov.ae/en/media-center/news/19/7/2026/hope-probe-marks-six-years-of-scientific-leadership-in-mars-exploration',
      ),
    ],
  },
  {
    id: 'tianwen-1',
    name: 'Tianwen-1 · orbiter',
    agencies: ['CNSA'],
    launchDate: '2020-07-23',
    status: 'operating',
    statusDate: '2026-05-20',
    phase: 'Mars orbit and complementary observations',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: 'Mars',
    statusNote:
      "CNSA's May 2026 review reports that the orbiter is stable and healthy. This status applies to the orbiter, not the Zhurong rover.",
    description:
      'The Chinese orbiter has observed Mars since 2021 with instruments studying the surface and environment.',
    science:
      'Map geology, probe the subsurface and study the space environment around Mars.',
    instruments: [
      'HiRIC / MoRIC · cameras',
      'MOSIR · radar',
      'MMS · mineralogy',
      'Magnetometer and particle analysers',
    ],
    findings: [
      finding(
        'Images of interstellar comet 3I/ATLAS from Mars constrained the size and ejection of its dust.',
        'https://www.cnsa.gov.cn/n6758823/n6758838/c10749788/content.html',
      ),
    ],
    events: [
      event(
        '2021-02-10',
        'Mars orbit insertion',
        'https://www.cnsa.gov.cn/n6758823/n6758838/c10715343/content.html',
      ),
    ],
    sourceUrl:
      'https://www.cnsa.gov.cn/n6758823/n6758838/c10749788/content.html',
    sources: [
      source(
        'CNSA · May 2026 results and status',
        'https://www.cnsa.gov.cn/n6758823/n6758838/c10749788/content.html',
      ),
      source(
        'CNSA · mission in orbit',
        'https://www.cnsa.gov.cn/n6758823/n6758838/c10715343/content.html',
      ),
    ],
  },
  {
    id: 'curiosity',
    name: 'Curiosity',
    agencies: ['NASA'],
    launchDate: '2011-11-26',
    status: 'operating',
    statusDate: '2026-07-23',
    phase: 'Ascent of Mount Sharp',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: 'Gale crater',
    statusNote:
      "NASA's July 2026 operations log describes continued rock analysis and ascent.",
    description:
      'This mobile laboratory examines sedimentary layers that record ancient Martian climates.',
    science:
      'Determine whether Gale provided the chemical and environmental conditions required for microbial life.',
    instruments: [
      'SAM · chemistry',
      'CheMin · mineralogy',
      'ChemCam · laser',
      'APXS',
      'Mastcam / MAHLI',
    ],
    findings: [
      finding(
        'Gale preserves evidence of ancient habitable lake environments; habitability does not establish that life was present.',
        nasa('msl-curiosity'),
      ),
    ],
    events: [
      event('2012-08-06', 'Landing in Gale crater', nasa('msl-curiosity')),
    ],
    sourceUrl: nasa('msl-curiosity'),
    sources: [
      source('NASA · Curiosity', nasa('msl-curiosity')),
      source(
        'NASA · July 2026 operations log',
        'https://science.nasa.gov/blog/curiosity-blog-sols-4954-4960-celebrating-our-rover-engineers-past-and-present/',
      ),
    ],
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    agencies: ['NASA'],
    launchDate: '2020-07-30',
    status: 'operating',
    statusDate: '2026-09-21',
    phase: 'Jezero geology and sample collection',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: 'Jezero and its surroundings',
    statusNote:
      "NASA's September 2026 publication presents new results and describes ongoing rock collection.",
    description:
      'Perseverance investigates ancient environments and stores rock cores in tubes.',
    science:
      'Reconstruct past water activity and habitability; potential biosignatures require confirmation and do not prove Martian life.',
    instruments: [
      'SuperCam · remote analysis',
      'PIXL / SHERLOC · chemistry',
      'Mastcam-Z',
      'RIMFAX · radar',
    ],
    findings: [
      finding(
        "The study of Jezero's inner rim reveals a history of water more complex than deposition in a single ancient lake.",
        'https://www.nasa.gov/solar-system/planets/mars/nasa-discovery-reveals-complex-water-systems-on-early-mars/',
      ),
    ],
    events: [
      event('2021-02-18', 'Landing in Jezero', nasa('mars-2020-perseverance')),
    ],
    sourceUrl: nasa('mars-2020-perseverance'),
    sources: [
      source('NASA · Perseverance', nasa('mars-2020-perseverance')),
      source(
        'NASA · September 2026 results',
        'https://www.nasa.gov/solar-system/planets/mars/nasa-discovery-reveals-complex-water-systems-on-early-mars/',
      ),
    ],
  },
  {
    id: 'lro',
    name: 'Lunar Reconnaissance Orbiter',
    agencies: ['NASA'],
    launchDate: '2009-06-18',
    status: 'operating',
    statusDate: '2026-08-18',
    phase: 'Lunar mapping',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Moon',
    statusNote:
      'In August 2026, NASA published images acquired on 11–12 August. The Moon is grouped with Earth in this Solar System view.',
    description:
      'LRO measures lunar topography, temperatures and surface properties with high precision.',
    science:
      "Understand the Moon's evolution, identify cold regions and assess future exploration sites.",
    instruments: [
      'LROC · cameras',
      'LOLA · altimeter',
      'Diviner · thermal measurements',
      'LEND · neutrons',
      'Mini-RF · radar',
    ],
    findings: [
      finding(
        'Comparing images before and after impacts tracks new craters and ongoing changes to the lunar surface.',
        'https://science.nasa.gov/solar-system/moon/nasas-lro-images-falcon-9-crater-on-moon-learns-new-details/',
      ),
    ],
    events: [],
    sourceUrl: nasa('lro'),
    sources: [
      source('NASA · LRO', nasa('lro')),
      source(
        'NASA · August 2026 observations',
        'https://science.nasa.gov/solar-system/moon/nasas-lro-images-falcon-9-crater-on-moon-learns-new-details/',
      ),
    ],
  },
  {
    id: 'chandrayaan-2',
    name: 'Chandrayaan-2 · orbiter',
    agencies: ['ISRO'],
    launchDate: '2019-07-22',
    status: 'operating',
    statusDate: '2026-04-28',
    phase: 'Lunar polar mapping',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Moon',
    statusNote:
      "ISRO's 2025–2026 report confirms orbiter observations. The 2019 lander is not an active spacecraft.",
    description:
      'The Indian orbiter measures lunar mineralogy, topography and polar regions.',
    science:
      'Refine the distribution of water and minerals and determine the properties of polar soils.',
    instruments: [
      'DFSAR · radar',
      'IIRS · infrared spectrometer',
      'OHRC / TMC-2 · cameras',
      'CLASS · X-rays',
    ],
    findings: [
      finding(
        'Radar observations map the polar regions; radio occultations provide information on lunar and solar plasma.',
        'https://www.isro.gov.in/media_isro/pdf/AnnualReport/Annual_Report_2025-26_EN_28042026.pdf',
      ),
    ],
    events: [],
    sourceUrl: 'https://www.isro.gov.in/Chandrayaan2_science.html',
    sources: [
      source(
        'ISRO · Chandrayaan-2 science',
        'https://www.isro.gov.in/Chandrayaan2_science.html',
      ),
      source(
        'ISRO · 2025–2026 report',
        'https://www.isro.gov.in/media_isro/pdf/AnnualReport/Annual_Report_2025-26_EN_28042026.pdf',
      ),
      source(
        'ISRO · fleet status',
        'https://www.isro.gov.in/SpacecraftMissions.html',
      ),
    ],
  },
  {
    id: 'danuri',
    name: 'Danuri · KPLO',
    agencies: ['KARI', 'KASA', 'NASA'],
    launchDate: '2022-08-04',
    status: 'operating',
    statusDate: '2025-02-10',
    phase: 'Lunar polar orbit',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Moon and polar craters',
    statusNote:
      'KASA announced a two-year extension through 2027 following an assessment of spacecraft health and fuel.',
    description:
      "South Korea's first lunar explorer, Danuri maps areas including permanently shadowed regions.",
    science:
      'Study surface materials, magnetism and polar regions to prepare future lunar exploration.',
    instruments: [
      'ShadowCam · polar shadows',
      'LUTI · imaging',
      'PolCam · polarimetry',
      'KMAG · magnetometer',
      'KGRS · gamma',
    ],
    findings: [],
    events: [
      event(
        '2027',
        'End of the currently announced extension',
        'https://www.kasa.go.kr/prog/bbsArticle/BBSMSTR_000000000041/view.do?bbsId=BBSMSTR_000000000041&nttId=B000000001477Mo2jQ6',
        'planned',
      ),
    ],
    sourceUrl:
      'https://www.kasa.go.kr/prog/bbsArticle/BBSMSTR_000000000041/view.do?bbsId=BBSMSTR_000000000041&nttId=B000000001477Mo2jQ6',
    sources: [
      source(
        'KASA · Danuri extension',
        'https://www.kasa.go.kr/prog/bbsArticle/BBSMSTR_000000000041/view.do?bbsId=BBSMSTR_000000000041&nttId=B000000001477Mo2jQ6',
      ),
      source(
        'KARI · annual report',
        'https://www.kari.re.kr/download/viewer/1771839469286/index.html',
      ),
    ],
  },
  {
    id: 'capstone',
    name: 'CAPSTONE',
    agencies: ['Advanced Space', 'NASA'],
    launchDate: '2022-06-28',
    status: 'operating',
    statusDate: '2026-06-26',
    phase: 'Cislunar navigation demonstration',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Near-rectilinear halo orbit around the Moon',
    statusNote:
      'NASA concluded its participation in June 2026 after meeting the objectives. The same release states that the spacecraft will continue demonstrations; their duration is not guaranteed.',
    description:
      'This small satellite tests a highly elongated lunar orbit and autonomous navigation techniques.',
    science:
      'Reduce risk for future lunar missions; its main contribution is technological.',
    instruments: [
      'CAPS · autonomous navigation',
      'Inter-satellite navigation radio',
    ],
    findings: [
      finding(
        'CAPSTONE validated insertion into a cislunar near-rectilinear halo orbit and demonstrated autonomous navigation.',
        'https://www.nasa.gov/smallspacecraft/capstone/',
      ),
    ],
    events: [],
    sourceUrl: 'https://www.nasa.gov/smallspacecraft/capstone/',
    sources: [
      source(
        'NASA · June 2026 status and results',
        'https://www.nasa.gov/smallspacecraft/capstone/',
      ),
    ],
  },
  {
    id: 'queqiao-2',
    name: 'Queqiao-2',
    agencies: ['CNSA', 'CAS'],
    launchDate: '2024-03-20',
    status: 'uncertain',
    statusDate: '2024-07-10',
    phase: 'Lunar relay and scientific experiments',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Moon and Earth–Moon environment',
    statusNote:
      'The July 2024 CAS source confirms the Chang’e-6 relay and describes planned extended operations. No September 2026 health report has been verified for this catalogue.',
    description:
      'Queqiao-2 links Earth with far-side missions and carries three scientific experiments.',
    science:
      "Support lunar explorers and observe Earth's magnetic environment from a distant viewpoint.",
    instruments: [
      'Extreme-ultraviolet camera',
      'Neutral-atom imager',
      'LOVEX · Earth–Moon interferometry',
    ],
    findings: [],
    events: [],
    sourceUrl:
      'https://english.cas.cn/newsroom/news--archives/2024/cas-in-media/202407/t20240710_1129710.shtml',
    sources: [
      source(
        'CAS · Queqiao-2 operations and instruments',
        'https://english.cas.cn/newsroom/news--archives/2024/cas-in-media/202407/t20240710_1129710.shtml',
      ),
    ],
  },
  {
    id: 'change-4',
    name: 'Chang’e-4 · Yutu-2',
    agencies: ['CNSA'],
    launchDate: '2018-12-07',
    status: 'uncertain',
    statusDate: '2024-01-26',
    phase: 'Far-side exploration · activity unconfirmed',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Von Kármán crater',
    statusNote:
      'This entry groups the lander and rover together. The CNSA source documents results but does not establish their activity in September 2026.',
    description:
      "The first mission to land on the Moon's far side, with a scientific rover and lander.",
    science:
      'Study materials and subsurface structure in the South Pole–Aitken basin, as well as radiation at the surface.',
    instruments: [
      'Ground-penetrating radar',
      'Visible and near-infrared spectrometer',
      'LND · radiation',
      'ASAN · neutral atoms',
    ],
    findings: [
      finding(
        'Radiation measurements on the lunar surface provide a reference for future human exploration.',
        'https://www.cnsa.gov.cn/n6758823/n6758838/c10467940/content.html',
      ),
    ],
    events: [
      event(
        '2019-01-03',
        'First soft landing on the far side',
        'https://www.cnsa.gov.cn/english/n6465719/c6805233/content.html',
      ),
    ],
    sourceUrl: 'https://www.cnsa.gov.cn/english/n6465719/c6805233/content.html',
    sources: [
      source(
        'CNSA · Chang’e-4 mission',
        'https://www.cnsa.gov.cn/english/n6465719/c6805233/content.html',
      ),
      source(
        'CNSA · 2024 science review',
        'https://www.cnsa.gov.cn/n6758823/n6758838/c10467940/content.html',
      ),
    ],
  },
  ...[
    {
      id: 'soho',
      name: 'SOHO',
      agencies: ['ESA', 'NASA'],
      launchDate: '1995-12-02',
      primaryTarget: 'Solar observations from L1',
      description:
        'SOHO observes the corona, the solar interior and the solar wind from near L1.',
      science:
        'Connect internal structures, magnetism and coronal ejections over multiple solar cycles.',
      instruments: [
        'LASCO · coronagraphs',
        'CELIAS · particles',
        'EIT · ultraviolet',
      ],
      findings: [
        finding(
          'SOHO enabled the discovery of more than 5,000 comets and located sources of the fast solar wind near the poles.',
          'https://science.nasa.gov/mission/soho/',
        ),
      ],
      sourceUrl: nasa('soho'),
    },
    {
      id: 'stereo-a',
      name: 'STEREO-A',
      agencies: ['NASA'],
      launchDate: '2006-10-26',
      primaryTarget: 'Solar observations from a heliocentric orbit',
      description:
        "STEREO-A observes the Sun from a position different from Earth's. STEREO-B is no longer active.",
      science:
        'Track the propagation of coronal mass ejections in three dimensions using coordinated observations.',
      instruments: [
        'SECCHI · imaging',
        'IMPACT · particles and field',
        'PLASTIC · plasma',
      ],
      findings: [
        finding(
          'In 2011, the two STEREO spacecraft provided the first simultaneous images of the entire Sun, including the far side as seen from Earth.',
          'https://apod.nasa.gov/apod/ap110207.html',
        ),
      ],
      sourceUrl: nasa('stereo'),
    },
    {
      id: 'ace',
      name: 'ACE',
      agencies: ['NASA'],
      launchDate: '1997-08-25',
      primaryTarget: 'Solar wind near L1',
      description:
        'Advanced Composition Explorer analyses particles from the solar wind and cosmic rays.',
      science:
        'Compare particle origins and acceleration mechanisms and provide measurements upstream of Earth.',
      instruments: [
        'MAG · magnetometer',
        'SWEPAM · solar wind',
        'SIS / CRIS · composition',
      ],
      findings: [
        finding(
          'Isotopes measured by ACE link some cosmic rays to nearby regions where massive stars form and explode.',
          'https://www.nasa.gov/news-release/microscopic-timers-reveal-likely-source-of-galactic-space-radiation/',
        ),
      ],
      sourceUrl: nasa('ace'),
    },
    {
      id: 'wind',
      name: 'Wind',
      agencies: ['NASA'],
      launchDate: '1994-11-01',
      primaryTarget: 'Interplanetary plasma near L1',
      description:
        "Wind measures plasma particles and waves before they interact with Earth's magnetosphere.",
      science:
        'Understand turbulence, shocks and energy transfer in a natural plasma.',
      instruments: [
        'SWE · plasma',
        'MFI · magnetic field',
        'WAVES · radio and plasma waves',
      ],
      findings: [
        finding(
          'Wind observed magnetic reconnection without particle collisions, helping explain rapid energy transfer.',
          'https://www.nasa.gov/science-research/25-years-of-science-in-the-solar-wind/',
        ),
      ],
      sourceUrl: nasa('wind'),
    },
    {
      id: 'dscovr',
      name: 'DSCOVR',
      agencies: ['NOAA', 'NASA', 'USAF'],
      launchDate: '2015-02-11',
      primaryTarget: 'Solar wind and Earth observations from L1',
      description:
        "DSCOVR measures the solar wind and images Earth's illuminated disk.",
      science:
        "Contribute to geomagnetic-storm warnings and studies of Earth's radiation budget.",
      instruments: [
        'Faraday Cup · solar wind',
        'Magnetometer',
        'EPIC · Earth camera',
        'NISTAR · radiometer',
      ],
      findings: [
        finding(
          'EPIC images captured the Moon passing in front of Earth and eclipse shadows from L1.',
          'https://science.nasa.gov/mission/dscovr/',
        ),
      ],
      sourceUrl: nasa('dscovr'),
    },
    {
      id: 'sdo',
      name: 'Solar Dynamics Observatory',
      agencies: ['NASA'],
      launchDate: '2010-02-11',
      primaryTarget: 'Solar observations from Earth orbit',
      description:
        'SDO observes the Sun almost continuously from a geosynchronous Earth orbit.',
      science:
        'Track emerging magnetic fields and the onset of eruptions through frequent imaging.',
      instruments: [
        'AIA · UV imaging',
        'HMI · magnetism and helioseismology',
        'EVE · UV radiation',
      ],
      findings: [
        finding(
          'A 2026 study using SDO shows that long-lived active regions produce a disproportionate share of eruptions, a result relevant to forecasting.',
          'https://science.nasa.gov/get-involved/citizen-science/volunteers-find-oddly-high-solar-flare-rates/',
        ),
      ],
      sourceUrl: nasa('sdo'),
    },
    {
      id: 'hinode',
      name: 'Hinode',
      agencies: ['JAXA', 'NASA', 'ESA'],
      launchDate: '2006-09-22',
      primaryTarget: 'Solar observations from Earth orbit',
      description:
        'Hinode connects magnetic fields at the solar surface with the structure of the corona.',
      science:
        'Understand heating in the solar atmosphere and the mechanisms behind eruptions.',
      instruments: [
        'SOT · optical telescope',
        'XRT · X-rays',
        'EIS · UV spectrometer',
      ],
      findings: [
        finding(
          'Hinode measurements, compared with Wind data, linked three energetic-particle events to their source regions on the Sun.',
          'https://www.nasa.gov/missions/hinode/in-first-scientists-trace-fastest-solar-particles-to-their-roots-on-the-sun/',
        ),
      ],
      sourceUrl: nasa('hinode'),
    },
    {
      id: 'iris',
      name: 'IRIS',
      agencies: ['NASA'],
      launchDate: '2013-06-28',
      primaryTarget: 'Lower solar atmosphere observed from Earth orbit',
      description:
        'IRIS observes the chromosphere and solar transition region from Earth orbit.',
      science:
        'Measure how matter and energy cross the interface between the solar surface and corona.',
      instruments: ['Ultraviolet spectrograph', 'Ultraviolet slit-jaw imager'],
      findings: [
        finding(
          'IRIS obtained sharp images of nanojets, providing evidence that small magnetic-reconnection events contribute to coronal heating.',
          'https://www.nasa.gov/solar-system/nasas-iris-spots-nanojets-shining-light-on-heating-the-solar-corona/',
        ),
      ],
      sourceUrl: nasa('iris'),
    },
  ].map((entry): Mission => ({
    ...entry,
    status: 'operating',
    statusDate: entry.id === 'dscovr' ? '2025-11-28' : '2026-01-26',
    statusNote:
      entry.id === 'dscovr'
        ? "NASA's page lists DSCOVR as active and was updated on 28 November 2025. This editorial date is not a September 2026 health report."
        : fleetNote,
    phase: 'Observations of the Sun and its environment',
    region: 'sun',
    targetBodyId: entry.id === 'stereo-a' ? 'sun' : 'earth',
    events: [],
    sources: [
      source('NASA · mission and instruments', entry.sourceUrl),
      ...entry.findings.map((result) =>
        source('NASA · scientific results', result.sourceUrl),
      ),
      ...(entry.id === 'dscovr'
        ? []
        : [source('NASA · January 2026 fleet', fleet)]),
    ],
  })),
  {
    id: 'aditya-l1',
    name: 'Aditya-L1',
    agencies: ['ISRO'],
    launchDate: '2023-09-02',
    status: 'operating',
    statusDate: '2026-07-16',
    phase: 'Solar observations from L1',
    region: 'sun',
    targetBodyId: 'earth',
    primaryTarget: 'Sun and solar wind',
    statusNote:
      "ISRO's July 2026 science call confirms observations and more than 30 TB of public data.",
    description:
      "India's first solar observatory, Aditya-L1 combines remote sensing with in situ measurements from L1.",
    science: 'Study coronal heating, eruptions and solar-wind acceleration.',
    instruments: [
      'VELC · coronagraph',
      'SUIT · ultraviolet',
      'SoLEXS / HEL1OS · X-rays',
      'ASPEX / PAPA · plasma',
      'MAG',
    ],
    findings: [
      finding(
        'The mission has released more than 30 TB of measurements for scientific studies of the Sun and heliosphere.',
        'https://www.isro.gov.in/AdityaL1_Mission_Announcement_of_opportunity.html',
      ),
    ],
    events: [
      event(
        '2024-01-06',
        'Insertion into orbit around L1',
        'https://www.isro.gov.in/Aditya_L1.html',
      ),
    ],
    sourceUrl: 'https://www.isro.gov.in/Aditya_L1.html',
    sources: [
      source(
        'ISRO · Aditya-L1 mission',
        'https://www.isro.gov.in/Aditya_L1.html',
      ),
      source(
        'ISRO · 2026 science campaign',
        'https://www.isro.gov.in/AdityaL1_Mission_Announcement_of_opportunity.html',
      ),
    ],
  },
  {
    id: 'proba-3',
    name: 'Proba-3',
    agencies: ['ESA'],
    launchDate: '2024-12-05',
    status: 'operating',
    statusDate: '2026-06-09',
    phase: 'Two satellites producing artificial eclipses',
    region: 'sun',
    targetBodyId: 'earth',
    primaryTarget: 'Solar corona observed from Earth orbit',
    statusNote:
      'After an anomaly in February, ESA confirmed the resumption of formation flying and observations in June 2026.',
    description:
      'One satellite blocks the Sun so that its partner can observe the corona from about 150 metres away.',
    science:
      'Observe the inner corona and demonstrate highly precise formation flying.',
    instruments: [
      'ASPIICS · coronagraph',
      'DARA · radiometer',
      'Formation-flying and metrology systems',
    ],
    findings: [
      finding(
        'The formation produced artificial eclipses and images of the corona; observations resumed after spacecraft recovery.',
        'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/We_re_back_Proba-3_ready_for_more_science',
      ),
    ],
    events: [],
    sourceUrl:
      'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Proba-3',
    sources: [
      source(
        'ESA · Proba-3 mission',
        'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Proba-3',
      ),
      source(
        'ESA · return to operations',
        'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/We_re_back_Proba-3_ready_for_more_science',
      ),
    ],
  },
  {
    id: 'imap',
    name: 'IMAP',
    agencies: ['NASA'],
    launchDate: '2025-09-24',
    status: 'operating',
    statusDate: '2026-08-07',
    phase: 'Heliosphere mapping from L1',
    region: 'sun',
    targetBodyId: 'earth',
    primaryTarget: 'Heliospheric boundary',
    statusNote:
      'NASA confirms the start of science operations on 1 February 2026 and the first release of data from seven instruments on 7 August.',
    description:
      'From L1, IMAP measures particles from the Sun and the outer heliosphere.',
    science:
      'Remotely map the solar-plasma bubble and understand particle acceleration.',
    instruments: [
      'IMAP-Lo / Hi / Ultra · neutral atoms',
      'MAG · magnetometer',
      'SWAPI / CoDICE · particles',
      'IDEX · dust',
    ],
    findings: [],
    events: [
      event(
        '2026-02-01',
        'Start of the primary science mission',
        'https://science.nasa.gov/blogs/imap/',
      ),
      event(
        '2026-08-07',
        'First data from seven instruments released',
        'https://science.nasa.gov/blogs/imap/',
      ),
    ],
    sourceUrl: nasa('imap'),
    sources: [
      source('NASA · IMAP', nasa('imap')),
      source(
        'NASA · 2026 science milestones',
        'https://science.nasa.gov/blogs/imap/',
      ),
    ],
  },
  {
    id: 'swfo-l1',
    name: 'SOLAR-1 · formerly SWFO-L1',
    agencies: ['NOAA', 'NASA'],
    launchDate: '2025-09-24',
    status: 'operating',
    statusDate: '2026-07-23',
    phase: 'Solar-wind monitoring from L1',
    region: 'sun',
    targetBodyId: 'earth',
    primaryTarget: 'Sun–Earth',
    statusNote:
      "NOAA's 23 July 2026 release confirms that CCOR-2 and the full SOLAR-1 observatory have been operational since June.",
    description:
      'An observatory dedicated to space weather, renamed SOLAR-1 after arriving at L1.',
    science:
      'Detect coronal ejections and measure the upstream solar wind to improve forecasts and protect infrastructure.',
    instruments: [
      'CCOR-2 · coronagraph',
      'MAG · magnetometer',
      'SWiPS · ions',
      'STIS · suprathermal ions',
    ],
    findings: [],
    events: [
      event(
        '2026-01-23',
        'Arrival at L1 and renaming as SOLAR-1',
        'https://www.nesdis.noaa.gov/news/swfo-l1-renamed-solar-1-reaches-final-destination-one-million-miles-earth',
      ),
    ],
    sourceUrl:
      'https://www.nesdis.noaa.gov/our-satellites/currently-flying/solar-1-launch',
    sources: [
      source(
        'NOAA · confirmation of 2026 operations',
        'https://swpc-drupal.woc.noaa.gov/news/solar-1-ccor-2-now-fully-operational-and-our-webpage',
      ),
      source(
        'NOAA · mission and current status',
        'https://www.nesdis.noaa.gov/our-satellites/currently-flying/solar-1-launch',
      ),
      source(
        'NOAA · arrival and name change',
        'https://www.nesdis.noaa.gov/news/swfo-l1-renamed-solar-1-reaches-final-destination-one-million-miles-earth',
      ),
    ],
  },
  {
    id: 'maven',
    name: 'MAVEN · archive',
    agencies: ['NASA'],
    launchDate: '2013-11-18',
    status: 'analysis',
    statusDate: '2026-06-03',
    phase: 'Mission ended; scientific archive',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: "Mars's upper atmosphere",
    statusNote:
      'NASA declared the mission ended on 3 June 2026 after signal loss on 6 December 2025. MAVEN is not counted among active spacecraft.',
    description:
      'For more than eleven years, MAVEN studied interactions between the Martian atmosphere and the Sun.',
    science:
      'Its archive helps explain how a once-wetter planet lost much of its atmosphere.',
    instruments: [
      'UV and mass spectrometers',
      'Particle analysers',
      'Magnetometer',
    ],
    findings: [
      finding(
        "MAVEN measured gas escape to space and the solar wind's role in the evolution of the Martian atmosphere.",
        'https://www.nasa.gov/news-release/nasa-says-farewell-to-maven-mars-mission-hosts-media-call-today/',
      ),
    ],
    events: [
      event(
        '2026-06-03',
        'Official end of mission',
        'https://www.nasa.gov/news-release/nasa-says-farewell-to-maven-mars-mission-hosts-media-call-today/',
      ),
    ],
    sourceUrl:
      'https://www.nasa.gov/news-release/nasa-says-farewell-to-maven-mars-mission-hosts-media-call-today/',
    sources: [
      source(
        'NASA · end of mission and review',
        'https://www.nasa.gov/news-release/nasa-says-farewell-to-maven-mars-mission-hosts-media-call-today/',
      ),
    ],
  },
  {
    id: 'akatsuki',
    name: 'Akatsuki · archive',
    agencies: ['JAXA'],
    launchDate: '2010-05-20',
    status: 'analysis',
    statusDate: '2025-09-18',
    phase: 'Mission ended; Venus climate data under analysis',
    region: 'venus',
    targetBodyId: 'venus',
    primaryTarget: "Venus's atmosphere",
    statusNote:
      'JAXA ended operations on 18 September 2025 following loss of contact in April 2024.',
    description:
      'Akatsuki observed clouds and atmospheric circulation on Venus at multiple wavelengths.',
    science:
      'Understand superrotation and compare radically different planetary climates on worlds similar in size to Earth.',
    instruments: [
      'Infrared and UV cameras',
      'Ultrastable oscillator for radio occultations',
    ],
    findings: [],
    events: [
      event(
        '2025-09-18',
        'End of operations',
        'https://cosmos.isas.jaxa.jp/?p=9368',
      ),
    ],
    sourceUrl: 'https://akatsuki.isas.jaxa.jp/en/mission/',
    sources: [
      source(
        'JAXA · mission and instruments',
        'https://akatsuki.isas.jaxa.jp/en/mission/',
      ),
      source(
        'JAXA · end of active operations at Venus',
        'https://cosmos.isas.jaxa.jp/?p=9368',
      ),
    ],
  },
  {
    id: 'insight',
    name: 'InSight · archive',
    agencies: ['NASA', 'CNES', 'DLR'],
    launchDate: '2018-05-05',
    status: 'analysis',
    statusDate: '2025-02-03',
    phase: 'Martian seismology after the end of operations',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: "Mars's interior",
    statusNote:
      'The lander has been inactive since December 2022. Results based on its data were still published in 2025; this entry does not represent an active station.',
    description: 'InSight recorded Martian vibrations from Elysium Planitia.',
    science:
      'Use quakes and impacts to measure the crust, mantle and core of another rocky planet.',
    instruments: [
      'SEIS · seismometer',
      'RISE · radio science',
      'HP³ · heat probe (unsuccessful drilling)',
    ],
    findings: [
      finding(
        "Marsquakes revealed the planet's internal structure; recent analyses connect seismic waves with meteoroid impacts.",
        'https://astrobiology.nasa.gov/missions/insight/',
      ),
    ],
    events: [event('2022-12', 'End of surface operations', nasa('insight'))],
    sourceUrl: nasa('insight'),
    sources: [
      source('NASA · InSight review', nasa('insight')),
      source(
        'NASA · research from the archive',
        'https://astrobiology.nasa.gov/missions/insight/',
      ),
    ],
  },
  {
    id: 'dart',
    name: 'DART · impact analysis',
    agencies: ['NASA', 'ASI (LICIACube)'],
    launchDate: '2021-11-24',
    status: 'analysis',
    statusDate: '2025-08-21',
    phase: 'Impact completed; deflection measurements',
    region: 'small-bodies',
    targetBodyId: 'sun',
    primaryTarget: 'Dimorphos',
    statusNote:
      'DART was deliberately destroyed on impact in 2022. Analysis of LICIACube images continues, and Hera is expected to extend the investigation on site.',
    description:
      "The first demonstration of changing an asteroid's motion through a kinetic impact.",
    science:
      'Measure deflection efficiency and the role of ejected material for planetary defence.',
    instruments: [
      'DRACO · camera',
      'LICIACube · separate observation of the impact',
    ],
    findings: [
      finding(
        "The impact shortened Dimorphos's orbital period around Didymos by about 33 minutes.",
        'https://science.nasa.gov/missions/close-up-views-of-nasas-dart-impact-to-inform-planetary-defense/',
      ),
    ],
    events: [
      event('2022-09-26', 'Deliberate impact on Dimorphos', nasa('dart')),
    ],
    sourceUrl: nasa('dart'),
    sources: [
      source('NASA · DART mission', nasa('dart')),
      source(
        'NASA / ASI · 2025 ejecta analysis',
        'https://science.nasa.gov/missions/close-up-views-of-nasas-dart-impact-to-inform-planetary-defense/',
      ),
    ],
  },
  {
    id: 'change-5',
    name: 'Chang’e-5 · samples',
    agencies: ['CNSA', 'CAS'],
    launchDate: '2020-11-23',
    status: 'analysis',
    statusDate: '2026-04-10',
    phase: 'Lunar samples studied on Earth',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Near-side samples',
    statusNote:
      'The analysis published by CAS in April 2026 concerns samples returned in 2020, not an active lander. Launch was on 24 November in China, 23 November UTC.',
    description:
      'Rocks and soils returned from Oceanus Procellarum provide a lunar geological reference.',
    science:
      'Date late volcanism and track material alteration by impacts and the solar wind.',
    instruments: [
      'Core and regolith collection',
      'Laboratory analysis on Earth',
    ],
    findings: [
      finding(
        'Nitrogen-bearing organic compounds were identified in Chang’e-5 and Chang’e-6 soils; their alteration helps explain the history of material delivered from outside the Moon.',
        'https://english.cas.cn/newsroom/research-news/202604/t20260408_1155384.shtml',
      ),
    ],
    events: [
      event(
        '2020-12-16',
        'Capsule return (UTC)',
        'https://science.nasa.gov/moon/missions/',
      ),
    ],
    sourceUrl:
      'https://english.cas.cn/newsroom/research-news/202604/t20260408_1155384.shtml',
    sources: [
      source(
        'CAS · sample research in 2026',
        'https://english.cas.cn/newsroom/research-news/202604/t20260408_1155384.shtml',
      ),
      source(
        'NASA · lunar chronology',
        'https://science.nasa.gov/moon/missions/',
      ),
    ],
  },
  {
    id: 'change-6',
    name: 'Chang’e-6 · samples',
    agencies: ['CNSA', 'CAS'],
    launchDate: '2024-05-03',
    status: 'analysis',
    statusDate: '2026-02-09',
    phase: 'First far-side samples in the laboratory',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'South Pole–Aitken basin',
    statusNote:
      'The samples have been on Earth since June 2024. The February 2026 CAS publication documents scientific analysis; it does not confirm current orbiter activity.',
    description: "The first return of material from the Moon's far side.",
    science:
      'Compare the lunar near and far sides and improve crater-based surface dating.',
    instruments: [
      'Surface sampling and drilling',
      'Isotopic and petrological analysis on Earth',
    ],
    findings: [
      finding(
        'The ages of far-side rocks provide new calibration points for lunar impact chronology.',
        'https://english.cas.cn/newsroom/research-news/202602/t20260213_1150954.shtml',
      ),
    ],
    events: [
      event(
        '2024-06-25',
        'Sample return to Earth',
        'https://english.cas.cn/bcas/2024_2/202508/P020250813589311076398.pdf',
      ),
    ],
    sourceUrl:
      'https://english.cas.cn/newsroom/research-news/202602/t20260213_1150954.shtml',
    sources: [
      source(
        'CAS · new lunar ages',
        'https://english.cas.cn/newsroom/research-news/202602/t20260213_1150954.shtml',
      ),
      source(
        'CAS · sample return',
        'https://english.cas.cn/bcas/2024_2/202508/P020250813589311076398.pdf',
      ),
    ],
  },
  {
    id: 'chandrayaan-3',
    name: 'Chandrayaan-3 · surface archive',
    agencies: ['ISRO'],
    launchDate: '2023-07-14',
    status: 'analysis',
    statusDate: '2026-07-03',
    phase: 'Vikram and Pragyan data under analysis',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Lunar south polar region',
    statusNote:
      'ISRO lists the mission as non-operational. This entry covers lander and rover data, with new results published in July 2026.',
    description:
      'Vikram and Pragyan measured the soil, its temperature and its composition near the south pole.',
    science:
      'Understand southern lunar regolith and compare these measurements with lunar meteorites studied on Earth.',
    instruments: [
      'LIBS / APXS · composition',
      'ChaSTE · temperature',
      'ILSA · vibrations',
      'RAMBHA · plasma',
    ],
    findings: [
      finding(
        'LIBS confirmed sulphur through in situ measurements in this region; this observation is not a detection of water.',
        'https://www.isro.gov.in/LIBSResults.html',
      ),
    ],
    events: [
      event(
        '2023-08-23',
        'Landing in the south polar region',
        'https://www.isro.gov.in/Chandrayaan3_Details.html',
      ),
    ],
    sourceUrl: 'https://www.isro.gov.in/Chandrayaan3_Details.html',
    sources: [
      source(
        'ISRO · Chandrayaan-3 mission',
        'https://www.isro.gov.in/Chandrayaan3_Details.html',
      ),
      source(
        'ISRO · fleet status',
        'https://www.isro.gov.in/SpacecraftMissions.html',
      ),
      source(
        'ISRO · sulphur detection',
        'https://www.isro.gov.in/LIBSResults.html',
      ),
      source(
        'ISRO · July 2026 analysis',
        'https://new1.isro.gov.in/ISRO_EN/Ch3_Alpha_Particle_X-ray_Spectrometer.html',
      ),
    ],
  },
  {
    id: 'slim',
    name: 'SLIM · archive',
    agencies: ['JAXA'],
    launchDate: '2023-09-06',
    status: 'analysis',
    statusDate: '2024-08-26',
    phase: 'Precision-landing and rock data under analysis',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Shioli crater region',
    statusNote:
      'On 26 August, JAXA announced the end of operations on 23 August 2024; its September briefing confirmed continued analysis.',
    description:
      'A small Japanese lander designed to demonstrate highly precise landing on a selected site.',
    science:
      'Reach specific geological sites and study local rocks with a multispectral camera.',
    instruments: [
      'MBC · multiband camera',
      'Visual navigation',
      'LEV-1 and LEV-2 micro-rovers',
    ],
    findings: [
      finding(
        'JAXA estimates final landing accuracy at about ten metres; ten rocks were observed in ten spectral bands and the lander survived three lunar nights.',
        'https://global.jaxa.jp/press/2024/08/20240826-1_e.html',
      ),
    ],
    events: [
      event(
        '2024-08-23',
        'End of surface operations',
        'https://global.jaxa.jp/press/2024/08/20240826-1_e.html',
      ),
    ],
    sourceUrl: 'https://global.jaxa.jp/press/2024/08/20240826-1_e.html',
    sources: [
      source(
        'JAXA · end of mission and results',
        'https://global.jaxa.jp/press/2024/08/20240826-1_e.html',
      ),
      source(
        'JAXA · post-mission analysis',
        'https://global.jaxa.jp/about/president/presslec/202409.html',
      ),
    ],
  },
  {
    id: 'blue-ghost-1',
    name: 'Blue Ghost 1 · archive',
    agencies: ['Firefly Aerospace', 'NASA', 'ASI'],
    launchDate: '2025-01-15',
    status: 'analysis',
    statusDate: '2025-03-17',
    phase: 'Lunar campaign completed; data under analysis',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Mare Crisium',
    statusNote:
      'The surface campaign ran from 2 to 16 March 2025. NASA confirms the end of operations; scientific data remain under study.',
    description:
      'A commercial lander that delivered ten scientific and technological experiments to the Moon.',
    science:
      'Study lunar soil, dust and the environment while testing navigation and exploration techniques.',
    instruments: [
      'LuGRE · GNSS navigation',
      'LISTER · heat flow',
      'SCALPSS · plume–surface interaction',
      'EDS · dust protection',
    ],
    findings: [
      finding(
        'LuGRE received and tracked Earth-based navigation signals from the lunar surface on 3 March 2025.',
        'https://www.nasa.gov/directorates/somd/space-communications-navigation-program/nasa-successfully-acquires-gps-signals-on-moon/',
      ),
    ],
    events: [
      event(
        '2025-03-16',
        'End of the surface campaign',
        'https://www.nasa.gov/news-release/nasa-firefly-invite-media-to-discuss-end-of-blue-ghost-moon-mission/',
      ),
    ],
    sourceUrl:
      'https://www.nasa.gov/news-release/nasa-firefly-invite-media-to-discuss-end-of-blue-ghost-moon-mission/',
    sources: [
      source(
        'NASA · end of Blue Ghost 1',
        'https://www.nasa.gov/news-release/nasa-firefly-invite-media-to-discuss-end-of-blue-ghost-moon-mission/',
      ),
      source(
        'NASA / ASI · navigation from the Moon',
        'https://www.nasa.gov/directorates/somd/space-communications-navigation-program/nasa-successfully-acquires-gps-signals-on-moon/',
      ),
      source(
        'NASA · continuing analysis',
        'https://science.nasa.gov/moon/missions/',
      ),
    ],
  },

  {
    id: 'themis-artemis',
    name: 'THEMIS-ARTEMIS · P1 and P2',
    agencies: ['NASA', 'UC Berkeley'],
    launchDate: '2007-02-17',
    status: 'operating',
    statusDate: '2026-01-26',
    phase: 'Two spacecraft orbiting the Moon',
    region: 'moon',
    targetBodyId: 'earth',
    primaryTarget: 'Moon–solar wind interaction',
    statusNote:
      "NASA's January 2026 fleet includes both lunar spacecraft. This robotic mission is distinct from the crewed Artemis programme.",
    description:
      "Two former THEMIS satellites were transferred into lunar orbit to study the Moon's plasma environment.",
    science:
      "Measure the solar-wind wake behind the Moon and interactions with Earth's magnetosphere.",
    instruments: [
      'Magnetometers',
      'Particle analysers',
      'Electric-field antennas',
    ],
    findings: [],
    events: [],
    sourceUrl: nasa('themis-artemis'),
    sources: [
      source('NASA · THEMIS-ARTEMIS', nasa('themis-artemis')),
      source('NASA · 2026 fleet', fleet),
    ],
  },
  {
    id: 'ibex',
    name: 'IBEX',
    agencies: ['NASA'],
    launchDate: '2008-10-19',
    status: 'operating',
    statusDate: '2026-01-26',
    phase: 'Remote mapping of solar boundaries',
    region: 'sun',
    targetBodyId: 'earth',
    primaryTarget: 'Heliopause observed from Earth orbit',
    statusNote:
      "IBEX appears in NASA's January 2026 fleet and its page lists it as active. It remains near Earth despite studying a distant region.",
    description:
      'IBEX detects neutral atoms carrying information from the heliospheric boundary.',
    science:
      "Map interactions between the solar wind and the interstellar medium, complementing the Voyagers' local measurements.",
    instruments: ['IBEX-Hi', 'IBEX-Lo'],
    findings: [
      finding(
        'IBEX revealed an unexpected ribbon of neutral-atom emission that became a major constraint on heliosphere models.',
        nasa('ibex'),
      ),
    ],
    events: [],
    sourceUrl: nasa('ibex'),
    sources: [
      source('NASA · IBEX and discoveries', nasa('ibex')),
      source('NASA · 2026 fleet', fleet),
    ],
  },
  {
    id: 'punch',
    name: 'PUNCH · four satellites',
    agencies: ['NASA'],
    launchDate: '2025-03-12',
    status: 'operating',
    statusDate: '2026-01-26',
    phase: 'Imaging the corona and solar wind',
    region: 'sun',
    targetBodyId: 'earth',
    primaryTarget: 'Inner heliosphere observed from Earth orbit',
    statusNote:
      'NASA lists PUNCH as active and includes it in the January 2026 fleet. Launch was on 11 March in the United States, 12 March UTC.',
    description:
      'Four small satellites work together as an observatory of scattered sunlight.',
    science:
      'Reconstruct the transition from the solar corona to the solar wind in three dimensions to track its propagation.',
    instruments: [
      'One Narrow Field Imager',
      'Three Wide Field Imagers',
      'Visible-light polarimetry',
    ],
    findings: [],
    events: [],
    sourceUrl: nasa('punch'),
    sources: [
      source('NASA · PUNCH constellation', nasa('punch')),
      source('NASA · 2026 fleet', fleet),
    ],
  },
  {
    id: 'zhurong',
    name: 'Zhurong · Mars data',
    agencies: ['CNSA', 'CAS'],
    launchDate: '2020-07-23',
    status: 'analysis',
    statusDate: '2026-01-08',
    phase: 'Rover data studied on Earth',
    region: 'mars',
    targetBodyId: 'mars',
    primaryTarget: 'Utopia Planitia',
    statusNote:
      'In January 2026, CAS described a study based on previously collected data. This does not confirm resumed rover operations; the Tianwen-1 orbiter has a separate entry.',
    description:
      'The Chinese rover explored Utopia Planitia after landing in 2021.',
    science:
      'Search the surface and subsurface for evidence of water and Martian climate change.',
    instruments: [
      'Subsurface radar',
      'Composition spectrometer',
      'Cameras',
      'Weather station',
    ],
    findings: [
      finding(
        'The analysis published in 2026 interprets rover data as evidence of water activity persisting until about 750 million years ago.',
        'https://english.cas.cn/newsroom/cas-in-media/202601/t20260108_1145442.shtml',
      ),
    ],
    events: [],
    sourceUrl:
      'https://english.cas.cn/newsroom/cas-in-media/202601/t20260108_1145442.shtml',
    sources: [
      source(
        'CAS · Zhurong results',
        'https://english.cas.cn/newsroom/cas-in-media/202601/t20260108_1145442.shtml',
      ),
    ],
  },
];
