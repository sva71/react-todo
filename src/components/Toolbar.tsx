import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RestoreIcon from '@mui/icons-material/Restore'
import { useAppDispatch } from '../store/hooks'
import { addArticle, restoreDefaults } from '../store/articlesSlice'
import { ConfirmDialog } from './ConfirmDialog'
import { TextInputDialog } from './TextInputDialog'

export const Toolbar = () => {
  const dispatch = useAppDispatch()
  const [createOpen, setCreateOpen] = useState(false)
  const [restoreOpen, setRestoreOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Button
        variant='contained'
        disableElevation
        startIcon={<AddIcon />}
        onClick={() => setCreateOpen(true)}
      >
        Create Article
      </Button>
      <Button
        variant='outlined'
        startIcon={<RestoreIcon />}
        onClick={() => setRestoreOpen(true)}
      >
        Restore to defaults
      </Button>

      <TextInputDialog
        open={createOpen}
        title='Create article'
        placeholder='New Article'
        confirmLabel='Create'
        onConfirm={(title) => {
          dispatch(addArticle(title))
          setCreateOpen(false)
        }}
        onCancel={() => setCreateOpen(false)}
      />

      <ConfirmDialog
        open={restoreOpen}
        message='Restore articles to defaults? Your current changes will be lost.'
        confirmLabel='Restore'
        confirmColor='primary'
        onConfirm={() => {
          dispatch(restoreDefaults())
          setRestoreOpen(false)
        }}
        onCancel={() => setRestoreOpen(false)}
      />
    </Box>
  )
}
