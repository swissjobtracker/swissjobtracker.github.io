<template>
  <div class="row">
    <div class="col-12">
      <q-tabs
        dense
        v-model="mode"
        @update:model-value="setMode"
      >
        <q-tab name="canton" :label="$t('selector.by.canton')" />
        <q-tab name="noga" :label="$t('selector.by.noga')" />
        <q-tab name="isco" :label="$t('selector.by.isco')" />
        <q-toggle
          :label="$t('selector.show_total')"
          color="gray"
          keep-color
          v-model="showTotal">
        </q-toggle>
      </q-tabs>
    </div>
  </div>

  <div class="row selector">
    <div class="col-12">
      <ch-map
        v-if="mode == 'canton'"
        @select="onSelect"
        :colors="colors"
        :maxSelections="maxSelections"
        :mapData="mapData"
        :rangeMin="mapRangeMin"
        :rangeMax="mapRangeMax"
        :showError="mapDataError"/>
      <list-selector
        v-if="mode == 'noga'"
        type="noga_letter"
        :options="nogaOptions"
        @select="onSelect"
        :colors="colors"
        :maxSelections="maxSelections"/>
      <list-selector
        v-if="mode == 'isco'"
        type="isco_1d"
        :options="iscoOptions"
        @select="onSelect"
        :colors="colors"
        :maxSelections="maxSelections"/>
    </div>
  </div>



</template>

<script>
import { getMapSeries, getCantonalSeries } from 'src/timeseries'
import Map from './Map.vue'
import ListSelector from './ListSelector.vue'
import nogaOptions from '../util/nogaoptions'
import iscoOptions from '..//util/iscooptions'
import { getTsRange } from 'src/timeseries/tsutils'

const indexOptionsRaw = [
  {
    label: 'CH Labor Market Index',
    value: 'idx'
  },
  {
    label: 'Mean Ad Lifetime',
    value: 't'
  }
]

export default {
  name: 'SeriesSelector',
  props: {
    maxSelections: {
      required: false,
      default: 3
    },
    colors: {
      required: true
    },
    activeDate: {
      required: false,
      default: null
    }
  },
  components: {
    'ch-map': Map,
    'list-selector': ListSelector
  },
  emits: ['select'],
  mounted() {
    // Emit an event indicating total is selected
    this.emitSelection()

    this.updateMap()
  },
  data() {
    return {
      mapData: null,
      mapDataError: false,
      mapRangeMin: 0,
      mapRangeMax: 100,
      showTotal: true,
      selection: [],
      mode: 'canton',
      indexOptions: indexOptionsRaw,
      selectedIndex: indexOptionsRaw[0],
      nogaOptions,
      iscoOptions,
    }
  },
  methods: {
    setMode: function(newMode) {
      this.clearSelection()
    },
    clearSelection: function() {
      this.onSelect([])
    },
    onSelect: function(selection) {
      this.selection = selection
      this.emitSelection()
    },
    emitSelection: function() {
      const toEmit = this.selection.map((s) => {
        return {
          ...s,
          type: this.selectedIndex
        }
      })

      if(this.showTotal) {
        toEmit.push({
          index: this.maxSelections, // indices of selections go from 0 - maxSelections-1
          type: this.selectedIndex,
          by: {
            label: 'Total',
            value: 'total',
          },
          byvalue: {
            label: 'Total',
            value: 'total'
          }
        })
      }

      this.$emit('select', toEmit)
    },
    updateMap: function() {
      getMapSeries(this.selectedIndex, this.activeDate)
        .then((data) => {
          this.mapData = data
        })
        .catch((e) => {
          this.mapDataError = true
        })

      // Update range of map
      // TODO: Only do this on mount and when indicator changes would be more eleganter
      getCantonalSeries(this.selectedIndex)
        .then(getTsRange)
        .then(({min, max}) => {
          this.mapRangeMin = min
          this.mapRangeMax = max
        })
        .catch((e) => {
          this.mapDataError = true
        })
    }
  },
  watch: {
    showTotal: function() {
      this.emitSelection()
    },
    selectedIndex: function() {
      this.emitSelection()
    },
    activeDate: function() {
      this.updateMap()
    },
    mode: function(newMode, oldMode) {
      if(newMode != oldMode) {
        this.clearSelection()
      }
    }
  }
}
</script>

<style scoped>
  .active {
    background-color: brown;
  }

  .selector {
    height: 300px;
  }
</style>
