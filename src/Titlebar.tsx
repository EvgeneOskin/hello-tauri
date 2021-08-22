import { appWindow } from '@tauri-apps/api/window'

export function TitleBar() {

  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="titlebar-button" onClick={minimize}>
        <img src="https://api.iconify.design/mdi:window-minimize.svg" alt="minimize" />
      </div>
      <div className="titlebar-button" onClick={maximize}>
        <img src="https://api.iconify.design/mdi:window-maximize.svg" alt="maximize" />
      </div>
      <div className="titlebar-button" onClick={close}>
        <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
      </div>
    </div>
  )
}

const minimize = () => appWindow.minimize()
const maximize = () => appWindow.toggleMaximize()
const close = () => appWindow.close()
