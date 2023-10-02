import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { selectBoard, selectIsPlayerTurn } from '../store/game/selectors'
import { Stats, OrbitControls } from '@react-three/drei'
import { checkCompletedGame, checkNeighbourCells, computerPlays, findPossible } from '../utils/helpers'
import { setData, setPlayerTurn, setPosition, setPossibleGreen, setPossibleYellow } from '../store/game/actions'
import { COLUMNS } from '../store/game/constants'
import Hex from '../components/Hex'
import Pearl from '../components/Pearl'
import Rubie from '../components/Rubie'

import './App.css'

const unit = Math.sqrt(3) * 0.5 * 1.025

function App() {
    const { data, possibleGreen, possibleYellow, selectedPos } = useSelector(selectBoard)
    const isPlayerTurn = useSelector(selectIsPlayerTurn)

    const dispatch = useDispatch()
    const onUpdateBoard = (data: number[]) => dispatch(setData(data))
    const onSetPlayerTurn = (flag: boolean) => dispatch(setPlayerTurn(flag))
    const onSetPosition = (pos: number) => dispatch(setPosition(pos))
    const onClearPossibleArray = () => {
        dispatch(setPossibleGreen([]))
        dispatch(setPossibleYellow([]))
    }
    const onSetPossibleArray = ({
        possibleGreen,
        possibleYellow
    }: {
        possibleGreen: number[]
        possibleYellow: number[]
    }) => {
        dispatch(setPossibleGreen(possibleGreen))
        dispatch(setPossibleYellow(possibleYellow))
    }

    useEffect(() => {
        checkCompletedGame(data)
    }, [data])

    const onTileClick = (pos: number) => {
        if (isPlayerTurn) {
            if (data[pos] === 1 && selectedPos === -1) {
                onSetPosition(pos)
                onSetPossibleArray(findPossible(data, pos))
            } else {
                const newBoard = [...data]
                const possibleMove = [...possibleGreen.concat(possibleYellow), selectedPos]

                if (possibleMove.includes(pos)) {
                    let checkNeed = 0
                    if (selectedPos === pos) {
                        newBoard[pos] = 1
                        onSetPosition(-1)
                        checkNeed = 0
                    } else if (possibleGreen.includes(pos)) {
                        newBoard[pos] = 1
                        newBoard[selectedPos] = 1
                        onSetPosition(-1)
                        checkNeed = 1
                    } else if (possibleYellow.includes(pos)) {
                        newBoard[pos] = 1
                        newBoard[selectedPos] = 0
                        checkNeed = 1
                        onSetPosition(-1)
                    }
                    if (checkNeed != 0) {
                        const neighbourCells = checkNeighbourCells(data, pos, 2)
                        for (let i = 0; i < neighbourCells.length; i++) {
                            newBoard[neighbourCells[i]] = 1
                        }
                        // moves++
                        onSetPlayerTurn(false)
                        onUpdateBoard(newBoard)
                        setTimeout(() => {
                            onUpdateBoard(computerPlays(newBoard))
                            onSetPlayerTurn(true)
                        }, 500)
                    }
                    onClearPossibleArray()
                } else {
                    if (selectedPos === -1) {
                        console.info('Select Pearl...!')
                    } else {
                        console.info('Select Yellow, Green or Unselect Pearl ')
                    }
                }
            }
        }
    }

    return (
        <Canvas camera={{ position: [0, 5, 8], fov: 45 }} shadows>
            <color attach="background" args={['#220022']} />
            <ambientLight color={0xffffff} intensity={0.5} />
            <directionalLight position={[2.5, 8, 5]} castShadow />
            <Suspense fallback={<></>}>
                <mesh rotation={[0, Math.PI * 0.5, 0]}>
                    {data.map((num, i) => {
                        const [row, col] = [Math.floor(i / COLUMNS), i % COLUMNS]
                        const id = parseInt(`${row}${col}`)
                        const props = {
                            id,
                            num,
                            onClick: () => onTileClick(id),
                            position: [-5.3 + col * unit + (row * unit) / 2, 0, -3 + row * 0.77] as [
                                x: number,
                                y: number,
                                z: number
                            ]
                        }
                        return [
                            num !== -1 && <Hex {...props} key={`hex-${id}`} />,
                            num === 1 && <Pearl {...props} key={`pearl-${id}`} />,
                            num === 2 && <Rubie {...props} key={`rubie-${id}`} />
                        ]
                    })}
                </mesh>
            </Suspense>
            <Stats />
            <gridHelper />
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
            <EffectComposer>
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={400} intensity={2} radius={2} />
            </EffectComposer>
        </Canvas>
    )
}

export default App
