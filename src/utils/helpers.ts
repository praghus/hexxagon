import { COLUMNS } from '../store/game/constants'

const neighbourCells: number[] = []
const possibleGreen: number[] = []
const possibleYellow: number[] = []

function checkNeighbourCells(data: number[], pos: number, checkCond: number) {
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

function findPossible(data: number[], pos: number) {
    possibleGreen.length = 0
    possibleYellow.length = 0
    if (
        data[pos - 1] === 0 &&
        Math.floor(pos / COLUMNS) === Math.floor((pos - 1) / COLUMNS) &&
        !possibleGreen.includes(pos - 1)
    ) {
        possibleGreen.push(pos - 1)
    }
    if (data[pos - COLUMNS] === 0 && !possibleGreen.includes(pos - COLUMNS)) {
        possibleGreen.push(pos - COLUMNS)
    }
    if (
        data[pos - COLUMNS + 1] === 0 &&
        Math.floor((pos - COLUMNS + 1) / COLUMNS) === Math.floor((pos - COLUMNS) / COLUMNS) &&
        !possibleGreen.includes(pos - COLUMNS + 1)
    ) {
        possibleGreen.push(pos - COLUMNS + 1)
    }
    if (
        data[pos + 1] === 0 &&
        Math.floor(pos / COLUMNS) === Math.floor((pos + 1) / COLUMNS) &&
        !possibleGreen.includes(pos + 1)
    ) {
        possibleGreen.push(pos + 1)
    }
    if (data[pos + COLUMNS] === 0 && !possibleGreen.includes(pos + COLUMNS)) {
        possibleGreen.push(pos + COLUMNS)
    }
    if (
        data[pos + COLUMNS - 1] === 0 &&
        Math.floor((pos + COLUMNS - 1) / COLUMNS) === Math.floor((pos + COLUMNS) / COLUMNS) &&
        !possibleGreen.includes(pos + COLUMNS - 1)
    ) {
        possibleGreen.push(pos + COLUMNS - 1)
    }
    if (
        data[pos - 2] === 0 &&
        !possibleGreen.includes(pos - 2) &&
        Math.floor(pos / COLUMNS) === Math.floor((pos - 2) / COLUMNS)
    ) {
        possibleYellow.push(pos - 2)
    }
    if (
        data[pos - COLUMNS - 1] === 0 &&
        !possibleGreen.includes(pos - COLUMNS - 1) &&
        Math.floor((pos - COLUMNS) / COLUMNS) === Math.floor((pos - COLUMNS - 1) / COLUMNS)
    ) {
        possibleYellow.push(pos - COLUMNS - 1)
    }
    if (data[pos - 2 * COLUMNS] === 0 && !possibleGreen.includes(pos - 2 * COLUMNS)) {
        possibleYellow.push(pos - 2 * COLUMNS)
    }
    if (
        data[pos - 2 * COLUMNS + 1] === 0 &&
        !possibleGreen.includes(pos - 2 * COLUMNS + 1) &&
        Math.floor((pos - 2 * COLUMNS) / COLUMNS) === Math.floor((pos - 2 * COLUMNS + 1) / COLUMNS)
    ) {
        possibleYellow.push(pos - 2 * COLUMNS + 1)
    }
    if (
        data[pos - 2 * COLUMNS + 2] === 0 &&
        !possibleGreen.includes(pos - 2 * COLUMNS + 2) &&
        Math.floor((pos - 2 * COLUMNS) / COLUMNS) === Math.floor((pos - 2 * COLUMNS + 2) / COLUMNS)
    ) {
        possibleYellow.push(pos - 2 * COLUMNS + 2)
    }
    if (
        data[pos - COLUMNS + 2] === 0 &&
        !possibleGreen.includes(pos - COLUMNS + 2) &&
        Math.floor((pos - COLUMNS) / COLUMNS) === Math.floor((pos - COLUMNS + 2) / COLUMNS)
    ) {
        possibleYellow.push(pos - COLUMNS + 2)
    }
    if (
        data[pos + 2] === 0 &&
        !possibleGreen.includes(pos + 2) &&
        Math.floor((pos + 2) / COLUMNS) === Math.floor(pos / COLUMNS)
    ) {
        possibleYellow.push(pos + 2)
    }
    if (
        data[pos + COLUMNS + 1] === 0 &&
        !possibleGreen.includes(pos + COLUMNS + 1) &&
        Math.floor((pos + COLUMNS) / COLUMNS) === Math.floor((pos + COLUMNS + 1) / COLUMNS)
    ) {
        possibleYellow.push(pos + COLUMNS + 1)
    }
    if (data[pos + 2 * COLUMNS] === 0 && !possibleGreen.includes(pos + 2 * COLUMNS)) {
        possibleYellow.push(pos + 2 * COLUMNS)
    }
    if (
        data[pos + 2 * COLUMNS - 1] === 0 &&
        !possibleGreen.includes(pos + 2 * COLUMNS - 1) &&
        Math.floor((pos + 2 * COLUMNS) / COLUMNS) === Math.floor((pos + 2 * COLUMNS - 1) / COLUMNS)
    ) {
        possibleYellow.push(pos + 2 * COLUMNS - 1)
    }
    if (
        data[pos + 2 * COLUMNS - 2] === 0 &&
        !possibleGreen.includes(pos + 2 * COLUMNS - 2) &&
        Math.floor((pos + 2 * COLUMNS) / COLUMNS) === Math.floor((pos + 2 * COLUMNS - 2) / COLUMNS)
    ) {
        possibleYellow.push(pos + 2 * COLUMNS - 2)
    }
    if (
        data[pos + COLUMNS - 2] === 0 &&
        !possibleGreen.includes(pos + COLUMNS - 2) &&
        Math.floor((pos + COLUMNS) / COLUMNS) === Math.floor((pos + COLUMNS - 2) / COLUMNS)
    ) {
        possibleYellow.push(pos + COLUMNS - 2)
    }
    return { possibleGreen, possibleYellow }
}

const computerPlays = (data: number[]) => {
    const newBoard = [...data]
    const compPlayPos: number[] = []
    const compPlayPosBestMove = []
    const compPlayBestMoveBalls = []
    const count = data.length
    for (let i = 0; i < count; i++) {
        if (newBoard[i] === 2 && !compPlayPos.includes(i)) {
            compPlayPos.push(i)
        }
    }
    for (let i = 0; i < compPlayPos.length; i++) {
        findPossible(data, compPlayPos[i])
        const compPlayRound = possibleGreen.concat(possibleYellow)
        const tempCompAdjArr1 = new Array(compPlayRound.length)
        for (let j = 0; j < compPlayRound.length; j++) {
            const neighbourCells = checkNeighbourCells(data, compPlayRound[j], 1)
            if (possibleGreen.includes(compPlayRound[j])) {
                tempCompAdjArr1[j] = neighbourCells.length + 1
            } else {
                tempCompAdjArr1[j] = neighbourCells.length
            }
        }
        const tempCompAdjArr = tempCompAdjArr1.slice(0)
        tempCompAdjArr1.sort((a, b) => b - a)
        let flag = 0
        for (let j = 0; j < tempCompAdjArr1.length; j++) {
            for (let k = 0; k < tempCompAdjArr.length; k++) {
                if (tempCompAdjArr1[j] === tempCompAdjArr[k]) {
                    compPlayPosBestMove[i] = compPlayRound[k]
                    compPlayBestMoveBalls[i] = tempCompAdjArr[k]
                    flag = 1
                    break
                }
            }
            if (flag === 1) {
                break
            }
        }
    }
    const compPlayBestMoveBalls1 = compPlayBestMoveBalls.slice(0)
    compPlayBestMoveBalls1.sort((a, b) => b - a)
    let flag1 = 0
    let checkNeedBest = 0
    for (let i = 0; i < compPlayBestMoveBalls1.length; i++) {
        for (let j = 0; j < compPlayBestMoveBalls.length; j++) {
            if (compPlayBestMoveBalls1[i] === compPlayBestMoveBalls[j]) {
                findPossible(data, compPlayPos[j])
                if (possibleGreen.includes(compPlayPosBestMove[j])) {
                    newBoard[compPlayPos[j]] = 2
                    newBoard[compPlayPosBestMove[j]] = 2
                    checkNeedBest = compPlayPosBestMove[j]
                    flag1 = 1
                } else if (possibleYellow.includes(compPlayPosBestMove[j])) {
                    newBoard[compPlayPos[j]] = 0
                    newBoard[compPlayPosBestMove[j]] = 2
                    checkNeedBest = compPlayPosBestMove[j]
                    flag1 = 1
                }
                if (flag1 === 1) {
                    const neighbourCells = checkNeighbourCells(data, checkNeedBest, 1)
                    for (let i = 0; i < neighbourCells.length; i++) {
                        newBoard[neighbourCells[i]] = 2
                    }
                    break
                }
            }
        }
        if (flag1 === 1) {
            break
        }
    }
    return newBoard
}

function checkCompletedGame(data: number[]) {
    let userPoints = 0
    let compPoints = 0
    let zeroPoints = 0
    let doNotcompleteComputer = 0
    let doNotcompleteUser = 0
    for (let i = 0; i < data.length; i++) {
        findPossible(data, i)
        if (data[i] === 1) {
            userPoints++
            //document.hexxagonForm.userPointId.value = userPoints;
            if (possibleGreen.length + possibleYellow.length != 0) {
                doNotcompleteComputer++
            }
        } else if (data[i] === 2) {
            compPoints++
            //document.hexxagonForm.compPointId.value = compPoints;
            if (possibleGreen.length + possibleYellow.length != 0) {
                doNotcompleteUser++
            }
        } else if (data[i] === 0) {
            zeroPoints++
        }
    }
    if (zeroPoints != 0 && doNotcompleteComputer == 0) {
        console.info('Computer Wins!! Try Again')
    } else if (zeroPoints != 0 && doNotcompleteUser == 0) {
        console.info('Game completed')
    }
    if (zeroPoints == 0) {
        if (userPoints == compPoints) {
            console.info('Game Draw!!  Try Again')
        } else if (userPoints > compPoints) {
            console.info('Game completed')
        } else {
            console.info('Computer Wins!! Try Again')
        }
    }
}

export { computerPlays, checkCompletedGame, checkNeighbourCells, findPossible }
