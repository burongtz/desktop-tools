import {QrService} from "../services/qr-service";
import {IpcHelper} from "../helpers/ipc-helper";
import {UnknownFactoryInstanceException} from "../exceptions/unknown-factory-instance-exception";

export type Newable<T> = new (...args: never[]) => T;

export interface Abstract<T> {
  prototype: T;
}

export type ServiceIdentifier<T = unknown> = (string | symbol | Newable<T> | Abstract<T>);

export class ServiceFactory {
  private static _serviceMap = new Map<ServiceIdentifier, object>([
    [QrService, new QrService(IpcHelper.instance)],
  ])

  public static create<T>(service: ServiceIdentifier<T>): T {
    const serviceInstance = this._serviceMap.get(service)
    if (!serviceInstance) {
      throw new UnknownFactoryInstanceException()
    }
    return serviceInstance as T
  }
}
