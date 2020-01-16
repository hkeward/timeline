<template>
  <div>
    <div>
      <div id="add-entity">
        <label for="entity-search" class="flex-left">Search by name</label>
        <input
          v-model="entityName"
          id="entity-search"
          v-on:keyup.enter="lookupPerson"
          ref="input"
        />
        <div class="flex-right"></div>
      </div>
      <div>
        <button @click="lookupPerson">Search</button>
      </div>
    </div>
    <div v-if="searchErrorMessage" id="error">
      {{ searchErrorMessage }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SearchEntity",

  methods: {
    ...mapActions(["lookupPerson"])
  },

  computed: {
    ...mapState(["searchErrorMessage"]),
    entityName: {
      get() {
        return this.$store.state.entityName;
      },
      set(name) {
        this.$store.commit("SET_ENTITY_NAME", name);
      }
    }
  }
};
</script>

<style>
#add-entity {
  padding-bottom: 10px;
  display: flex;
}

#error {
  color: darkred;
  padding-top: 10px;
}
</style>
