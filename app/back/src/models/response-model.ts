import _ from 'lodash'

interface ResponseData<T> {
  status: string,
  readonly data?: T,
  readonly error?: { message: string }
}

const DEFAULT_RESPONSE_DATA = {
  status: 'success',
}

export class ResponseModel<T> {
  constructor(
    public readonly data: Readonly<ResponseData<T>> = _.cloneDeep(DEFAULT_RESPONSE_DATA)
  ) {
  }

  public static doSuccess<T>(data: T) {
    return new ResponseModel({
      status: 'success',
      data: data,
    });
  }
}
