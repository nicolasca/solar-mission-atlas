import {
  ephemerisEpoch,
  epochToJd,
  jdToEpoch,
  getEphemeris,
} from '../domain/ephemeris';
import type { Mission } from '../domain/mission';
import {
  getNavigationTarget,
  getFrameOrigin,
  getTrajectoryRange,
  isFrameAvailable,
  type TrajectoryFrame,
} from '../domain/trajectory';

interface TrajectoryControlsProps {
  readonly mission: Mission;
  readonly epoch: string;
  readonly frame: TrajectoryFrame;
  readonly onEpochChange: (epoch: string) => void;
  readonly onFrameChange: (frame: TrajectoryFrame) => void;
}

export function TrajectoryControls({
  mission,
  epoch,
  frame,
  onEpochChange,
  onFrameChange,
}: TrajectoryControlsProps) {
  const range = getTrajectoryRange(mission.id);
  if (!range) return null;
  const [start, end] = range;
  const jd = epochToJd(epoch);
  const target = getNavigationTarget(mission.id);
  const origin = getEphemeris(getFrameOrigin(mission.id, frame).id);
  const changeDate = (value: number) =>
    onEpochChange(jdToEpoch(Math.max(start, Math.min(end, value))));
  const reference = epochToJd(ephemerisEpoch);
  const endDate = jdToEpoch(end).slice(0, 10);
  const partial =
    mission.expectedArrival &&
    endDate.slice(0, mission.expectedArrival.date.length) <
      mission.expectedArrival.date;
  return (
    <section className="trajectory-controls" aria-label="Trajectory controls">
      <div className="trajectory-controls-row">
        <label>
          Frame
          <select
            aria-label="Trajectory reference frame"
            value={frame}
            onChange={(event) =>
              onFrameChange(event.target.value as TrajectoryFrame)
            }
          >
            <option value="sun">Sun · full path</option>
            <option
              value="earth"
              disabled={!isFrameAvailable(mission.id, 'earth', jd)}
            >
              Earth · 120 days
            </option>
            {target && (
              <option
                value="target"
                disabled={!isFrameAvailable(mission.id, 'target', jd)}
              >
                {target.name} · 120 days
              </option>
            )}
          </select>
        </label>
        <label>
          Date (TDB)
          <input
            aria-label="Trajectory date"
            type="date"
            value={epoch.slice(0, 10)}
            min={jdToEpoch(start).slice(0, 10)}
            max={endDate}
            onChange={(event) => {
              if (event.target.value) changeDate(epochToJd(event.target.value));
            }}
          />
        </label>
      </div>
      <input
        className="trajectory-slider"
        aria-label="Trajectory timeline"
        aria-valuetext={`${epoch.slice(0, 10)} ${epoch.slice(11, 16)} TDB`}
        type="range"
        min={start}
        max={end}
        step={0.25}
        value={jd}
        onChange={(event) => changeDate(Number(event.target.value))}
      />
      <div className="trajectory-controls-row trajectory-endpoints">
        <button type="button" onClick={() => changeDate(start)}>
          Start · {jdToEpoch(start).slice(0, 10)}
        </button>
        <button
          type="button"
          disabled={reference < start || reference > end}
          onClick={() => changeDate(reference)}
        >
          Reference date
        </button>
        <button type="button" onClick={() => changeDate(end)}>
          End · {endDate}
        </button>
      </div>
      <p>
        {partial
          ? 'Partial coverage: the available path ends before the expected arrival. '
          : ''}
        {frame === 'sun'
          ? 'Solid: before selected date. Dashed: after. Other probes appear only where dated positions are available.'
          : 'Centred on the moving body · ±60 days, clipped to coverage · uniform distance scale; sizes exaggerated. View auto-fits each date.'}
        {frame !== 'sun' && origin && (
          <>
            {' '}
            <a href={origin.sourceUrl} target="_blank" rel="noreferrer">
              Frame ephemeris ↗
            </a>
          </>
        )}
      </p>
    </section>
  );
}
