import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { AnyAction } from '@reduxjs/toolkit'

import { checkCompletedGame, checkNeighbourCells, computerPlays, findPossible } from '../../utils/helpers'
import {
    setData,
    setPlayerTurn,
    setPosition,
    setPossibleGreen,
    setPossibleYellow,
    setSpreedPosition,
    setStatus
} from './actions'
import { GAME_EVENT_COMPUTER_MOVE, GAME_EVENT_PLAYER_MOVE } from './constants'
import { selectBoard, selectIsPlayerTurn } from './selectors'
import { GameBoardState } from './types'
import { CELLS } from '../../constants'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function* reverse() {
    const { data }: GameBoardState = yield select(selectBoard)
    yield put(setData(data.map((d: number | null) => (d !== null && d < 0 ? Math.abs(d) : d))))
}

function* handlePlayerMove(action: AnyAction) {
    const { pos } = action.payload
    const { data, selectedPos }: GameBoardState = yield select(selectBoard)
    const isPlayerTurn: boolean = yield select(selectIsPlayerTurn)

    if (isPlayerTurn) {
        if (data[pos] === CELLS.PLAYER && selectedPos === -1) {
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
                    newBoard[selectedPos] = CELLS.PLAYER
                } else if (possibleYellow.includes(pos)) {
                    newBoard[selectedPos] = CELLS.EMPTY
                }
                yield put(setPosition(-1))
                yield put(setPossibleGreen([]))
                yield put(setPossibleYellow([]))

                newBoard[pos] = CELLS.PLAYER

                if (pos !== selectedPos) {
                    const neighbourCells = checkNeighbourCells(data, pos, CELLS.COMPUTER)
                    for (const nc of neighbourCells) newBoard[nc] = -CELLS.PLAYER
                    yield put(setData(newBoard))
                    yield put(setSpreedPosition(selectedPos))
                    yield sleep(500)
                    yield call(reverse)
                    yield put(setPlayerTurn(false))
                }
            } else {
                // @todo: refactor
                // if (selectedPos === -1) {
                //     console.info('Select Blue...!')
                // } else {
                //     // console.info('Select Yellow, Green or Unselect ')
                // }
            }
        }
    }
}

function* handleComputerMove() {
    const { data }: GameBoardState = yield select(selectBoard)
    const { newBoard, pos } = yield call(computerPlays, data)
    yield put(setSpreedPosition(pos))
    yield put(setData(newBoard))
    yield sleep(500)
    yield call(reverse)
    yield put(setStatus(checkCompletedGame(newBoard)))
    yield put(setPlayerTurn(true))
}

export function* gameSaga() {
    yield all([
        takeLatest(GAME_EVENT_PLAYER_MOVE, handlePlayerMove),
        takeLatest(GAME_EVENT_COMPUTER_MOVE, handleComputerMove)
    ])
}
