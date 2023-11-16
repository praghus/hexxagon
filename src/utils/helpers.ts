import { CELLS, COLUMNS } from '../constants'
import { LevelData } from '../store/game/types'
import { Vec3 } from '../types'

const neighbourCells: number[] = []
const possibleGreen: number[] = []
const possibleYellow: number[] = []

function isValidArray<T>(array?: T) {
    return Array.isArray(array) && array?.length > 0
}

function calculatePosition(index: number): Vec3 {
    const unit = Math.sqrt(3) * 0.5 * 1.025
    const [row, col] = [Math.floor(index / COLUMNS), index % COLUMNS]
    return [-5.3 + col * unit + (row * unit) / 2, 0, -3 + row * 0.77] as Vec3
}

function calculateDistance(p1: Vec3, p2: Vec3) {
    const a = p2[0] - p1[0] // x2 - x1;
    const b = p2[1] - p1[1] // y2 - y1;
    const c = p2[2] - p1[2] // z2 - z1;
    return Math.sqrt(a * a + b * b + c * c)
}

function checkNeighbourCells(data: LevelData, pos: number, checkCond: number) {
    neighbourCells.length = 0
    if (
        data[pos - 1] === checkCond &&
        !neighbourCells.includes(pos - 1) &&
        Math.floor(pos / COLUMNS) === Math.floor((pos - 1) / COLUMNS)
    ) {
        neighbourCells.push(pos - 1)
    }
    if (data[pos - COLUMNS] === checkCond && !neighbourCells.includes(pos - COLUMNS)) {
        neighbourCells.push(pos - COLUMNS)
    }
    if (
        data[pos - COLUMNS + 1] === checkCond &&
        !neighbourCells.includes(pos - COLUMNS + 1) &&
        Math.floor((pos - COLUMNS) / COLUMNS) === Math.floor((pos - COLUMNS + 1) / COLUMNS)
    ) {
        neighbourCells.push(pos - COLUMNS + 1)
    }
    if (
        data[pos + 1] === checkCond &&
        !neighbourCells.includes(pos + 1) &&
        Math.floor(pos / COLUMNS) === Math.floor((pos + 1) / COLUMNS)
    ) {
        neighbourCells.push(pos + 1)
    }
    if (data[pos + COLUMNS] === checkCond && !neighbourCells.includes(pos + COLUMNS)) {
        neighbourCells.push(pos + COLUMNS)
    }
    if (
        data[pos + COLUMNS - 1] === checkCond &&
        !neighbourCells.includes(pos + COLUMNS - 1) &&
        Math.floor((pos + COLUMNS) / COLUMNS) === Math.floor((pos + COLUMNS - 1) / COLUMNS)
    ) {
        neighbourCells.push(pos + COLUMNS - 1)
    }
    return neighbourCells
}

function findPossible(data: LevelData, pos: number) {
    possibleGreen.length = 0
    possibleYellow.length = 0
    if (
        data[pos - 1] === CELLS.EMPTY &&
        Math.floor(pos / COLUMNS) === Math.floor((pos - 1) / COLUMNS) &&
        !possibleGreen.includes(pos - 1)
    ) {
        possibleGreen.push(pos - 1)
    }
    if (data[pos - COLUMNS] === CELLS.EMPTY && !possibleGreen.includes(pos - COLUMNS)) {
        possibleGreen.push(pos - COLUMNS)
    }
    if (
        data[pos - COLUMNS + 1] === CELLS.EMPTY &&
        Math.floor((pos - COLUMNS + 1) / COLUMNS) === Math.floor((pos - COLUMNS) / COLUMNS) &&
        !possibleGreen.includes(pos - COLUMNS + 1)
    ) {
        possibleGreen.push(pos - COLUMNS + 1)
    }
    if (
        data[pos + 1] === CELLS.EMPTY &&
        Math.floor(pos / COLUMNS) === Math.floor((pos + 1) / COLUMNS) &&
        !possibleGreen.includes(pos + 1)
    ) {
        possibleGreen.push(pos + 1)
    }
    if (data[pos + COLUMNS] === CELLS.EMPTY && !possibleGreen.includes(pos + COLUMNS)) {
        possibleGreen.push(pos + COLUMNS)
    }
    if (
        data[pos + COLUMNS - 1] === CELLS.EMPTY &&
        Math.floor((pos + COLUMNS - 1) / COLUMNS) === Math.floor((pos + COLUMNS) / COLUMNS) &&
        !possibleGreen.includes(pos + COLUMNS - 1)
    ) {
        possibleGreen.push(pos + COLUMNS - 1)
    }
    if (
        data[pos - 2] === CELLS.EMPTY &&
        !possibleGreen.includes(pos - 2) &&
        Math.floor(pos / COLUMNS) === Math.floor((pos - 2) / COLUMNS)
    ) {
        possibleYellow.push(pos - 2)
    }
    if (
        data[pos - COLUMNS - 1] === CELLS.EMPTY &&
        !possibleGreen.includes(pos - COLUMNS - 1) &&
        Math.floor((pos - COLUMNS) / COLUMNS) === Math.floor((pos - COLUMNS - 1) / COLUMNS)
    ) {
        possibleYellow.push(pos - COLUMNS - 1)
    }
    if (data[pos - 2 * COLUMNS] === CELLS.EMPTY && !possibleGreen.includes(pos - 2 * COLUMNS)) {
        possibleYellow.push(pos - 2 * COLUMNS)
    }
    if (
        data[pos - 2 * COLUMNS + 1] === CELLS.EMPTY &&
        !possibleGreen.includes(pos - 2 * COLUMNS + 1) &&
        Math.floor((pos - 2 * COLUMNS) / COLUMNS) === Math.floor((pos - 2 * COLUMNS + 1) / COLUMNS)
    ) {
        possibleYellow.push(pos - 2 * COLUMNS + 1)
    }
    if (
        data[pos - 2 * COLUMNS + 2] === CELLS.EMPTY &&
        !possibleGreen.includes(pos - 2 * COLUMNS + 2) &&
        Math.floor((pos - 2 * COLUMNS) / COLUMNS) === Math.floor((pos - 2 * COLUMNS + 2) / COLUMNS)
    ) {
        possibleYellow.push(pos - 2 * COLUMNS + 2)
    }
    if (
        data[pos - COLUMNS + 2] === CELLS.EMPTY &&
        !possibleGreen.includes(pos - COLUMNS + 2) &&
        Math.floor((pos - COLUMNS) / COLUMNS) === Math.floor((pos - COLUMNS + 2) / COLUMNS)
    ) {
        possibleYellow.push(pos - COLUMNS + 2)
    }
    if (
        data[pos + 2] === CELLS.EMPTY &&
        !possibleGreen.includes(pos + 2) &&
        Math.floor((pos + 2) / COLUMNS) === Math.floor(pos / COLUMNS)
    ) {
        possibleYellow.push(pos + 2)
    }
    if (
        data[pos + COLUMNS + 1] === CELLS.EMPTY &&
        !possibleGreen.includes(pos + COLUMNS + 1) &&
        Math.floor((pos + COLUMNS) / COLUMNS) === Math.floor((pos + COLUMNS + 1) / COLUMNS)
    ) {
        possibleYellow.push(pos + COLUMNS + 1)
    }
    if (data[pos + 2 * COLUMNS] === CELLS.EMPTY && !possibleGreen.includes(pos + 2 * COLUMNS)) {
        possibleYellow.push(pos + 2 * COLUMNS)
    }
    if (
        data[pos + 2 * COLUMNS - 1] === CELLS.EMPTY &&
        !possibleGreen.includes(pos + 2 * COLUMNS - 1) &&
        Math.floor((pos + 2 * COLUMNS) / COLUMNS) === Math.floor((pos + 2 * COLUMNS - 1) / COLUMNS)
    ) {
        possibleYellow.push(pos + 2 * COLUMNS - 1)
    }
    if (
        data[pos + 2 * COLUMNS - 2] === CELLS.EMPTY &&
        !possibleGreen.includes(pos + 2 * COLUMNS - 2) &&
        Math.floor((pos + 2 * COLUMNS) / COLUMNS) === Math.floor((pos + 2 * COLUMNS - 2) / COLUMNS)
    ) {
        possibleYellow.push(pos + 2 * COLUMNS - 2)
    }
    if (
        data[pos + COLUMNS - 2] === CELLS.EMPTY &&
        !possibleGreen.includes(pos + COLUMNS - 2) &&
        Math.floor((pos + COLUMNS) / COLUMNS) === Math.floor((pos + COLUMNS - 2) / COLUMNS)
    ) {
        possibleYellow.push(pos + COLUMNS - 2)
    }
    return { possibleGreen, possibleYellow }
}

const computerPlays = (data: LevelData) => {
    const newBoard = [...data]
    const compPlayPos: number[] = []
    const compPlayPosBestMove = []
    const compPlayBestMoveBalls = []
    const count = data.length

    for (let i = 0; i < count; i++) {
        if (newBoard[i] === CELLS.COMPUTER && !compPlayPos.includes(i)) {
            compPlayPos.push(i)
        }
    }

    for (let i = 0; i < compPlayPos.length; i++) {
        findPossible(data, compPlayPos[i])
        const compPlayRound = possibleGreen.concat(possibleYellow)
        const tempCompAdjArr1 = new Array(compPlayRound.length)
        for (let j = 0; j < compPlayRound.length; j++) {
            const neighbourCells = checkNeighbourCells(data, compPlayRound[j], CELLS.PLAYER)
            tempCompAdjArr1[j] = possibleGreen.includes(compPlayRound[j])
                ? neighbourCells.length + 1
                : neighbourCells.length
        }
        const tempCompAdjArr = [...tempCompAdjArr1]

        tempCompAdjArr1.sort((a, b) => b - a)

        let flag = false
        for (let j = 0; j < tempCompAdjArr1.length; j++) {
            for (let k = 0; k < tempCompAdjArr.length; k++) {
                if (tempCompAdjArr1[j] === tempCompAdjArr[k]) {
                    compPlayPosBestMove[i] = compPlayRound[k]
                    compPlayBestMoveBalls[i] = tempCompAdjArr[k]
                    flag = true
                    break
                }
            }
            if (flag) {
                break
            }
        }
    }

    const compPlayBestMoveBalls1 = [...compPlayBestMoveBalls].sort((a, b) => b - a)

    let flag1 = false
    let checkNeedBest = 0
    let pos
    let neighbourCells

    for (let i = 0; i < compPlayBestMoveBalls1.length; i++) {
        for (let j = 0; j < compPlayBestMoveBalls.length; j++) {
            if (compPlayBestMoveBalls1[i] === compPlayBestMoveBalls[j]) {
                findPossible(data, compPlayPos[j])

                if ([...possibleGreen, ...possibleYellow].includes(compPlayPosBestMove[j])) {
                    pos = compPlayPos[j]
                    newBoard[compPlayPos[j]] = possibleGreen.includes(compPlayPosBestMove[j])
                        ? CELLS.COMPUTER
                        : CELLS.EMPTY
                    newBoard[compPlayPosBestMove[j]] = CELLS.COMPUTER
                    checkNeedBest = compPlayPosBestMove[j]
                    flag1 = true
                }
                if (flag1) {
                    neighbourCells = checkNeighbourCells(data, checkNeedBest, CELLS.PLAYER)
                    for (const nc of neighbourCells) newBoard[nc] = -CELLS.COMPUTER
                    break
                }
            }
        }
        if (flag1) {
            break
        }
    }
    return { neighbourCells, newBoard, pos }
}

function checkCompletedGame(data: LevelData) {
    let playerPoints = 0
    let computerPoints = 0
    let zeroPoints = 0
    let doNotCompleteComputer = 0
    let doNotCompleteUser = 0
    let status = 0

    for (let i = 0; i < data.length; i++) {
        findPossible(data, i)
        const possible = possibleGreen.length + possibleYellow.length !== 0
        if (data[i] === CELLS.PLAYER) {
            playerPoints++
            if (possible) doNotCompleteComputer++
        } else if (data[i] === CELLS.COMPUTER) {
            computerPoints++
            if (possible) doNotCompleteUser++
        } else if (data[i] === CELLS.EMPTY) {
            zeroPoints++
        }
    }

    if (zeroPoints === 0) {
        if (playerPoints === computerPoints) status = -1
        else if (playerPoints > computerPoints) status = 1
        else status = 2
    } else {
        if (doNotCompleteComputer === 0) status = 2
        else if (doNotCompleteUser === 0) status = 1
    }
    return status
}

function getPawnColor(num: number) {
    switch (num) {
        case 1:
        case -2:
            return '#3333ff'
        case 2:
        case -1:
            return '#ff3333'
        default:
            return '#dedeff'
    }
}

function getStatusTitle(status: number) {
    switch (status) {
        case -1:
            return 'Game Draw!'
        case 1:
            return 'Game completed. You Won!'
        case 2:
            return 'Computer Wins!'
    }
}

export {
    calculateDistance,
    calculatePosition,
    computerPlays,
    checkCompletedGame,
    checkNeighbourCells,
    findPossible,
    getPawnColor,
    getStatusTitle,
    isValidArray
}
