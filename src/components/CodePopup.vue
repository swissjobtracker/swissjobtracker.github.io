<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{$t('copy_code.title')}}</div>
      <q-space/>
      <q-btn icon="close" flat dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <div v-html="createSnippet(series)" id="code_snippet"></div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn dense flat @click="handleCopy" icon="content_copy">
          <q-tooltip class="bg-white text-primary">Copy R Code to clipboard</q-tooltip>
        </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
  import {createSnippet, copySnippet} from "../util/createSnippet"

export default {
  name: "code-popup",
  props: ["series"],
  methods: {
    handleCopy: function() {
        copySnippet('code_snippet')
        .then(() => {
          this.$q.notify({
            message: this.$t('copy_code.success'),
            color: 'positive',
            position: 'top',
            timeout: 1000
          })
        })
        .catch((e) => {
          this.$q.notify({
            message: this.$t('copy_code.error'),
            color: 'negative',
            position: 'top',
            timeout: 2000
          })
        })
      },
      createSnippet,
      copySnippet
  }
}
</script>
