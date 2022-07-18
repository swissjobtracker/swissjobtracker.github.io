<template>
<div>
  <q-select
    dense
    square
    outlined
    label="Add job"
    v-model="model"
    use-input
    @filter="filterFn"
    :options="availableOptions"
    @update:model-value="onSelect"
  ></q-select>

  <q-list>
    <q-item
    v-for="s in selection"
    :key="s.byvalue">
      <q-item-section>
        <div :style="{backgroundColor: colors[s.index], height: '100%'}">
        </div>
      </q-item-section>
      <q-item-section>
        {{s.label}}
      </q-item-section>
      <q-item-section side >
        <q-btn flat @click="() => deselectItem(s)">X</q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</div>
</template>

<script>
import SelectorMixin from './mixins/SelectorMixin.vue'

const rawOptions = [
  {label: 'Bauhandlanger 1', value: 1},
  {label: 'Bauhandlanger 2', value: 2},
  {label: 'Bauhandlanger 3', value: 3},
  {label: 'Bauhandlanger 4', value: 4},
  {label: 'Bauhandlanger 5', value: 5},
  {label: 'Bauhandlanger 6', value: 6},
  {label: 'Bauhandlanger 7', value: 7},
  {label: 'Bauhandlanger 8', value: 8},
  {label: 'Bauhandlanger 9', value: 9},
  {label: 'Bauhandlanger 10', value: 10},
  {label: 'Bauhandlanger 11', value: 11},
  {label: 'Bauhandlanger 12', value: 12},
  {label: 'Bauhandlanger 13', value: 13},
  {label: 'Bauhandlanger 14', value: 14},
  {label: 'Bauhandlanger 15', value: 15},
  {label: 'Bauhandlanger 16', value: 16},
  {label: 'Bauhandlanger 17', value: 17},
  {label: 'Bauhandlanger 18', value: 18},
  {label: 'Bauhandlanger 19', value: 19},
  {label: 'Bauhandlanger 20', value: 20},
  {label: 'Bauhandlanger 21', value: 21},
  {label: 'Bauhandlanger 22', value: 22},
  {label: 'Bauhandlanger 23', value: 23},
  {label: 'Bauhandlanger 24', value: 24},
  {label: 'Bauhandlanger 25', value: 25},
  {label: 'Bauhandlanger 26', value: 26},
  {label: 'Bauhandlanger 27', value: 27},
  {label: 'Bauhandlanger 28', value: 28},
  {label: 'Bauhandlanger 29', value: 29},
  {label: 'Bauhandlanger 30', value: 30},
  {label: 'Bauhandlanger 31', value: 31},
  {label: 'Bauhandlanger 32', value: 32},
  {label: 'Bauhandlanger 33', value: 33},
  {label: 'Bauhandlanger 34', value: 34},
  {label: 'Bauhandlanger 35', value: 35},
  {label: 'Bauhandlanger 36', value: 36},
  {label: 'Bauhandlanger 37', value: 37},
  {label: 'Bauhandlanger 38', value: 38},
  {label: 'Bauhandlanger 39', value: 39},
  {label: 'Bauhandlanger 40', value: 40},
  {label: 'Bauhandlanger 41', value: 41},
  {label: 'Bauhandlanger 42', value: 42},
]

export default {
  name: "ListSelector",
  mixins: [SelectorMixin],
  props: ["type"],
  data() {
    return {
      model: null,
      options: rawOptions,
      maxSelect: 3
    }
  },
  computed: {
    availableOptions: function() {
       return this.options.filter((o) => this.selection.map((s) => s.byvalue).indexOf(o.value) < 0)
    }
  },
  methods: {
    onSelect: function(x) {
      this.selectItem({
        label: x.label,
        byvalue: x.value
      })
      this.model = null
    },
    filterFn: function(val, update) {
      update(() => {
        this.options = rawOptions.filter((o) => o.label.toLowerCase().indexOf(val.toLowerCase()) >= 0)
      })
    }
  }
}
</script>
