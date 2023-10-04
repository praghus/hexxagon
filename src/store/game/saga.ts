import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { AnyAction } from '@reduxjs/toolkit'

import { checkCompletedGame, checkNeighbourCells, computerPlays, findPossible } from '../../utils/helpers'
import { setData, setPlayerTurn, setPosition, setPossibleGreen, setPossibleYellow, setStatus } from './actions'
import { GAME_EVENT_COMPUTER_MOVE, GAME_EVENT_PLAYER_MOVE } from './constants'
import { selectBoard, selectIsPlayerTurn } from './selectors'
import { GameBoardState } from './types'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function* handlePlayerMove(action: AnyAction) {
    const { pos } = action.payload
    const { data, selectedPos }: GameBoardState = yield select(selectBoard)
    const isPlayerTurn: boolean = yield select(selectIsPlayerTurn)

    if (isPlayerTurn) {
        if (data[pos] === 1 && selectedPos === -1) {
            const { possibleGreen, possibleYellow } = yield call(findPossible, data, pos)
            yield put(setPosition(pos))
            yield put(setPossibleGreen(possibleGreen))
            yield put(setPossibleYellow(possibleYellow))
        } else {
            const { possibleGreen, possibleYellow }: GameBoardState = yield select(selectBoard)
            const possibleMove = [...possibleGreen.concat(possibleYellow), selectedPos]
            const newBoard = [...data]

            if (possibleMove.includes(pos)) {
                if (possibleGreen.includes(pos)) {
                    newBoard[selectedPos] = 1
                } else if (possibleYellow.includes(pos)) {
                    newBoard[selectedPos] = 0
                }
                yield put(setPosition(-1))
                yield put(setPossibleGreen([]))
                yield put(setPossibleYellow([]))

                newBoard[pos] = 1

                if (pos !== selectedPos) {
                    const neighbourCells = checkNeighbourCells(data, pos, 2)
                    for (let i = 0; i < neighbourCells.length; i++) {
                        newBoard[neighbourCells[i]] = 1
                    }
                    // moves++
                    yield put(setPlayerTurn(false))
                    yield put(setData(newBoard))
                    yield sleep(500)
                    yield handleComputerMove()
                }
            } else {
                if (selectedPos === -1) {
                    console.info('Select Pearl...!')
                } else {
                    console.info('Select Yellow, Green or Unselect Pearl ')
                }
            }
        }
    }
}

function* handleComputerMove() {
    const { data }: GameBoardState = yield select(selectBoard)
    const newBoard: number[] = yield call(computerPlays, data)
    yield put(setData(newBoard))
    yield put(setPlayerTurn(true))
    yield put(setStatus(checkCompletedGame(newBoard)))
}

export function* gameSaga() {
    yield all([
        takeEvery(GAME_EVENT_PLAYER_MOVE, handlePlayerMove),
        takeEvery(GAME_EVENT_COMPUTER_MOVE, handleComputerMove)
    ])
}
