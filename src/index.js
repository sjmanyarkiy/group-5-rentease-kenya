import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// App is intentionally not used here because routing is handled by react-router's RouterProvider.
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes'

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={router} />
);


reportWebVitals();
