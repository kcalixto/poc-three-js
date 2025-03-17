import './index.css'
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Street } from './components/box'

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
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 65, 100], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <BlockGroupV2 />
          <gridHelper args={[300, 40, "#E2E8F0", "#E2E8F0"]} />
          <OrbitControls makeDefault target={[0, 4, 0]} />
        </Canvas>
      </div>
    </div>
  )
}

// colocar camera centralizado com armazem na horizontal
export default App
