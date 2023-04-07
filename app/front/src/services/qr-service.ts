import {IpcHelper} from "../helpers/ipc-helper";

export class QrService {
  constructor(
    public readonly ipcHelper: IpcHelper,
  ) {
  }

  public async generate(): Promise<string> {
    const res = await this.ipcHelper.invoke('qrs.generate')
    return res.data.data
  }
}
