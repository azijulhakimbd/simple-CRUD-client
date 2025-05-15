import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Components/Root.jsx';
import App from './App.jsx';
import UserDetails from './Components/UserDetails.jsx';
import UpdateUser from './Components/UpdateUser.jsx';
import ErrorPage from './Components/ErrorPage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
      {
        index:true,
        Component: App,
      },{
        path:'users/:id',
        loader:({params})=>fetch(`http://localhost:3000/users/${params.id}`),
        Component:UserDetails,
      },
      {
        path:'/update/:id',
        loader:({params})=> fetch(`http://localhost:3000/users/${params.id}`),
        Component: UpdateUser,
      }
    ]
  },{
    path:'/*',
    Component:ErrorPage
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
