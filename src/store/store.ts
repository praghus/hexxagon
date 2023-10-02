import { configureStore } from '@reduxjs/toolkit'
import { GAME_RESOURCE_NAME } from './game/constants'
import gameReducer from './game/reducer'

export const store = configureStore({
    reducer: {
        [GAME_RESOURCE_NAME]: gameReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
