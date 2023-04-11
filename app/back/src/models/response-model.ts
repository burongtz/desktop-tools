import _ from 'lodash'

interface ResponseData {
  status: string,
  readonly data?: any,
  readonly error?: { message: string }
}

const DEFAULT_RESPONSE_DATA = {
  status: 'success',
}

export class ResponseModel {
  constructor(
    public readonly data: Readonly<ResponseData> = _.cloneDeep(DEFAULT_RESPONSE_DATA)
  ) {
  }

  public static doSuccess<T>(data?: T) {
    return new ResponseModel({
      status: 'success',
      data,
    });
  }

  public static doError(message: string) {
    return new ResponseModel({
      status: 'error',
      error: {
        message: message,
      }
    })
  }
}
