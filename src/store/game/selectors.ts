import { createSelector } from 'reselect'

import { RootState } from '../store'
import { GameState } from './types'
import { GAME_RESOURCE_NAME, INITIAL_STATE } from './constants'
import { CELLS } from '../../constants'

export const selectGame = (state: RootState): GameState => state[GAME_RESOURCE_NAME] || INITIAL_STATE
export const selectCurrentLevel = createSelector(selectGame, ({ currentLevel }) => currentLevel)
export const selectBoard = createSelector(selectGame, ({ board }) => board)
export const selectStatus = createSelector(selectGame, ({ status }) => status)
export const selectIsPlayerTurn = createSelector(selectGame, ({ isPlayerTurn }) => isPlayerTurn)
export const selectPoints = createSelector(selectBoard, ({ data }) => ({
    computerPoints: data.filter(x => x === Math.abs(CELLS.COMPUTER)).length,
    playerPoints: data.filter(x => x === Math.abs(CELLS.PLAYER)).length
}))
