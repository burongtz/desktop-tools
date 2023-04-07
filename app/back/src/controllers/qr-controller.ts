import {IpcMainInvokeEvent} from 'electron'

export class QrController {
  public async generate(event: IpcMainInvokeEvent, ...args: any[]): Promise<string> {
    return ''
  }
}
