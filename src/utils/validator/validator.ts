/* eslint-disable @typescript-eslint/no-explicit-any */
import { validatorFileds } from './validatorFiled'
import validator from 'validator'

export function validatorUtils(rule: any, value: any) {
  return new Promise((resolve, reject) => {
    const _validator: any = validatorFileds[rule.field]
    if (value == undefined) {
      reject(`请输入${validatorFileds[rule.field]['type']}`)
    } else if (validator.isEmpty(value)) {
      reject(`请输入${validatorFileds[rule.field]['type']}`)
    } else {
      if (!validator.isLength(value, { min: _validator.minLength, max: _validator.maxLength }))
        reject(`${validatorFileds[rule.field]['type']}长度在${_validator.minLength}与${_validator.maxLength}之间`)
      resolve('')
    }
  })
}
