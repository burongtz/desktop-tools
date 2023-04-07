export class IpcHelper {
  private static _instance?: IpcHelper

  public static get instance(): IpcHelper {
    if (this._instance != null) {
      return this._instance
    }
    return new IpcHelper()
  }

  public static async invoke(channel: string, ...args: any[]): Promise<any> {
    return await window.electronAPI.invoke(`back:${channel}`, ...args)
  }
}
