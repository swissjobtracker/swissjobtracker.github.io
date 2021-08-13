<template>
  <q-layout view="hHh lpR fff">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <svg width="25" height="25" viewBox="0 0 25 25">
          <polygon points="12.5 0, 25 6.25, 25 18.75, 12.5 25.5, 0 18.75, 0 6.25" 
      		 fill="red" stroke-width="5" />
           <rect x="10" y="5" width="5" height="15" style="fill:#fff;" />
           <rect x="5" y="10" width="15" height="5" style="fill:#fff;" />
        </svg>
    <div class="title-text">Labor Market Monitor</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-toolbar>
        <div class="footer-text">
        This and that cause this and that was missing.
        </div>
      </q-toolbar>

    </q-footer>

  </q-layout>
</template>


