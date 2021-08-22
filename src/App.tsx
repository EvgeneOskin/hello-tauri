import React from 'react'
import './App.css'
import { TauriBridge } from './TauriBridge'
import { TitleBar } from './Titlebar'

function App() {
  return (
    <div className="App">
      <TitleBar />
      <header className="App-header">
        <TauriBridge />
      </header>
    </div>
  )
}

export default App
