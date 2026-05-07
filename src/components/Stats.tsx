import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../store/hooks'

export const Stats = () => {
  const articles = useAppSelector((s) => s.articles)

  const articlesTotal = articles.length
  const actionsTotal = articles.reduce((sum, a) => sum + a.list.length, 0)
  const completedTotal = articles.reduce(
    (sum, a) => sum + a.list.filter((x) => x.done).length,
    0,
  )
  const percent = actionsTotal === 0 ? 0 : Math.round((completedTotal / actionsTotal) * 100)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 3,
        textAlign: 'center',
        p: 2,
        mb: 3,
      }}
    >
      <Typography>
        Articles: <strong>{articlesTotal}</strong>
      </Typography>
      <Typography>
        Actions: <strong>{actionsTotal}</strong>
      </Typography>
      <Typography>
        Completed: <strong>{completedTotal}</strong> (<strong>{percent}%</strong>)
      </Typography>
    </Box>
  )
}
