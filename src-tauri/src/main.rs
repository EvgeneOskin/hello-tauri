#![cfg_attr(
  all(not(debug_assertions), target_os = "mac"),
  windows_subsystem = "mac"
)]

use tauri::Manager;

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
fn my_hello_command(invoke_message: String) -> InvokeMessageResponse {
  println!("I was invoked from JS! {}", invoke_message);
  InvokeMessageResponse {
    message: "It's a test".into(),
    other_val: 42,
  }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![my_hello_command])
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
