import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { ApiProvider } from './context/api.jsx'
import { HookProvider } from './context/hook.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ApiProvider>
        <HookProvider>
          <App />
        </HookProvider>
      </ApiProvider>
    </AuthProvider>
  </BrowserRouter>
)
