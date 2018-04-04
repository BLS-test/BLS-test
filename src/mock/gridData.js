import Mock from 'mockjs'

const GridData = []
const count = 50

for (let i = 0; i < count; i++) {
  GridData.push(Mock.mock({
    id: '@increment',
    zip: +Mock.Random.date('T'),
    name: '@cname',
    psn: '@cname',
    remark: '@ctitle(10, 20)',
    forecast: '@float(0, 100, 2, 2)',
    state: '@integer(1, 3)',
      'type|1': ['通过', '否决', '待审', '移交'],
    'address|1': ['published', 'draft', 'deleted'],
    date: '@datetime',
    cnum: '@integer(300, 5000)'
  }))
}

export default {
  initGrid: () => {
    return GridData
  }
}
