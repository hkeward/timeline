<template>
  <div>
    <div id="custom-entity">
      <div id="custom-top">
        <label for="custom-person-name" class="flex-left">Name</label>
        <input id="custom-person-name" v-model="custom_name" v-on:keyup.enter="addCustomEntity" />
        <div class="flex-right"></div>
      </div>
      <div id="custom-mid">
        <label for="custom-person-birthDate" class="flex-left">Birth Date</label>
        <input id="custom-person-birthDate" v-model="custom_birth_date" v-on:keyup.enter="addCustomEntity" />
        <div class="flex-right">
          <input type="radio" id="birthEra-BC" name="birthEra" value="BC" v-model="custom_birth_era" />
          <label for="birthEra-BC">BC</label>
          <input type="radio" id="birthEra-AD" name="birthEra" value="AD" v-model="custom_birth_era" />
          <label for="birthEra-AD">AD</label>
        </div>
      </div>
      <div id="custom-bottom">
        <label for="custom-person-deathDate" class="flex-left">Death Date</label>
        <input id="custom-person-deathDate" v-model="custom_death_date" v-on:keyup.enter="addCustomEntity" />
        <div class="flex-right">
          <input type="radio" id="deathEra-BC" name="deathEra" value="BC" v-model="custom_death_era" />
          <label for="deathEra-BC">BC</label>
          <input type="radio" id="deathEra-AD" name="deathEra" value="AD" v-model="custom_death_era" />
          <label for="deathEra-AD">AD</label>
        </div>
      </div>
    </div>
    <div>
      <button @click="addCustomEntity">Add custom entity</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CustomEntity",

  methods: {
    ...mapActions(["addCustomEntity"])
  },

  computed: {
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
#custom-entity {
  padding-bottom: 10px;
}

#custom-top,
#custom-mid,
#custom-bottom {
  display: flex;
}

.flex-left,
.flex-right {
  flex: 1;
}
</style>
