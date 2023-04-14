import {app, ipcMain} from 'electron'
import {AppHelper} from "./helpers/app-helper";
import {QrController} from "./controllers/qr-controller";


async function main(): Promise<void> {
  try {
    AppHelper.ensureSingleInstance()
    app
      .on('second-instance', AppHelper.onSecondInstance)
      .on('window-all-closed', AppHelper.onWindowAllClosed)
      .on('activate', AppHelper.onActivate)
    await app.whenReady()
    await AppHelper.createWindow()
    await handleIpcMain()
  } catch (e) {
    console.error('Failed to create window:', e)
  }
}

async function handleIpcMain(): Promise<void> {
  const qrController = new QrController()
  ipcMain.handle('back:qrs.generate', qrController.generate.bind(qrController))
  ipcMain.handle('back:qrs.saveAs', qrController.saveAs.bind(qrController))
}

main().catch()
