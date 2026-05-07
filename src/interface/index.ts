export interface Action {
  id: string
  text: string
  done: boolean
}

export interface Article {
  id: string
  title: string
  list: Action[]
}

export type Articles = Article[]
