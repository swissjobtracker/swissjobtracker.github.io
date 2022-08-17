<template>
  <q-layout view="hHh lpR fff">

    <q-header class="bg-primary text-white">
      <q-toolbar class="lmm-bar">
        <q-toolbar-title shrink>
          Swiss Job Tracker
        </q-toolbar-title>
        <q-tabs>
          <q-route-tab  v-for="(menuItem) in menuList" :to="menuItem.to" :label="menuItem.label" :key="menuItem.to" />
        </q-tabs>
        <q-space/>
        <q-btn
         flat
         icon="download"
         href="https://datenservice.kof.ethz.ch/api/v1/public/collections/ch.kof.jobtracker?mime=csv"
         target="_blank">
          <q-tooltip>
            {{$t("nav.tooltips.download_data")}}
          </q-tooltip>
        </q-btn>
        <q-btn flat icon="description">
          <q-tooltip>
            {{$t("nav.tooltips.download_metadata")}}
          </q-tooltip>
        </q-btn>
        <q-btn
         flat
         href="https://github.com/swissjobtracker"
         target="_blank">
          <q-icon class="github"></q-icon>
          <q-tooltip>
            {{$t("nav.tooltips.github")}}
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
          <h6>{{$t("footer.contact.title")}}</h6>
          <b>{{$t("footer.contact.kof")}} <br>
          {{$t("footer.contact.ethz")}}</b> <br>
          {{$t("footer.contact.division")}} <br>
          <br>
          <b>{{$t("footer.contact.content_head")}}</b><br>
          {{$t("footer.contact.content_email")}}<br>
          {{$t("footer.contact.data_email")}}<br>
        </div>
        <div class="col-12 col-md-6">
          <h6>{{$t("footer.links.title")}}</h6>
          <a href="https://kof.ethz.ch" target="_blank">{{$t("footer.links.kof_main")}}</a><br>
          <router-link to="/about">{{ $t('nav.about') }}</router-link><br>
          <a :href="nrp_link" target="_blank">{{$t("footer.links.nrp77.title")}}</a><br>
          <router-link to="/blog">{{ $t('nav.blog') }}</router-link><br>
          <router-link to="/faq">{{ $t('nav.faq') }}</router-link><br>
        </div>
      </div>
      <br>
      <br>
      <hr>
      <div class="row q-col-gutter-lg logo-row q-mt-md">
        <div class="col-12">{{$t("footer.nrp77.blurb")}}</div>

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
    nrp_link: function() {
      return this.$t("footer.links.nrp77.url")
    }
  }
}


</script>
