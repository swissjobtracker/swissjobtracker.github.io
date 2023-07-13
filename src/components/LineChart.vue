<template>
  <div>
    <div class="chart-title">
      {{ $t("graphs.line_chart.title") }}
    </div>
    <div class="chart-title">
      {{ $t("graphs.line_chart.subtitle", { displayMode: displayMode }) }}
    </div>
    <div>
      <e-chart
        autoresize
        :option="lines"
        :update-options="{ replaceMerge: ['series', 'graphic'] }"
        :loading="loading"
        @updateAxisPointer="onUpdateAxisPointer"
        @zr:click="onClick"
        ref="chart"
      />
      <e-chart class="offscreen" ref="dlchart" :option="offScreenOptions" />
      <div align="right" class="q-mr-md q-mb-sm">
        {{ $t("graphs.line_chart.source") }}
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  TimelineComponent,
  DatasetComponent,
  GraphicComponent,
  LegendComponent,
} from "echarts/components";

import { getLineSeries } from "../timeseries";

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  TimelineComponent,
  DatasetComponent,
  GraphicComponent,
  LegendComponent,
]);

const ticksize = 20;

export default {
  name: "lineChart",
  components: {
    "e-chart": echarts,
  },
  props: {
    mode: {
      required: true,
    },
    series: {
      required: true,
    },
    colors: {
      required: true,
    },
  },
  emits: ["setActiveDate"],
  data() {
    return {
      offScreenOptions: {},
      loading: false,
      activeDate: null,
      seriesDataCache: [],
      showError: false,
    };
  },
  computed: {
    displayMode: function () {
      const modeLabels = {
        canton: "canton",
        noga: "industry",
        isco: "occupation",
      };
      return modeLabels[this.mode];
    },
    lines() {
      return {
        grid: {
          top: 15,
          // Would be more elegant with a resize watcher
          // that sets lines.grid.xxx but for now let's assume
          // Peeps with a screeen < 670 come like that on load
          left: window.innerWidth < 670 ? 8 : 0,
          bottom: window.innerWidth < 670 ? 8 : 15,
          right: window.innerWidth < 670 ? 8 : "10%",
          containLabel: true,
        },
        xAxis: {
          type: "time",
          maxInterval: 3600 * 1000 * 24 * 7 * 52,
          minInterval: 3600 * 1000 * 24 * 7 * 52,
          axisLabel: {
            showMinLabel: true,
            formatter: "{MMM} {yearStyle|{yyyy}}",
            rich: {
              yearStyle: {
                fontWeight: "bold",
              },
            },
          },
        },
        yAxis: {
          type: "value",
          min: function ({ min }) {
            return ticksize * Math.floor(min / ticksize);
          },
          max: function ({ max }) {
            return ticksize * Math.ceil(max / ticksize);
          },
          interval: ticksize,
        },
        series: this.seriesData,
        tooltip: {
          show: true,
          valueFormatter: (x) => x.toFixed(2),
          trigger: "axis",
        },
        graphic: this.graphic,
      };
    },

    seriesData() {
      return this.seriesDataCache.map((seriesInformation) => {
        return {
          type: "line",
          lineStyle: {
            width: 3,
          },
          showSymbol: false,
          ...seriesInformation,
        };
      });
    },
    graphic() {
      if (!this.showError) {
        return null;
      }
      return {
        type: "text",
        left: "center",
        top: "center",
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
    series: {
      deep: true,
      handler(series) {
        this.fetchSeries(series);
      },
    },
  },
  methods: {
    async fetchSeries(series) {
      if (series.length == 0) {
        // Nothing is selected
        return;
      }
      this.showError = false;
      this.loading = true;
      try {
        const [header, ...seriesData] = await getLineSeries(series);
        this.seriesDataCache = header.slice(1).map((_seriesName, i) => ({
          color: this.colors[series[i].index],
          name: series[i].byvalue.label,
          data: seriesData.map((seriesRow) => [seriesRow[0], seriesRow[1 + i]]),
        }));
      } catch (error) {
        console.error(error);
        this.showError = true;
      } finally {
        this.loading = false;
      }
    },
    onUpdateAxisPointer: function (e) {
      if (e.axesInfo && e.axesInfo[0] && e.axesInfo[0].value) {
        this.activeDate = e.axesInfo[0].value;
      }
    },
    downloadChart() {
      let dlOptions = this.$refs.chart.getOption();

      dlOptions.series = dlOptions.series.map((s) => {
        return {
          ...s,
          animation: false,
        };
      });

      dlOptions.title = {
        text: this.$t("graphs.line_chart.title"),
        subtext: this.$t("graphs.line_chart.subtitle", {
          displayMode: this.displayMode,
        }),
      };
      dlOptions.grid[0].top = 65;
      dlOptions.grid[0].bottom = 70;
      dlOptions.grid[0].left = "7%";
      dlOptions.grid[0].right = "7%";
      dlOptions.graphic = [
        {
          type: "text",
          right: 5,
          bottom: 5,
          z: 100,
          style: {
            fill: "#000",
            text: this.$t("graphs.line_chart.source"),
          },
        },
      ];

      dlOptions.legend = {
        type: "plain",
        icon: "rect",
        top: "bottom",
      };

      this.offScreenOptions = dlOptions;

      window.setTimeout(() => {
        const b64png = this.$refs.dlchart.getDataURL({
          backgroundColor: "#fff",
        });
        const fname = "swissjobtracker_export_" + Date.now() + ".png";

        const a = document.createElement("a");
        a.href = b64png;
        a.download = fname;
        a.click();
        a.remove();
      }, 500);
    },
    onClick: function () {
      this.$emit("setActiveDate", new Date(this.activeDate));
    },
  },
};
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 350px;
}

@media (max-width: 670px) {
  .echarts {
    width: 100%;
    height: 250px;
    margin-left: auto;
    margin-right: auto;
  }
}

.echarts.offscreen {
  width: 800px;
  height: 400px;
  display: none;
}
</style>
