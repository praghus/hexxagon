import { calculatePosition, getPawnColor, isValidArray } from '../../utils/helpers'
import { LevelData } from '../../store/game/types'

import './BoardPreview.css'

interface Props {
    data: LevelData
    className?: string
    onClick?: () => void
}

function BoardPreview({ className, data, onClick }: Props) {
    const cells =
        isValidArray(data) &&
        data.map((num, id) => {
            if (num !== null) {
                const position = calculatePosition(id)
                return [
                    <polygon
                        key={id}
                        points="30,15 22.5,28 7.5,28 0,15 7.5,2 22.5,2"
                        fill={getPawnColor(num)}
                        transform={`translate(${-124 + position[0] * 30},${112 + position[2] * 30}) rotate(90)`}
                    />
                ]
            }
        })

    return (
        <div className={`board ${className || ''}`} {...{ onClick }}>
            <svg id="color-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
                <g transform="rotate(-90) scale(0.5)">{cells}</g>
            </svg>
        </div>
    )
}

export default BoardPreview
