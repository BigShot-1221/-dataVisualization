<template>
    <div id="histogram"></div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { PictorialBarChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, defineProps, watch, reactive } from 'vue';
import { getUnit, getMaxmum } from '@/mixin/unitConversion'
import { el } from 'element-plus/lib/locale';
import store from '@/store/index'
import { LoadClose } from '@/components/Loading'
echarts.use([GridComponent, PictorialBarChart, CanvasRenderer, BarChart]);

const list = defineProps({
    data: {
        type: Array,
        require: true,
        default: () => []
    }
})

const mapsVal = reactive({
    table: {}
})

//由于接口服务器已关闭,所以请求并不能使用

// const data = computed(() => {
//     return list.data
// })

const region = computed(() => store.getters.getCity)


/**
 * 由于数据加载的要比dom渲染的慢
 * 所以使用watch监听获取到数据之后再渲染echarts
 */
// watch(() => data.value, (newValue, oldValue) => {
//     max()
//     maps()
// })

// function max() {

//     let metaData = data.value.sort((val1, val2) => val2[1] - val1[1])[0][1];

//     getUnit(metaData.length, params => {
//         mapsVal.table.unit = params
//     })

//     // console.log('输出metaData', metaData.length)
//     // let extent = metaData.length == 6 ? 1 : metaData.length < 6 ? 0 : 2
//     // console.log('输出截取长度', extent)
//     // if(extent != 0){
//     //     metaData = metaData.split(0, extent)[0]
//     // }
//     getMaxmum(metaData, (dividend, max) => {
//         mapsVal.table.maxVal = max
//         data.value.forEach(params => {
//             params[1] = parseFloat(params[1] / dividend)
//         })
//     })

// }

function maps() {
    let chartDom = document.getElementById('histogram');
    let myChart = echarts.init(chartDom);
    let option;

    option = {
        title: {
            text: region.value + '企业营收统计',
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
            y2: '13%'
        },
        tooltip: {
            trigger: 'axis',
            // formatter: '{b}: {c}' + mapsVal.table.unit,
            formatter: params => {
                // return params[0].data[0] + ': ' + (params[0].data[1]) + mapsVal.table.unit + '元'
                return '500元'
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'solid'
                }
            },
            textStyle: {
                color: 'white'
            },
            backgroundColor: 'rgba(105, 105, 105, 0.5)',
            borderColor: 'rgba(105, 105, 105, 0.5)',
            extraCssText: 'height: 10%; padding: 0 1%'
        },
        xAxis: {
            type: 'category',
            // data: ['2017', '2016', '2015', '2014'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#557ac9'
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: [5, 4],
                    color: '#084777'
                }
            },
            axisLabel: {
                color: '#557ac9',
                formatter: '{value}' + mapsVal.table.unit,
            },
            min: 0,
            max: mapsVal.table.maxVal
        },
        series: [
            {
                name: '我是打底',
                type: 'pictorialBar',
                symbolSize: [12, 6], //调整截面形状
                symbolOffset: [0, 4], //调整截面位置
                symbolPosition: 'start',
                z: 2,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(6,87,131,0.5)"
                    },
                    {
                        offset: 1,
                        color: "rgba(6,87,131,1)"
                    }
                    ])
                },
                // data: data.value
                data: [120, 200, 150, 80, 70, 110, 130],

            },
            //柱体
            {
                name: '',
                type: 'bar',
                barGap: '0%',
                barWidth: 12, // 柱体宽度
                itemStyle: {
                    "color": {
                        "x": 0,
                        "y": 0,
                        "x2": 0,
                        "y2": 1,
                        "type": "linear",
                        "global": false,
                        "colorStops": [{ //第一节下面
                            "offset": 0,
                            "color": "rgba(3,156,198)"
                        }, {
                            "offset": 1,
                            "color": "rgba(5, 51, 79)"
                        }]
                    }
                },
                // data: data.value
                data: [120, 200, 150, 80, 70, 110, 130],

            },
            //柱顶圆片
            {
                name: "",
                type: "pictorialBar",
                symbolSize: [12, 5], //调整截面形状[宽, 高]
                symbolOffset: [0, -3],
                z: 60,
                symbolPosition: "end",
                "itemStyle": {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                        [{
                            offset: 0,
                            color: "rgba(2,193,241,1)"
                        },
                        {
                            offset: 1,
                            color: "rgba(23,237,194,1)"
                        }
                        ],
                        false
                    ),
                },
                // data: data.value
                data: [120, 200, 150, 80, 70, 110, 130],

            },
        ]
    };

    option && myChart.setOption(option);

    //检测到页面窗口大小有变化就执行这个方法来初始化一下echarts的大小来做到自适应
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

<style>
#histogram {
    width: 100%;
    height: 100%;
}
</style>