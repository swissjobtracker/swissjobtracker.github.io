<template>
     <div class="row">
        <q-card flat square bordered class="q-card q-mb-xl  col-12">
          <div class="row">
          <div class="col-4">Map</div>
          <div class="col-7">Time Series</div>
          <div class="col-1">
              <div class="row">
                  <div class="col-10"></div>
                  <div class="col-1">
                      
                          <q-btn
                            flat
                            dense
                            icon="delete" />
                          <q-btn
                            flat
                            dense
                            icon="delete" />
                          <q-btn
                            flat
                            dense
                            icon="delete" />
        
                      
                  </div>
              </div>
          </div>
          </div>      
        </q-card>
      </div>
</template>

<script>
export default {
    name: "comp-card"
};

</script>