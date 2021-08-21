import React from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { getCurrent, WebviewWindow } from '@tauri-apps/api/window'


export function Hello() {
  return (
    <div>
      <button onClick={emitEvent}>Send Events</button>
      <button onClick={openNewWindow}>Open New Window</button>
      <button onClick={execute}>Execute Rust</button>
    </div>
  )
}

async function execute() {
  console.log(await invoke('my_hello_command', { invokeMessage: 'Hello!' }))
}

function emitEvent() {
  // emit an event that are only visible to the current window
  const current = getCurrent()
  current.emit('event', JSON.stringify({ message: 'Tauri is awesome!' }))
  console.log('print')
}

function openNewWindow() {
  // emit an event that are only visible to the current window
  const webview = new WebviewWindow('window')
  webview.emit('event')
}
