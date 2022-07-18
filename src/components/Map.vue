<template>
    <e-chart @selectchanged="onSelectionChanged" ref="map"/>
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
    // very least: rename this to something better than conflicting "data"
    // also:       possibly use a getMapData and only have date as prop
    props: ['mapData'],
    emits: ['selectCantons', 'clearSelection'],
    data() {
      return {
        rawOptions: {
          visualMap: {
            left: 0,
            top: 'center',
            min: 0,
            max: 10,
            orient: 'vertical',
            text: [],
            realtime: true,
            calculable: false,
            inRange: {
                color: ['#dbac00', '#db6e00', '#cf0000']
            }
          },
          series: [{
            name: 'stuff',
            type: 'map',
            zoom: 2.2,
            left: 220,
            top: 100,
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
        options.series[0].data = this.mapData
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
      onSelectionChanged: function(e) {
        if(e.selected.length > 0) {
          this.$emit('selectCantons', e.selected[0].dataIndex.map((i) => {
            return {
              by: 'canton',
              byvalue: this.mapData[i].name
            }
          }))
        } else {
          this.$emit('clearSelection')
        }
      }
    }
};

</script>
