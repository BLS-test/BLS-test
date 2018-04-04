import fetch from '@/utils/fetch'

export function getSelectOptions(url) {
    return fetch({
      url,
      method: 'get'
    })
  }