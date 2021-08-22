# Hello Tauri

This project is a "hello world" project for trying [Tauri](https://tauri.studio/) with React Frontend created from [Create React App](https://github.com/facebook/create-react-app).

## What's inside

The frameless desktop app that sends messages from the webview window to the Rust backend.
The app implements [Hermit](https://tauri.studio/en/docs/usage/patterns/hermit) tauri parttern.
The app contains several types of messages:

- async `invoke` that calls a Rust function – command - from the JS code;
- send an `event` with a Serialized payload from a Rust to JS windows;
- stream events by an id from the Rust function to JS-based.

The stream events are not build in Tauri so it's implemented in a following way:

```typescript
async function startStream() {
  const id = uuidv4()
  const unlisten = await listen(`callback-${id}`, (event: any) => {
    console.log(`events–${id}`, event)
  })

  console.log(await invoke('start_stream', {
    invokeMessage: 'Hello!',
    callbackStreamId: id,
  }))
  unlisten()
}
```

```rust
#[tauri::command(async)]
async fn start_stream(window: Window, callback_stream_id: String, invoke_message: String) {
  println!("I was invoked from JS! {}", invoke_message);
  let callback_name = format!("callback-{}", callback_stream_id);
  for i in 1..100 {
    task::sleep(Duration::from_secs(1)).await;
    window
      .emit(
        &callback_name,
        InvokeMessageResponse {
          message: "It's a test".into(),
          other_val: i,
        },
      )
      .unwrap();
  }
}
```

Tauri codebase that works as a backend is in `src-tauiri`.
Rust codebase that works as a frontend is in `src`.

## Scripts

The project has a new `tauri` script in addition to the usual Create React App scripts.

```bash
$ npm run tauri dev
# Build and watch dev Create React App and dev tauri app
$ npm run tauri build
# Build dev Create React App and dev tauri app
```
