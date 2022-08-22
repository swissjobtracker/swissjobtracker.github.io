<template>
<div>
<div class="chart-title ">
  INDEX OF JOB POSTINGS
</div>
<div class="chart-title">
  By {{ displayMode }}, weekly unique job postings, (Indexed 2018=100)
</div>
<div>
     <e-chart
        autoresize
      	:option="lines"
        :update-options="{ replaceMerge: ['series'] }"
        :loading="loading"
        @updateAxisPointer="onUpdateAxisPointer"
        @zr:click="onClick"
        ref="chart"/>
         <e-chart
      class="offscreen"
      ref="dlchart"
      :options="offScreenOptions"
      hidden="true"
    />
        <div align="right">(data source x28)</div>
</div>
</div>
</template>

<style scoped>
.echarts {
  width: 100%;
  height: 400px;
}

.echarts.offscreen {
  width: 600px;
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

const ticksize = 20;

export default {
   name: 'lineChart',
   components: {
       'e-chart': echarts
   },
   props: {
    mode: {
      required: true
    },
    series: {
      required: true
    },
    colors: {
      required: true
    }
   },
   emits: ['setActiveDate'],
   mounted() {
    this.update()
   },
   data() {
       return{
          offScreenOptions: {},
          loading: false,
          lines: {
            grid: {
              top: 15,
              left: '0%',
              containLabel: true
            },
            xAxis: {
                type: 'time',
                axisLabel: {
                  showMinLabel: true,
                  formatter: '{MMM} {yearStyle|{yyyy}}',
                  rich: {
                    yearStyle: {
                      fontWeight: 'bold'
                    }
                  }
                }
            },
            yAxis: {
                type: 'value',
                min: function({min}) {
                  return ticksize*Math.floor(min/ticksize)
                },
                max: function({max}) {
                  return ticksize*Math.ceil(max/ticksize)
                },
                interval: ticksize
            },
            series: [],
            tooltip: {
              show: true,
              valueFormatter: (x) => x.toFixed(2),
              trigger: 'axis'
            }
          },
          activeDate: null
       }
   },
   computed: {
      displayMode: function() {
        const modeLabels = {
          canton : "canton",
          noga : "industry",
          isco : "occupation"
        }

        return modeLabels[this.mode]

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
            series: Array.from({length: nSeries}).map((_, i) => (
              {
                type: 'line',
                lineStyle: {
                  width: 3,
                },
                showSymbol: false,
                color: this.colors[this.series[i].index],
                name: this.series[i].byvalue.label,
                // first row is the header, slice that right off
                data: data.slice(1).map((row) => [row[0], row[i + 1]])
              }))
          }

          this.loading = false
        })
        .catch((e) => {
          this.loading = false
          this.lines = {
            graphic: {
              type: 'text',
              left: 'center',
              top: 'center',
              z: 100,
              style: {
                fill: '#999',
                text: 'Error while loading data',
                font: 'bold 20px sans-serif'
              }
            }
          }
        })
     },
     onUpdateAxisPointer: function(e) {
      if(e.axesInfo && e.axesInfo[0] && e.axesInfo[0].value) {
        this.activeDate = e.axesInfo[0].value
      }
     },
     downloadChart() {
      this.offScreenOptions = JSON.parse(JSON.stringify(this.lines));
      this.offScreenOptions.title = {
        text: 'moo',
      };
      // this.offScreenOptions.grid.top = 80
      // this.offScreenOptions.grid.bottom = 50
      // this.offScreenOptions.legend.top = 40
      // this.offScreenOptions.graphic = [
      //   {
      //     type: "text",
      //     right: 0,
      //     bottom: 0,
      //     z: 100,
      //     style: {
      //       fill: "#000",
      //       text: this.$t('common.source'),
      //     },
      //   },
      // ]

      window.setTimeout(() => {
        const b64png = this.$refs.dlchart.getDataURL({
          backgroundColor: '#fff'
        })
        const fname = 'moo.png';

        // IE version
        if(window.navigator && window.navigator.msSaveOrOpenBlob) {
          const b64dta = b64png.split(',')[1]
          const byteChars = atob(b64dta)
          const bytes = new Uint8Array((new Array(byteChars.length)).fill(0).map((x, i) => byteChars.charCodeAt(i)))
          const blob = new Blob([bytes], { type: 'image/png' })
          window.navigator.msSaveOrOpenBlob(blob, fname)
        } else {
          // TODO: Handling this with openURL or something would probably be better
          const a = document.createElement("a");
          a.href = this.$refs.dlchart.getDataURL({
            backgroundColor: '#fff'
          });
          a.download = fname
          a.click();
          a.remove();
        }
      }, 500);
    },
     onClick: function() {
      this.$emit('setActiveDate', new Date(this.activeDate))
     }
   },
}
</script>
