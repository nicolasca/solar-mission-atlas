import type { Mission } from '../domain/mission';

export const missions: readonly Mission[] = [
  {
    id: 'parker-solar-probe',
    name: 'Parker Solar Probe',
    agencies: ['NASA'],
    launchDate: '2018-08-12',
    phase: 'Primary mission in progress',
    targetBodyId: 'sun',
    primaryTarget: "The Sun's corona and solar wind",
    description:
      'Parker Solar Probe repeatedly passes through the Sun’s outer atmosphere to study the corona, solar wind, and energetic particles close to their source.',
    sourceUrl: 'https://science.nasa.gov/mission/parker-solar-probe/',
  },
  {
    id: 'juice',
    name: 'JUICE',
    agencies: ['ESA (lead)', 'NASA', 'JAXA'],
    launchDate: '2023-04-14',
    phase: 'Cruise to Jupiter',
    targetBodyId: 'jupiter',
    primaryTarget: 'Jupiter, Ganymede, Callisto, and Europa',
    description:
      'The Jupiter Icy Moons Explorer will investigate Jupiter and three ocean-bearing moons before entering orbit around Ganymede.',
    sourceUrl:
      'https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_factsheet',
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    agencies: ['NASA'],
    launchDate: '2024-10-14',
    phase: 'Cruise to Jupiter',
    targetBodyId: 'jupiter',
    primaryTarget: 'Europa, a moon of Jupiter',
    description:
      'Europa Clipper will orbit Jupiter and make repeated close flybys of Europa to assess whether the icy moon has conditions suitable for life.',
    sourceUrl: 'https://science.nasa.gov/mission/europa-clipper/',
  },
] as const;
