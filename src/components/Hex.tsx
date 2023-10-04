import { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFrame } from '@react-three/fiber'
import { Color, CylinderGeometry, InstancedBufferAttribute, Mesh, Shader } from 'three'
import { selectBoard, selectStatus } from '../store/game/selectors'
import { animated, config, useSpring } from '@react-spring/three'
import { Vec3 } from '../types'

const uniformsTime = { value: 0 }

const onBeforeCompile = (shader: Shader) => {
    shader.uniforms.time = uniformsTime
    shader.vertexShader = `
    attribute vec3 instColor;
    attribute vec2 colorPhase;
    varying vec3 vPos;
    varying vec3 vInstColor;
    varying vec2 vColorPhase;
    ${shader.vertexShader}
  `.replace(
        `#include <fog_vertex>`,
        `#include <fog_vertex>
    vPos = vec3(transformed);
    vInstColor = vec3(instColor);
    vColorPhase = colorPhase;
  `
    )
    shader.fragmentShader = `
    uniform float time;
    uniform float globalBloom;
    varying vec3 vPos;
    varying vec3 vInstColor;
    varying vec2 vColorPhase;
    ${shader.fragmentShader}
  `.replace(
        `#include <dithering_fragment>`,
        `#include <dithering_fragment>
      
      gl_FragColor = globalBloom > 0.5 ? vec4(0, 0, 0, 1) : gl_FragColor;

      float t = sin(time * PI * vColorPhase.y + vColorPhase.x) * 0.5 + 0.5;
      vec3 c = mix(gl_FragColor.rgb, vInstColor, t);
  
      float a = smoothstep(0.015, 0.04, abs(vPos.y));
      gl_FragColor.rgb = mix(c, gl_FragColor.rgb, a );
  `
    )
}

interface Props {
    id: number
    num: number
    onClick: () => void
    position: Vec3
}

function Hex({ id, onClick, position }: Props) {
    const meshRef = useRef<Mesh>(null!)
    const shapeRef = useRef<CylinderGeometry>(null!)

    const [hovered, hover] = useState(false)

    const { possibleGreen, possibleYellow, selectedPos } = useSelector(selectBoard)
    const { compPoints, userPoints } = useSelector(selectStatus)

    const selected = selectedPos === id
    const lifted = [...possibleGreen, ...possibleYellow].includes(id) || selected

    const color = useMemo(() => {
        if (possibleGreen.includes(id) || selected) return 0x88ff88
        if (possibleYellow.includes(id)) return 0xffff88
        return hovered ? 0xffffff : 0xdedede
    }, [id, hovered, possibleGreen, possibleYellow, selected])

    const { animatedPosition, scale } = useSpring({
        animatedPosition: (lifted ? [position[0], 0.55, position[2]] : [position[0], 0.5, position[2]]) as Vec3,
        scale: (lifted ? [1, 2, 1] : [1, 1, 1]) as Vec3,
        config: config.wobbly
    })

    useFrame(({ clock }) => {
        const c = userPoints >= compPoints ? 0x0000ff : 0xff0000
        shapeRef.current.setAttribute(
            'instColor',
            new InstancedBufferAttribute(new Float32Array(new Color(lifted ? color : c)), 3)
        )
        shapeRef.current.setAttribute(
            'colorPhase',
            new InstancedBufferAttribute(new Float32Array(new Color(0x88ff88)), 2)
        )
        uniformsTime.value = clock.getElapsedTime()
    })

    return (
        <animated.mesh
            {...{ onClick, scale }}
            ref={meshRef}
            position={animatedPosition}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            castShadow
            receiveShadow
        >
            <cylinderGeometry ref={shapeRef} args={[0.5, 0.5, 0.1, 6]} />
            <meshStandardMaterial
                {...{ color, onBeforeCompile }}
                transparent
                roughness={0.1}
                metalness={0.5}
                opacity={0.95}
            />
        </animated.mesh>
    )
}

export default Hex
