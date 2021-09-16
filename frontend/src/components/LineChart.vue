<template>
     <e-chart :option="option"/>
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
import { GridComponent,
          TitleComponent,
          TooltipComponent,
          TimelineComponent,
          DatasetComponent } from 'echarts/components'


use([CanvasRenderer,
LineChart,
GridComponent,
TitleComponent,
TooltipComponent,
TimelineComponent,
DatasetComponent])

export default {
   name: 'lineChart',
   components: {
       'e-chart': echarts
   },
   props: ['data'],
   emits: ['selectDate'],
   data() {
       return{
           lines: {
              xAxis: {
                  type: 'time',
              },
              yAxis: {
                  type: 'value'
              },
              dataset: {
                source: []
              },
              series: [],
              tooltip: {
                show: true,
                trigger: 'axis'
              }
          }
       }
   },
   computed: {
     option: function() {
       let o = Object.assign({}, this.lines)
       o.dataset.source = this.data

       if(this.data.length > 0) {
         const nSeries = this.data[0].length
         o.series = (new Array(nSeries)).fill(0).map((_, i) => ({ type: 'line', encode: { x: 0, y: i+1 }}))
       }
       return o
     }
   }
}
</script>
