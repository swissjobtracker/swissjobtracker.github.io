<template>
     <div class="row">
        <q-card square bordered class="shadow-1 q-card q-mb-xl col-12">
          <div class="row q-col-gutter-lg">
          <div class="col-4">
            <series-selector @select="onSelect" :colors="colors" :activeDate="activeDate"/>
          </div>
          <div class="col-8">
            <q-card-actions align="right" class=" q-px-sm">
                    <q-btn flat @click="show_code = true">
                      <q-tooltip>{{$t("card.btn_tooltips.code_snippet")}}</q-tooltip>
                      <q-icon name="terminal"></q-icon>
                    </q-btn>
                    <q-btn flat>
                      <q-icon name="ssid_chart"></q-icon>
                      <q-tooltip>{{$t("card.btn_tooltips.download_chart")}}</q-tooltip>
                    </q-btn>
                    <q-btn @click="closeCard" flat>
                    <q-tooltip>{{$t("card.btn_tooltips.close")}}</q-tooltip>
                      <q-icon name="close"></q-icon>
                    </q-btn>
              </q-card-actions>
            <linechart :series="selectedSeries" @setActiveDate="onSetActiveDate" :colors="colors"/>

            <q-dialog v-model="show_code">
            <q-card class="q-pb-lg q-pl-lg q-pr-lg  q-pt-sm" style="width:500px">
                <q-card-actions align="right">
                    <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
                </q-card-actions>
              <div v-html="createSnippet(selectedSeries)"></div>
            </q-card>
              
            
              
            </q-dialog>

          </div>
      
          </div>
        </q-card>
      </div>
</template>

<script>

import SeriesSelector from './SeriesSelector.vue'
import LineChart from "../components/LineChart";
import {createSnippet} from "../util/createSnippet"

export default {
    name: "comp-card",
    components: {
      linechart: LineChart,
     'series-selector': SeriesSelector
    },
    emits: ['close'],
    data() {
      return {
        show_code: false,
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
      },
      createSnippet
    }
};

</script>

