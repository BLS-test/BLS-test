import Mock from 'mockjs'

const optionsData = []
const count = 5

for (let i = 0; i < count; i++) {
    optionsData.push(Mock.mock({
    value: '@increment',
    label: '@cname'
  }))
}

export default {
    getOptionsData: () => {
    return optionsData
  }
}
