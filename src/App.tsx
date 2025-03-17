import './index.css'
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Street } from './components/box'
import { Route, Routes } from 'react-router-dom'

function BlockGroupV2() {
  const streetIds = "KJIHGFEDCBA".split("");
  const totalWidth = streetIds.length * 20;
  const centerOffset = totalWidth / 2 - 10; // Adjust by half the width minus half a street width

  return (
    <group position={[-centerOffset, 0, 0]}>
      {streetIds.map((id, index) => (
        <Street key={id} x={index * 20} y={0} z={0} streetid={id} />
      ))}
    </group>
  )
}
function App() {
  const streetqueryparam = new URLSearchParams(window.location.search).get("street");
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={
          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 65, 100], fov: 75 }}>
              <ambientLight intensity={3} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <BlockGroupV2 />
              <gridHelper args={[300, 40, "#E2E8F0", "#E2E8F0"]} />
              <OrbitControls makeDefault target={[0, 4, 0]} />
            </Canvas>
          </div>
        } />
        <Route path="/rua" element={
          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 7, 35], fov: 75 }}>
              <ambientLight intensity={3} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Street key={streetqueryparam} x={0} y={-20} z={0} streetid={streetqueryparam || "null"} />
              <OrbitControls makeDefault target={[0, 4, 0]} />
            </Canvas>
          </div>
        } />
      </Routes>
    </div>
  )
}

// colocar camera centralizado com armazem na horizontal
export default App
