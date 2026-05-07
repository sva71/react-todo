import type { Articles } from '../interface'
import { DEFAULT_ARTICLES } from './defaultData'

const STORAGE_KEY = 'react-todo:articles'

export const loadArticles = (): Articles => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_ARTICLES
    const parsed = JSON.parse(raw) as Articles
    if (!Array.isArray(parsed)) return DEFAULT_ARTICLES
    return parsed
  } catch {
    return DEFAULT_ARTICLES
  }
}

export const saveArticles = (articles: Articles): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
  } catch {
    // ignore quota / serialization errors
  }
}
