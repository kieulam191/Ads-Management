import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";

import { AppProvider } from './context/AppContext';
import router from './routers/Routers/Routers';

import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
)
