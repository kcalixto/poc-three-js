import './index.css'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"

function App() {
  const render = (n: number) => {
    const color = () => {
      // random
      if (Math.random() > 0.5) {
        return "#15BC06"
      }
      return "#ff4444"
    }
    // "#4444ff"
    return (
      <>
        {
          new Array(1).fill(0).map( // width
            (_, i) => (
              new Array(3).fill(0).map( // height
                (_, j) => (
                  <>
                    {
                      new Array(4).fill(0).map( // depth
                        (_, k) => (
                          <group position={[n + i * 5, j * 5, k * 5]} key={i}>
                            <mesh castShadow>
                              <boxGeometry args={[4, 4, 4]} />
                              <meshStandardMaterial color={color()} roughness={1} />
                            </mesh>
                          </group>
                        )
                      )
                    }

                  </>
                )
              )
            )
          )
        }

        {
          new Array(1).fill(0).map( // width
            (_, i) => (
              new Array(3).fill(0).map( // height
                (_, j) => (
                  <>
                    <Text position={[0, j * 15, 0]} fontSize={2} color="black">
                      RA
                    </Text>
                    {
                      new Array(4).fill(0).map( // depth
                        (_, k) => (
                          <group position={[n + i * 5, 18 + (j * 8), k * 5]} key={i}>
                            <mesh castShadow>
                              <boxGeometry args={[4, 4, 4]} />
                              <meshStandardMaterial color={color()} roughness={1} />
                            </mesh>
                            <Text position={[0, 0, 0.6]} fontSize={2} color="black">
                              {i}, {j}, {k}
                            </Text>
                          </group>
                        )
                      )
                    }
                  </>
                )
              )
            )
          )
        }
      </>
    )
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full h-full">
        <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {
            new Array(11).fill(0).map(
              (_, i) => (
                <>
                  {render(i * 32)}
                </>
              )
            )
          }

          {/*<gridHelper args={[20, 20]} />*/}
          <OrbitControls makeDefault autoRotate target={[176, 10, 0]} />
        </Canvas>
      </div>

    </div>
  )
}

export default App
