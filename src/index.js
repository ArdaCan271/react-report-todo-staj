import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './screens/Login/Login';
import Home from './screens/Home/Home';

import CustomersNew from './screens/CustomersNew/CustomersNew';
import Products from './screens/Products/Products';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>
  },
  {
    path: '/home',
    element: <Home/>,
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path: "customers",
    element: <CustomersNew/>,
  },
  {
    path: "products",
    element: <Products/>,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router}/>
  // </React.StrictMode>
);

