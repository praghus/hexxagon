import { AnyAction } from '@reduxjs/toolkit'

import {
    INITIAL_STATE,
    GAME_SET_CURRENT_LEVEL,
    GAME_SET_DATA,
    GAME_SET_PLAYER_TURN,
    GAME_SET_POSITION,
    GAME_SET_POSSIBLE_GREEN,
    GAME_SET_POSSIBLE_YELLOW,
    GAME_SET_SPREED_POSITION,
    GAME_SET_STATUS,
    GAME_RESET,
    GAME_REPLAY
} from './constants'
import { GameState } from './types'
import { LEVELS } from '../../constants'

function gameReducer(state = INITIAL_STATE, action: AnyAction): GameState {
    switch (action.type) {
        case GAME_SET_DATA:
            return { ...state, board: { ...state.board, data: action.payload.data } }
        case GAME_SET_CURRENT_LEVEL:
            return {
                ...state,
                currentLevel: action.payload.level,
                board: { ...state.board, data: LEVELS[action.payload.level] }
            }
        case GAME_SET_PLAYER_TURN:
            return { ...state, isPlayerTurn: action.payload.isPlayerTurn }
        case GAME_SET_POSITION:
            return { ...state, board: { ...state.board, selectedPos: action.payload.selectedPos } }
        case GAME_SET_POSSIBLE_GREEN:
            return { ...state, board: { ...state.board, possibleGreen: action.payload.possibleGreen } }
        case GAME_SET_POSSIBLE_YELLOW:
            return { ...state, board: { ...state.board, possibleYellow: action.payload.possibleYellow } }
        case GAME_SET_SPREED_POSITION:
            return { ...state, board: { ...state.board, spreedPos: action.payload.spreedPos } }
        case GAME_SET_STATUS:
            return { ...state, status: action.payload.status }
        case GAME_REPLAY:
            return {
                ...INITIAL_STATE,
                board: { ...INITIAL_STATE.board, data: state.currentLevel ? LEVELS[state.currentLevel] : [] }
            }
        case GAME_RESET:
            return INITIAL_STATE
        default:
            return state
    }
}

export default gameReducer
