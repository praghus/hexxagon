import {
    GAME_EVENT_COMPUTER_MOVE,
    GAME_EVENT_PLAYER_MOVE,
    GAME_SET_DATA,
    GAME_SET_PLAYER_TURN,
    GAME_SET_POSITION,
    GAME_SET_POSSIBLE_GREEN,
    GAME_SET_POSSIBLE_YELLOW,
    GAME_SET_STATUS
} from './constants'

const computerMove = () => ({
    type: GAME_EVENT_COMPUTER_MOVE
})
const playerMove = (pos: number | null) => ({
    payload: { pos },
    type: GAME_EVENT_PLAYER_MOVE
})
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
const setStatus = (status: { userPoints: number; compPoints: number; win: number }) => ({
    payload: { status },
    type: GAME_SET_STATUS
})

export { computerMove, playerMove, setData, setPlayerTurn, setPosition, setPossibleGreen, setPossibleYellow, setStatus }
