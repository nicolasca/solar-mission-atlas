import { useEffect, useState } from 'react';
import { visualAssets } from '../data/visualAssets';

const credits = Object.values(visualAssets);

export function VisualAssetCredits() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        aria-controls="visual-asset-credits"
        aria-expanded={isOpen}
        className="credits-toggle"
        onClick={() => setIsOpen((current) => !current)}
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
            type="button"
          >
            ×
          </button>
          <p className="panel-label">Sources and processing</p>
          <h2 id="visual-asset-credits-title">Visual asset credits</h2>
          <p className="credits-introduction">
            Each local texture is derived from the linked NASA or USGS source.
            Processed and reconstructed assets are labeled explicitly.
          </p>

          <ul className="credits-list">
            {credits.map((asset) => (
              <li key={asset.id}>
                <h3>{asset.title}</h3>
                <p>{asset.provenance}</p>
                <p>{asset.processing}</p>
                <p className="credit-line">Credit: {asset.credit}</p>
                <a
                  href={asset.sourcePageUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  View official source
                </a>
              </li>
            ))}
          </ul>

          <p className="endorsement-note">
            NASA, JPL, ESA, and USGS sources are acknowledged here. Their use
            does not imply endorsement of this project.
          </p>
        </section>
      ) : null}
    </>
  );
}
