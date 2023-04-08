import {IpcMainInvokeEvent} from 'electron'
import {ResponseModel} from "../models/response-model";
import QRCode from 'qrcode'

export class QrController {
  public async generate(event: IpcMainInvokeEvent, args: object): Promise<ResponseModel> {
    try {
      const qr = await QRCode.toString(
        args.content,
        {
          type: 'svg',
          errorCorrectionLevel: 'H',
          margin: 1
        }
      )
      return ResponseModel.doSuccess<string>(qr)
    } catch (e: any) {
      return ResponseModel.doError(e.message);
    }
  }
}
