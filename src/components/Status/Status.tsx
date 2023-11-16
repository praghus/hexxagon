import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isEmpty from 'lodash.isempty'

import { selectBoard, selectPoints, selectStatus } from '../../store/game/selectors'
import { replayGame, resetGame, setCurrentLevel } from '../../store/game/actions'
import { getStatusTitle, isValidArray } from '../../utils/helpers'
import { usePreventUnload } from '../../hooks/usePreventUnload'
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

    const onSelectLevel = (level: keyof typeof LEVELS) => dispatch(setCurrentLevel(level))

    const onRestart = () => {
        setIsConfirmationDialogOpen(false)
        dispatch(resetGame())
    }

    const onReplay = () => {
        setIsConfirmationDialogOpen(false)
        dispatch(replayGame())
    }

    const progress = (playerPoints / (computerPoints + playerPoints)) * 100
    const isNewGame = isEmpty(data)
    const isCompleted = status > 0

    usePreventUnload(!isValidArray(data))

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

            <Modal isOpen={isNewGame} title="HEXXAGON" height={460}>
                <div className="levelSelect">
                    {Object.keys(LEVELS).map(key => (
                        <BoardPreview
                            className="thumb"
                            key={`level-${key}`}
                            data={LEVELS[key]}
                            onClick={() => onSelectLevel(key)}
                        />
                    ))}
                </div>
            </Modal>

            <Modal isOpen={isCompleted} title={getStatusTitle(status)}>
                <div className="button-container">
                    <button className="button" onClick={onReplay}>
                        Play again
                    </button>
                    <button className="button" onClick={onRestart}>
                        Exit
                    </button>
                </div>
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
