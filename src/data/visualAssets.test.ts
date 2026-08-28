import { describe, expect, it } from 'vitest';
import { celestialBodies } from './celestialBodies';
import { bodyTextureUrls, visualAssets } from './visualAssets';

describe('visualAssets', () => {
  it('provides a local texture and complete credit for every displayed body', () => {
    for (const body of celestialBodies) {
      const asset = visualAssets[body.id];

      expect(bodyTextureUrls[body.id]).toBe(asset.textureUrl);
      expect(asset.textureUrl).toMatch(/^\/textures\/[a-z-]+\.webp$/);
      expect(asset.sourcePageUrl).toMatch(/^https:\/\//);
      expect(asset.credit.length).toBeGreaterThan(0);
      expect(asset.provenance.length).toBeGreaterThan(0);
      expect(asset.processing.length).toBeGreaterThan(0);
    }
  });

  it('documents the separate Saturn ring texture', () => {
    const rings = visualAssets['saturn-rings'];

    expect(rings.textureUrl).toBe('/textures/saturn-rings.webp');
    expect(rings.sourcePageUrl).toMatch(/^https:\/\//);
    expect(rings.credit).toContain('NASA');
  });
});
