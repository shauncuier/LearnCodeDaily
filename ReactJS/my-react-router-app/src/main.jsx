import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './components/Root/Root.jsx'
import Home from './components/Home/Home.jsx'
import Mobile from './components/Mobiles/Mobile.jsx'
import Laptops from './components/Laptops/Laptops.jsx'


const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: 'mobiles', Component: Mobile },
        { path: 'laptops', Component: Laptops },
      ]
    }

  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
