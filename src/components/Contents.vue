<template>
    <div id="contents">
        <div>
            <div v-for="(item, index) in items" :key="item.name">
                <div>
                    <img :src="item.icon" alt />
                </div>
                <div>
                    <div class="valeof">
                        {{ item.value }}
                        <span>{{ item.monad }}</span>
                    </div>
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    items: {
        type: Array,
        default: [
            {
                icon: require('@/assets/images/panoramicInsight/icon1.png'),
                name: '长治市企业总数',
                value: '10000',
                monad: '家'
            },
            {
                icon: require('@/assets/images/panoramicInsight/icon2.png'),
                name: '长治市营收总额',
                value: '10000',
                monad: '亿元'
            },
            {
                icon: require('@/assets/images/panoramicInsight/icon3.png'),
                name: '长治市就业人数',
                value: '10000',
                monad: '人'
            },
            {
                icon: require('@/assets/images/panoramicInsight/icon4.png'),
                name: '长治市高新技术企业',
                value: '10000',
                monad: '家'
            },
            {
                icon: require('@/assets/images/panoramicInsight/icon5.png'),
                name: '长治市知识产权',
                value: '10000',
                monad: '个'
            },
            {
                icon: require('@/assets/images/panoramicInsight/icon6.png'),
                name: '长治市企业5000万以上规模',
                value: '10000',
                monad: '家'
            }
        ]
    }
})

</script>

<style lang="less" scoped>
#contents {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;

    & > div {
        width: 97%;
        height: 70%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        & > div {
            display: flex;
            // flex-direction: column;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            flex: 1 1 33%;
            text-align: left;

            & > div:first-of-type {
                & > img {
                    width: 5.3rem;
                    height: 5.4rem;
                }
            }

            & > div:last-of-type {
                flex: 2;
            }
        }

        & > div * {
            word-wrap: break-word;
            word-break: break-all;
            white-space: pre-wrap !important;
            text-overflow: ellipsis !important;
            overflow: hidden !important;
        }
    }

    & p {
        font-weight: bold;
    }
}

span {
    color: white;
}

.valeof {
    color: #30fdff;
    font-size: 2rem;
    font-weight: 400;

    & > span {
        color: #30fdff;
        font-size: 1rem;
    }
}

.valeof + span {
    font-size: 1rem;
    font-weight: 400;
}
</style>