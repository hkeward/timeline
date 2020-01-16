<template>
  <div id="root">
    <div id="header">
      <div class="left">
        <button id="hamburger" @click="toggleMenu">
          <font-awesome-icon icon="bars"></font-awesome-icon>
        </button>
      </div>
      <div>
        <h1>Timeline</h1>
      </div>
      <div class="right">
        <button @click="populateWithExamples">
          Populate with some examples!
        </button>
      </div>
    </div>
    <div
      id="advanced"
      :style="{ visibility: menu_visible ? 'visible' : 'hidden' }"
    >
      <div id="advanced-menu">
        <div id="menu-search"><button @click="changeAdvancedTab('search')">SEARCH</button></div>
        <div id="menu-custom" @click="changeAdvancedTab('custom')"><button>ADD CUSTOM</button></div>
        <div id="menu-scale" @click="changeAdvancedTab('scale')"><button>CHANGE SCALE</button></div>
        <div id="menu-entities" @click="changeAdvancedTab('entities')"><button>ENTITIES</button></div>
      </div>
      <div id="advanced-content">
        <div v-if="advanced_tab === 'search'">
          <search-entity />
          <possible-matches />
        </div>
        <custom-entity v-else-if="advanced_tab === 'custom'" />
        <timeline-legend v-else-if="advanced_tab === 'scale'" />
        <list-entities v-else-if="advanced_tab === 'entities'" />
      </div>
    </div>
    <div id="timeline">
      <timeline />
      <timeline-entities id="timeline-entities" />
    </div>
  </div>
</template>

<script>
import TimelineLegend from "./TimelineLegend";
import Timeline from "./Timeline";
import TimelineEntities from "./TimelineEntities";
import SearchEntity from "./SearchEntity";
import CustomEntity from "./CustomEntity";
import PossibleMatches from "./PossibleMatches";
import ListEntities from "./ListEntities.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "TimelineApp",

  components: {
    TimelineLegend,
    Timeline,
    TimelineEntities,
    SearchEntity,
    CustomEntity,
    PossibleMatches,
    ListEntities
  },

  computed: {
    ...mapState(["menu_visible", "advanced_tab"])
  },

  methods: {
    ...mapActions(["toggleMenu", "changeAdvancedTab"]),
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
  clear: left;
  padding-right: 5px;
}

button {
  padding: 10px 20px;
  border: none;
  background: #2c3e50;
  color: antiquewhite;
}

button:focus {
  outline: none;
}

button:hover {
  cursor: pointer;
  color: cornflowerblue;
  transition: 0.3s;
}

h1 {
  margin: 5px 0 5px 0;
  font-weight: 200;
}

#header {
  display: flex;
  height: auto;
  background: #2c3e50;
  color: antiquewhite;
  border-bottom: 3px solid antiquewhite;
}

.left {
  flex: 1;
  text-align: left;
  display: flex;
}

.right {
  flex: 1;
  text-align: right;
  align-self: center;
}

#advanced {
  position: fixed;
  background: #66748c;
  height: 100%;
  z-index: 1;
  overflow-x: hidden;
}

#advanced-menu {
  display: flex;
  justify-content: space-between;
  background: #2c3e50;
}

#advanced-content {
  padding-top: 10px;
}

#timeline {
  flex-basis: 100%;
  margin: 20px 5px;
}

#timeline-entities:
</style>
