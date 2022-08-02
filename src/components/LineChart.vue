<template>
<div>
<div class="chart-title q-pa-lg">
  Chart title goes here
</div>
<div class="q-pa-sm">
     <e-chart
        autoresize
      	:option="lines"
        :update-options="{ replaceMerge: ['series'] }"
        :loading="loading"
        ref="chart"/>
</div>
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


import { getLineSeries } from '../timeseries'

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
   props: {
    series: {
      required: true
    },
    colors: {
      required: true
    }
   },
   emits: ['selectDate'],
   mounted() {
    this.update()
   },
   data() {
       return{
          loading: false,
          lines: {
            grid: {
              top: 15
            },
            xAxis: {
                type: 'time',
            },
            yAxis: {
                type: 'value'
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
     series: {
       handler: function() {
         this.update()
       },
       deep: true
     }
   },
   methods: {
     update: function() {
      this.loading = true
      getLineSeries(this.series)
        .then((data) => {
          const nSeries = data[0].length - 1

          this.lines = {
            series: (new Array(nSeries)).fill(0).map((_, i) => (
              {
                type: 'line',
                width: 3.5,
                showSymbol: false,
                color: this.colors[this.series[i].index],
                name: data[0][i+1],
                // first row is the header, slice that right off
                data: data.slice(1).map((row) => [row[0], row[i + 1]])
              }))
          }

          this.loading = false
        })
     },
   },
}
</script>
