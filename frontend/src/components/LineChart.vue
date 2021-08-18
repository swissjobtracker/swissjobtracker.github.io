<template>
    <echart
                class="q-pt-lg q-pb-lg omg"
                :options="lines"
                autoresize
              />
</template>

<style scoped>
.echarts {
  width: 100%;
  height: 400px;
}
</style>


<script>
import EChart from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/timeline";




export default {
   name: 'lineChart',
   components: {
       echart: "Echart"
   },
   data() {
       return{
           lines: {
                xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        }
       }
   }
}
</script>
