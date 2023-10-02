import { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFrame } from '@react-three/fiber'
import { Clock, Color, CylinderGeometry, InstancedBufferAttribute, Mesh, Shader } from 'three'
import { selectBoard } from '../store/game/selectors'

const clock = new Clock()

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
  
      float a = smoothstep(0.015, 0.02 + (1. - t) * 0.03, abs(vPos.y));
      gl_FragColor.rgb = mix(c, gl_FragColor.rgb, a );
  `
    )
}

interface Props {
    id: number
    num: number
    onClick: () => void
    position: [x: number, y: number, z: number]
}

function Hex({ id, onClick, position }: Props) {
    const meshRef = useRef<Mesh>(null!)

    const [hovered, hover] = useState(false)

    const { possibleGreen, possibleYellow, selectedPos } = useSelector(selectBoard)

    const selected = selectedPos === id

    const geometry = useMemo(() => {
        const g = new CylinderGeometry(0.5, 0.5, 0.1, 6)
        g.setAttribute('instColor', new InstancedBufferAttribute(new Float32Array(new Color(0xff0000)), 3))
        g.setAttribute('colorPhase', new InstancedBufferAttribute(new Float32Array(new Color(0x88ff88)), 2))
        return g
    }, [])

    const getColor = () => {
        if (possibleGreen.includes(id) || selected) return 0x88ff88
        if (possibleYellow.includes(id)) return 0xffff88
        return hovered ? 0xffffff : 0xf0f0f0
    }

    useFrame(() => {
        uniformsTime.value = clock.getElapsedTime()
        meshRef.current.position.y = [...possibleGreen, ...possibleYellow].includes(id) || selected ? 0.55 : 0.5
    })

    return (
        <mesh
            {...{ geometry, onClick, position }}
            ref={meshRef}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            castShadow
            receiveShadow
        >
            <meshStandardMaterial {...{ onBeforeCompile }} color={getColor()} roughness={0.75} metalness={0.25} />
        </mesh>
    )
}

export default Hex
