<template>
     <div class="row">
        <q-card square bordered class="shadow-1 q-card q-mb-xl col-12">
          <div class="row q-col-gutter-lg">
          <div class="col-4">
            <series-selector @select="onSelect" :colors="colors" :activeDate="activeDate"/>
          </div>
          <div class="col-7">
            <linechart :series="selectedSeries" @setActiveDate="onSetActiveDate" :colors="colors"/>
          </div>
          <div class="col-1">
              <q-card-actions vertical align="evenly" class="justify-around q-px-sm">
                    <q-btn @click="closeCard" flat>
                    <q-tooltip>{{$t("card.btn_tooltips.close")}}</q-tooltip>
                      <q-icon name="close"></q-icon>
                    </q-btn>
                    <br />
                    <q-btn flat>
                      <q-tooltip>{{$t("card.btn_tooltips.code_snippet")}}</q-tooltip>
                      <q-icon name="terminal"></q-icon>
                    </q-btn>
                    <q-btn flat>
                      <q-icon name="ssid_chart"></q-icon>
                      <q-tooltip>{{$t("card.btn_tooltips.download_chart")}}</q-tooltip>
                    </q-btn>
                    <br />
                    <q-btn flat class="flip-vertical">
                      <q-tooltip>Rearranger Order: Card Up</q-tooltip>
                      <q-icon name="filter_list"></q-icon>
                    </q-btn>
                    <q-btn flat>
                      <q-tooltip>Rearranger Order: Card Down</q-tooltip>
                      <q-icon name="filter_list"></q-icon>
                    </q-btn>
              </q-card-actions>



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

