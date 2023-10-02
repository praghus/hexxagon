import { createSelector } from 'reselect'
import { RootState } from '../store'
import { GameState } from './types'
import { GAME_RESOURCE_NAME, INITIAL_STATE } from './constants'

export const selectGame = (state: RootState): GameState => state[GAME_RESOURCE_NAME] || INITIAL_STATE
export const selectBoard = createSelector(selectGame, ({ board }) => board)
export const selectIsPlayerTurn = createSelector(selectGame, ({ isPlayerTurn }) => isPlayerTurn)
