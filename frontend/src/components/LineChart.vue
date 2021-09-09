<template>
     <e-chart :option="lines"/>
</template>

<style scoped>
.echarts {
  width: 100%;
  height: 400px;
}
</style>


<script>

import echarts from 'vue-echarts'
import {use} from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {LineChart} from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'


use([CanvasRenderer,LineChart,GridComponent, TitleComponent, TooltipComponent])

export default {
   name: 'lineChart',
   components: {
       'e-chart': echarts
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
