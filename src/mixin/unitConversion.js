import { reactive } from "vue";

export function getUnit(unitLength, params) {

    //判断最大值的单位
    let monad = ''
    switch (unitLength) {
        case 1:

            break;
        case 2:

            break;
        case 3:
            monad = '百'
            break;
        case 4: case 5: case 6: case 7:
        case 8:
            monad = '万'
            break;
        default:
            monad = '亿'
            break;
    }


    params(monad)
}


/**
 * 获取最大值并进行向上取整并且转换单位
 * @param {最大值} maxMeta 
 * @param {回调传出被除数} params 
 */
export function getMaxmum(maxMeta, params) {

    let max = []

    //判断最大值的单位,并做出相应的单位转换
    let length = 0;

    if (maxMeta.length / 8 > 1) {
        length = 8
    } else if (maxMeta.length / 4 >= 1) {
        length = 4
    } else if (maxMeta.length / 4 === 0) {
        length = 3
    } else if (maxMeta.length / 3 === 0) {
        length = 2
    } else if (maxMeta.length / 2 === 0) {
        length = 1
    }

    //获取接口数据里的最大值,如果是25万,那么就把图标的最大值设置为30万
    for (let i = 0; i < maxMeta.length - length; i++) {

        if (i == 0) {
            max.push((1 + parseInt(maxMeta.substring(0, 1))))
        } else {
            max.push(0)
        }
    }

    max = max.join('')

    /**
     * 接口数据,将所有值进行整除这个值进行单位转换
     */
    let val = ['1'];
    for (let i = 0; i < length; i++) {
        val.push(0)
    }

    //将接口数据里的值转换单位
    val = val.join("")

    params(val, max)
}