<template>
  <q-page>

    <div class="lmm-page">

      <div :class="$style['info-box']" class="text-body-1 q-pa-md q-ma-sm">
        <h6 class="q-ma-sm">NOTE</h6>
        <p>
          The newest values of the indicator are often somewhat too low and revised upward in subsequent weeks. We
          will soon publish a revised indicator without this feature.
        </p>
      </div>
      <comp-card v-for="(card) in cards" :key="card.id" @close="() => removeCard(card.id)" />

      <q-btn color="secondary" class="full-width add_chart" @click="newCard">
        {{ $t('common.add_chart') }}
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
    return {
      cards: [
        { id: uuidv4() }
      ],
    }
  },
  methods: {
    newCard: function () {
      this.cards.push({
        id: uuidv4()
      })
    },
    removeCard: function (id) {
      this.cards = this.cards.filter((c) => c.id != id)
    }
  }
}
</script>

<style lang="scss" module>
.info-box {
  border: 3px solid $info;
  background: white;

  h6 {
    color: $info;
  }
}
</style>
