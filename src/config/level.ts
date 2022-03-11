type levelOptType = {
  level: number
  levelName: string
  comment: string
}

// 系统用户 level
const sysLevelOpt: Array<levelOptType> = [
  {
    level: 2,
    levelName: '二级',
    comment: '',
  },
  {
    level: 3,
    levelName: '三级',
    comment: '',
  },
  {
    level: 4,
    levelName: '四级',
    comment: '',
  },
  {
    level: 5,
    levelName: '五级',
    comment: '',
  },
]

// 业务用户 level
const businesLevelOpt: Array<levelOptType> = [
  {
    level: 9,
    levelName: '九级',
    comment: '',
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const levelOpt: any = {
  2: '二级',
  3: '三级',
  4: '四级',
  5: '五级',
  9: '九级',
}

export { sysLevelOpt, businesLevelOpt, levelOpt }
