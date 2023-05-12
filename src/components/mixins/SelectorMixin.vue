<script>
export default {
  props: {
    maxSelections: {
      required: true,
    },
    colors: {
      required: true,
    },
  },
  emits: ["select"],
  data() {
    return {
      selection: [],
      // Tracks which slots are occupied
      slots: new Array(this.maxSelections).fill(true),
    };
  },
  methods: {
    selectItem: function (item) {
      // in case there are already as many elements selected as allowed
      // replace the last one
      if (this.selection.length == this.maxSelections) {
        this.selection = [
          ...this.selection.slice(0, -1),
          this.makeSelectionItem(item, this.maxSelections - 1),
        ];
      } else {
        const nextSlot = this.slots.indexOf(true);
        this.slots[nextSlot] = false;
        this.selection = [
          ...this.selection,
          this.makeSelectionItem(item, nextSlot),
        ];
      }
      this.selection = this.selection.sort((a, b) => a.index - b.index);
    },
    deselectItem: function (item) {
      const slot = this.selection.findIndex((x) => {
        return x.byvalue.value == item.byvalue.value;
      });
      const removed = this.selection[slot];
      this.selection = [
        ...this.selection.slice(0, slot),
        ...this.selection.slice(slot + 1),
      ];
      this.slots[removed.index] = true;
    },
    toggleItem: function (item) {
      if (
        this.selection.findIndex(
          (x) => x.byvalue.value == item.byvalue.value
        ) >= 0
      ) {
        this.deselectItem(item);
      } else {
        this.selectItem(item);
      }
    },
    clearSelection: function () {
      this.selection = [];
      this.slots = this.slots.map(() => true);
    },
    makeSelectionItem: function (item, index) {
      return {
        index,
        ...item,
      };
    },
  },
  watch: {
    selection: function () {
      this.$emit("select", [...this.selection]);
    },
  },
};
</script>
