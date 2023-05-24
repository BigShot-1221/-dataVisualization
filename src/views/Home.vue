<template>
    <div id="homeRoot">
        <suspense>
            <template #default>
                <top-item />
            </template>
            <template #fallback>正在加载中</template>
        </suspense>
        <suspense>
            <template #default>
                <auto-navi-map />
            </template>
            <template #fallback>
                <h2>地图正在加载中....</h2>
            </template>
        </suspense>
        <div class="topBar">
            <top-bar />
        </div>
        <div class="body_content">
            <div class="contenta">
                <div class="div">
                    <suspense>
                        <template #default>
                            <line-chart :data="list.lineChartLeft" />
                        </template>
                        <template #fallback>
                            <h2>加载中...</h2>
                        </template>
                    </suspense>
                </div>
                <div class="div">
                    <suspense>
                        <template #default>
                            <pie_left :data="list.pieLeft" />
                        </template>
                        <template #fallback>
                            <h2>加载中...</h2>
                        </template>
                    </suspense>
                </div>
                <div class="div">
                    <suspense>
                        <template #default>
                            <histogram :data="list.histogramLeft" />
                        </template>
                        <template #fallback>
                            <h2>加载中...</h2>
                        </template>
                    </suspense>
                </div>
            </div>
            <div class="center">
                <div>
                    <suspense>
                        <template #default>
                            <contents />
                        </template>
                        <template #fallback>加载中</template>
                    </suspense>
                </div>
            </div>
            <div class="contenta">
                <div class="div">
                    <suspense>
                        <template #default>
                            <pie_right />
                        </template>
                        <template #fallback>
                            <h2>加载中...</h2>
                        </template>
                    </suspense>
                </div>
                <div class="div">
                    <suspense>
                        <template #default>
                            <histogram_right />
                        </template>
                        <template #fallback>
                            <h2>加载中...</h2>
                        </template>
                    </suspense>
                </div>
                <div class="div">
                    <suspense>
                        <template #default>
                            <line-chart_right />
                        </template>
                        <template #fallback>
                            <h2>加载中...</h2>
                        </template>
                    </suspense>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, reactive, computed, watch, nextTick } from 'vue';
import TopItem from '../components/TopItem.vue';
import store from '@/store/index'
import {
    panoramicInsightLeftOne,
    panoramicInsightLeftTwo,
    panoramicInsightLeftThree
} from '@/network/home'
import { LoadClose } from '@/components/Loading'
const LineChart = defineAsyncComponent(() => import('./left_table/LineChart.vue'));
const Pie_left = defineAsyncComponent(() => import('./left_table/Pie_left.vue'));
const TopBar = defineAsyncComponent(() => import('@/components/TopBar.vue'));
const Histogram = defineAsyncComponent(() => import('./left_table/Histogram.vue'));
const AutoNaviMap = defineAsyncComponent(() => import('@/views/map/Map'));
const pie_right = defineAsyncComponent(() => import('./right_table/Pie_right'));
const LineChart_right = defineAsyncComponent(() => import('./right_table/LineChart_right.vue'))
const Histogram_right = defineAsyncComponent(() => import('./right_table/Histogram_right.vue'))
const contents = defineAsyncComponent(() => import('@/components/Contents.vue'))
const CurrentDate = defineAsyncComponent(() => import('@/components/CurrentDate.vue'))
const topItem = defineAsyncComponent(() => import('@/components/TopItem.vue'))

const query = computed(() => store.getters.getRegion)


/**
 * 获取接口数据
 */
const list = reactive({
    lineChartLeft: {},
    lineChartLeftData: {
        atlasId: '',
        city: '',
        endYear: '',
        nameitem: '',
        startYear: ''
    },
    pieLeft: [],
    pieLeftData: {
        province: '',
        city: '',
        country: '',
        time: '1900-01-01~2018-12-31',
        path: 10,
        atlasId: '',
        atlasNodeId: '',
        userId: 257
    },
    histogramLeft: [],
    histogramLeftData: new FormData(),
})


watch(() => query.value, () => {
    getTableData()
}, { deep: true })


/**
 * 进行formDate形式的请求传值
 */
list.histogramLeftData.append('field', 'raw_total_sales')
list.histogramLeftData.append('year', '')
list.histogramLeftData.append('cyrs', '')
list.histogramLeftData.append('year_gte', '2014')
list.histogramLeftData.append('year_lte', '2017')
list.histogramLeftData.append('nameItems', '')

function getTableData() {

    //给接口添加数据进行重新查询
    // list.lineChartLeftData.city = query.value.city
    // list.pieLeftData.province = query.value.province
    // list.pieLeftData.city = query.value.city
    // list.pieLeftData.country = query.value.country
    // list.histogramLeftData.set('country', query.value.country)
    // list.histogramLeftData.set('province', query.value.province)
    // list.histogramLeftData.set('city', query.value.city)


    panoramicInsightLeftOne(list.lineChartLeftData).then(res => {
        list.lineChartLeft = res.data.CompanyNum
        list.lineChartLeft =     {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }

    })

    panoramicInsightLeftTwo(list.pieLeftData).then(res => {
        list.pieLeft = res.data
        list.pieLeft = [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    })
    panoramicInsightLeftThree(list.histogramLeftData).then(res => {
        list.histogramLeft = res.data
        list.histogramLeft =     {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
    })
}





</script>

<style scoped lang="less">
#homeRoot *:not(#map) {
    z-index: 2;
    text-align: center;
    // display: flex;
}

.topBar {
    display: flex;
    height: 7vh;
}

.body_content {
    display: flex;
    justify-content: center;
    height: 86vh;
    width: 98vw;
    padding-top: 3rem;
}

.contenta {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 26%;
}

.center {
    height: 32%;
    width: 44%;
    min-width: 43%;
    flex: 8;
    align-self: flex-end;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div:first-of-type {
        #mydiv();
        width: 100%;
        height: 100%;
    }
}

#mydiv () {
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgba(0, 51, 102, 0.6);
    /* background-color: rgba(250, 250, 250, 0.6); */
    // margin: 0 1% 2%;
    // border: 1px darkblue solid;
    background: url("~@/assets/images/panoramicInsight/bottomBj.png") no-repeat;
    background-size: 100% 100%;
}

.div {
    width: 90%;
    height: 32%;
    #mydiv();
}

#topItem {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%);
}
</style>