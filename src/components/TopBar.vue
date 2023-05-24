<template>
    <div id="topBar">
        <div>测试市企业全景洞察</div>
        <current-date />
        <div></div>
        <region-option/>
    </div>
</template>

<script setup>
import { defineAsyncComponent, defineEmits } from 'vue';

const CurrentDate = defineAsyncComponent(() => import('./CurrentDate.vue'))
const regionOption = defineAsyncComponent(() => import('@/components/Options.vue'))

/**
 * 不再使用向上传值的方式进行数据传递,过于冗余 
 */
// const emit = defineEmits(['optionRegion'])
// function changeOption(value) {
//     emit('optionRegion', value)
// }
</script>

<style lang="less" scoped>
@import "~@/assets/css/dongcha.css";

#topBar {
    width: 100vw;
    height: 100%;
    background: url("~@/assets/images/panoramicInsight/headBJ.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & > #regionOption {
        position: absolute;
        top: 6%;
        left: 0.5rem;
    }

    & > #currentDate {
        position: absolute;
        top: 2%;
        left: -4rem;
    }

    & > div:first-of-type{
        display: inline-block;
        padding-top: 0.75rem;
        color: white;
        font-size: 2.35rem;
        font-weight: 400;
        font-family: YouSheBiaoTiHei;
    }
}
</style>

<style>

</style>