import type { Mission } from '../domain/mission';

interface MissionInfoPanelProps {
  readonly mission: Mission;
  readonly onClose: () => void;
}

const launchDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function MissionInfoPanel({ mission, onClose }: MissionInfoPanelProps) {
  return (
    <aside
      className="mission-info"
      aria-labelledby="mission-info-title"
      aria-live="polite"
    >
      <button
        className="close-panel"
        type="button"
        aria-label="Close mission details"
        onClick={onClose}
      >
        <span aria-hidden="true">×</span>
      </button>

      <p className="mission-category">Featured mission</p>
      <h2 id="mission-info-title">{mission.name}</h2>
      <p className="mission-description">{mission.description}</p>

      <dl className="mission-facts">
        <div>
          <dt>Agency or agencies</dt>
          <dd>{mission.agencies.join(', ')}</dd>
        </div>
        <div>
          <dt>Launch date</dt>
          <dd>
            <time dateTime={mission.launchDate}>
              {launchDateFormatter.format(
                new Date(`${mission.launchDate}T00:00:00Z`),
              )}
            </time>
          </dd>
        </div>
        <div>
          <dt>Mission phase</dt>
          <dd>{mission.phase}</dd>
        </div>
        <div>
          <dt>Primary target</dt>
          <dd>{mission.primaryTarget}</dd>
        </div>
      </dl>

      <p className="scientific-note">
        <strong>Schematic representation</strong>
        The line runs from Earth to the displayed destination. It is not the
        mission’s real trajectory or live position.
      </p>

      <a
        className="official-source"
        href={mission.sourceUrl}
        target="_blank"
        rel="noreferrer"
      >
        Official mission source
        <span aria-hidden="true"> ↗</span>
      </a>
    </aside>
  );
}
