import { useEffect, useRef } from 'react';
import {
  formatDistance,
  formatLightTime,
  formatMissionDate,
} from '../display/missionFormatting';
import { spacecraftModels } from '../data/spacecraftModels';
import type { DisplayMission } from '../display/missionDisplay';
import {
  ephemerisEpoch,
  getEphemeris,
  getMissionMetrics,
} from '../domain/ephemeris';
import type { Mission } from '../domain/mission';
import { missionRegionLabels, missionStatusLabels } from '../domain/mission';

interface MissionInfoPanelProps {
  readonly mission: Mission;
  readonly epoch: string;
  readonly display: DisplayMission | undefined;
  readonly onClose: () => void;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
  readonly position: number;
  readonly count: number;
}

const numberFormatter = new Intl.NumberFormat('en-GB', {
  maximumFractionDigits: 2,
});

export function MissionInfoPanel({
  mission,
  epoch,
  display,
  onClose,
  onPrevious,
  onNext,
  position,
  count,
}: MissionInfoPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
      panelRef.current.focus({ preventScroll: true });
    }
  }, [mission.id]);
  const metrics =
    mission.status === 'analysis' ? null : getMissionMetrics(mission.id, epoch);
  const ephemeris = getEphemeris(mission.id);
  const model = spacecraftModels[mission.id];
  return (
    <aside
      ref={panelRef}
      className="mission-info detail-panel"
      aria-labelledby="mission-info-title"
      tabIndex={-1}
    >
      <div className="detail-pagination">
        <span>
          MISSION {position} / {count}
        </span>
        <div>
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous mission"
          >
            ←
          </button>
          <button type="button" onClick={onNext} aria-label="Next mission">
            →
          </button>
          <button
            className="close-panel"
            type="button"
            aria-label="Close mission details"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>
      <div className="detail-content" key={mission.id}>
        <p className="mission-category">
          {missionRegionLabels[mission.region]}
        </p>
        <h2 id="mission-info-title">{mission.name}</h2>
        <div className={`status-badge status-badge--${mission.status}`}>
          <span className={`status-dot status-dot--${mission.status}`} />
          {missionStatusLabels[mission.status]}
        </div>
        <p className="mission-description">{mission.description}</p>
        <section className="science-purpose">
          <h3>Scientific objectives</h3>
          <p>{mission.science}</p>
        </section>
        <dl className="mission-facts">
          <div>
            <dt>{mission.agencies.length > 1 ? 'Agencies' : 'Agency'}</dt>
            <dd>{mission.agencies.join(' · ')}</dd>
          </div>
          <div>
            <dt>Launch</dt>
            <dd>
              <time dateTime={mission.launchDate}>
                {formatMissionDate(mission.launchDate)}
              </time>
            </dd>
          </div>
          {mission.status === 'cruise' && mission.expectedArrival && (
            <div>
              <dt>Expected arrival</dt>
              <dd>
                <a
                  href={mission.expectedArrival.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <time dateTime={mission.expectedArrival.date}>
                    {formatMissionDate(mission.expectedArrival.date)}
                  </time>{' '}
                  ↗
                </a>
                <small className="arrival-description">
                  {mission.expectedArrival.description}
                </small>
              </dd>
            </div>
          )}
          <div>
            <dt>Scientific target</dt>
            <dd>{mission.primaryTarget}</dd>
          </div>
          <div>
            <dt>Documented phase</dt>
            <dd>{mission.phase}</dd>
          </div>
        </dl>
        <div className="status-evidence">
          <strong>
            Status documented on {formatMissionDate(mission.statusDate)}
          </strong>
          <p>{mission.statusNote}</p>
          <a href={mission.sourceUrl} target="_blank" rel="noreferrer">
            Mission source ↗
          </a>
        </div>
        <section className="mission-location">
          <h3>Position and distances</h3>
          {metrics ? (
            <>
              <div className="distance-grid">
                <div>
                  <span>Distance from Earth</span>
                  <strong>{formatDistance(metrics.earthDistanceKm)}</strong>
                  <small>
                    {numberFormatter.format(metrics.earthDistanceAu)} AU
                  </small>
                </div>
                <div>
                  <span>Distance from Sun</span>
                  <strong>{formatDistance(metrics.sunDistanceKm)}</strong>
                  <small>
                    {numberFormatter.format(metrics.sunDistanceAu)} AU
                  </small>
                </div>
              </div>
              <p className="light-time">
                ↗ Radio signal:{' '}
                <strong>{formatLightTime(metrics.oneWayLightMinutes)}</strong>{' '}
                one way in vacuum.
              </p>
              <p className="data-note">
                Positions calculated for {formatMissionDate(epoch)},{' '}
                {epoch.slice(11, 16)} TDB.{' '}
                {epoch === ephemerisEpoch
                  ? 'JPL Horizons reference snapshot.'
                  : 'Interpolated within the sampled JPL ephemeris.'}{' '}
                No live telemetry. 1 AU ≈ 149.6 million km.{' '}
                {ephemeris && (
                  <a
                    href={
                      epoch === ephemerisEpoch
                        ? ephemeris.snapshotSourceUrl
                        : ephemeris.sourceUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    JPL position ↗
                  </a>
                )}
              </p>
            </>
          ) : (
            <p className="data-note">
              {mission.status === 'analysis'
                ? 'Mission complete: the map marks its scientific destination. The marker does not represent an active spacecraft.'
                : 'No usable position is available for this date in the included data. No distance is estimated.'}
            </p>
          )}
          {metrics && !ephemeris?.trajectory.length && (
            <p className="data-note">
              Position available; the local orbital path is not included at this
              scale.
            </p>
          )}
          {display?.displaced && metrics && (
            <p className="data-note">
              The marker is offset from the body for visibility. The short line
              connects it to its calculated position; distances above use
              physical coordinates.
            </p>
          )}
          {ephemeris?.sampledStart && ephemeris.sampledEnd && metrics && (
            <p className="data-note">
              Sampled trajectory: {formatMissionDate(ephemeris.sampledStart)} —{' '}
              {formatMissionDate(ephemeris.sampledEnd)}. Dashed segments are
              later than the selected date. Ephemerides may include predictions;
              sampling does not resolve every close encounter.{' '}
              <a href={ephemeris.sourceUrl} target="_blank" rel="noreferrer">
                JPL data ↗
              </a>
            </p>
          )}
          {ephemeris?.qualityNote && (
            <p className="data-note trajectory-quality-note">
              <strong>Data quality: </strong>
              {ephemeris.qualityNote}{' '}
              <a
                href={ephemeris.qualitySourceUrl ?? ephemeris.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                JPL source ↗
              </a>
            </p>
          )}
        </section>
        {model && (
          <div className="model-credit">
            <span aria-hidden="true">◇</span>
            <div>
              <strong>Spacecraft 3D model</strong>
              <p>
                {model.credit}. Loaded on selection; size and orientation are
                illustrative. A marker remains visible if loading fails.
              </p>
              {model.note && <p>{model.note}</p>}
              <a href={model.sourceUrl} target="_blank" rel="noreferrer">
                Original model & credits ↗
              </a>
            </div>
          </div>
        )}
        {!model && (
          <p className="data-note">
            ◇ Navigation marker: no official model is included for this mission.
          </p>
        )}
        <section className="findings-section">
          <h3>Scientific findings</h3>
          {mission.findings.length ? (
            <ul>
              {mission.findings.map((finding, index) => (
                <li key={index}>
                  <p>{finding.text}</p>
                  <a href={finding.sourceUrl} target="_blank" rel="noreferrer">
                    Scientific result ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="data-note">
              No scientific findings from the target are documented here yet.
              The objectives describe questions still to be investigated.
            </p>
          )}
        </section>
        {mission.instruments.length > 0 && (
          <section>
            <h3>Instruments</h3>
            <div className="instrument-list">
              {mission.instruments.map((instrument) => (
                <span key={instrument}>{instrument}</span>
              ))}
            </div>
          </section>
        )}
        {mission.events.length > 0 && (
          <section>
            <h3>Timeline</h3>
            <ol className="mission-timeline">
              {mission.events.map((event, index) => (
                <li
                  key={index}
                  className={event.kind === 'planned' ? 'is-planned' : ''}
                >
                  <span>
                    {event.date} ·{' '}
                    {event.kind === 'planned' ? 'Planned' : 'Completed'}
                  </span>
                  <a href={event.sourceUrl} target="_blank" rel="noreferrer">
                    {event.title} ↗
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}
        <section className="mission-sources">
          <h3>Sources</h3>
          <ul>
            {mission.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}
