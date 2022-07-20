<template>
    <e-chart
      autoresize
      :option="option"
      :update-options="{ replaceMerge: ['series'] }"
      @click="onClick"
      ref="map"/>
</template>


<script>
import echarts from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart } from 'echarts/charts'
import { VisualMapComponent } from 'echarts/components'
import SelectorMixin from './mixins/SelectorMixin.vue'

use([CanvasRenderer, MapChart, VisualMapComponent])

export default {
    name: "Map",
    components: {
      'e-chart': echarts
    },
    // very least: rename this to something better than conflicting "data"
    // also:       possibly use a getMapData and only have date as prop
    props: ['mapData'],
    mixins: [SelectorMixin],
    data() {
      return {
        option: {
          geo: {
            map: 'ch',
            roam: true,
            zoom: 2.5,
            left: 250,
            top: 100,
            regions: [],
            emphasis: {
              label: {
                show: false
              }
            }
          },
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
            type: 'map',
            geoIndex: 0,
            data: this.mapData,
            selectedMode: false,
          }]
        }
      }
    },
    methods: {
      onClick: function(e) {
        this.toggleItem({
          by: 'canton',
          byvalue: e.data.name
        })
      }
    },
    watch: {
      selection: function() {
        const regions = this.selection.map((s) => {
          return {
            name: s.byvalue,
            itemStyle: {
              borderColor: this.colors[s.index],
              borderWidth: 5
            }
          }
        })
        this.option.geo.regions = regions
      },
      mapData: function() {
        this.option.series = [{
          type: 'map',
          geoIndex: 0,
          data: this.mapData,
          selectedMode: false,
        }]
      }
    }
};

</script>
