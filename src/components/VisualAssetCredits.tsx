import { useEffect, useRef, useState } from 'react';
import { spacecraftModels } from '../data/spacecraftModels';
import { visualAssets } from '../data/visualAssets';

const credits = Object.values(visualAssets);
const modelCredits = [
  ...new Map(
    Object.values(spacecraftModels)
      .filter((model) => model !== undefined)
      .map((model) => [model.url, model]),
  ).values(),
];

export function VisualAssetCredits() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeRef.current?.focus();
    const toggle = toggleRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      toggle?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-controls="visual-asset-credits"
        aria-expanded={isOpen}
        className="credits-toggle"
        onClick={() => setIsOpen((current) => !current)}
        ref={toggleRef}
        type="button"
      >
        Visual credits
      </button>

      {isOpen ? (
        <section
          aria-labelledby="visual-asset-credits-title"
          className="credits-panel"
          id="visual-asset-credits"
          role="dialog"
        >
          <button
            aria-label="Close visual credits"
            className="close-panel"
            onClick={() => setIsOpen(false)}
            ref={closeRef}
            type="button"
          >
            ×
          </button>
          <p className="panel-label">Sources and processing</p>
          <h2 id="visual-asset-credits-title">Visual asset credits</h2>
          <p className="credits-introduction">
            Each local texture comes from the listed NASA or USGS source.
            Processing and reconstructions are described below.
          </p>

          <h3>Body textures</h3>
          <ul className="credits-list" aria-label="Texture credits">
            {credits.map((asset) => (
              <li key={asset.id}>
                <h4 lang="en">{asset.title}</h4>
                <p lang="en">{asset.provenance}</p>
                <p lang="en">{asset.processing}</p>
                <p className="credit-line">Credit: {asset.credit}</p>
                <a
                  href={asset.sourcePageUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Official source ↗
                </a>
              </li>
            ))}
          </ul>

          <h3>Spacecraft 3D models</h3>
          <p>
            These official NASA models represent the spacecraft. Their size and
            orientation in the atlas are illustrative. A file shared by several
            missions is credited once.
          </p>
          <ul className="credits-list" aria-label="3D model credits">
            {modelCredits.map((model) => (
              <li key={model.url}>
                <h4>{model.name}</h4>
                <p className="credit-line">Credit: {model.credit}</p>
                {model.note && <p>{model.note}</p>}
                <a
                  href={model.sourceUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Official model ↗
                </a>
              </li>
            ))}
          </ul>

          <p className="endorsement-note">
            NASA, JPL, ESA and USGS credits identify the sources. Their use does
            not imply endorsement of this project.
          </p>
        </section>
      ) : null}
    </>
  );
}
