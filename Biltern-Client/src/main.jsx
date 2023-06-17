import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; 
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

import './index.css'

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This component is responsible for rendering the app
 */

ReactDOM.createRoot(document.getElementById('root')).render(
 // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
 // </React.StrictMode>,
)
