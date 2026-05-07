import { configureStore } from '@reduxjs/toolkit'
import type { Articles } from '../interface'
import articlesReducer from './articlesSlice'
import { saveArticles } from './storage'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
})

store.subscribe(() => {
  saveArticles(store.getState().articles)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type { Articles }
