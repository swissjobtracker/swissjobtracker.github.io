<template>
  <div class="lmm-page">
    <q-card class="about-card">
      <img src="about.jpg" />

      <q-card-section>
        <div class="text-h3">
          {{ $t("about.title") }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-card-section>
          <div class="text-h4">
            {{ $t("about.project_title") }}
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            {{ $t("about.project_text") }}
          </div>
        </q-card-section>
      </q-card-section>

      <q-card-section>
        <q-card-section>
          <div class="text-h4">
            {{ $t("about.methodology_title") }}
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <p>{{ $t("about.methodology_text1") }}</p>
            <p>{{ $t("about.methodology_text2") }}</p>
            <p>{{ $t("about.methodology_text3") }}</p>
            <p>
              For more information, refer to the
              <a href="Methodology Swiss Job Tracker.pdf" target="_blank"
                >full methodology document</a
              >.
              <br />
              The R code used to calculate the series can be found on GitHub at
              <a
                href="https://github.com/swissjobtracker/chjobtracker"
                target="_blank"
                >swissjobtracker/chjobtracker</a
              >.
            </p>
          </div>
        </q-card-section>
      </q-card-section>

      <q-card-section>
        <q-card-section>
          <div class="text-h4">
            {{ $t("about.partner_title") }}
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            {{ $t("about.partner_text") }}
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.about-card {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
