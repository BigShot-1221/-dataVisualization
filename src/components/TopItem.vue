<template>
    <div id="topItem">
        <div
            :class="{ 'itemTrue': actived === index }"
            v-for="(item, index) in items"
            :key="item.value"
            @click="itemClick(index)"
        >
            <span>{{ item.name }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';


const actived = ref(2)

let img = computed(() => `url(${require(`@/assets/images/panoramicInsight/topItem.png`)})`)

// const pitchClass = computed( () => actived.value == )

// console.log('打印计算属性:', img)

function itemClick(value) {
    actived.value = value
    console.log('点击了', actived.value)
}

defineProps({
    items: {
        type: Array,
        default: [
            {
                name: '2019年',
                value: 0
            },
            {
                name: '2020年',
                value: 1
            },
            {
                name: '2021年',
                value: 2
            },
            {
                name: '2022年',
                value: 3
            }
        ]
    }
})




</script>

<style lang="less" scoped>
// @uri: v-bind(img);

#topItem {
    width: 40%;
    height: 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #4285cb;
    font-size: 1.1rem;
    font-weight: 400;
    font-family: PingFang SC;

    & > div {
        //    background: url('~@/assets/images/panoramicInsight/topItem.png') no-repeat;
        background: v-bind(img) no-repeat;
        background-size: 100% 100%;
        width: 19%;
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .itemTrue {
        background: url("~@/assets/images/panoramicInsight/topItemSelect.png")
            no-repeat;
        background-size: 100% 100%;
        color: white;
    }
}
</style>