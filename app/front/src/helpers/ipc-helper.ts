export class IpcHelper {
  private static _instance: IpcHelper | null

  public static get instance(): IpcHelper {
    if (this._instance == null) {
      this._instance = new IpcHelper()
    }
    return this._instance;
  }

  public async invoke(channel: string, ...args: any[]): Promise<any> {
    return await window.electronAPI.invoke(`back:${channel}`, ...args)
  }
}
