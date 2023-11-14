import { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFrame } from '@react-three/fiber'
import { animated, config, useSpring } from '@react-spring/three'
import { Color, CylinderGeometry, InstancedBufferAttribute, Mesh, Shader } from 'three'
import { selectBoard, selectPoints } from '../../store/game/selectors'
import { Vec3 } from '../../types'

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
      float a = smoothstep(0.015, 0.04, abs(vPos.y));
      vec3 c = mix(gl_FragColor.rgb, vInstColor, t);
  
      gl_FragColor.rgb = mix(c, gl_FragColor.rgb, a );
  `
    )
}

interface Props {
    id: number
    num: number | null
    onClick: () => void
    position: Vec3
}

function Hex({ id, onClick, position }: Props) {
    const meshRef = useRef<Mesh>(null!)
    const shapeRef = useRef<CylinderGeometry>(null!)

    const [hovered, hover] = useState(false)

    const { computerPoints, playerPoints } = useSelector(selectPoints)
    const { possibleGreen, possibleYellow, selectedPos } = useSelector(selectBoard)

    const selected = selectedPos === id
    const lifted = [...possibleGreen, ...possibleYellow].includes(id) || selected

    const color = useMemo(() => {
        if (possibleGreen.includes(id) || selected) return 0x88ff88
        if (possibleYellow.includes(id)) return 0xffff88
        return hovered ? 0xffffff : 0xdedeff
    }, [id, hovered, possibleGreen, possibleYellow, selected])

    const { animatedPosition, scale } = useSpring({
        animatedPosition: (lifted ? [position[0], 0.55, position[2]] : [position[0], 0.5, position[2]]) as Vec3,
        scale: (lifted ? [1, 2, 1] : [1, 1, 1]) as Vec3,
        config: config.wobbly
    })

    useFrame(({ clock }) => {
        const c = playerPoints > computerPoints ? 0x0000ff : (playerPoints === computerPoints && 0x555555) || 0xff0000
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
            <meshStandardMaterial {...{ color, onBeforeCompile }} roughness={0.6} metalness={0.4} />
        </animated.mesh>
    )
}

export default Hex
