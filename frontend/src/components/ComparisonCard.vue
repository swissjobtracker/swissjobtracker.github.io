<template>
     <div class="row">
        <q-card flat square bordered class="q-card q-mb-xl  col-12">
          <div class="row">
          <div class="col-4">
            <series-selector @selectionChanged="updateSelection"/>
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

import SeriesSelector from './SeriesSelector.vue'
import LineChart from "../components/LineChart";
import { getLineSeries, getMapSeries } from '../timeseries'

export default {
    name: "comp-card",
    components: {
      linechart: LineChart,
     'series-selector': SeriesSelector
    },
    data() {
      return {
        mapData: [],
        lineData: [],
        selectedSeries: [],
        indicator: 'main'
      }
    },
    mounted() {
      getMapSeries(this.indicator, new Date('2021-01-01'))
      .then((data) => this.mapData = data)
    },
    methods: {
      updateSelection: function(newSelection) {
        this.selectedSeries = newSelection
        this.loadLineData()
      },
      loadLineData: function() {
        // TODO this.lineLoading = TRUE or some such
        getLineSeries(this.selectedSeries, this.indicator)
        .then((data) => {
          this.lineData = data
        })
      }
    }
};

</script>
