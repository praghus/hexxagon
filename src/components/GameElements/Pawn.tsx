import { useEffect, useMemo, useRef, useState } from 'react'
import { Mesh, SphereGeometry } from 'three'
import { useSelector } from 'react-redux'
import { animated, config, useSpring } from '@react-spring/three'
import { Vec3 } from '../../types'
import { selectBoard } from '../../store/game/selectors'
import { calculatePosition } from '../../utils/helpers'

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
    const { spreedPos } = useSelector(selectBoard)
    const startPos = spreedPos > -1 ? calculatePosition(spreedPos) : position

    const color = useMemo(() => {
        switch (num) {
            case 1:
            case -2:
                return 0x3333ff
            case 2:
            case -1:
                return 0xff3333
        }
    }, [num])

    const { animatedPosition, scale } = useSpring({
        animatedPosition: (active ? [position[0], 1, position[2]] : [startPos[0], 1, startPos[2]]) as Vec3,
        scale: num > 0 ? 3.5 : 2.5,
        config: config.gentle
    })

    useEffect(() => {
        setActive(true)
    }, [])

    return (
        <animated.mesh {...{ scale, onClick }} position={animatedPosition} ref={meshRef} castShadow receiveShadow>
            <sphereGeometry ref={shapeRef} args={[0.1, 24, 24]} />
            <meshStandardMaterial {...{ color }} roughness={0.4} metalness={0.6} />
        </animated.mesh>
    )
}

export default Pawn
