<template>
    <div id="currentDate">
        <div>
            <span>{{ fullDay }}</span>
            <span>{{ fullTime }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed, onUnmounted, ref, onMounted } from 'vue';

let date = ref(new Date())

const timer = setInterval(() => {
    date.value = new Date()
}, 800)

const fullDate = computed(() => {
    return date.value.getFullYear() + '-' +
        ((date.value.getMonth() + 1) < 10 ? ('0' + parseInt(date.value.getMonth() + 1)) : date.value.getMonth() + 1) + '-' +
        ((date.value.getDate() + 1) < 10 ? ('0' + parseInt(date.value.getDate() + 1)) : date.value.getDate() + 1)
})


const fullDay = computed(() => {
    return (date.value.getHours() < 10 ? ('0' + date.value.getHours()) : date.value.getHours()) + ':' +
     (date.value.getMinutes() < 10 ? ('0' + date.value.getMinutes()) : date.value.getMinutes()) + ':' +
      (date.value.getSeconds() < 10 ? ('0' + date.value.getSeconds()) : date.value.getSeconds())
})

const weekend = computed(() => {
    const arrWeekend = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return arrWeekend[date.value.getDay()]
})

const fullTime = computed(() => weekend.value + ' | ' + fullDate.value)


onUnmounted(() => {

    clearInterval(timer)

})


</script>

<style lang="less" scoped>

#currentDate {
    display: flex;
    align-items: center;
    margin: 0 1%;
    color: white;
    width: 20%;
    

    & > div {
        width: 26rem;
        height: 65%;

        & > span:not(:first-of-type) {
            font-size: 0.857143rem;
            font-weight: 400;
            font-family: PingFang SC;
            padding: 0 1rem;
        }

        & > span:first-of-type {
            width: 32%;
            font-weight: 400;
            font-family: Digital-7Mono,fantasy;
            font-size: 1.785714rem;
        }
    }
}
</style>