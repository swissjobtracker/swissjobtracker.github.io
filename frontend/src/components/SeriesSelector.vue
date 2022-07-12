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
    <a>canton</a>
    <a>industry</a>
    <a>job title kA</a>
  </div>

  <div class="row map">
    <ch-map @selectCantons="setSelection" @clearSelection="clearSelection" :mapData="mapData"/>
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
import SeriesSelectorMixin from './mixins/SeriesSelectorMixin.vue'

export default {
  name: 'SeriesSelector',
  components: {
    'ch-map': Map
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
      indexOptions: [
        {
          label: 'CH Labor Market Index',
          value: 'idx'
        },
        {
          label: 'Mean Ad Lifetime',
          value: 't'
        }
      ],
      // WET!
      selectedIndex: {
        label: 'CH Labor Marked Index',
        value: 'idx'
      }
    }
  }
}
</script>

<style scoped>
  .active {
    background-color: brown;
  }

  .map {
    height: 300px;
  }
</style>
