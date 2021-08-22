#![cfg_attr(
  all(not(debug_assertions), target_os = "mac"),
  windows_subsystem = "mac"
)]

use std::time::Duration;

use async_std::task;

use tauri::{Manager, Window};

#[derive(serde::Serialize)]
struct Payload {
  message: String,
}

#[derive(serde::Serialize)]
struct InvokeMessageResponse {
  message: String,
  other_val: usize,
}

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

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![start_stream])
    .setup(|app| {
      let main_window = app.get_window("main").unwrap();

      // listen to the `event-name` (emitted on the `main` window)
      let id = main_window.listen("event", |event| {
        println!("got window event-name with payload {:?}", event.payload());
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
