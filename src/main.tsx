import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import { Provider } from 'react-redux'
import "../src/styles/main.scss"
import store from './stores/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
