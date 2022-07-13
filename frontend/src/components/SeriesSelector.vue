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

  <div class="row">
    by
    <a @click="() => setMode('canton')">canton</a>
    <a @click="() => setMode('noga')">industry</a>
    <a @click="() => setMode('isco')">job title kA</a>
  </div>

  <div class="row selector">
    <div class="col-12">
      <ch-map
        v-if="mode == 'canton'"
        @selectCantons="setSelection"
        @clearSelection="clearSelection"
        :mapData="mapData"/>
      <list-selector
        v-if="mode == 'noga'"
        type="noga"
        @select="setSelection" />
      <list-selector
        v-if="mode == 'isco'"
        type="isco"
        @select="setSelection" />
    </div>
  </div>

  <div class="row">
    <q-toggle
      label="Show Total"
      color="blue"
      keep-color
      v-model="showTotal">

    </q-toggle>
  </div>


</template>

<script>
import { getMapSeries } from 'src/timeseries'
import Map from './Map.vue'
import ListSelector from './ListSelector.vue'
import SeriesSelectorMixin from './mixins/SeriesSelectorMixin.vue'

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
  components: {
    'ch-map': Map,
    'list-selector': ListSelector
  },
  emits: ['select'],
  mixins: [SeriesSelectorMixin],
  mounted() {
    getMapSeries('main', '2021-01-01')
    .then((data) => this.mapData = data)
  },
  data() {
    return {
      mapData: null,
      showTotal: true,
      mode: 'canton',
      indexOptions: indexOptionsRaw,
      selectedIndex: indexOptionsRaw[0]
    }
  },
  methods: {
    setMode: function(newMode) {
      this.clearSelection()
      this.mode = newMode
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
