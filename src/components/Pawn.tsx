import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, SphereGeometry } from 'three'
import { animated, config, useSpring } from '@react-spring/three'
import { Vec3 } from '../types'

interface Props {
    id: number
    num: number
    onClick: () => void
    position: Vec3
}

function Pawn({ num, onClick, position }: Props) {
    const meshRef = useRef<Mesh>(null!)
    const shapeRef = useRef<SphereGeometry>(null!)
    const [active, setActive] = useState(false)

    const { scale } = useSpring({
        scale: active ? 3.2 : 1,
        config: config.wobbly
        // onRest: e => console.info(e)
    })

    useEffect(() => {
        setActive(true)
    }, [num])

    useFrame(({ clock }) => {
        meshRef.current.position.y = 1 - Math.sin(clock.getElapsedTime()) * 0.05
    })

    return (
        <animated.mesh {...{ position, scale, onClick }} ref={meshRef} castShadow receiveShadow>
            <sphereGeometry ref={shapeRef} args={[0.1, 24, 24]} />
            <meshStandardMaterial color={num === 1 ? 0x3333ff : 0xff3333} roughness={0.1} metalness={0.5} />
        </animated.mesh>
    )
}

export default Pawn
