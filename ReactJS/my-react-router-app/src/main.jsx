import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <div><h1>Welcome to my website</h1><p>This is a simple React application.</p></div>,
    },
    {
      path: '/about',
      element: <div><h1>About</h1><p>This is the about page.</p></div>,
    },
    {
      path: '/app',
      element: <App />,
    }
  ]
)



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
