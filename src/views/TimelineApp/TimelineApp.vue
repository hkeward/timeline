<template>
  <div>
    <div id="header">
      <div>
        <h1 id="title">
          Hi this is a timeline app
        </h1>
      </div>
      <div id="legend">
        <label for="scale-min">Scale minimum</label>
        <input id="scale-min" v-model.lazy.number="scale_min" />
        <label for="scale-max">Scale maximum</label>
        <input id="scale-max" v-model.lazy.number="scale_max" />
        <label for="scale-partition-length">Partition length</label>
        <input
          id="scale-partition-length"
          v-model.lazy.number="scale_partition_length"
        />
      </div>
    </div>
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
            <input
              id="custom-person-birthDate"
              v-model="custom_birth_date"
            />
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
            <input
              id="custom-person-deathDate"
              v-model="custom_death_date"
            />
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
    <timeline />
    <timeline-entities />
    <div>
      <div v-if="possibleMatches">
        <table>
          <tr>
            <td v-for="(match, index) in possibleMatches" v-bind:key="index">
              <button @click="parseLifespan(match)">{{ match.label }}</button>
            </td>
          </tr>
          <!--          <tr>-->
          <!--            <td v-for="(match, index) in possibleMatches" v-bind:key="index">-->
          <!--              <img v-bind:src="possibleMatchesImages[index]">-->
          <!--            </td>-->
          <!--          </tr>-->
          <tr>
            <td v-for="(match, index) in possibleMatches" v-bind:key="index">
              {{ match.description }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <button @click="populateWithExamples">
        Populate with some examples!
      </button>
    </div>
    <div>
      <ul>
        <li
          v-for="(entity, index) in orderedTimelineEntities"
          v-bind:key="index"
        >
          {{ entity.name }}: {{ Math.abs(entity.birthDate) }}
          {{ entity.birthEra }} to
          {{ Math.abs(entity.deathDate) || "present" }}
          {{ entity.deathEra || "" }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Timeline from "./Timeline.vue";
import TimelineEntities from "./TimelineEntities.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "TimelineApp",

  components: {
    Timeline,
    TimelineEntities
  },

  methods: {
    ...mapActions([
      "lookupPerson",
      "parseLifespan",
      "addCustomEntity"
    ]),

    populateWithExamples() {
      const people = [
        "Socrates",
        "Plato",
        "Aristotle",
        "Alexander the Great",
        "Julius Caesar",
        "Mark Antony",
        "Cleopatra",
        "Jesus Christ",
        "William Shakespeare",
        "Wayne Gretzky"
      ];
      people.forEach(person => {
        this.$store.dispatch("lookupPerson", person);
      });
    }
  },

  computed: {
    ...mapState(["possibleMatches", "searchErrorMessage"]),
    ...mapGetters(["zeroNotShown", "orderedTimelineEntities"]),
    entityName: {
      get() {
        return this.$store.state.entityName;
      },
      set(name) {
        this.$store.commit("SET_ENTITY_NAME", name);
      }
    },
    scale_min: {
      get() {
        return this.$store.state.scale.min;
      },
      set(value) {
        this.$store.commit("SET_SCALE_MIN", value);
      }
    },
    scale_max: {
      get() {
        return this.$store.state.scale.max;
      },
      set(value) {
        this.$store.commit("SET_SCALE_MAX", value);
      }
    },
    scale_partition_length: {
      get() {
        return this.$store.state.scale.partition_length;
      },
      set(value) {
        this.$store.commit("SET_SCALE_PARTITION_LENGTH", value);
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

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}

table {
  padding-top: 1em;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.person-options {
  display: inline-block;
}

#error {
  color: darkred;
}

#header {
  display: flex;
  justify-content: center;
}

#title {
  display: flex;
}

#legend {
  position: absolute;
  top: 5px;
  right: 5px;
  text-align: left;
}

label {
  display: inline-block;
  float: left;
  clear: left;
  width: 250px;
  text-align: right;
  padding-right: 5px;
}

#legend input {
  display: inline-block;
  float: left;
  width: 50px;
  text-align: right;
}

#add-entity {
  display: flex;
}

#custom-entity {
  display: block;
}
</style>
