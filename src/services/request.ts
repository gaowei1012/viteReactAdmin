import axios, { AxiosResponse, Method } from 'axios'
import { requestOptions, responseBody } from '../types/network'
import { rootStore } from '../stores/index'
import { message } from 'antd'

const defaultRequestOption: requestOptions = { showloading: false, throwErr: false, showMessage: true }

export function request(url: string, method: Method, data?: object, options?: requestOptions): Promise<responseBody> {
  const { showloading, throwErr, showMessage } = { ...defaultRequestOption, ...options }

  return new Promise((resolve, reject) => {
    const body = method === 'GET' ? 'params' : 'data'
    if (showloading) rootStore.loadingInstance.set_loading()

    axios({
      url,
      method: method,
      withCredentials: true,
      timeout: 10000,
      [body]: data === null ? '' : data,
    })
      .then((res: AxiosResponse<responseBody>) => {
        rootStore.loadingInstance.remove_loading()
        if (res.status === 200 && res.statusText === 'OK' && res.data.statusCode === 200) {
          resolve(res.data)
        } else {
          throw res.data
        }
      })
      .catch((err: any) => {
        console.log(showMessage)
        if (showMessage) message.warn(JSON.stringify(err.message), 2.5)
        rootStore.loadingInstance.remove_loading()
        // if ([errorCode.SessionInvalidError, errorCode.SessionNotFoundError].indexOf(err.statusCode) != -1) {
        //   window.location.href = process.env.REACT_APP_MODE === 'docker' ? 'https://yl.qwd-tech.com/userorg' : 'http://localhost:6001'
        // }
        // if (err.statusCode === errorCode.NotSetUpPermission) {
        //   window.location.href = process.env.REACT_APP_MODE === 'docker' ? 'https://yl.qwd-tech.com/userorg/#/chooseorg' : 'http://localhost:6001/chooseorg'
        // }
        if (throwErr) reject(err)
      })
  })
}
