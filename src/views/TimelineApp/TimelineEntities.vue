<template>
  <div>
    <div v-for="(entity, index) in orderedTimelineEntities" :key="index">
      <div>
        <!--          If the start of the birthDate is lower than scale.min -->
        <div
          v-if="entity.birthDate <= scale.min && entity.deathDate"
          class="timeline-bar"
        >
          <!--            Don't display anything if the birthDate and deathDate are below the scale.min -->
          <div
            v-if="entity.deathDate <= scale.min"
            :style="{ width: 0 + '%' }"
          ></div>
          <div
            v-else-if="entity.deathDate <= scale.max"
            :title="entity.name"
            class="timeline-entity"
            :style="{
              width:
                ((entity.deathDate - scale.min) / (scale.max - scale.min)) *
                  100 +
                '%',
              background: entity.colour
            }"
          ></div>
          <div
            v-else
            :title="entity.name"
            class="timeline-entity"
            :style="{
              width: 100 + '%',
              background: entity.colour
            }"
          ></div>
        </div>
        <!--          If the start of the birthDate falls between scale.min and scale.max -->
        <div
          v-else-if="
            entity.birthDate >= scale.min && entity.birthDate <= scale.max
          "
          class="timeline-bar"
        >
          <div
            :style="{
              width:
                ((entity.birthDate - scale.min) / (scale.max - scale.min)) *
                  100 +
                '%'
            }"
          ></div>

          <div
            v-if="entity.deathDate < scale.max"
            :title="entity.name"
            class="timeline-entity"
            :style="{
              width:
                ((entity.deathDate - entity.birthDate) /
                  (scale.max - scale.min)) *
                  100 +
                '%',
              background: entity.colour
            }"
          ></div>
          <div
            v-else-if="entity.deathDate >= scale.max"
            :title="entity.name"
            class="timeline-entity"
            :style="{
              width:
                100 -
                ((entity.birthDate - scale.min) / (scale.max - scale.min)) *
                  100 +
                '%',
              background: entity.colour
            }"
          ></div>
          <!--            If deathDate isn't defined, assume they're still alive -->
          <div
            v-else
            :title="entity.name"
            class="timeline-entity alive"
            :style="{
              width:
                ((currentYear - entity.birthDate) / (scale.max - scale.min)) *
                  100 +
                '%',
              background: entity.colour
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "TimelineEntities",

  computed: {
    ...mapState(["scale", "currentYear"]),
    ...mapGetters(["orderedTimelineEntities"])
  }
};
</script>

<style>
.timeline-entity {
  border-right: 1px solid transparent;
}

.timeline-bar {
  height: 13px;
  width: 100%;
  display: flex;
}

.alive {
  border-right: 1px solid red;
}
</style>
