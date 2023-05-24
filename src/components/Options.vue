<template>
    <div id="regionOption">
        <div class="example-block">
            <span class="example-demonstration">选择产业:</span>
            <el-cascader
                size="small"
                v-model="query.administrativeRegion"
                :options="area"
                :props="props1"
            />
        </div>
        <div class="example-block">
            <span class="example-demonstration">区域选择:</span>
            <el-cascader
                ref="region"
                size="small"
                v-model="query.administrativeRegion"
                :options="area"
                :props="props1"
                @change="change"
            />
        </div>
    </div>
</template>

<script setup>
import area from '@/assets/json/area.json'
import { defineEmits, nextTick, onMounted, ref, reactive } from 'vue'
import store from '@/store/index'
import { Loading } from './Loading'


const query = reactive({
    region: {
        province: '',
        city: '',
        country: ''
    },
    replaceRegion: {
        cache: false,
        dname: '',
    },
    administrativeRegion: ["140000", "140400"]
})

onMounted(() => {
    change()
})

const emit = defineEmits(['changeOption'])

const region = ref(null)

function change(value) {
    region.value.togglePopperVisible(false);

    let labelValue = region.value.presentText
    let labelList = labelValue.split(' / ')


    query.region.province = ''
    query.region.city = ''
    query.region.country = ''

    if (labelList.length === 3) {//县
        query.replaceRegion.dname = labelList[2]
        query.region.province = labelList[0]
        query.region.city = labelList[1]
        query.region.country = labelList[2]

    } else if (labelList.length === 2) {
        const cityArr = ['北京市', '上海市', '天津市', '重庆市']

        query.region.province = labelList[0]
        query.replaceRegion.dname = labelList[1]

        //判断是否为直辖市
        cityArr.includes(labelList[0]) ? query.region.country = labelList[1] : query.region.city = labelList[1]

    } else if (labelList.length === 1) { //全国\省
        query.replaceRegion.dname = labelList[0]
        labelList[0] != '全国' ? query.region.province = labelList[0] : null
    }

    //将数据传递过去
    store.commit('setQuery', query)

    // console.log('打印query', store.getters.getQuery)

    /**
     * 原定为用向上传递数据的方式进行数据获取,
     * 过于麻烦,需要传递多个层级,所以现在
     * 直接使用vuex进行数据传递
     */
    // emit('changeOption', query)


    Loading()
}


const props1 = {
    checkStrictly: true,
}


</script>


<style lang="less" scope>
#regionOption {
    color: #ffff;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    width: 24%;
    margin-bottom: 1%;
    font-size: 1rem;
    font-weight: 400;

    & > div {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 1.07rem;

        & > span {
            color: #03a2e3;
        }

        & > .el-cascader {
            width: 70%;
            font-size: 1rem;
            & > .el-input {
                & > .el-input__inner {
                    background-color: #071531;
                    border: 1px #049ee0 solid;
                    border-radius: 0;
                    box-shadow: none;
                    color: #03a2e3;
                }

                & > .el-input__suffix {
                    & > .el-input__suffix-inner {
                        & > .el-icon {
                            color: #03a2e3;
                        }
                    }
                }
            }
        }
    }
}

.el-popper {
    --el-cascader-menu-text-color: white;
    background-color: #071531 !important;
    border: 0 !important;
    // color: #03a2e3 !important;

    & > .el-cascader-panel {
        --el-cascader-menu-text-color: white;
        --el-cascader-node-background-hover: #123aaf;
        & > .el-scrollbar {
            & > .el-cascader-menu__wrap {
                & > .el-scrollbar__view {
                    font-size: 1rem;
                    color: white;

                    & > .el-cascader-node:not(.is-disabled):hover {
                        background: #123aaf;
                    }
                }
            }
        }
    }
    & > .el-popper__arrow::before {
        background-color: #071531 !important;
        border: 1px solid #071531 !important;
    }
}
</style>
