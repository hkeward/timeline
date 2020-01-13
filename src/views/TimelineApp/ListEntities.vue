<template>
  <div>
    <ul>
      <li v-for="(entity, index) in orderedTimelineEntities" v-bind:key="index">
        {{ entity.name }}: {{ Math.abs(entity.birthDate) }}
        {{ entity.birthEra }} to
        {{ Math.abs(entity.deathDate) || "present" }}
        {{ entity.deathEra || "" }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ListEntities",

  computed: {
    ...mapGetters(["orderedTimelineEntities"])
  }
};
</script>
