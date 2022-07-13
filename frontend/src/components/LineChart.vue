<template>
<div>
     <e-chart :option="lines" ref="chart"/>
</div>
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
   props: ['lineData'],
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
   watch: {
     lineData: {
       handler: function() {
         this.update()
       },
       deep: true
     }
   },
   methods: {
     update: function() {
       const nSeries = this.lineData[0].length - 1

       this.lines.dataset = {
         source: this.lineData
       }

       this.lines.series = (new Array(nSeries)).fill(0).map((_, i) => (
           {
             type: 'line',
             name: this.lineData[0][i+1],
             encode: { x: 0, y: i+1 }
            }
          ))
     }
   },
}
</script>
