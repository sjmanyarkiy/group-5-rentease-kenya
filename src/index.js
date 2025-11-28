import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// App is intentionally not used here because routing is handled by react-router's RouterProvider.
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes'
import { BookingsProvider } from './context/BookingsContext'
import "font-awesome/css/font-awesome.min.css";


const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BookingsProvider>
    <RouterProvider router={router} />
  </BookingsProvider>
);
// root.render(

//     <RouterProvider router={router} />
// );


reportWebVitals();
