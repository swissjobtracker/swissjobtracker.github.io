<template>
  <e-chart class="selector-map" autoresize :init-options="{ renderer: 'svg' }" :option="option"
    :update-options="{ replaceMerge: ['series'] }" @click="onClick" ref="map" />
</template>

<script>
import echarts from "vue-echarts";
import { registerMap, use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { MapChart } from "echarts/charts";
import { VisualMapComponent } from "echarts/components";
import SelectorMixin from "./mixins/SelectorMixin.vue";
import { cantons, getCantonByCode } from "../util/cantons";
import mapSvg from "../assets/ch.svg";

use([SVGRenderer, MapChart, VisualMapComponent]);
export default {
  name: "Map",
  components: {
    "e-chart": echarts,
  },
  // very least: rename this to something better than conflicting "data"
  // also:       possibly use a getMapData and only have date as prop
  props: {
    mapData: {
      required: true,
    },
    showError: {
      required: false,
      default: false,
    },
    rangeMin: {
      required: false,
      default: 0,
    },
    rangeMax: {
      required: false,
      default: 100,
    },
  },
  mixins: [SelectorMixin],
  created() {
    registerMap("ch", { svg: mapSvg });
  },
  mounted() {
    if (this.showError) {
      this.setError();
    }
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
        },
        geo: {
          map: "ch",
          zoom: 2.8,
          left: "60%",
          top: 90,
          regions: [],
          emphasis: {
            label: {
              show: false,
            },
          },
          tooltip: {
            formatter: function (opt) {
              return getCantonByCode(opt.name);
            },
          },
        },
        visualMap: {
          left: "center",
          bottom: 0,
          min: this.rangeMin,
          max: this.rangeMax,
          orient: "horizontal",
          itemHeight: 320,
          text: [],
          realtime: true,
          calculable: false,
          inRange: {
            color: [
              "rgb(254, 126, 14)",
              "rgb(250, 241, 225)",
              "rgb(0, 190, 179)",
            ],
          },
        },
        series: [
          {
            type: "map",
            geoIndex: 0,
            data: this.mapData,
            selectedMode: false,
          },
        ],
      },
    };
  },
  methods: {
    onClick: function (e) {
      this.toggleItem({
        by: {
          label: "Canton",
          value: "canton",
        },
        byvalue: {
          label: cantons.filter(
            ({ value }) => value.toUpperCase() == e.data.name
          )[0].label,
          value: e.data.name,
        },
      });
    },
    setError: function () {
      this.option.graphic = {
        type: "text",
        left: "center",
        top: "10%",
        z: 100,
        style: {
          fill: "#999",
          text: "Error while loading data",
          font: "bold 20px sans-serif",
        },
      };
    },
  },
  watch: {
    selection: function () {
      const regions = this.selection.map((s) => {
        return {
          name: s.byvalue.value,
          itemStyle: {
            borderColor: this.colors[s.index],
            borderWidth: 5,
          },
        };
      });
      this.option.geo.regions = regions;
    },
    mapData: function () {
      this.option.series = [
        {
          type: "map",
          geoIndex: 0,
          data: this.mapData,
          selectedMode: false,
        },
      ];
    },
    rangeMin: function () {
      this.option.visualMap.min = this.rangeMin;
    },
    rangeMax: function () {
      this.option.visualMap.max = this.rangeMax;
    },
    showError: function () {
      if (this.showError) {
        this.setError();
      }
    },
  },
};
</script>

<style>
.selector-map text {}
</style>
