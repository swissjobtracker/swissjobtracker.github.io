<template>
  <q-layout view="hHh lpR fff">

    <q-header class="bg-primary text-white">
      <q-toolbar class="lmm-bar">
        <a class="title-link" href="/"><svg width="25" height="25" viewBox="0 0 25 25">
          <polygon points="12.5 0, 25 6.25, 25 18.75, 12.5 25.5, 0 18.75, 0 6.25" 
      		 fill="red" stroke-width="5" />
           <rect x="10" y="5" width="5" height="15" style="fill:#fff;" />
           <rect x="5" y="10" width="15" height="5" style="fill:#fff;" />
        </svg></a>
    <div class="title-text">Labor Market Monitor</div>
      <q-tabs>
        <q-route-tab  v-for="(menuItem) in menuList" :to="menuItem.to" :label="menuItem.label" :key="menuItem.to" />
      </q-tabs>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
     <div class="row q-col-gutter-lg logo-row">
      <div class="col-12 col-md-3"><a href="https://kof.ethz.ch"><img src="kof-neg.png" height=25></a></div>
      <div class="col-12 col-md-3"><a href="https://ethz.ch"><img src="eth-neg.png" height=25></a></div>
      <div class="col-12 col-md-3"><a href="https://unil.ch"><img src="unil-neg.png" height=25></a></div>
      <div class="col-12 col-md-3"><a href="https://"><img src="x28-neg.png" height=25></a></div>
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
