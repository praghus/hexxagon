import {
    GAME_SET_DATA,
    GAME_SET_PLAYER_TURN,
    GAME_SET_POSITION,
    GAME_SET_POSSIBLE_GREEN,
    GAME_SET_POSSIBLE_YELLOW
} from './constants'

const setData = (data: number[]) => ({
    payload: { data },
    type: GAME_SET_DATA
})
const setPlayerTurn = (isPlayerTurn: boolean) => ({
    payload: { isPlayerTurn },
    type: GAME_SET_PLAYER_TURN
})
const setPosition = (selectedPos: number | null) => ({
    payload: { selectedPos },
    type: GAME_SET_POSITION
})
const setPossibleGreen = (possibleGreen: number[]) => ({
    payload: { possibleGreen },
    type: GAME_SET_POSSIBLE_GREEN
})
const setPossibleYellow = (possibleYellow: number[]) => ({
    payload: { possibleYellow },
    type: GAME_SET_POSSIBLE_YELLOW
})

export { setData, setPlayerTurn, setPosition, setPossibleGreen, setPossibleYellow }
