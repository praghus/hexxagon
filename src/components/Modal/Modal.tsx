import { useMemo } from 'react'
import { SpringValue, animated } from 'react-spring'

import './Modal.css'

interface Props {
    onClose: () => void
    status: number
    style: Record<string, SpringValue<number> | SpringValue<string>>
}

const Modal = ({ status, style, onClose }: Props) => {
    const title = useMemo(() => {
        switch (status) {
            case -1:
                return 'Game Draw! Try Again'
            case 1:
                return 'Game completed. You Won!'
            case 2:
                return 'Computer Wins! Try Again'
        }
    }, [status])
    // if (userPoints === compPoints) {
    //     console.info()
    //     status = -1
    // } else if (userPoints > compPoints) {
    //     console.info()
    //     status = 1
    // } else {
    //     console.info()
    //     status = 2
    // }

    return (
        <animated.div style={style} className="modal">
            <h3 className="modal-title">{title}</h3>
            {/* <p className="modal-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolores molestias praesentium impedit.
                Facere, perferendis voluptate at, amet excepturi ratione mollitia nemo ipsum odit impedit doloremque
                rerum. Quisquam, dolorum at?
            </p> */}
            <button className="modal-close-button" onClick={onClose}>
                Play again
            </button>
        </animated.div>
    )
}

export default Modal
