import { useState } from 'react'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import type { Action } from '../interface'
import { useAppDispatch } from '../store/hooks'
import { deleteAction, renameAction, toggleAction } from '../store/articlesSlice'
import { ConfirmDialog } from './ConfirmDialog'
import { TextInputDialog } from './TextInputDialog'

interface Props {
  articleId: string
  action: Action
}

export const ActionItem = ({ articleId, action }: Props) => {
  const dispatch = useAppDispatch()
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
      <Checkbox
        size='small'
        checked={action.done}
        onChange={() => dispatch(toggleAction({ articleId, actionId: action.id }))}
      />
      <Typography
        sx={{
          flexGrow: 1,
          wordBreak: 'break-word',
          textDecoration: action.done ? 'line-through' : 'none',
          opacity: action.done ? 0.6 : 1,
        }}
      >
        {action.text}
      </Typography>
      <IconButton size='small' onClick={() => setEditOpen(true)} aria-label='edit todo'>
        <EditIcon fontSize='small' />
      </IconButton>
      <IconButton
        size='small'
        color='error'
        onClick={() => setDeleteOpen(true)}
        aria-label='delete todo'
      >
        <DeleteOutlineIcon fontSize='small' />
      </IconButton>

      <TextInputDialog
        open={editOpen}
        title='Edit todo'
        initialValue={action.text}
        placeholder='New todo'
        onConfirm={(text) => {
          dispatch(renameAction({ articleId, actionId: action.id, text }))
          setEditOpen(false)
        }}
        onCancel={() => setEditOpen(false)}
      />

      <ConfirmDialog
        open={deleteOpen}
        message={`Are you sure want to delete "${action.text}"?`}
        onConfirm={() => {
          dispatch(deleteAction({ articleId, actionId: action.id }))
          setDeleteOpen(false)
        }}
        onCancel={() => setDeleteOpen(false)}
      />
    </Box>
  )
}
