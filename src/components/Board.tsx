import { useDispatch, useSelector } from 'react-redux'
import { selectBoard } from '../store/game/selectors'
import { playerMove } from '../store/game/actions'
import { COLUMNS } from '../store/game/constants'
import { Hex, Pawn } from '../components'
import { Environment, Stats, useEnvironment } from '@react-three/drei'
import { Color, DirectionalLight } from 'three'
import { useRef, useState } from 'react'
import { useControls } from 'leva'
import { Vec3 } from '../types'

const unit = Math.sqrt(3) * 0.5 * 1.025

function Board() {
    const [grid, setGrid] = useState(false)
    const dirLight = useRef<DirectionalLight>(null!)
    const { data } = useSelector(selectBoard)
    const dispatch = useDispatch()
    const onPlayerMove = (pos: number) => dispatch(playerMove(pos))
    const envMap = useEnvironment({ path: '/environment/buildings' })

    // useHelper(dirLight, DirectionalLightHelper, 1, 'red')

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

    return (
        <>
            <Environment map={envMap} />
            <ambientLight color={0x9999ff} />
            <directionalLight ref={dirLight} position={[-2.5, 10, -5]} castShadow />
            <mesh rotation={[0, Math.PI * 0.5, 0]}>
                {data.map((num, i) => {
                    const [row, col] = [Math.floor(i / COLUMNS), i % COLUMNS]
                    const id = parseInt(`${row}${col}`)
                    const props = {
                        id,
                        num,
                        onClick: () => onPlayerMove(id),
                        position: [-5.3 + col * unit + (row * unit) / 2, 0, -3 + row * 0.77] as Vec3
                    }
                    return [
                        num !== -1 && <Hex {...props} key={`hex-${id}`} />,
                        num > 0 && <Pawn {...props} key={`pawn-${id}`} />
                    ]
                })}
            </mesh>
            <Stats />
            {grid && <gridHelper />}
        </>
    )
}

export default Board
