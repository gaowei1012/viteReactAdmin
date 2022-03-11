/*
 * @Author: weiqi
 * @Date: 2022-02-24 14:51:54
 * @LastEditors: weiqi
 * @LastEditTime: 2022-02-24 18:09:57
 * @Description: file content
 * @FilePath: /yl-cms/frontend/ms-userorg/src/utils/validator/inputs.ts
 */
import validator from 'validator'

export const inputsValidator = {
  // 检查字符串是否是手机号码
  isMobilePhone: (phone: string) => {
    if (!validator.isMobilePhone(phone, 'zh-CN')) throw '手机号码格式错误,不支持非大陆手机号'
  },

  // 检查字符串是否是电子邮件
  isEmail: (email: string) => {
    if (!validator.isEmail(email)) throw '邮箱格式错误'
  },
  // 检查字符串是否是有效的身份证代码
  isIdentityCard: (str: string) => {
    if (!validator.isIdentityCard(str, 'any')) throw '身份证格式错误'
  },
}
