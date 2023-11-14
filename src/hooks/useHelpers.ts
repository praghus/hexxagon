import { useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef, useState } from 'react'
import { Color, DirectionalLight, DirectionalLightHelper } from 'three'

export const useHelpers = () => {
    const [grid, setGrid] = useState(false)
    const dirLight = useRef<DirectionalLight>(null!)

    useHelper(dirLight, DirectionalLightHelper, 1, 'red')

    useControls('Grid', {
        visible: {
            value: false,
            onChange: v => {
                setGrid(v)
            }
        }
    })

    useControls('Directional Light', {
        visible: {
            value: true,
            onChange: v => {
                dirLight.current.visible = v
            }
        },
        position: {
            value: { x: -2.5, y: 10, z: -5 },
            onChange: v => {
                dirLight.current.position.copy(v)
            }
        },
        color: {
            value: 'white',
            onChange: v => {
                dirLight.current.color = new Color(v)
            }
        }
    })

    return { dirLight, grid }
}
