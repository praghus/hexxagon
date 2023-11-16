import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isEmpty from 'lodash.isempty'

import { selectBoard, selectPoints, selectStatus } from '../../store/game/selectors'
import { resetGame, setData } from '../../store/game/actions'
import { getStatusTitle } from '../../utils/helpers'
import { LevelData } from '../../store/game/types'
import { LEVELS } from '../../constants'
import { BoardPreview } from '../BoardPreview'
import { Modal } from '../Modal'

import './Status.css'

function Status() {
    const status = useSelector(selectStatus)
    const { data } = useSelector(selectBoard)
    const { computerPoints, playerPoints } = useSelector(selectPoints)

    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

    const dispatch = useDispatch()
    const onRestart = () => {
        setIsConfirmationDialogOpen(false)
        dispatch(resetGame())
    }
    const onSelectLevel = (data: LevelData) => dispatch(setData(data))

    const progress = (playerPoints / (computerPoints + playerPoints)) * 100
    const isNewGame = isEmpty(data)
    const isCompleted = status > 0

    return (
        <>
            {!isNewGame && (
                <>
                    <BoardPreview
                        {...{ data }}
                        className="boardPreview"
                        onClick={() => setIsConfirmationDialogOpen(true)}
                    />
                    <div className="boardChangeHint">Change the board</div>

                    <div className="status">
                        <div className="points">{playerPoints}</div>
                        <div className="statusBar">
                            <div className="progressBar" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="points">{computerPoints}</div>
                    </div>
                </>
            )}

            <Modal isOpen={isNewGame} title="HEXXAGON">
                <div className="levelSelect">
                    {Object.values(LEVELS).map((d, i) => (
                        <BoardPreview key={`level-${i}`} className="thumb" onClick={() => onSelectLevel(d)} data={d} />
                    ))}
                </div>
            </Modal>

            <Modal isOpen={isCompleted} title={getStatusTitle(status)}>
                <button className="button" onClick={onRestart}>
                    Play again
                </button>
            </Modal>

            <Modal isOpen={isConfirmationDialogOpen} title="Are you sure you want to change the board?">
                <div className="button-container">
                    <button className="button" onClick={onRestart}>
                        Yes
                    </button>
                    <button className="button" onClick={() => setIsConfirmationDialogOpen(false)}>
                        No
                    </button>
                </div>
            </Modal>

            <div className="copyrights">&copy;2023 Piotr Praga</div>
        </>
    )
}

export default Status
