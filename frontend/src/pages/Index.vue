<template>
  <q-page>

    <div class="lmm-page">
      
      <comp-card
        v-for="(card) in dashboard"
        :key="card.id"
        :id="card.id"
       />

     <q-btn  color="blue" class="full-width add_chart" @click="newChart">
       {{ $t('common.add_chart')}}
      </q-btn>




    </div>
        
   
      
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import ComparisonCard from "../components/ComparisonCard";
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'PageIndex',
  components: {
    "comp-card": ComparisonCard
  },
  data() {
    return {
      dashboard: [],
    };
  },
  methods: {
    newChart: function(){
      id: uuidv4()
    }
    }
  
})
</script>
