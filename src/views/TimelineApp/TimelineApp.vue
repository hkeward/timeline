<template>
  <div>
    <div id="header">
      <div>
        <h1 id="title">
          Hi this is a timeline app
        </h1>
      </div>
      <timeline-legend />
    </div>
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
</template>

<script>
import TimelineLegend from "./TimelineLegend.vue";
import Timeline from "./Timeline.vue";
import TimelineEntities from "./TimelineEntities.vue";
import AddEntity from "./AddEntity";
import PossibleMatches from "./PossibleMatches";
import ListEntities from "./ListEntities.vue";

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

  methods: {
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

#header {
  display: flex;
  justify-content: center;
}

#title {
  display: flex;
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
</style>
