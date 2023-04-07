import {IpcMainInvokeEvent} from 'electron'
import {ResponseModel} from "../models/response-model";
import QRCode from 'qrcode'

export class QrController {
  public async generate(event: IpcMainInvokeEvent, ...args: any[]): Promise<ResponseModel<string>> {
    try {
      const foo = await QRCode.toString('Andy', {type: 'svg'});
      return ResponseModel.doSuccess<string>(foo)
    } catch (e) {
      console.error(e)
    }
  }
}
