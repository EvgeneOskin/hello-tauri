import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Hello } from './hello'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello />
        <img src={logo} className="App-logo rotate" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  )
}

export default App
