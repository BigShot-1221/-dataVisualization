import { ElLoading } from 'element-plus'

let loadingInstance = null;
let checkSum = 0;

export const Loading = () => {
    loadingInstance = ElLoading.service({
        target: document.getElementsByTagName('html')[0],
        background: 'rgba(0, 0, 0, 0.5)',
        text: '加载中',
        fullscreen: true, 
        lock: true
    })
}

export const LoadClose = () => {
    checkSum += 1
    if(checkSum >= 6) {
        loadingInstance.close();
        checkSum = 0;
    }
}
