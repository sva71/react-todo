import { useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { Article } from '../interface'
import { useAppDispatch } from '../store/hooks'
import {
  addAction,
  deleteArticle,
  renameArticle,
} from '../store/articlesSlice'
import { ActionItem } from './ActionItem'
import { ConfirmDialog } from './ConfirmDialog'
import { TextInputDialog } from './TextInputDialog'

interface Props {
  article: Article
}

export const ArticleCard = ({ article }: Props) => {
  const dispatch = useAppDispatch()
  const [newAction, setNewAction] = useState('')
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleAdd = () => {
    const trimmed = newAction.trim()
    if (!trimmed) return
    dispatch(addAction(article.id, trimmed))
    setNewAction('')
  }

  const stop = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation()
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ '& .MuiAccordionSummary-content': { alignItems: 'center' } }}
      >
        <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>{article.title}</Typography>
        <IconButton
          size='small'
          onClick={(e) => {
            stop(e)
            setEditOpen(true)
          }}
          aria-label='edit article'
        >
          <EditIcon fontSize='small' />
        </IconButton>
        <IconButton
          size='small'
          color='error'
          onClick={(e) => {
            stop(e)
            setDeleteOpen(true)
          }}
          aria-label='delete article'
          sx={{ mr: 1 }}
        >
          <DeleteOutlineIcon fontSize='small' />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <TextField
            fullWidth
            size='small'
            placeholder='New todo'
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
            }}
          />
          <IconButton
            color='primary'
            onClick={handleAdd}
            disabled={!newAction.trim()}
            aria-label='add todo'
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': { bgcolor: 'primary.dark' },
              '&.Mui-disabled': { bgcolor: 'action.disabledBackground' },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        {article.list.length === 0 ? (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            No actions yet.
          </Typography>
        ) : (
          <Box>
            {article.list.map((a) => (
              <ActionItem key={a.id} articleId={article.id} action={a} />
            ))}
          </Box>
        )}
      </AccordionDetails>

      <TextInputDialog
        open={editOpen}
        title='Edit article'
        initialValue={article.title}
        placeholder='Article title'
        onConfirm={(title) => {
          dispatch(renameArticle({ id: article.id, title }))
          setEditOpen(false)
        }}
        onCancel={() => setEditOpen(false)}
      />

      <ConfirmDialog
        open={deleteOpen}
        message={`Are you sure want to delete "${article.title}"?`}
        onConfirm={() => {
          dispatch(deleteArticle(article.id))
          setDeleteOpen(false)
        }}
        onCancel={() => setDeleteOpen(false)}
      />
    </Accordion>
  )
}
