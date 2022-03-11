const validatorFileds: any = {
  username: {
    type: '手机号',
    minLength: 11,
    maxLength: 11,
  },
  password: {
    type: '密码',
    minLength: 3,
    maxLength: 16,
  },
  old_password: {
    type: '旧密码',
    minLength: 3,
    maxLength: 16,
  },
  new_password: {
    type: '确认密码',
    minLength: 3,
    maxLength: 16,
  },
  newPassword: {
    type: '确认密码',
    minLength: 3,
    maxLength: 16,
  },
  phone: {
    type: '手机号',
    minLength: 11,
    maxLength: 11,
  },
  nickname: {
    type: '姓名',
    minLength: 2,
    maxLength: 64,
  },
  email: {
    type: '邮箱地址',
    minLength: 6,
    maxLength: 64,
  },

  contract_no: {
    type: '协议编号',
    minLength: 1,
    maxLength: 255,
  },
  ssn: {
    type: '身份证号',
    minLength: 15,
    maxLength: 18,
  },
  name: {
    type: '客户姓名',
    minLength: 1,
    maxLength: 32,
  },
  age: {
    type: '年龄',
    minLength: 1,
    maxLength: 32,
  },
  amount: {
    type: '认购金额',
    minLength: 1,
    maxLength: 6,
  },
  interest: {
    type: '年化利率',
    minLength: 1,
    maxLength: 3,
  },
  period: {
    type: '投资年限',
    minLength: 1,
    maxLength: 2,
  },
  bank: {
    type: '银行',
    minLength: 1,
    maxLength: 64,
  },
  bank_card: {
    type: '银行卡号',
    minLength: 9,
    maxLength: 30,
  },
  location: {
    type: '客户所在区域',
    minLength: 0,
    maxLength: 255,
  },
  company_name: {
    type: '公司名称',
    minLength: 1,
    maxLength: 64,
  },
  comment: {
    type: '备注',
    minLength: 0,
    maxLength: 500,
  },
  event_title: {
    type: '活动名称',
    minLength: 1,
    maxLength: 255,
  },
  address: {
    type: '活动地址',
    minLength: 1,
    maxLength: 255,
  },
  news_title: {
    type: '资讯标题',
    minLength: 1,
    maxLength: 255,
  },
  product_title: {
    type: '产品名称',
    minLength: 1,
    maxLength: 255,
  },
  offering_size: {
    type: '发行规模(总募资额)',
    minLength: 1,
    maxLength: 11,
  },
  city: {
    minLength: 0,
    maxLength: 32,
  },
  wechat_id: {
    type: '微信号',
    minLength: 0,
    maxLength: 64,
  },
  province: {
    minLength: 0,
    maxLength: 32,
  },
  district: {
    minLength: 0,
    maxLength: 32,
  },
  trade_password: {
    minLength: 3,
    maxLength: 64,
  },
}

export { validatorFileds }
