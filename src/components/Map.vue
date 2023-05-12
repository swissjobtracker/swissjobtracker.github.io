<template>
  <e-chart class="selector-map" autoresize :init-options="{ renderer: 'svg' }" :option="option"
    :update-options="{ notMerge: false, replaceMerge: ['series', 'geo'] }" @click="toggleCanton" ref="map"
    :loading="!mapData" />
</template>

<script>
import echarts from "vue-echarts";
import { registerMap, use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { MapChart } from "echarts/charts";
import { VisualMapComponent } from "echarts/components";
import SelectorMixin from "./mixins/SelectorMixin.vue";
import { cantons, getCantonByCode } from "../util/cantons";
import svgmap from "../assets/ch.svg";

use([SVGRenderer, MapChart, VisualMapComponent]);

registerMap("ch", { svg: svgmap });

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
  methods: {
    toggleCanton: function (e) {
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
  },
  computed: {
    option() {
      const selectedCantons = Object.fromEntries(
        this.selection.map((selectedCanton) => [
          selectedCanton.byvalue.value,
          this.colors[selectedCanton.index],
        ])
      );

      const cantons = [
        ...(this.mapData ? this.mapData.map(({ name }) => name) : []),
      ];

      const regions = cantons.map((name) => {
        if (name in selectedCantons) {
          return {
            name,
            itemStyle: {
              borderWidth: 7,
              borderColor: selectedCantons[name],
              color: selectedCantons[name],
            },
          };
        }
        return { name, itemStyle: { color: "cyan" } };
      });

      const graphic = this.showError
        ? {
          type: "text",
          left: "center",
          top: "10%",
          z: 100,
          style: {
            fill: "#999",
            text: "Error while loading data",
            font: "bold 20px sans-serif",
          },
        }
        : null;

      console.log(this.mapData);
      return {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        geo: {
          map: "ch",
          zoom: 2.8,
          left: "60%",
          top: 90,
          regions,
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
        graphic,
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
            data: this.mapData
              ? this.mapData.map(({ name, value }) => ({ name, value }))
              : null,
          },
        ],
      };
    },
  },
};
</script>

<style>
.selector-map text {}
</style>
