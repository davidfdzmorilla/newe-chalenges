import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducer/reducer'
import { Provider } from 'react-redux'


const localStorageMiddleware = store => next => action => {
  let result = next(action)
  localStorage.setItem('session', JSON.stringify(store.getState().user))
  return result
}

const saved = localStorage.getItem('session')
const initialStore = { user: saved ? JSON.parse(saved) : undefined }
const store = createStore(rootReducer, initialStore, applyMiddleware(localStorageMiddleware))


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
