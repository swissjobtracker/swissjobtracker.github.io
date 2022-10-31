<template>
     <div class="row">
        <q-card square bordered class="shadow-1 q-card q-mb-md col-12">
          <q-card-actions align="right" class="q-pa-none card-action-bar">
                <q-btn flat @click="show_code = true">
                  <q-tooltip>{{$t("card.btn_tooltips.code_snippet")}}</q-tooltip>
                  <q-icon name="terminal"></q-icon>
                </q-btn>
                <q-btn flat @click="$refs.linechart.downloadChart()">
                  <q-icon name="ssid_chart"></q-icon>
                  <q-tooltip>{{$t("card.btn_tooltips.download_chart")}}</q-tooltip>
                </q-btn>
                <q-btn @click="closeCard" flat>
                <q-tooltip>{{$t("card.btn_tooltips.close")}}</q-tooltip>
                  <q-icon name="close"></q-icon>
                </q-btn>
            </q-card-actions>
            <q-card-section>
              <div class="row q-col-gutter-xl">
                <div class="col-12 col-md-5">
                  <series-selector @select="onSelect" @changeMode="(newMode) => selectedMode = newMode" :colors="colors" :activeDate="activeDate"/>
                </div>
                <div class="col-12 col-md-7">
                  <linechart :series="selectedSeries" :mode="selectedMode" @setActiveDate="onSetActiveDate" :colors="colors" ref="linechart"/>
                <q-dialog v-model="show_code">
                  <code-popup :series="selectedSeries" />
                </q-dialog>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
</template>

<script>
import SeriesSelector from './SeriesSelector.vue'
import LineChart from "../components/LineChart"
import codePopup from '../components/CodePopup'

export default {
    name: "comp-card",
    components: {
      linechart: LineChart,
     'series-selector': SeriesSelector,
     codePopup
    },
    emits: ['close'],
    data() {
      return {
        show_code: false,
        activeDate: null,
        selectedSeries: [],
        selectedMode: 'canton',
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
    }
};

</script>

<style lang="sass" scoped>
.card-action-bar
  background-color: scale-color($secondary, $lightness: 60%)
</style>
