<template>
  <q-layout view="hHh lpR fff">

    <q-header class="bg-primary text-white">
      <q-toolbar class="lmm-bar">
        <q-toolbar-title shrink>
          SWISS Job Tracker
        </q-toolbar-title>
        <q-tabs>
          <q-route-tab  v-for="(menuItem) in menuList" :to="menuItem.to" :label="menuItem.label" :key="menuItem.to" />
        </q-tabs>
        <q-space/>
        <q-btn flat icon="download">
          <q-tooltip>
            Download Full Dataset
          </q-tooltip>
        </q-btn>
        <q-btn flat icon="description">
          <q-tooltip>
            Download Data Description
          </q-tooltip>
        </q-btn>
        <q-btn flat>
          <q-icon class="github"></q-icon>
          <q-tooltip>
            GitHub Repository
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
     <div class="row q-col-gutter-lg logo-row">
      <div class="col-12 col-md-2"><a href="https://kof.ethz.ch"><img src="kof-neg.png" height=25></a></div>
      <div class="col-12 col-md-2"><a href="https://ethz.ch"><img src="eth-neg.png" height=25></a></div>
      <div class="col-12 col-md-2"><a href="https://"><img src="nfp_en.png" height=25></a></div>
      <div class="col-12 col-md-2"><a href="https://"><img src="snf_en.svg" height=25></a></div>
      <div class="col-12 col-md-2"><a href="https://unil.ch"><img src="unil-neg.png" height=25></a></div>
      <div class="col-12 col-md-2"><a href="https://"><img src="x28-neg.png" height=25></a></div>
      </div>
      <hr>
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <h6>Contact</h6>
          <b>ETH Zürich <br>
          Konjunkturforschungsstelle</b> <br>
          Sektion Schweizer Arbeitsmarkt <br>
          <br>
          <b>Dr. Michael Siegenthaler</b><br>
          Anfragen zum Inhalt: labor [at] kof.ethz.ch<br>
          technische Fragen: data [at] kof.ethz.ch<br>
        </div>
        <div class="col-12 col-md-6">
          <h6>Links</h6>
          <a href="https://kof.ethz.ch" target="_blank">KOF Hauptseite</a><br>
          <a href="/about">{{ $t('nav.about') }}</a><br>
          <a href="/blog">{{ $t('nav.blog') }}</a><br>
          <a href="/faq">{{ $t('nav.faq') }}</a><br>
        </div>
      </div>
      <br>
      <br>
      <hr>
      <div class="row q-col-gutter-lg logo-row q-mt-md">
        <div class="col-12">Dieses Dashboard entstand im Rahmen des Nationalen Forschungsprogramms NFP 77.</div>

      </div>


    </q-footer>

  </q-layout>
</template>

<script>

export default {
  data () {
    return {
      drawer: true,
      menuList: [
        {
          label: this.$t('nav.about'),
          to: '/about'
        },
         {
          label: this.$t('nav.blog'),
          to: '/blog'
        },
          {
          label: this.$t('nav.faq'),
          to: '/faq'
        },
      ],
    }
  },
  computed: {
  }
}


</script>
