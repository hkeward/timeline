<template>
  <div>
    <entity-view
      v-for="(entity, index) in timelineEntities"
      v-bind:key="index"
      :entity="entity"
      :index="index"
    />
  </div>
</template>

<script>
import EntityView from "./EntityView";
import { mapState } from "vuex";

export default {
  name: "ListEntities",

  components: {
    EntityView
  },

  computed: {
    ...mapState(["timelineEntities"])
  }
};
</script>
