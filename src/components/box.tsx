import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { BoxGeometry, Mesh, TextureLoader } from "three"

interface boxprops {
  title: string
  x: number
  y: number
  z: number
  numlines?: number
  numposperline?: number
  boxid: number
  fillpct: number
}

export function Box(props: boxprops) {
  const numlines = props.numlines || 1;
  const numposperline = props.numposperline || 1;
  const totalBoxes = numlines * numposperline;

  // Calculate the number of red blocks based on fillpct
  const redBlocksCount = Math.floor((props.fillpct / 100) * totalBoxes);
  const blockColors = new Array(totalBoxes).fill("lightgreen");

  // Randomly assign red color to some blocks
  for (let i = 0; i < redBlocksCount; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * totalBoxes);
    } while (blockColors[randomIndex] === "red");
    blockColors[randomIndex] = "red";
  }

  const texture = new TextureLoader().load('/src/cardbox.jpg');

  // <meshStandardMaterial map={texture} roughness={1} />
  return (
    <group position={[props.x, props.y, props.z]} key={`${props.x}-${props.y}${props.z}`}>
      {
        new Array(totalBoxes).fill(0).map((_, index) => {
          const lineIndex = Math.floor(index / numposperline) + 1; // Line number starts from 1
          const posIndex = (index % numposperline) + 1; // Position number starts from 1
          return (
            <mesh key={index} position={[
              0,             // z position remains constant
              posIndex * 5,  // posIndex affects the x position
              lineIndex * -5, // Now lineIndex affects the y position
            ]} castShadow>
              <boxGeometry args={[4, 4, 4]} />
              <meshStandardMaterial map={texture} color={blockColors[index]} roughness={1} />
              <Text position={[2.25, 0, 0]} fontSize={1} color="#CBD5E1" rotation={[0, Math.PI / 2, 0]}>
                {`L${lineIndex}-P${posIndex}`}
              </Text>
              <Text position={[-2.25, 0, 0]} fontSize={1} color="#CBD5E1" rotation={[0, -Math.PI / 2, 0]}>
                {`L${lineIndex}-P${posIndex}`}
              </Text>
              {index === 0 && (
                <Text position={[0, 0, 2.25]} fontSize={2} color="#CBD5E1" rotation={[0, 0, 0]}>
                  {`B0${props.boxid}`}
                </Text>
              )}
            </mesh>
          );
        })
      }
    </group>
  )
}


interface streetprops {
  streetid: string
  x: number
  y: number
  z: number
}

export function Street(props: streetprops) {
  const textRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    if (textRef.current) {
      // Calculate the horizontal angle between the camera and the text
      const angle = Math.atan2(
        camera.position.x - props.x,
        camera.position.z - 0
      )
      textRef.current.rotation.y = angle
    }
  })

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        window.location.href = `/rua?street=${props.streetid}`
      }}
    >
      <lineSegments
        position={[props.x, props.y + 21, props.z - 13]}
        scale={[
          1.1,
          1.1,
          1.1,
        ]}>
        <edgesGeometry args={[
          new BoxGeometry(
            5,
            35,
            20,
          )]} />
        <lineBasicMaterial
          color={hovered ? "#FF0000" : "#94A3B8"}
        />
      </lineSegments>
      <Text ref={textRef} position={[props.x, props.y + 18 + (7 * 4), props.z - 10]} fontSize={5} color="black">
        {`R${props.streetid}`}
      </Text>
      <Box x={props.x} y={props.y + 18 + 7 + 7} z={0} title={'teste'} numlines={4} numposperline={1} boxid={4} fillpct={3} />
      <Box x={props.x} y={props.y + 18 + 7} z={0} title={'teste'} numlines={4} numposperline={1} boxid={3} fillpct={25} />
      <Box x={props.x} y={props.y + 18} z={0} title={'teste'} numlines={4} numposperline={1} boxid={2} fillpct={75} />
      <Box x={props.x} y={props.y + 0} z={0} title={'teste'} numlines={4} numposperline={3} boxid={1} fillpct={100} />
    </group>
  )
}
