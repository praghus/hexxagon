export const GAME_RESOURCE_NAME = 'game'
export const COLUMNS = 10
export const INITIAL_STATE = {
    board: {
        data: [
            -1, -1, -1, -1, 1, 0, 0, 0, 2, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0,
            0, 0, 0, -1, 0, 0, 0, -1, 2, 0, 0, -1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, -1, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0,
            0, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 1, 0, 0, 0, 2, -1, -1, -1, -1, -1
        ],
        possibleGreen: [] as number[],
        possibleYellow: [] as number[],
        selectedPos: -1
    },
    completed: false,
    isPlayerTurn: true
}

export const GAME_SET_DATA = `${GAME_RESOURCE_NAME}/GAME_SET_DATA`
export const GAME_SET_PLAYER_TURN = `${GAME_RESOURCE_NAME}/GAME_SET_PLAYER_TURN`
export const GAME_SET_POSSIBLE_GREEN = `${GAME_RESOURCE_NAME}/GAME_SET_POSSIBLE_GREEN`
export const GAME_SET_POSSIBLE_YELLOW = `${GAME_RESOURCE_NAME}/GAME_SET_POSSIBLE_YELLOW`
export const GAME_SET_POSITION = `${GAME_RESOURCE_NAME}/GAME_SET_POSITION`
