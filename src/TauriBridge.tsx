import React, { Fragment, useState } from 'react'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/tauri'
import { getCurrent, WebviewWindow } from '@tauri-apps/api/window'
import { useCallback } from 'react'

type Event = {
  id: number,
  event: string,
  payload: {
    message: string,
    other_val: number,
  }
}

export function TauriBridge() {
  const [events, setEvents] = useState([] as Event[])
  const _startStream = useCallback(() => {
    startStream((id, event) => {
      setEvents((previous: Event[]) => [...previous, event])
    })
  }, [setEvents])
  return (
    <Fragment>
      <div>
        <button onClick={emitEvent}>Send Events</button>
        <button onClick={openNewWindow}>Open New Window</button>
        <button onClick={_startStream}>Start a Stream from Rust</button>
      </div>
      <h3>Events</h3>
      <div style={{ font: 'monospace', fontSize: 10, height: 200, overflow: 'scroll', background: 'black' }}>
        {events.length === 0
          ? 'No events yet. Click "Start a Stream from Rust" to start a stream'
          : events.map((event, index) => <pre key={`${index}`}><code>{`${event.event} ${JSON.stringify(event.payload)}`}</code></pre>)}
      </div>
    </Fragment>
  )
}

async function startStream(addEvent: (id: string, event: Event) => void) {
  const id = uuidv4()
  const unlisten = await listen(`callback-${id}`, (event: any) => {
    console.log(id, event)
    addEvent(id, event)
  })

  console.log(await invoke('start_stream', {
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
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}
