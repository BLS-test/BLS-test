import fetch from '@/utils/fetch'

export function getGridData(query) {
    return fetch({
      url: '/table/data',
      method: 'get',
      params: query
    })
  }