const {contextBridge, ipcRenderer} = require('electron')

const CHANNEL_PREFIX = 'back:'
const API_KEY = 'electronAPI'

const api = {
  invoke(channel: string, ...args: any[]): Promise<any> {
    ensureValidIpc(channel)
    return ipcRenderer.invoke(channel, ...args)
  },
}

function ensureValidIpc(channel: string): void {
  if (!channel.startsWith(CHANNEL_PREFIX)) {
    throw new Error(`Unsupported IPC channel '${channel}'`);
  }
}

try {
  contextBridge.exposeInMainWorld(API_KEY, api)
} catch (e) {
  console.error(e);
}

export {}
