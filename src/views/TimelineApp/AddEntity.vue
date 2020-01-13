<template>
  <div>
    <div id="add-entity">
      <div>
        <input
          v-model="entityName"
          v-on:keyup.enter="lookupPerson(entityName)"
          ref="input"
        />
        <button @click="lookupPerson(entityName)">Add it!</button>
      </div>
      <div id="custom-entity">
        <div>
          Create your own person
        </div>
        <div>
          <div>
            <input id="custom-person-name" v-model="custom_name" />
            <label for="custom-person-name">Name</label>
          </div>
          <div>
            <label for="custom-person-birthDate">Birth Date</label>
            <input id="custom-person-birthDate" v-model="custom_birth_date" />
            <div>
              <input
                type="radio"
                id="birthEra-BC"
                name="birthEra"
                value="BC"
                v-model="custom_birth_era"
              />
              <label for="birthEra-BC">BC</label>
            </div>
            <div>
              <input
                type="radio"
                id="birthEra-AD"
                name="birthEra"
                value="AD"
                v-model="custom_birth_era"
              />
              <label for="birthEra-AD">AD</label>
            </div>
          </div>
          <div>
            <input id="custom-person-deathDate" v-model="custom_death_date" />
            <label for="custom-person-deathDate">Death Date</label>
            <div>
              <input
                type="radio"
                id="deathEra-BC"
                name="deathEra"
                value="BC"
                v-model="custom_death_era"
              />
              <label for="deathEra-BC">BC</label>
            </div>
            <div>
              <input
                type="radio"
                id="deathEra-AD"
                name="deathEra"
                value="AD"
                v-model="custom_death_era"
              />
              <label for="deathEra-AD">AD</label>
            </div>
          </div>
          <button @click="addCustomEntity">Add custom entity</button>
        </div>
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
  name: "AddEntity",

  methods: {
    ...mapActions(["lookupPerson", "addCustomEntity"])
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
    },
    custom_name: {
      get() {
        return this.$store.state.customEntity.name;
      },
      set(name) {
        this.$store.commit("SET_CUSTOM_NAME", name);
      }
    },
    custom_birth_date: {
      get() {
        return this.$store.state.customEntity.birthDate;
      },
      set(date) {
        this.$store.commit("SET_CUSTOM_BIRTH_DATE", date);
      }
    },
    custom_birth_era: {
      get() {
        return this.$store.state.customEntity.birthEra;
      },
      set(era) {
        this.$store.commit("SET_CUSTOM_BIRTH_ERA", era);
      }
    },
    custom_death_date: {
      get() {
        return this.$store.state.customEntity.deathDate;
      },
      set(date) {
        this.$store.commit("SET_CUSTOM_DEATH_DATE", date);
      }
    },
    custom_death_era: {
      get() {
        return this.$store.state.customEntity.deathEra;
      },
      set(era) {
        this.$store.commit("SET_CUSTOM_DEATH_ERA", era);
      }
    }
  }
};
</script>

<style>
#error {
  color: darkred;
}

#add-entity {
  display: flex;
}

#custom-entity {
  display: block;
}
</style>
