import {IpcMainInvokeEvent} from 'electron'
import {ResponseModel} from "../models/response-model"
import QRCode from 'qrcode'
import * as fs from "fs";

const sharp = require('sharp');

const {dialog, SaveDialogOptions} = require('electron')

export class QrController {
  private readonly _DEFAULT_OPTIONS_SAVE_SVG: SaveDialogOptions = {
    title: 'Guardar archivo SVG',
    defaultPath: 'qr.svg',
    filters: [
      {name: 'Archivos SVG', extensions: ['svg']},
    ]
  }

  private readonly _DEFAULT_OPTIONS_SAVE_PNG: SaveDialogOptions = {
    title: 'Guardar archivo PNG',
    defaultPath: 'qr.png',
    filters: [
      {name: 'Archivos PNG', extensions: ['png']},
    ]
  }

  public async generate(event: IpcMainInvokeEvent, args: any): Promise<ResponseModel> {
    try {
      const qr = await QRCode.toString(
        args.content,
        {
          type: 'svg',
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 1024,
        }
      )
      return ResponseModel.doSuccess<string>(qr)
    } catch (e: any) {
      return ResponseModel.doError(e.message);
    }
  }

  public async saveAs(event: IpcMainInvokeEvent, args: any): Promise<ResponseModel> {
    try {
      switch (args.fileType) {
        case 'svg':
          await this._saveSvg(args.svgHtml)
          break
        case 'png':
          await this._savePng(args.svgHtml)
          break
      }
      return ResponseModel.doSuccess()
    } catch (e: any) {
      console.error(e)
      return ResponseModel.doError(e.message)
    }
  }

  private async _saveSvg(svgCode: string): Promise<void> {
    const filePath = await this._getFilePath(this._DEFAULT_OPTIONS_SAVE_SVG)
    fs.writeFileSync(filePath, svgCode, 'utf-8')
  }

  private async _savePng(svgCode: string): Promise<void> {
    const filePath = await this._getFilePath(this._DEFAULT_OPTIONS_SAVE_PNG)
    const buffer = Buffer.from(svgCode)
    await sharp(buffer).toFile(filePath)
  }

  private async _getFilePath(options: SaveDialogOptions): Promise<string> {
    const res = await dialog.showSaveDialog(options)
    if (!res.filePath) {
      throw new Error('Missing file path')
    }
    return res.filePath
  }
}
