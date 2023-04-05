import path from "path";
import {app, BrowserWindow} from "electron";

export class AppHelper {
  static readonly PAGE_URL = 'http://localhost:5173';
  static readonly PAGE_FILE = new URL('./dist/index.html', `file://${__dirname}`).toString();
  static readonly WINDOW_DEFAULT_OPTIONS = {
    show: false,
    width: 800,
    height: 600,
    title: 'Desktop tools',
    webPreferences: {
      webviewTag: false,
      nodeIntegration: true,
      preload: path.join(__dirname, './preload.js')
    },
  }

  static ensureSingleInstance(): void {
    const isSingleInstance = app.requestSingleInstanceLock()
    if (!isSingleInstance) {
      app.quit()
      process.exit()
    }
  }

  static async createWindow(): Promise<BrowserWindow> {
    const pageUrl = import.meta.env.DEV ? AppHelper.PAGE_URL : AppHelper.PAGE_FILE
    const mainWindow = new BrowserWindow(AppHelper.WINDOW_DEFAULT_OPTIONS)
    mainWindow.setMenu(null)
    mainWindow.on('ready-to-show', () => mainWindow.show())
    await mainWindow.loadURL(pageUrl)
    mainWindow.webContents.openDevTools()
    return mainWindow
  }

  static async onSecondInstance(): Promise<void> {
    try {
      await AppHelper.createWindow()
    } catch (e) {
      console.error('Error while trying to prevent second-instance Electron event:', e);
    }
  }

  static onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }

  static async onActivate(): Promise<void> {
    if (BrowserWindow.getAllWindows().length > 0) {
      return
    }
    try {
      await AppHelper.createWindow()
    } catch (e) {
      console.error('Error while trying to handle activate Electron event:', e)
    }
  }
}
