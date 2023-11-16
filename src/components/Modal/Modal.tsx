import { animated, useTransition } from 'react-spring'
import { ReactNode } from 'react'

import './Modal.css'

interface Props {
    title?: string
    children?: ReactNode
    isOpen: boolean
    width: number
    height: number
}

const Modal = ({ children, title, width, height, isOpen }: Props) => {
    const transition = useTransition(isOpen, {
        from: { width, height, opacity: 0, scale: 2, transform: 'translateY(-400px)' },
        enter: { width, height, opacity: 1, scale: 1, transform: 'translateY(0px)' },
        leave: { width, height, opacity: 0, scale: 0, transform: 'translateY(-400px)' }
    })

    return transition((style, isOpen) =>
        isOpen ? (
            <animated.div {...{ style }} className="modal">
                <div className="modal-title">{title}</div>
                {children}
            </animated.div>
        ) : null
    )
}

Modal.defaultProps = {
    width: 410,
    height: 115
}

export default Modal
