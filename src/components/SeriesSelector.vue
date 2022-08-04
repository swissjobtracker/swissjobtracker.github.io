<template>
  <div class="row">
    <div class="col-12">
      <q-select
        dense
        square
        outlined
        :options="indexOptions"
        v-model="selectedIndex">
      </q-select>
    </div>
  </div>

  <div class="row q-pt-sm q-pb-sm">
    <div class="col-8">
      by
      <q-btn-group flat>
      <q-btn outline  flat color="grey" label="canton" @click="() => setMode('canton')"/>
      <q-btn outline  flat color="grey" label="industry" @click="() => setMode('noga')" />
      <q-btn outline  flat color="grey" label="occupation" @click="() => setMode('isco')"/>
    </q-btn-group>
    </div>
    <div class="col-4">
      <q-toggle
      label="Show Total"
      color="gray"
      keep-color
      v-model="showTotal">
    </q-toggle>

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
        :showError="mapDataError"/>
      <list-selector
        v-if="mode == 'noga'"
        type="noga"
        :options="nogaOptions"
        @select="onSelect"
        :colors="colors"
        :maxSelections="maxSelections"/>
      <list-selector
        v-if="mode == 'isco'"
        type="isco"
        :options="iscoOptions"
        @select="onSelect"
        :colors="colors"
        :maxSelections="maxSelections"/>
    </div>
  </div>



</template>

<script>
import { getMapSeries } from 'src/timeseries'
import Map from './Map.vue'
import ListSelector from './ListSelector.vue'
import nogaOptions from '../util/nogaoptions'
import iscoOptions from '..//util/iscooptions'

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
      this.mode = newMode
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
