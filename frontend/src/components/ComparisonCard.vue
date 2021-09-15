<template>
     <div class="row">
        <q-card flat square bordered class="q-card q-mb-xl  col-12">
          <div class="row">
          <div class="col-4">
            <map-comp :data="mapData" />
          </div>
          <div class="col-7">
            <linechart />
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

import Map from "../components/Map";
import LineChart from "../components/LineChart";
import { getMapSeries } from '../timeseries'

export default {
    name: "comp-card",
    components: {
      linechart: LineChart,
     'map-comp': Map
    },
    data() {
      return {
        mapData: []
      }
    },
    mounted() {
      getMapSeries(this.indicator, new Date('2021-01-01'))
      .then((data) => this.mapData = data)
    }

};

</script>
