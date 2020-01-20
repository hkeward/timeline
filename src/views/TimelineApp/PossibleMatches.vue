<template>
  <div>
    <div v-if="possibleMatches">
      <table>
        <tr>
          <td v-for="(match, index) in possibleMatches" v-bind:key="index">
            <button @click="parseLifespan(match)">{{ match.label }}</button>
          </td>
        </tr>
        <tr>
          <td v-for="(match, index) in possibleMatches" v-bind:key="index">
            {{ match.description }}
          </td>
        </tr>
      </table>
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
