import { SolarSystemCanvas } from './components/SolarSystemCanvas';

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <p className="app-kicker">Visual Solar System</p>
        <h1>Solar Mission Atlas</h1>
        <p className="control-hint">
          Drag to orbit · Scroll to zoom · Drag right to pan
        </p>
      </header>

      <SolarSystemCanvas />

      <aside className="scale-note">
        <strong>Display scale</strong>
        <span>
          Planetary radii are exaggerated and orbital distances are compressed
          for readability. This overview is not uniformly to scale.
        </span>
      </aside>
    </main>
  );
}

export default App;
