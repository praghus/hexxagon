import { LEVELS } from '../../constants'
import { LevelData } from './types'
import {
    GAME_EVENT_COMPUTER_MOVE,
    GAME_EVENT_PLAYER_MOVE,
    GAME_REPLAY,
    GAME_RESET,
    GAME_SET_CURRENT_LEVEL,
    GAME_SET_DATA,
    GAME_SET_PLAYER_TURN,
    GAME_SET_POSITION,
    GAME_SET_POSSIBLE_GREEN,
    GAME_SET_POSSIBLE_YELLOW,
    GAME_SET_SPREED_POSITION,
    GAME_SET_STATUS
} from './constants'

const computerMove = () => ({
    type: GAME_EVENT_COMPUTER_MOVE
})

const playerMove = (pos: number | null) => ({
    payload: { pos },
    type: GAME_EVENT_PLAYER_MOVE
})

const resetGame = () => ({
    type: GAME_RESET
})

const replayGame = () => ({
    type: GAME_REPLAY
})

const setData = (data: LevelData) => ({
    payload: { data },
    type: GAME_SET_DATA
})

const setCurrentLevel = (level: keyof typeof LEVELS) => ({
    payload: { level },
    type: GAME_SET_CURRENT_LEVEL
})

const setPlayerTurn = (isPlayerTurn: boolean) => ({
    payload: { isPlayerTurn },
    type: GAME_SET_PLAYER_TURN
})

const setPosition = (selectedPos: number) => ({
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

const setSpreedPosition = (spreedPos: number) => ({
    payload: { spreedPos },
    type: GAME_SET_SPREED_POSITION
})

const setStatus = (status: number) => ({
    payload: { status },
    type: GAME_SET_STATUS
})

export {
    computerMove,
    playerMove,
    resetGame,
    replayGame,
    setCurrentLevel,
    setData,
    setPlayerTurn,
    setPosition,
    setPossibleGreen,
    setPossibleYellow,
    setSpreedPosition,
    setStatus
}
