import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const button = (action) => {
    switch (action) {
      case 'GOOD':
        return store.dispatch({ type: 'GOOD' })
      case 'OK':
        return store.dispatch({ type: 'OK' })
      case 'BAD':
        return store.dispatch({ type: 'BAD' })
      case 'ZERO':
        return store.dispatch({ type: 'ZERO' })
      default:
        return
    }
  }

  return (
    <div>
      <button onClick={() => button('GOOD')}>good</button>
      <button onClick={() => button('OK')}>ok</button>
      <button onClick={() => button('BAD')}>bad</button>
      <button onClick={() => button('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
