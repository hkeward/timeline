<template>
  <div id="root">
    <div id="header">
      <div class="left">
        <button id="hamburger" @click="toggleMenu" :class="{ 'active' : menu_visible }">
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
        <div id="menu-search">
          <button @click="changeAdvancedTab('search')" :class="{ 'active' : advanced_tab === 'search' }">
            SEARCH
          </button>
        </div>
        <div id="menu-custom">
          <button @click="changeAdvancedTab('custom')" :class="{ 'active' : advanced_tab === 'custom' }">
            ADD CUSTOM
          </button>
        </div>
        <div id="menu-scale">
          <button @click="changeAdvancedTab('scale')" :class="{ 'active' : advanced_tab === 'scale' }">
            CHANGE SCALE
          </button>
        </div>
        <div id="menu-entities">
          <button @click="changeAdvancedTab('entities')" :class="{ 'active' : advanced_tab === 'entities' }">
            ENTITIES
          </button>
        </div>
      </div>
      <div id="advanced-content" :style="{ width: menu_width + 'px' }">
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

  data() {
    return {
      menu_width: 200
    };
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
    },
    setMenuWidth() {
      const advanced_menu_div = document.getElementById("advanced-menu");
      if (advanced_menu_div) {
        this.menu_width = advanced_menu_div.offsetWidth;
      }
    }
  },

  mounted() {
    this.setMenuWidth();
  }
};
</script>

<style>
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
}

h1 {
  margin: 5px 0 5px 0;
  font-weight: 200;
}

#header {
  display: flex;
  background: #2c3e50;
  color: antiquewhite;
  border-bottom: 2px solid antiquewhite;
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
  height: 90%;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

#advanced::-webkit-scrollbar {
  width: 0 !important;
}

#advanced-menu {
  display: flex;
  justify-content: space-between;
  background: #2c3e50;
}

#advanced-content {
  padding: 10px 0;
}

#timeline {
  flex-basis: 100%;
  margin: 20px 5px;
}

.active {
  background: black;
}

#timeline-entities {
  padding-top: 15px;
}
</style>
