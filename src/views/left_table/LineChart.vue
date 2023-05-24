<template>
    <div id="lineChart"></div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TitleComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, defineProps, computed, watch, reactive } from 'vue';
import { getUnit, getMaxmum } from '@/mixin/unitConversion'
import store from '@/store/index'
import { LoadClose } from '@/components/Loading'


echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TitleComponent]);

const list = defineProps({
    data: {
        type: Object,
        require: true,
        default: () => { }
    }
})

const maps = reactive({
    val: {},
    data: [],
    values: []
})

// const data = computed(() => list.data)

// const region = computed(() => store.getters.getCity)

// watch(() => list.data, () => {
    // console.log('第一个接口', Object.entries(list.data))

    /**
     * Object的转换数组方法
     */
    // list.data = Object.assign({}, list.data)

    /**
     * 这段循环很神奇,这是将对象转换为数组对象的方式
     * 原数据[{ 2018: 5521867, 2019: 6308653, 2020: 6462212 }]
     * 
     * 转换后:[ { '2018': 5521867 }, { '2019': 6308653 }, { '2020': 6462212 } ]
     */
    // for (let i in list.data[0]) {
    //         let o = {};
    //         o[i] = obj[0][i];
    //         maps.val.push(o)
    // }



    // list.data.keys = Object.keys(list.data)


    // maps.values = Object.values(list.data)

    //关于Object函数用法:https://blog.csdn.net/weixin_41534645/article/details/80379243
    // maps.data = Object.entries(list.data)



    //获取到数据中的最大值
    // let metaData = maps.values.sort((val1, val2) => val2 - val1)[0];


//     metaData = String(metaData)

//     getUnit(metaData.length, params => {
//         maps.val.unit = params
//     })



//     //将全部的值都转换单位,等比例缩放
//     getMaxmum(metaData, (dividend, max) => {
//         maps.val.maxVal = max
//         maps.data.map(params => {
//             params[1] = parseFloat(params[1] / dividend)
//         })
//     })

//     map()
// })



function map() {
    let chartDom = document.getElementById('lineChart');
    let myChart = echarts.init(chartDom);
    let option;

    option = {
        title: {
            text: region.value + '企业数量统计',
            textStyle: {
                color: 'white',
                fontSize: '1.42rem',
                fontFamily: 'PingFang SC'
            },
            padding: [20, 20]
        },
        grid: {
            x: '15%',
            y: '30%',
            x2: '10%',
            y2: '13%',
        },
        tooltip: {
            trigger: 'axis',
            //设置悬浮框显示的格式
            formatter: function (params, ticket, callback) {
                // return params[0].name + ': ' + params[0].value[1];
                return '名字 : 500'
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'solid'
                }
            },
            textStyle: {
                color: 'white',
            },
            backgroundColor: 'rgba(105, 105, 105, 0.5)',
            borderColor: 'rgba(105, 105, 105, 0.5)',
            extraCssText: 'height: 10%; padding: 0 1%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                color: '#557ac9',
                align: 'center'
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            boundaryGap: true,
            // data: list.data.keys
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: [3, 4],
                    dashOffset: 10,
                    color: '#084777',
                    opacity: 0.5
                }
            },
            axisLabel: {
                color: '#557ac9',
                formatter: `{value}${maps.val.unit}`
            },
            min: 0,
            max: maps.val.maxVal
        },
        series: [
            {
                // data: maps.data,
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                symbol: 'none',
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#249792' // 0% 处的颜色
                        },
                        {
                            offset: 0.5, color: '#145762' //
                        },
                        {
                            offset: 1, color: 'transparent' // 100% 处的颜色
                        }],
                    }
                },
                itemStyle: {
                    color: '#22938e'
                },
                smooth: true
            }
        ]
    };

    option && myChart.setOption(option);

    window.addEventListener('resize', () => { // 这里用箭头函数
        setTimeout(() => {
            myChart.resize()
        }, 200);
    })

    // myChart.on('finished', () => {
    //     LoadClose()
    // })
}


</script>

<style scoped>
#lineChart {
    width: 100%;
    height: 100%;
}
</style>