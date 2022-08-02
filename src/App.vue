<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import { registerMap } from 'echarts'


fetch('ch.svg')
      .then((r) => r.text())
      .then((svg) => {
        registerMap('ch', { svg: svg })
      })

export default defineComponent({
  name: 'App'
})
</script>
