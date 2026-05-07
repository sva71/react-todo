import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Articles } from '../interface'
import { DEFAULT_ARTICLES } from './defaultData'
import { loadArticles } from './storage'

const initialState: Articles = loadArticles()

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticle: {
      reducer: (state, action: PayloadAction<{ id: string; title: string }>) => {
        state.push({ id: action.payload.id, title: action.payload.title, list: [] })
      },
      prepare: (title: string) => ({ payload: { id: crypto.randomUUID(), title } }),
    },
    renameArticle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const article = state.find((a) => a.id === action.payload.id)
      if (article) article.title = action.payload.title
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      const idx = state.findIndex((a) => a.id === action.payload)
      if (idx !== -1) state.splice(idx, 1)
    },
    addAction: {
      reducer: (
        state,
        action: PayloadAction<{ articleId: string; id: string; text: string }>,
      ) => {
        const article = state.find((a) => a.id === action.payload.articleId)
        if (article) {
          article.list.push({
            id: action.payload.id,
            text: action.payload.text,
            done: false,
          })
        }
      },
      prepare: (articleId: string, text: string) => ({
        payload: { articleId, id: crypto.randomUUID(), text },
      }),
    },
    renameAction: (
      state,
      action: PayloadAction<{ articleId: string; actionId: string; text: string }>,
    ) => {
      const article = state.find((a) => a.id === action.payload.articleId)
      const item = article?.list.find((x) => x.id === action.payload.actionId)
      if (item) item.text = action.payload.text
    },
    toggleAction: (
      state,
      action: PayloadAction<{ articleId: string; actionId: string }>,
    ) => {
      const article = state.find((a) => a.id === action.payload.articleId)
      const item = article?.list.find((x) => x.id === action.payload.actionId)
      if (item) item.done = !item.done
    },
    deleteAction: (
      state,
      action: PayloadAction<{ articleId: string; actionId: string }>,
    ) => {
      const article = state.find((a) => a.id === action.payload.articleId)
      if (!article) return
      const idx = article.list.findIndex((x) => x.id === action.payload.actionId)
      if (idx !== -1) article.list.splice(idx, 1)
    },
    restoreDefaults: () => {
      return DEFAULT_ARTICLES.map((a) => ({ ...a, list: a.list.map((x) => ({ ...x })) }))
    },
  },
})

export const {
  addArticle,
  renameArticle,
  deleteArticle,
  addAction,
  renameAction,
  toggleAction,
  deleteAction,
  restoreDefaults,
} = articlesSlice.actions

export default articlesSlice.reducer
