import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MaskLoader from './../components/loaders/MaskLoader'

/* Layouts */
const MainLayout = lazy(() => import('../Layout/MainLayout'));
/* ***End Layouts**** */

/* Pages */
const Home = lazy(() => import('../pages/Home'));
const AddStock = lazy(() => import('../pages/AddStock'));
const Charts = lazy(() => import('../pages/Charts'));

/* Routes */
const Router = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', exact: true, element: <React.Suspense fallback={<MaskLoader/>}> <Home /> </React.Suspense> },
        { path: '/addStock', exact: true, element: <React.Suspense fallback={<MaskLoader/>}> <AddStock /> </React.Suspense> },
        { path: '/charts', exact: true, element: <React.Suspense fallback={<MaskLoader/>}> <Charts /> </React.Suspense> }
      ]
    }
  ]
  
  export default Router;