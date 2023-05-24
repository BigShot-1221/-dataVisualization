<template>
    <div id="map" class="map-container"></div>
</template>

<script setup>
import { onMounted, computed, watch, reactive, watchEffect } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import store from '@/store/index'

const data = reactive({
    map: {},
    AMap: {},
    query: {},
})

const query = computed(() => store.getters.getReplaceRegion)



onMounted(() => {
    //设置高德地图的安全密钥
    window._AMapSecurityConfig = {
        securityJsCode: '959f3860a1190611e2e3c5ef23a386f1',
    }
    initMap()
})



watch(() => query.value.dname, () => {
    data.query = query.value
    initHZmap()
}, { deep: true })

function initHZmap() {
    if (data.AMap.plugin == undefined) return;

    //清除缓存
    if (query.value.cache) {
        data.map.remove(query.value.cache)
        data.query.cache = false
    }
    if (query.value.dname != '全国') {
        data.AMap.plugin('AMap.DistrictSearch', () => {
            let districtSearch = new AMap.DistrictSearch({
                // 关键字对应的行政区级别，共有5种级别
                level: 'province',
                //  是否显示下级行政区级数，1表示返回下一级行政区
                subdistrict: 0,
                // 返回行政区边界坐标点
                extensions: 'all',
            })

            // if (query.dname == '长治经济开发区') {
            //     let reuslt = {
            //         districtList: [{ boundaries: [czjingkaiqu.features[0].getmetry.coordinates] }]
            //     }
            //     handlePolygon(reuslt)
            // } else {
            // console.log('进入到else里面了', query.value.dname)

            // 搜索所有省/直辖市信息
            districtSearch.search(query.value.dname, (status, result) => {
                // 查询成功时，result即为对应的行政区信息
                handlePolygon(result)
            })
            // }


        })
    }
}

//通过AMap.Polygon对象在地图上绘制多边形
function handlePolygon(result) {
    let bounds = result.districtList[0].boundaries

    if (bounds) {

        for (let i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            data.query.cache = new AMap.Polygon({
                map: data.map, // 指定地图对象
                strokeWeight: 1, // 轮廓线宽度
                path: bounds[i], //轮廓线的节点坐标数组
                fillOpacity: 0.15, //透明度
                fillColor: '#256edc', //填充颜色
                strokeColor: '#256edc', //线条颜色
            })
            data.query.cache.on('click', (e) => {

            })
        }
        // 地图自适应
        data.map.setFitView()

    }
}


async function initMap() {
    await AMapLoader.load({
        "key": "21c43daaa952f740f4c71b64b8fbd6bf",              // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "2.0",       // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": ['AMap.DistrictSearch', 'AMap.Geocoder'],
    }).then((AMap) => {

        data.AMap = AMap

        data.map = new AMap.Map('map', {
            jogEnable : false,
            animateEnable : false,
            resizeEnable: true,
            zoom: 5,
            center: [116.418261, 39.921984],
            // showLabel: true,
            mapStyle: 'amap://styles/darkblue',
            // viewMode: '3D',  // 地图设置成 3D 模式，否则图层会失去高度信息
        });

    }).catch(e => {
        console.log(e);
    })

    initHZmap()
}
</script>

<style>
.map-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>