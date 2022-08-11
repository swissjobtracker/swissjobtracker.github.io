<template>
  <q-page>

    <div class="lmm-page">

      <comp-card
        v-for="(card) in cards"
        :key="card.id"
        @close="() => removeCard(card.id)"
       />

     <q-btn  color="secondary" class="full-width add_chart" @click="newCard">
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
      cards: [
        {id: uuidv4()}
      ],
    }
  },
  methods: {
    newCard: function(){
      this.cards.push({
        id: uuidv4()
      })
    },
    removeCard: function(id){
      this.cards = this.cards.filter((c) => c.id != id )
    }
  }
}
</script>
