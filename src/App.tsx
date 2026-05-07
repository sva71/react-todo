import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useAppSelector } from './store/hooks'
import { ArticleCard } from './components/ArticleCard'
import { Stats } from './components/Stats'
import { Toolbar } from './components/Toolbar'

export const App = () => {
  const articles = useAppSelector((s) => s.articles)

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography
        variant='h4'
        component='h1'
        align='center'
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        My articles and actions
      </Typography>
      <Toolbar />
      <Stats />
      {articles.length > 0 ? (
        <Stack spacing={1} sx={{ mt: 2 }}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Stack>
      ) : (
        <Card variant='outlined' sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
          No articles yet. Click &quot;Create Article&quot; to add one.
        </Card>
      )}
    </Container>
  )
}

export default App
