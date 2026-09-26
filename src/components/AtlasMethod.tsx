import { ephemerisEpoch } from '../domain/ephemeris';
import { missions } from '../data/missions';
import { displayMissions } from '../display/missionDisplay';

export function AtlasMethod({ onClose }: { readonly onClose: () => void }) {
  const computed = displayMissions.filter(
    (mission) => mission.positionKind === 'ephemeris',
  ).length;
  return (
    <section
      className="method-panel detail-panel"
      aria-labelledby="method-title"
    >
      <button
        type="button"
        className="close-panel"
        onClick={onClose}
        aria-label="Close methods"
      >
        ×
      </button>
      <h2 id="method-title">Sources and methods</h2>
      <p>
        {missions.length} documented missions, {computed} calculated spacecraft
        positions at the reference date. This catalogue covers major robotic
        Solar System exploration missions and solar observatories.
      </p>
      <h3>Scope</h3>
      <p>
        Statuses use the latest official sources found, dated in each mission
        panel. This is not an exhaustive operational register: some small
        missions, technology demonstrators and poorly documented operations may
        be missing. Deep-space astronomy observatories, general Earth satellites
        and crewed flights are excluded.
      </p>
      <h3>Statuses</h3>
      <p>
        Operating and in transit refer to documented operations. Data analysis
        includes selected completed missions whose scientific data remain in
        use; it does not mean the spacecraft is still operating. Status
        unconfirmed indicates insufficient or outdated information.
      </p>
      <h3>Trajectories and time</h3>
      <p>
        Coordinates come from{' '}
        <a
          href="https://ssd.jpl.nasa.gov/horizons/"
          target="_blank"
          rel="noreferrer"
        >
          NASA/JPL Horizons
        </a>
        , using the Sun-centred J2000 ecliptic frame. The reference snapshot is
        dated {ephemerisEpoch.slice(0, 10)}, 00:00 TDB. The timeline moves
        planets and spacecraft to the selected date, with linear interpolation
        between available samples and no extrapolation beyond their coverage.
        Mission statuses and findings remain those of their documented sources.
      </p>
      <p>
        Calculated trajectories are not live measurements; some segments are
        predictions. Sampling simplifies flybys and local orbits. A path may
        cover only part of the journey. Positions outside the available coverage
        are not shown as calculated positions.
      </p>
      <h3>Reference frames and scale</h3>
      <p>
        The global Sun-centred view compresses radial distances using a square
        root. Earth-centred and destination-centred views show relative motion
        over a 120-day window around the selected date, using a uniform distance
        scale within each view. The local view auto-fits when its date changes.
        Axes keep their J2000 orientation; the frame does not rotate with the
        body. Body and spacecraft sizes are exaggerated in every view. Distances
        in mission panels are calculated from physical coordinates,
        independently of the 3D display scale.
      </p>
      <h3>Legend</h3>
      <p>
        ◆ Calculated position · ◇ Scientific region only. Solid lines: samples
        before the selected date. Dashed lines: later samples. Nearby markers
        may be offset for visibility; a short line connects them to their
        physical position. Grey rings in the global view indicate mean orbital
        distances.
      </p>
      <h3>Updates</h3>
      <p>
        Statuses and ephemerides are dated and reviewed manually. The atlas does
        not provide live tracking.
      </p>
    </section>
  );
}
