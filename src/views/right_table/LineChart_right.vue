<template>
    <div id="lineChart_right"></div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TitleComponent } from 'echarts/components';
import store from '@/store/index'
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, computed } from 'vue';
import { LoadClose } from '@/components/Loading'


echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TitleComponent]);

const region = computed(() => store.getters.getCity)


onMounted(() => {
    let chartDom = document.getElementById('lineChart_right');
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
            y2: '13%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                color: '#557ac9',
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            boundaryGap: true
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: [5, 4],
                    dashOffset: 10,
                    color: '#084777'
                }
            },
            axisLabel: {
                color: '#557ac9'
            },
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}',
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
        series: [
            {
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
                            offset: 0, color: '#1373b7' // 0% 处的颜色
                        },
                        {
                            offset: 0.6, color: '#0b416b' //
                        },
                        {
                            offset: 1, color: 'transparent' // 100% 处的颜色
                        }],
                    }
                },
                itemStyle: {
                    color: '#1477be'
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

    myChart.on('finished', () => {
        LoadClose()
    })
})


</script>

<style scoped>
#lineChart_right {
    width: 100%;
    height: 100%;
}
</style>