import {IpcRenderer} from 'electron'

declare global {
  interface Window {
    electronAPI: IpcRenderer;
  }
}
