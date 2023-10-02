import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Clock, Mesh, SphereGeometry } from 'three'

const clock = new Clock()

interface Props {
    id: number
    num: number
    onClick: () => void
    position: [x: number, y: number, z: number]
}

function Pearl({ onClick, position }: Props) {
    const scaleRef = useRef(0)
    const meshRef = useRef<Mesh>(null!)
    const shapeRef = useRef<SphereGeometry>(null!)

    useFrame(() => {
        const t = clock.getElapsedTime()
        meshRef.current.position.y = 1 - Math.sin(t * 2) * 0.025
        if (scaleRef.current < 3) {
            scaleRef.current += 0.2
            meshRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current)
        }
    })

    return (
        <mesh {...{ onClick, position }} ref={meshRef} castShadow receiveShadow>
            <sphereGeometry ref={shapeRef} args={[0.1, 24, 24]} />
            {/* <meshStandardMaterial color={num === 1 ? 0xffffff : 0xff0000} roughness={0.1} metalness={0} /> */}
            <meshNormalMaterial />
        </mesh>
    )
}

export default Pearl
