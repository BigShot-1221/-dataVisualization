<template>
  <div id="pie_right"></div>
</template>

<script setup>import { onMounted, computed } from 'vue';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import store from '@/store/index'
import { LoadClose } from '@/components/Loading'

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const region = computed(() => store.getters.getCity)


onMounted(() => {
  let chartDom = document.getElementById('pie_right');
  let myChart = echarts.init(chartDom);
  let option;

  option = {
    title: {
      text: region.value + '企业性质占比',
      textStyle: {
        color: 'white',
        fontSize: '1.42rem',
        fontFamily: 'PingFang SC'
      },
      padding: [20, 20]
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      icon: 'circle',
      orient: 'vertical',
      bottom: '15%',
      right: '10%',
      textStyle: {
        color: 'white',
        fonSize: '3rem'
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['35%', '50%'],
        center: ['30%', '60%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'right'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '10',
            fontWeight: 'bold'
          }
        },
        label: {
          show: false,
          position: 'center',
          formatter: '{d}%',
          color: params => {
            let colors = ['#ccff32', '#23e6e4', '#3292ff', '#3251d5', '#7658f9']

            return colors[params.dataIndex]
          }
        },
        labelLine: {
          show: false
        },
        tooltip: {
          position: ['50%', '50%'],
          formatter: '{b} : {c}({d}%)',  //设置饼图提示框的提示数据格式
          textStyle: {
            color: 'white',
          },
          backgroundColor: 'rgba(105, 105, 105, 0.5)',
          borderColor: 'rgba(105, 105, 105, 0.5)',
          extraCssText: 'height: 10%; padding: 0 1%', //手动添加饼图提示框的样式
        },
        itemStyle: {
          color: params => {
            let colors = ['#ccff32', '#23e6e4', '#3292ff', '#3251d5', '#7658f9']

            return colors[params.dataIndex]
          }
        },
        data: [
          { value: 961, name: '500 - 1000万' },
          { value: 91, name: '5000 - 10000万' },
          { value: 8284, name: '0 - 100万' },
          { value: 66, name: '10000万以上' },
          { value: 598, name: '1000 - 5000万' }
        ]
      },
      //边框的设置
      {
        radius: ['31%', '32%'],
        center: ['30%', '60%'],
        type: 'pie',
        label: {
          show: false,
          // emphasis: {
          //   show: false
          // }
        },
        labelLine: {
          show: false,
          // emphasis: {
          //   show: false
          // }
        },
        emphasis: {
          disabled: false,
          scale: false //去除悬浮变大
        },
        itemStyle: {
          color: '#1b5fa1'
        },
        animation: false,
        tooltip: {
          show: false
        },
        data: [
          {
            value: 0,
            // itemStyle: {
            //   color: 'rgba(250,250,250,0.3)'
            // }
          }
        ]
      },
      // {
      //   name: '外边框',
      //   type: 'pie',
      //   // clockWise: false, //顺时加载
      //   // hoverAnimation: false, //鼠标移入变大
      //   center: ['50%', '50%'],
      //   radius: ['65%', '65%'],
      //   label: {
      //     show: false
      //   },
      //   data: [
      //     {
      //       value: '',
      //       name: '',
      //       itemStyle: {
      //         borderWidth: 2,
      //         borderColor: '#0b5263'
      //       }
      //     }
      //   ]
      // }
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
#pie_right {
  width: 100%;
  height: 100%;
}
</style>