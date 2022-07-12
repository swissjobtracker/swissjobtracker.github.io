<script>
// an "interface" mixin that defines the "series selector interface"

export default {
  emits: ['selectionChanged'],
  data() {
    return {
      selection: []
    }
  },
  methods: {
    selectOne: function(x) {
      this.selection = [...this.selection, x]
    },
    setSelection: function(selection) {
      this.selection = selection
    },
    clearSelection: function() {
      this.selection = []
    }
  },
  watch: {
    selection(newSelection) {
      this.$emit('selectionChanged', newSelection)
    }
  }
}
</script>
