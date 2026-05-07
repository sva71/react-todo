import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

interface Props {
  open: boolean
  title?: string
  placeholder?: string
  initialValue?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: (value: string) => void
  onCancel: () => void
}

type BodyProps = Omit<Props, 'open'>

const DialogBody = ({
  title,
  placeholder,
  initialValue = '',
  confirmLabel = 'Ok',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: BodyProps) => {
  const [value, setValue] = useState(initialValue)

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onConfirm(trimmed)
  }

  return (
    <>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin='dense'
          variant='outlined'
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit()
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelLabel}</Button>
        <Button onClick={submit} variant='contained' disabled={!value.trim()}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </>
  )
}

export const TextInputDialog = ({ open, onCancel, ...rest }: Props) => {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth='xs'>
      {open && <DialogBody onCancel={onCancel} {...rest} />}
    </Dialog>
  )
}
