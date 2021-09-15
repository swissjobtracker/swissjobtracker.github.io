<template>
     <div class="row">
        <q-card flat square bordered class="q-card q-mb-xl  col-12">
          <div class="row">
          <div class="col-4">
            <map-comp :data="mapData" @selectCantons="updateSelection"/>
          </div>
          <div class="col-7">
            <linechart :data="lineData"/>
          </div>
          <div class="col-1">
              <div class="row">
                  <div class="col-10"></div>
                  <div class="col-1">

                          <q-btn
                            flat
                            dense
                            icon="delete" />
                          <q-btn
                            flat
                            dense
                            icon="delete" />
                          <q-btn
                            flat
                            dense
                            icon="delete" />


                  </div>
              </div>
          </div>
          </div>
        </q-card>
      </div>
</template>

<script>

import Map from "../components/Map";
import LineChart from "../components/LineChart";
import { getLineSeries, getMapSeries } from '../timeseries'

export default {
    name: "comp-card",
    components: {
      linechart: LineChart,
     'map-comp': Map
    },
    data() {
      return {
        mapData: [],
        lineData: [],
        selectedCantons: [],
        indicator: 'main'
      }
    },
    mounted() {
      getMapSeries(this.indicator, new Date('2021-01-01'))
      .then((data) => this.mapData = data)
    },
    methods: {
      updateSelection: function(newSelection) {
        this.selectedCantons = newSelection
        this.loadLineData()
      },
      loadLineData: function() {
        // TODO this.lineLoading = TRUE or some such
        getLineSeries(this.selectedCantons, this.indicator)
        .then((data) => {
          console.log(data)
          this.lineData = data
        })
      }
    }
};

</script>
