import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Environment, Stats, useEnvironment } from '@react-three/drei'
import isEmpty from 'lodash.isempty'

import { selectBoard, selectIsPlayerTurn } from '../../store/game/selectors'
import { computerMove, playerMove } from '../../store/game/actions'
import { calculatePosition } from '../../utils/helpers'
// import { useHelpers } from '../hooks/useHelpers'
import Hex from './Hex'
import Pawn from './Pawn'

function Board() {
    const { data } = useSelector(selectBoard)
    const isPlayerTurn = useSelector(selectIsPlayerTurn)
    const envMap = useEnvironment({ path: '/environment/buildings' })
    const dispatch = useDispatch()
    const onPlayerMove = (pos: number) => dispatch(playerMove(pos))

    // const { dirLight, grid } = useHelpers()

    useEffect(() => {
        let timeout: number
        if (!isPlayerTurn) {
            timeout = setTimeout(() => {
                dispatch(computerMove())
            }, 1000)
        }
        return () => clearTimeout(timeout)
    }, [isPlayerTurn, dispatch])

    return (
        <>
            <Environment map={envMap} />
            <ambientLight color={0x9999ff} />
            <directionalLight position={[-2.5, 10, -5]} castShadow />
            <mesh rotation={[0, Math.PI * 0.5, 0]}>
                {!isEmpty(data) &&
                    data.map((num, id) => {
                        if (num !== null) {
                            const props = {
                                id,
                                num,
                                onClick: () => onPlayerMove(id),
                                position: calculatePosition(id)
                            }
                            return [
                                <Hex {...props} key={`hex-${id}`} />,
                                num !== 0 && <Pawn {...props} key={`pawn-${id}`} />
                            ]
                        }
                    })}
            </mesh>
            <Stats />
            {/* <gridHelper /> */}
        </>
    )
}

export default Board
