<template>
  <div>
    <div id="possible-matches" v-if="possibleMatches">
      <div v-for="(match, index) in possibleMatches" v-bind:key="index" class="match">
        <button @click="parseLifespan(match)">{{ match.label }}</button>
        <div>
          {{ match.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PossibleMatches",

  computed: {
    ...mapState(["possibleMatches"])
  },

  methods: {
    ...mapActions(["parseLifespan"])
  }
};
</script>

<style>
#possible-matches {
  display: flex;
  flex-wrap: wrap;
}

.match {
  width: 30%;
  margin: 1%;
}
</style>
