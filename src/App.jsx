import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecipeBlog } from './RecipeBlog.jsx'

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeBlog />
    </QueryClientProvider>
  )
}
