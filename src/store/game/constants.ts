import { LEVELS } from '../../constants'
import { LevelData } from './types'

export const GAME_RESOURCE_NAME = 'game'
export const INITIAL_STATE = {
    board: {
        data: [] as LevelData,
        possibleGreen: [] as number[],
        possibleYellow: [] as number[],
        selectedPos: -1,
        spreedPos: -1
    },
    currentLevel: null as keyof typeof LEVELS | null,
    isPlayerTurn: true,
    status: 0
}
export const GAME_EVENT_COMPUTER_MOVE = `${GAME_RESOURCE_NAME}/GAME_EVENT_COMPUTER_MOVE`
export const GAME_EVENT_PLAYER_MOVE = `${GAME_RESOURCE_NAME}/GAME_EVENT_PLAYER_MOVE`
export const GAME_REPLAY = `${GAME_RESOURCE_NAME}/GAME_REPLAY`
export const GAME_RESET = `${GAME_RESOURCE_NAME}/GAME_RESET`
export const GAME_SET_CURRENT_LEVEL = `${GAME_RESOURCE_NAME}/GAME_SET_CURRENT_LEVEL`
export const GAME_SET_DATA = `${GAME_RESOURCE_NAME}/GAME_SET_DATA`
export const GAME_SET_PLAYER_TURN = `${GAME_RESOURCE_NAME}/GAME_SET_PLAYER_TURN`
export const GAME_SET_POSSIBLE_GREEN = `${GAME_RESOURCE_NAME}/GAME_SET_POSSIBLE_GREEN`
export const GAME_SET_POSSIBLE_YELLOW = `${GAME_RESOURCE_NAME}/GAME_SET_POSSIBLE_YELLOW`
export const GAME_SET_POSITION = `${GAME_RESOURCE_NAME}/GAME_SET_POSITION`
export const GAME_SET_SPREED_POSITION = `${GAME_RESOURCE_NAME}/GAME_SET_SPREED_POSITION`
export const GAME_SET_STATUS = `${GAME_RESOURCE_NAME}/GAME_SET_STATUS`
