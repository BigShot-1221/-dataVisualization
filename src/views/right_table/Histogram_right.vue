<template>
    <div id="histogram_right"></div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { PictorialBarChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, computed } from 'vue';
import store from '@/store/index'
import { LoadClose } from '@/components/Loading'
echarts.use([GridComponent, PictorialBarChart, CanvasRenderer, BarChart]);

let line = ["1030", "205", "84", "568", "689", "4587"];

const region = computed(() => store.getters.getCity)


onMounted(() => {
    let chartDom = document.getElementById('histogram_right');
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
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                color: '#557ac9'
            },
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}亿元',
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
                data: line
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
                            "color": "rgba(29,204,184)"
                        }, {
                            "offset": 1,
                            "color": "rgba(15,84,109)"
                        }]
                    }
                },

                data: line
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
                            color: "rgba(37,255,216,1)"
                        }
                        ],
                        false
                    ),
                },
                data: line
            }
        ]
    };

    option && myChart.setOption(option);

    //检测到页面窗口大小有变化就执行这个方法来初始化一下echarts的大小来做到自适应
    window.addEventListener('resize', () => { // 这里用箭头函数
        setTimeout(() => {
            myChart.resize()
        }, 200);
    })

    myChart.on('finished', () => {
        LoadClose()
    })
})
</script>

<style>
#histogram_right {
    width: 90%;
    height: 90%;
}
</style>