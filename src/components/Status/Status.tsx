import { useDispatch, useSelector } from 'react-redux'
import { useTransition } from 'react-spring'
import { resetGame } from '../../store/game/actions'
import { selectPoints, selectStatus } from '../../store/game/selectors'
import { Modal } from '../Modal'
import './Status.css'

function Status() {
    const status = useSelector(selectStatus)
    const { computerPoints, playerPoints } = useSelector(selectPoints)

    const dispatch = useDispatch()
    const onClose = () => dispatch(resetGame())
    const isOpen = status > 0

    const transition = useTransition(isOpen, {
        from: { opacity: 0, scale: 0, transform: 'translateY(-440px)' },
        enter: { opacity: 1, scale: 1, transform: 'translateY(0px)' },
        leave: { opacity: 0, scale: 0, transform: 'translateY(-440px)' }
    })

    const progress = playerPoints / (computerPoints + playerPoints)
    console.info(progress)
    return (
        <>
            <div className="status">
                <div className="points">{playerPoints}</div>
                <div className="statusBar">
                    <div className="progressBar" style={{ width: `${progress * 100}%` }} />
                </div>
                <div className="points">{computerPoints}</div>
            </div>
            {transition((style, isOpen) => (isOpen ? <Modal {...{ status, style, onClose }} /> : null))}
        </>
    )
}

export default Status
