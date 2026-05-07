import type { Articles } from '../interface'

export const DEFAULT_ARTICLES: Articles = [
  {
    id: 'a1b2c3d4-1111-4000-8000-100000000000',
    title: 'Morning Actions',
    list: [
      { id: 'a1b2c3d4-1111-4000-8000-000000000001', text: 'Wake up', done: true },
      { id: 'a1b2c3d4-1111-4000-8000-000000000002', text: 'Self-washing', done: false },
      { id: 'a1b2c3d4-1111-4000-8000-000000000003', text: 'Prepare breakfast', done: false },
      { id: 'a1b2c3d4-1111-4000-8000-000000000004', text: 'Have breakfast', done: false },
      { id: 'a1b2c3d4-1111-4000-8000-000000000005', text: 'Self-dressing', done: false },
      { id: 'a1b2c3d4-1111-4000-8000-000000000006', text: 'Go to job', done: false },
    ],
  },
  {
    id: 'b2c3d4e5-2222-4000-8000-200000000000',
    title: 'At Work',
    list: [
      { id: 'b2c3d4e5-2222-4000-8000-000000000001', text: 'Check E-mail', done: false },
      { id: 'b2c3d4e5-2222-4000-8000-000000000002', text: 'Read news', done: false },
      { id: 'b2c3d4e5-2222-4000-8000-000000000003', text: 'Drink coffee', done: false },
      { id: 'b2c3d4e5-2222-4000-8000-000000000004', text: 'Develop a component', done: false },
      { id: 'b2c3d4e5-2222-4000-8000-000000000005', text: 'Read docs', done: false },
      { id: 'b2c3d4e5-2222-4000-8000-000000000006', text: 'Test written component', done: false },
      { id: 'b2c3d4e5-2222-4000-8000-000000000007', text: 'Go home', done: false },
    ],
  },
]
