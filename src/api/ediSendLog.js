import fetch from '@/utils/fetch'


//申报报文队列
export function getediSendQueue(params) {
    return fetch({
        url: 'edi/ediSendQueue/list',
        method: 'get',
        params
    })
}

//申报报文日志
export function getediSendLog(params) {
    return fetch({
        url: 'edi/ediSendLog/list',
        method: 'get',
        params
    })
}
//申报报文队列查阅
export function getediSendView(id) {
    return fetch({
        url: `edi/ediSendQueue/list/${id}/view`,
        method: 'get'
    })
}
//申报报文日志查阅
export function getediSendLogView(id) {
    return fetch({
        url: `edi/ediSendLog/list/${id}/view`,
        method: 'get'
    })
}
//申报报文重置
export function ediSendReset(id) {
    return fetch({
        url: '/edi/ediSendQueue/list/update',
        method: 'get',
        params: {
            "oid": id,
            "status":"N"
        }
    })
}
//路由配置表
export function getediRoutingInfo(params) {
    return fetch({
        url: 'edi/ediRoutingInfo/list',
        method: 'get',
        params
    })
}
//路由配置表-查阅
export function ediRoutingInfoView(id) {
    return fetch({
        url: `edi/ediRoutingInfo/list/${id}/view`,
        method: 'get'
    })
}


