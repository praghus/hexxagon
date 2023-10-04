import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { GAME_RESOURCE_NAME } from './game/constants'
import gameReducer from './game/reducer'
import { gameSaga } from './game/saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        [GAME_RESOURCE_NAME]: gameReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(gameSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
