export interface SpacecraftModel {
  readonly url: string;
  readonly sourceUrl: string;
  readonly credit: string;
  readonly name: string;
  readonly note?: string;
}

/**
 * Official NASA visual models, loaded only when a mission is selected.
 * Their orientation and displayed size are illustrative, never live telemetry.
 * Most files use Draco; keep the decoder local when calling useGLTF.
 */
export const spacecraftModelDecoderPath = '/models/draco/';

const voyagerModel: SpacecraftModel = {
  url: '/models/voyager.glb',
  sourceUrl: 'https://science.nasa.gov/3d-resources/voyager-probe-a/',
  credit: 'NASA / Christopher R. Meaney',
  name: 'Voyager — NASA model',
  note: 'Model shared by the twin Voyager spacecraft; orientation is illustrative.',
};

export const spacecraftModels: Partial<Record<string, SpacecraftModel>> = {
  'parker-solar-probe': {
    url: '/models/parker-solar-probe.glb',
    sourceUrl: 'https://science.nasa.gov/3d-resources/parker-solar-probe/',
    credit: 'NASA / Matthew J. Garcia',
    name: 'Parker Solar Probe — NASA model',
  },
  'voyager-1': voyagerModel,
  'voyager-2': voyagerModel,
  'new-horizons': {
    url: '/models/new-horizons.glb',
    sourceUrl: 'https://science.nasa.gov/resource/new-horizons-3d-model/',
    credit: 'NASA Visualization Technology Applications and Development (VTAD)',
    name: 'New Horizons — NASA model',
  },
  juno: {
    url: '/models/juno.glb',
    sourceUrl: 'https://science.nasa.gov/3d-resources/juno-b/',
    credit: 'NASA — 3D Resources',
    name: 'Juno — NASA model (version B)',
  },
  'osiris-apex': {
    url: '/models/osiris-rex.glb',
    sourceUrl:
      'https://science.nasa.gov/3d-resources/origins-spectral-interpretation-resource-identification-and-security-regolith-explorer-osiris-rex/',
    credit: 'NASA / Christopher R. Meaney',
    name: 'OSIRIS-REx — OSIRIS-APEX spacecraft',
    note: 'Historical OSIRIS-REx model: the configuration shown may predate the capsule release in 2023.',
  },
  perseverance: {
    url: '/models/perseverance.glb',
    sourceUrl:
      'https://science.nasa.gov/3d-resources/mars-2020-perseverance-rover/',
    credit: 'NASA / Jet Propulsion Laboratory',
    name: 'Perseverance — NASA model',
  },
};
