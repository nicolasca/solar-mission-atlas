/// <reference types="node" />
// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  spacecraftModelDecoderPath,
  spacecraftModels,
} from './spacecraftModels';

interface GltfDocument {
  asset: { version: string };
  scenes?: { nodes?: number[] }[];
  meshes?: { primitives: unknown[] }[];
  buffers?: { byteLength: number; uri?: string }[];
  images?: { uri?: string; bufferView?: number }[];
  extensionsRequired?: string[];
}

const publicDirectory = fileURLToPath(
  new URL('../../public/', import.meta.url),
);
const models = Object.values(spacecraftModels).filter(
  (model) => model !== undefined,
);
const modelUrls = [...new Set(models.map((model) => model.url))];

describe('official spacecraft model assets', () => {
  it.each(models)('credits and links $name to its official source', (model) => {
    expect(model.url).toMatch(/^\/models\/[a-z-]+\.glb$/);
    expect(new URL(model.sourceUrl).hostname).toBe('science.nasa.gov');
    expect(model.credit).toContain('NASA');
    expect(model.name.length).toBeGreaterThan(0);
  });

  it.each(modelUrls)('ships a complete, self-contained GLB 2.0: %s', (url) => {
    const file = readFileSync(`${publicDirectory}${url.slice(1)}`);

    // Catch truncated downloads, HTML error pages, and external texture URLs.
    expect(file.toString('ascii', 0, 4)).toBe('glTF');
    expect(file.readUInt32LE(4)).toBe(2);
    expect(file.readUInt32LE(8)).toBe(file.length);
    expect(file.readUInt32LE(16)).toBe(0x4e4f534a);

    const jsonLength = file.readUInt32LE(12);
    const document = JSON.parse(
      file.toString('utf8', 20, 20 + jsonLength),
    ) as GltfDocument;
    const binaryHeaderOffset = 20 + jsonLength;

    expect(document.asset.version).toBe('2.0');
    expect(document.scenes?.some((scene) => scene.nodes?.length)).toBe(true);
    expect(document.meshes?.length).toBeGreaterThan(0);
    expect(document.buffers).toHaveLength(1);
    expect(document.buffers?.[0].uri).toBeUndefined();
    expect(file.readUInt32LE(binaryHeaderOffset + 4)).toBe(0x004e4942);
    expect(document.buffers?.[0].byteLength).toBeLessThanOrEqual(
      file.readUInt32LE(binaryHeaderOffset),
    );
    expect(binaryHeaderOffset + 8 + file.readUInt32LE(binaryHeaderOffset)).toBe(
      file.length,
    );
    for (const image of document.images ?? []) {
      expect(image.uri).toBeUndefined();
      expect(image.bufferView).toBeTypeOf('number');
    }
    for (const extension of document.extensionsRequired ?? []) {
      expect(extension).toBe('KHR_draco_mesh_compression');
    }
    expect(file.length).toBeLessThan(5_000_000);
  });

  it('ships local Draco decoders and their license within the asset budget', () => {
    const decoderDirectory = `${publicDirectory}${spacecraftModelDecoderPath.slice(1)}`;
    const wasm = readFileSync(`${decoderDirectory}draco_decoder.wasm`);
    expect(wasm.subarray(0, 4)).toEqual(Buffer.from([0, 97, 115, 109]));
    expect(
      readFileSync(`${decoderDirectory}draco_wasm_wrapper.js`, 'utf8'),
    ).toContain('DracoDecoderModule');
    expect(
      readFileSync(`${decoderDirectory}draco_decoder.js`, 'utf8'),
    ).toContain('DracoDecoderModule');
    expect(readFileSync(`${decoderDirectory}LICENSE`, 'utf8')).toContain(
      'Apache License',
    );

    const modelBytes = modelUrls.reduce(
      (total, url) =>
        total + readFileSync(`${publicDirectory}${url.slice(1)}`).length,
      0,
    );
    expect(modelBytes).toBeLessThan(12_000_000);
  });

  it('identifies the historical configuration of OSIRIS-APEX', () => {
    expect(spacecraftModels['osiris-apex']?.note).toContain('2023');
    expect(spacecraftModels['voyager-1']?.url).toBe(
      spacecraftModels['voyager-2']?.url,
    );
    expect(spacecraftModels['unavailable-model']).toBeUndefined();
  });
});
