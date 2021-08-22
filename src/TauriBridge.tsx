import React from 'react'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/tauri'
import { getCurrent, WebviewWindow } from '@tauri-apps/api/window'


export function TauriBridge() {
  return (
    <div>
      <button onClick={emitEvent}>Send Events</button>
      <button onClick={openNewWindow}>Open New Window</button>
      <button onClick={execute}>Execute Rust</button>
    </div>
  )
}

async function execute() {
  const id = uuidv4()
  const unlisten = await listen(`callback-${id}`, (event: any) => {
    console.log(`events–${id}`, event)
  })

  console.log(await invoke('my_hello_command', {
    invokeMessage: 'Hello!',
    callbackStreamId: id,
  }))
  unlisten()
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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
