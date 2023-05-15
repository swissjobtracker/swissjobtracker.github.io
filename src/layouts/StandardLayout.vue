<template>
  <q-layout view="hHh lpR fff">
    <q-header class="bg-primary text-white">
      <q-toolbar class="lmm-bar">
        <q-toolbar-title shrink>
          <router-link to="/" style="text-decoration: none; color: white">Swiss Job Tracker</router-link>
        </q-toolbar-title>
        <q-tabs>
          <q-route-tab to="/about" :label="$t(`nav.about`)"></q-route-tab>
          <q-route-tab href="/blog" target="_blank" :label="$t(`nav.blog`)"></q-route-tab>
        </q-tabs>
        <q-space />
        <div class="gt-xs">
          <q-btn flat icon="download"
            href="https://datenservice.kof.ethz.ch/api/v1/public/collections/ch.kof.jobtracker?mime=csv&df=Y-m-d"
            target="_blank">
            <q-tooltip>
              {{ $t("nav.tooltips.download_data") }}
            </q-tooltip>
          </q-btn>
          <q-btn flat icon="description"
            href="https://datenservice.kof.ethz.ch/api/v1/public/metadata/collections/ch.kof.jobtracker?mime=csv"
            target="_blank">
            <q-tooltip>
              {{ $t("nav.tooltips.download_metadata") }}
            </q-tooltip>
          </q-btn>
          <q-btn flat icon="history_edu" href="Methodology Swiss Job Tracker.pdf" target="_blank">
            <q-tooltip>
              {{ $t("nav.tooltips.download_methodology") }}
            </q-tooltip>
          </q-btn>
          <q-btn flat href="https://github.com/swissjobtracker" target="_blank">
            <q-icon class="github"></q-icon>
            <q-tooltip>
              {{ $t("nav.tooltips.github") }}
            </q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
      <q-toolbar class="lmm-bar subtitle-bar">
        {{ $t("nav.subtitle") }}
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <div class="row q-col-gutter-lg logo-row">
        <div class="col-12 col-md-2">
          <a target="_blank" href="https://kof.ethz.ch"><img src="kof-neg.png" height="25" /></a>
        </div>
        <div class="col-12 col-md-2">
          <a target="_blank" href="https://ethz.ch"><img src="eth-neg.png" height="25" /></a>
        </div>
        <div class="col-12 col-md-2">
          <a target="_blank" href="https://www.snf.ch/en/hRMuYd5Qqjpl1goQ/page/researchinFocus/nrp/nrp77"><img
              src="nfp_en.png" height="25" /></a>
        </div>
        <div class="col-12 col-md-2">
          <a target="_blank" href="https://www.snf.ch"><img src="snf_en.svg" height="25" /></a>
        </div>
        <div class="col-12 col-md-2">
          <a target="_blank" href="https://unil.ch"><img src="unil-neg.png" height="25" /></a>
        </div>
        <div class="col-12 col-md-2">
          <a target="_blank" href="https://x28.ch"><img src="x28-neg.png" height="25" /></a>
        </div>
      </div>
      <hr />
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <h6>{{ $t("footer.contact.title") }}</h6>
          <b>{{ $t("footer.contact.kof") }} <br />
            {{ $t("footer.contact.ethz") }}</b>
          <br />
          {{ $t("footer.contact.division") }} <br />
          <br />
          <b>{{ $t("footer.contact.content_head") }}</b><br />
          {{ $t("footer.contact.content_email") }}<br />
          {{ $t("footer.contact.data_email") }}<br />
        </div>
        <div class="col-12 col-md-6">
          <h6>{{ $t("footer.links.title") }}</h6>
          <a href="https://kof.ethz.ch" target="_blank">{{
            $t("footer.links.kof_main")
          }}</a><br />
          <router-link to="/about">{{ $t("nav.about") }}</router-link><br />
          <a :href="nrp_link" target="_blank">{{
            $t("footer.links.nrp77.title")
          }}</a><br />
          <a href="/blog" target="_blank">{{ $t("nav.blog") }}</a><br />
        </div>
      </div>
      <br />
      <br />
      <hr />
      <div class="row q-col-gutter-lg logo-row q-mt-md">
        <div class="col-12">{{ $t("footer.nrp77.blurb") }}</div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  computed: {
    nrp_link: function () {
      return this.$t("footer.links.nrp77.url");
    },
  },
};
</script>

<style scoped>
.lmm-bar {
  padding-left: 32px;
}

.subtitle-bar {
  min-height: 0px;
  padding-bottom: 10px;
}
</style>
