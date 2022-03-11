import moment from 'moment'

export class Utils {
  /**
   * 处理pathname
   * @param pathname string
   * @returns
   */
  static formatOpenKeys(pathname: string) {
    let newStr = '',
      newArr = [],
      arr = pathname.split('/').map(i => '/' + i)
    for (let i = 1; i < arr.length - 1; i++) {
      newStr += arr[i]
      newArr.push(newStr)
    }
    return newArr
  }

  /**
   * 返回一个标准时间格式
   * @param format 时间格式
   * @returns date string
   */
  static createNewDate = (format: string) => {
    if (format) return moment().format(format)
  }

  /**
   * 将规范格式的string转成array
   * @param {String} str [1][2][3]
   * @returns
   */
  static formattedStringToArray = (str: string) => {
    try {
      if (!str) return []

      return JSON.parse(str.replace(/\]\[/g, ','))
    } catch (e) {
      throw e
    }
  }

  /**
   * 将[item][item2]中间的item提取出来组合成数组
   * @param {String} str [老人][志愿者]
   * @returns
   */
  static ExtractItemBetweenBracket = (str: string): string[] => {
    try {
      if (!str) return []
      let arrayitem = ''
      const arr = []
      for (let i = 0; i < str.length; i++) {
        switch (str[i]) {
          case ']':
            arr.push(arrayitem)
            arrayitem = ''
            break
          case '[':
            break
          default:
            arrayitem += str[i]
        }
      }
      return arr
    } catch (err) {
      throw err
    }
  }

  /**
   * 格式化查询条件,支持链式调用
   * Utils.FormatRequestQuery(query)(field,type)(field,type)
   * @param {any} query 查询条件结构体
   * @param {String} field 查询字段
   * @param {String} type 查询类型(like,between等)
   * @returns
   */
  static FormatRequestQuery = (query: any) => {
    function continuous(field: string, type: string) {
      query[field] = {
        value: query[field] ? query[field] : '',
        type: type,
      }
      return continuous
    }
    return continuous
  }
}
