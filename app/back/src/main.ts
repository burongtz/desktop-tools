import {app, BrowserWindow} from 'electron'
import * as path from 'path'

const isSingleInstance = app.requestSingleInstanceLock()

if (!isSingleInstance) {
  app.quit()
  process.exit()
}

async function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    title: 'Desktop Plaga Foranea',
    webPreferences: {
      webviewTag: false,
      nodeIntegration: true,
      preload: path.join(__dirname, './preload.js')
    }
  });

  mainWindow.setMenu(null);
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  const pageUrl = import.meta.env.DEV
    ? 'http://localhost:5173'
    : new URL('./dist/index.html', `file://${__dirname}`).toString()

  await mainWindow.loadURL(pageUrl)

  mainWindow.webContents.openDevTools()

  return mainWindow
}

app.on('second-instance', () => {
  createWindow().catch((err) =>
    console.error('Error while trying to prevent second-instance Electron event:', err)
  )
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length > 0) {
    return
  }
  createWindow().catch((err) =>
    console.error('Error while trying to handle activate Electron event:', err)
  )
})

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed to create window:', e))
