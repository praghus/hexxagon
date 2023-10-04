import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, PolyhedronGeometry, Vector3 } from 'three'
import { Vec3 } from '../types'

interface Props {
    id: number
    onClick: () => void
    position: Vec3
}

function Rubie({ onClick, position }: Props) {
    const scaleRef = useRef(0)
    const meshRef = useRef<Mesh>(null!)
    const shapeRef = useRef<PolyhedronGeometry>(null!)

    useFrame((_state, delta) => {
        const ROTATE_TIME = 30 // Time in seconds for a full rotation
        const xAxis = new Vector3(1, 0, 0)
        const yAxis = new Vector3(0, 1, 0)
        const rotateX = (delta / ROTATE_TIME) * Math.PI * 2
        const rotateY = (delta / ROTATE_TIME) * Math.PI * 2

        meshRef.current.position.y = 1
        meshRef.current.rotateOnWorldAxis(xAxis, rotateX)
        meshRef.current.rotateOnWorldAxis(yAxis, rotateY)

        if (scaleRef.current < 4) {
            scaleRef.current += 0.2
            meshRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current)
        }

        // if (options.enableSwoopingCamera) {
        //   camera.position.x = Math.sin((time / 10) * Math.PI * 2) * 3;
        //   camera.position.y = Math.cos((time / 10) * Math.PI * 2) * 3;
        //   camera.position.z = 4;
        //   camera.lookAt(scene.position);
        // }
    })

    return (
        <mesh {...{ onClick, position }} ref={meshRef} castShadow receiveShadow>
            <icosahedronGeometry ref={shapeRef} args={[0.1, 0]} />
            <meshPhongMaterial color={0xff0000} opacity={0.9} transparent />
        </mesh>
    )
}

export default Rubie
