<template>
    <e-chart @onGeoselectchanged="doit" ref="map"/>
</template>


<script>
import echarts from 'vue-echarts'
import { use, registerMap } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart } from 'echarts/charts'
import { VisualMapComponent } from 'echarts/components'

use([CanvasRenderer, MapChart, VisualMapComponent])

export default {
    name: "Map",
    components: {
      'e-chart': echarts
    },
    data() {
      return {
        options: {
          visualMap: {
            left: 'center',
            bottom: '10%',
            min: 5,
            max: 30,
            orient: 'horizontal',
            text: [null, 'Price'],
            realtime: true,
            calculable: true,
            inRange: {
                color: ['#dbac00', '#db6e00', '#cf0000']
            }
          },
          series: [{
            name: 'stuff',
            type: 'map',
            map: 'el_schweiz',
            selectedMode: 'multiple',
            data: [
              { name: 'AG', value: 1 },
              { name: 'AI', value: 2 },
              { name: 'AR', value: 3 },
              { name: 'BE', value: 4 },
              { name: 'BL', value: 5 },
              { name: 'BS', value: 6 },
              { name: 'FR', value: 8 },
              { name: 'GE', value: 9 },
              { name: 'GL', value: 10 },
              { name: 'GR', value: 11 },
              { name: 'JU', value: 12 },
              { name: 'LU', value: 13 },
              { name: 'NE', value: 14 },
              { name: 'NW', value: 15 },
              { name: 'OW', value: 16 },
              { name: 'SG', value: 17 },
              { name: 'SH', value: 18 },
              { name: 'SO', value: 19 },
              { name: 'SZ', value: 20 },
              { name: 'TG', value: 21 },
              { name: 'TI', value: 22 },
              { name: 'UR', value: 23 },
              { name: 'VD', value: 24 },
              { name: 'VS', value: 25 },
              { name: 'ZG', value: 26 },
              { name: 'ZH', value: 27 }
            ]
          }]
        }
      }
    },
    mounted() {
      fetch('ch.svg')
      .then((r) => r.text())
      .then((svg) => {
        registerMap('el_schweiz', { svg: svg })
        this.$refs.map.setOption(this.options)
        console.log(this.$refs.map.chart)
      })
    },
    methods: {
      doit: function(x) {
        console.log('consider it doed')
      },
      clicketyclick: function(e) {
        console.log('houston, we have a thing')
        console.log(e)
      }
    }
};

</script>
