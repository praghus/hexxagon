import { AnyAction } from '@reduxjs/toolkit'
import {
    INITIAL_STATE,
    GAME_SET_DATA,
    GAME_SET_PLAYER_TURN,
    GAME_SET_POSITION,
    GAME_SET_POSSIBLE_GREEN,
    GAME_SET_POSSIBLE_YELLOW
} from './constants'
import { GameState } from './types'

function gameReducer(state = INITIAL_STATE, action: AnyAction): GameState {
    switch (action.type) {
        case GAME_SET_DATA:
            return { ...state, board: { ...state.board, data: action.payload.data } }
        case GAME_SET_PLAYER_TURN:
            return { ...state, isPlayerTurn: action.payload.isPlayerTurn }
        case GAME_SET_POSITION:
            return { ...state, board: { ...state.board, selectedPos: action.payload.selectedPos } }
        case GAME_SET_POSSIBLE_GREEN:
            return { ...state, board: { ...state.board, possibleGreen: action.payload.possibleGreen } }
        case GAME_SET_POSSIBLE_YELLOW:
            return { ...state, board: { ...state.board, possibleYellow: action.payload.possibleYellow } }
        default:
            return state
    }
}

export default gameReducer
