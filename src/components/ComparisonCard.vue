<template>
     <div class="row">
        <q-card flat square bordered class="q-card q-mb-xl  col-12">
          <div class="row">
          <div class="col-4">
            <series-selector @select="onSelect" :colors="colors"/>
          </div>
          <div class="col-7">
            <linechart :series="selectedSeries" :colors="colors"/>
          </div>
          <div class="col-1">
              <div class="row">
                  <div class="col-10"></div>
                  <div class="col-1">
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

export default {
    name: "comp-card",
    components: {
      linechart: LineChart,
     'series-selector': SeriesSelector
    },
    data() {
      return {
        selectedSeries: [],
        colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'] // tbd
      }
    },
    methods: {
      onSelect: function(newSelection) {
        this.selectedSeries = newSelection
      }
    }
};

</script>
