import { message } from 'antd'

class MessageUtils {
  static MsgSuccess(msg: string) {
    return message.success(msg)
  }

  static MsgWarning(msg: string) {
    return message.warn(msg)
  }
}

export default MessageUtils
