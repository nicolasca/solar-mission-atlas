import type { CelestialBodyId } from '../domain/celestialBody';

export type VisualAssetId = CelestialBodyId | 'saturn-rings';

export interface VisualAsset {
  readonly id: VisualAssetId;
  readonly title: string;
  readonly textureUrl: string;
  readonly sourcePageUrl: string;
  readonly credit: string;
  readonly provenance: string;
  readonly processing: string;
}

export const visualAssets: Record<VisualAssetId, VisualAsset> = {
  sun: {
    id: 'sun',
    title: 'Sun synoptic map',
    textureUrl: '/textures/sun-synoptic.webp',
    sourcePageUrl: 'https://svs.gsfc.nasa.gov/3505/',
    credit: 'NASA/Goddard Space Flight Center Scientific Visualization Studio',
    provenance:
      'SOHO observation-derived synoptic map. The source notes that data gaps were filled and that the image is for visualization, not scientific analysis.',
    processing:
      'Resized to 2048 × 1024 WebP and warm-tinted by the unlit Sun material at runtime.',
  },
  mercury: {
    id: 'mercury',
    title: 'Mercury global color mosaic',
    textureUrl: '/textures/mercury.webp',
    sourcePageUrl:
      'https://astrogeology.usgs.gov/search/map/mercury_messenger_mdis_global_color_mosaic_665m',
    credit:
      'MESSENGER Team / Arizona State University / USGS Astrogeology Science Center; NASA MESSENGER data',
    provenance:
      'Observation-derived MESSENGER MDIS mosaic using 1000, 750, and 430 nm bands; it is not natural human-eye color.',
    processing:
      'Official 1024 × 512 USGS browse derivative converted to WebP without upscaling.',
  },
  venus: {
    id: 'venus',
    title: 'Venus synthetic color mosaic',
    textureUrl: '/textures/venus.webp',
    sourcePageUrl:
      'https://astrogeology.usgs.gov/search/map/venus_magellan_global_c3_mdir_synthetic_color_mosaic_4641m',
    credit:
      'USGS Astrogeology Science Center; PDS Geosciences Node; NASA Magellan mission data',
    provenance:
      'Radar-derived, synthetic-color Magellan mosaic that simulates the surface rather than visible cloud cover.',
    processing:
      'Official 1024 × 512 USGS browse derivative converted to WebP without upscaling.',
  },
  earth: {
    id: 'earth',
    title: 'Blue Marble',
    textureUrl: '/textures/earth.webp',
    sourcePageUrl: 'https://svs.gsfc.nasa.gov/2915/',
    credit:
      'NASA/Goddard Space Flight Center Scientific Visualization Studio; Blue Marble data courtesy of Reto Stöckli (NASA/GSFC) and NASA Earth Observatory',
    provenance:
      'Observation-derived true-color composite with ocean data and topographic shading.',
    processing: 'Converted from the 2048 × 1024 NASA PNG to WebP.',
  },
  mars: {
    id: 'mars',
    title: 'Mars global map',
    textureUrl: '/textures/mars.webp',
    sourcePageUrl: 'https://science.nasa.gov/3d-resources/mars/',
    credit: 'NASA/Jet Propulsion Laboratory & Caltech',
    provenance:
      'Global map based on Viking observations processed by USGS and JPL.',
    processing:
      'The native 1440 × 720 NASA resource was converted to WebP without upscaling.',
  },
  jupiter: {
    id: 'jupiter',
    title: 'Jupiter global map (2019)',
    textureUrl: '/textures/jupiter.webp',
    sourcePageUrl:
      'https://science.nasa.gov/asset/hubble/jupiter-global-map-2019/',
    credit: 'NASA, ESA, A. Simon (NASA-GSFC), and M.H. Wong (UC Berkeley)',
    provenance:
      'Observation-derived Hubble OPAL mosaic. The source map excludes polar regions above ±80° latitude.',
    processing:
      'The 2000 × 1000 NASA PNG derivative was converted to WebP. Its missing polar margins were filled from adjacent edge colors without adding features.',
  },
  saturn: {
    id: 'saturn',
    title: 'Saturn global visualization',
    textureUrl: '/textures/saturn.webp',
    sourcePageUrl: 'https://science.nasa.gov/3d-resources/saturn/',
    credit: 'Courtesy NASA/JPL-Caltech',
    provenance:
      'NASA identifies this legacy global texture as a fictional visualization rather than a single observation-derived map.',
    processing:
      'The native 720 × 360 NASA resource was converted to WebP without upscaling.',
  },
  uranus: {
    id: 'uranus',
    title: 'Uranus true-color reconstruction',
    textureUrl: '/textures/uranus.webp',
    sourcePageUrl:
      'https://science.nasa.gov/photojournal/uranus-in-true-and-false-color/',
    credit: 'NASA/JPL',
    provenance:
      'Derived from the true-color Voyager 2 disk in PIA00032; unseen areas are not directly observed in that source.',
    processing:
      'A deliberately low-detail 1024 × 512 map extends averaged latitudinal color from the visible disk without adding storms or surface detail.',
  },
  neptune: {
    id: 'neptune',
    title: 'Neptune global visualization',
    textureUrl: '/textures/neptune.webp',
    sourcePageUrl: 'https://science.nasa.gov/3d-resources/neptune/',
    credit: 'Don Davis & JPL/Caltech',
    provenance:
      'NASA identifies this legacy global texture as a fictional visualization rather than a single observation-derived map.',
    processing:
      'The native 720 × 360 NASA resource was converted to WebP without upscaling.',
  },
  'saturn-rings': {
    id: 'saturn-rings',
    title: 'Saturn ring texture',
    textureUrl: '/textures/saturn-rings.webp',
    sourcePageUrl: 'https://svs.gsfc.nasa.gov/30348/',
    credit: 'NASA/JPL/Space Science Institute',
    provenance:
      'Processed from a Cassini natural-color portrait of Saturn and its rings (PIA06193).',
    processing:
      'A visible, unobscured radial ring profile was sampled into a 1024 × 64 lossless-alpha WebP strip.',
  },
};

export const bodyTextureUrls: Record<CelestialBodyId, string> = {
  sun: visualAssets.sun.textureUrl,
  mercury: visualAssets.mercury.textureUrl,
  venus: visualAssets.venus.textureUrl,
  earth: visualAssets.earth.textureUrl,
  mars: visualAssets.mars.textureUrl,
  jupiter: visualAssets.jupiter.textureUrl,
  saturn: visualAssets.saturn.textureUrl,
  uranus: visualAssets.uranus.textureUrl,
  neptune: visualAssets.neptune.textureUrl,
};
