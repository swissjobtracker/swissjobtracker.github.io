<template>
    <e-chart @click="clicked" ref="map"/>
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
    props: ['data'],
    emite: ['selectCanton'],
    data() {
      return {
        rawOptions: {
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
            data: []
          }]
        }
      }
    },
    computed: {
      options: function() {
        let options = Object.assign({}, this.rawOptions)
        options.series[0].data = this.data
        return options
      }
    },
    mounted() {
      fetch('ch.svg')
      .then((r) => r.text())
      .then((svg) => {
        // TODO: could this be done at some higher level and only once?
        registerMap('el_schweiz', { svg: svg })
        this.$refs.map.setOption(this.options)
      })
    },
    methods: {
      doit: function(x, y, z) {
        console.log(x)
        console.log(y)
        console.log(z)
        console.log(x.selected[0].dataIndex)
        if(x.selected[0].dataIndex.length > 3) {
          console.log('splicing')
          x.selected[0].dataIndex.splice(0, 1)
        }
        /*for(let i of x.selected[0].dataIndex) {
          console.log(i)
          console.log(datapoints[i].name)
        }*/
      },
      clicked: function(a, b, c) {
        console.log(a)
        this.$refs.map.dispatchAction({
          type: 'select',
          seriesIndex: 0,
          name: 'ZH'
        })
      }
    }
};

</script>
