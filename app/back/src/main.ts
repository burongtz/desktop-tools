import {app} from 'electron'
import {AppHelper} from "./helpers/app-helper";

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
  console.log('Handle ipc main!')
}

main().catch()
