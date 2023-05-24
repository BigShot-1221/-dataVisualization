<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { LoadClose } from '@/components/Loading'


onMounted(() => {
  resize()
})

window.onresize = resize

function resize() {
  let html = document.getElementsByTagName('html')[0]
  let width = window.innerWidth;
  let font_size = 16 / 1920 * width;
  html.style.fontSize = parseInt(font_size) + 'px'
  document.documentElement.style.overflow = 'hidden';
}

</script>





<style lang="less">
html {
  height: 100vh;
}

body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: PingFang SC;
  font-family: Impact;
}
</style>
