import { Suspense, useState } from "react";
import "./App.scss";
import { Canvas } from "@react-three/fiber";
import Models from "./components/Models";

function App() {
  const [mesh, setMesh] = useState<string>("Box");
  return (
    <div className="App">
      <Canvas
        className="canvas"
        flat
        camera={{ fov: 75, far: 1000, position: [0, 2, 0] }}
      >
        <Suspense fallback={null}>
          <ambientLight color="#c5c5c5" position={[0, 10, 0]} intensity={1} />
          <spotLight color="#c5c5c5" position={[0, 10, 10]} intensity={0.2} />
          <Models meshChange={mesh} />
        </Suspense>
      </Canvas>
      <div className="mainContainer">
        <div className="buttonContainer">
          <button
            onClick={() => {
              setMesh("Box");
            }}
          >
            Box
          </button>
          <button
            onClick={() => {
              setMesh("Plane");
            }}
          >
            Plane
          </button>
          <button
            onClick={() => {
              setMesh("Sphere");
            }}
          >
            Sphere
          </button>
          <button
            onClick={() => {
              setMesh("Cylinder");
            }}
          >
            Cylinder
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
