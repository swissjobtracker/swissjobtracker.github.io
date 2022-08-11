<template>
     <div class="row">
        <q-card square bordered class="shadow-1 q-card q-mb-xl  col-12">
          <div class="row">
          <div class="col-4">
            <series-selector @select="onSelect" :colors="colors" :activeDate="activeDate"/>
          </div>
          <div class="col-7">
            <linechart :series="selectedSeries" @setActiveDate="onSetActiveDate" :colors="colors"/>
          </div>
          <div class="col-1">
              <div class="row">
                  <div>
                    <q-btn @click="closeCard" flat>
                      <q-icon name="close"></q-icon>
                    </q-btn>
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
    emits: ['close'],
    data() {
      return {
        activeDate: null,
        selectedSeries: [],
        colors: ['#31688EFF', '#35B779FF', '#FDE725FF', '#440154FF']
      }
    },
    methods: {
      onSelect: function(newSelection) {
        this.selectedSeries = newSelection
      },
      closeCard: function(){
        this.$emit('close')
      },
      onSetActiveDate: function(d) {
        this.activeDate = d
      }
    }
};

</script>

