<template>
  <q-page>

    <div class="lmm-page">

      <comp-card
        v-for="(card) in cards"
        :key="card.id"
       />

     <q-btn  color="blue" class="full-width add_chart" @click="newCard">
       {{ $t('common.add_chart')}}
      </q-btn>




    </div>



  </q-page>
</template>

<script>
import ComparisonCard from "../components/ComparisonCard";
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'PageIndex',
  components: {
    "comp-card": ComparisonCard
  },
  mounted() {

  },
  data() {
    return{
      cards: [],
      indicator: 'main',
      mapData: []
    }
  },
  methods: {
    newCard: function(){
      this.cards.push({
        id: uuidv4()
      })
    },
  }
}
</script>
