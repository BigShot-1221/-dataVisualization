import { request } from './request'

export function panoramicInsightLeftOne(raw) {
    return request({
        url: '/panoramicInsightLeftOne',
        method: 'post',
        data: raw
    })
}

export function panoramicInsightLeftTwo(raw) {
    return request({
        url: '/panoramicInsightLeftTwo',
        method: 'post',
        data: raw
    })
}

export function panoramicInsightLeftThree(raw) {
    return request({
        url: '/panoramicInsightLeftThree',
        method: 'post',
        data: raw
    })
}