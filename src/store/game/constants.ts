export const GAME_RESOURCE_NAME = 'game'
export const COLUMNS = 10
export const INITIAL_STATE = {
    board: {
        // prettier-ignore
        data: [
            -1,-1,-1,-1, 1, 0, 0, 0, 2,-1, 
            -1,-1,-1, 0, 0, 0, 0, 0, 0,-1,
            -1,-1, 0, 0, 0, 0, 0, 0, 0,-1,
            -1, 0, 0, 0, 0,-1, 0, 0, 0,-1, 
             2, 0, 0,-1, 0, 0, 0, 0, 1,-1, 
             0, 0, 0, 0,-1, 0, 0, 0,-1,-1, 
             0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 
             0, 0, 0, 0, 0, 0,-1,-1,-1,-1, 
             1, 0, 0, 0, 2,-1,-1,-1,-1,-1
        ],
        possibleGreen: [] as number[],
        possibleYellow: [] as number[],
        selectedPos: -1
    },
    isPlayerTurn: true,
    moves: 0,
    status: {
        compPoints: 0,
        userPoints: 0,
        win: 0
    }
}
export const GAME_EVENT_COMPUTER_MOVE = `${GAME_RESOURCE_NAME}/GAME_EVENT_COMPUTER_MOVE`
export const GAME_EVENT_PLAYER_MOVE = `${GAME_RESOURCE_NAME}/GAME_EVENT_PLAYER_MOVE`
export const GAME_SET_DATA = `${GAME_RESOURCE_NAME}/GAME_SET_DATA`
export const GAME_SET_PLAYER_TURN = `${GAME_RESOURCE_NAME}/GAME_SET_PLAYER_TURN`
export const GAME_SET_POSSIBLE_GREEN = `${GAME_RESOURCE_NAME}/GAME_SET_POSSIBLE_GREEN`
export const GAME_SET_POSSIBLE_YELLOW = `${GAME_RESOURCE_NAME}/GAME_SET_POSSIBLE_YELLOW`
export const GAME_SET_POSITION = `${GAME_RESOURCE_NAME}/GAME_SET_POSITION`
export const GAME_SET_STATUS = `${GAME_RESOURCE_NAME}/GAME_SET_STATUS`
