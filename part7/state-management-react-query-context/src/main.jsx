import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { UserContextProvider } from './contexts/UserContext'
import { BlogsContextProvider } from './contexts/BlogsContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { BrowserRouter as Router } from 'react-router-dom'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <UserContextProvider>
        <BlogsContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </BlogsContextProvider>
      </UserContextProvider>
    </Router>
  </QueryClientProvider>
)

