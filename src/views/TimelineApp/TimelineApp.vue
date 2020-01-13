<template>
  <div id="root">
    <div id="menu-bar">
      <button @click="toggleMenu">
        [{{ menu_visible ? "&lt;" : "&gt;" }}]
      </button>
      <div
        id="menu"
        :style="{ visibility: menu_visible ? 'visible' : 'hidden' }"
      >
        <timeline-legend />
      </div>
    </div>
    <div id="timeline">
      <add-entity />
      <timeline />
      <timeline-entities />
      <possible-matches />
      <div>
        <button @click="populateWithExamples">
          Populate with some examples!
        </button>
      </div>
      <list-entities />
    </div>
  </div>
</template>

<script>
import TimelineLegend from "./TimelineLegend.vue";
import Timeline from "./Timeline.vue";
import TimelineEntities from "./TimelineEntities.vue";
import AddEntity from "./AddEntity";
import PossibleMatches from "./PossibleMatches";
import ListEntities from "./ListEntities.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "TimelineApp",

  components: {
    TimelineLegend,
    Timeline,
    TimelineEntities,
    AddEntity,
    PossibleMatches,
    ListEntities
  },

  computed: {
    ...mapState(["menu_visible"])
  },

  methods: {
    ...mapActions(["toggleMenu"]),
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
  }
};
</script>

<style>
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

label {
  display: inline-block;
  float: left;
  clear: left;
  width: 250px;
  text-align: right;
  padding-right: 5px;
}

#root {
  display: flex;
}

#menu-bar {
  flex-basis: 2%;
  margin-right: 0.5%;
  border-right: 2px solid black;
  text-align: left;
}

#menu {
  position: absolute;
  top: 2%;
  left: 4%;
  background: white;
  border: 2px solid black;
}

#timeline {
  flex-basis: 100%;
}
</style>
