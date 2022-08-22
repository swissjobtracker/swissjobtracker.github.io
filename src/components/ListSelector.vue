<template>
<div>
  <q-select
    dense
    square
    outlined
    :label="type == 'noga' ? $t('selector.dropdowns.industry') : $t('selector.dropdowns.occupation')"
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
      <q-item-section avatar>
        <q-avatar :style="{backgroundColor: colors[s.index]}" />
      </q-item-section>
      <q-item-section>
        {{s.byvalue.label}}
      </q-item-section>
      <q-item-section side >
        <q-btn flat dense icon="close" @click="() => deselectItem(s)"></q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</div>
</template>

<script>
import SelectorMixin from './mixins/SelectorMixin.vue'

export default {
  name: "ListSelector",
  mixins: [SelectorMixin],
  props: {
    type: {
      required: true
    },
    options: {
      required: true
    }
  },
  data() {
    return {
      model: null,
      activeOptions: this.options,
      maxSelect: 3
    }
  },
  computed: {
    availableOptions: function() {
       return this.activeOptions.filter((o) => this.selection.map((s) => s.byvalue.value).indexOf(o.value) < 0)
    }
  },
  methods: {
    onSelect: function(x) {
      this.selectItem({
        by: {
          label: this.type == 'noga' ? 'Sector' : 'Occupation',
          value: this.type,
        },
        byvalue: {...x}
      })
      this.model = null
    },
    filterFn: function(val, update) {
      update(() => {
        this.activeOptions = this.options.filter((o) => o.label.toLowerCase().indexOf(val.toLowerCase()) >= 0)
      })
    }
  }
}
</script>
