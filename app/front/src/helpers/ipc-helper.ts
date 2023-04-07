class IpcHelper {
  public static async invoke(channel: string, ...args: any[]): Promise<any> {
    return await window.electronAPI.invoke(`back:${channel}`, ...args)
  }
}
