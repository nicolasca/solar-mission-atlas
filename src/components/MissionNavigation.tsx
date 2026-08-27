import type { Mission, MissionId } from '../domain/mission';

interface MissionNavigationProps {
  readonly missions: readonly Mission[];
  readonly selectedMissionId: MissionId | null;
  readonly onSelectMission: (missionId: MissionId) => void;
}

export function MissionNavigation({
  missions,
  selectedMissionId,
  onSelectMission,
}: MissionNavigationProps) {
  return (
    <nav className="mission-navigation" aria-label="Explore missions">
      <p className="panel-label">Featured missions</p>
      <ul>
        {missions.map((mission) => {
          const isSelected = mission.id === selectedMissionId;

          return (
            <li key={mission.id}>
              <button
                type="button"
                aria-pressed={isSelected}
                className={isSelected ? 'is-selected' : undefined}
                onClick={() => onSelectMission(mission.id)}
              >
                {mission.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
