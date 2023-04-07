import {IpcHelper} from "../helpers/ipc-helper";

export class QrService {
  constructor(
    public readonly ipcHelper: IpcHelper,
  ) {
  }

  public async generate(args: object): Promise<string> {
    const res = await this.ipcHelper.invoke('qrs.generate', args)
    return res.data.data
  }
}
