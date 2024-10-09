import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import DashBoard from './pages/dashBoard/DashBoard.jsx'
import Connexion from './pages/connexion/Connexion.jsx'
import Inscription from './pages/inscription/inscription.jsx'
import {Toaster} from 'react-hot-toast'
import PageErreur from './pages/dashBoard/components/PageErreur.jsx'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient =  new QueryClient();

const router= createBrowserRouter([
  { path: "/", element:  <DashBoard/>, errorElement: <PageErreur/>},
  { path: "/connexion", element:  <Connexion/>, errorElement: <PageErreur/>},
  { path: "/inscription", element:  <Inscription/>,errorElement: <PageErreur/>},
  { path: "/dashboard", element:  <DashBoard/>,errorElement: <PageErreur/>},

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

    <Toaster position="bottom-center"/>
    <RouterProvider router={router}/> 

    </QueryClientProvider>
  </StrictMode>,
)