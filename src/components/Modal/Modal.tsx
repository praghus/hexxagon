import { animated, useTransition } from 'react-spring'
import { ReactNode } from 'react'

import './Modal.css'

interface Props {
    title?: string
    children?: ReactNode
    isOpen: boolean
}

const Modal = ({ children, title, isOpen }: Props) => {
    const transition = useTransition(isOpen, {
        from: { opacity: 0, scale: 2, transform: 'translateY(-400px)' },
        enter: { opacity: 1, scale: 1, transform: 'translateY(0px)' },
        leave: { opacity: 0, scale: 0, transform: 'translateY(-400px)' }
    })

    return transition((style, isOpen) =>
        isOpen ? (
            <animated.div {...{ style }} className="modal">
                <h3 className="modal-title">{title}</h3>
                {children}
            </animated.div>
        ) : null
    )
}

export default Modal
