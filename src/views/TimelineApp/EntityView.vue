<template>
  <div class="entity">
    <div class="entity-header">
      <div class="flex-left">
        <h3 class="entity-name">{{ entity.name }}</h3>
      </div>
      <div class="flex-right expand">
        <button class="expand-icon" @click="toggleEntityInfo(index)">
          <font-awesome-icon v-if="entity.advanced_info_expanded" icon="minus"></font-awesome-icon>
          <font-awesome-icon v-else icon="plus"></font-awesome-icon>
        </button>
      </div>
    </div>
    <div v-if="entity.advanced_info_expanded" class="entity-info">
      <div>
        <div>
          Born: {{ Math.abs(entity.birthDate) }} {{ entity.birthEra }}
        </div>
        <div v-if="entity.deathDate">
          Died: {{ Math.abs(entity.deathDate) || "present" }} {{ entity.deathEra || "" }}
        </div>
      </div>
      <div>
        <input class="color-select" type="color" v-model="entityColour" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EntityView",

  props: {
    entity: {},
    index: Number
  },

  methods: {
    ...mapActions(["toggleEntityInfo"])
  },

  computed: {
    entityColour: {
      get() {
        return this.$store.state.timelineEntities[this.index].colour;
      },
      set(colour) {
        this.$store.commit("SET_ENTITY_COLOUR", {
          index: this.index,
          colour: colour
        });
      }
    }
  }
};
</script>

<style>
.entity-header {
  display: flex;
  align-items: center;
  background: #2c3e50;
  margin: 10px 10px 0 10px;
  border-radius: 5px;
  color: antiquewhite;
}

.entity-name {
  text-align: left;
  margin: 0 0 0 10px;
}

.expand {
  text-align: right;
}

.expand-icon {
  padding: 5px 10px;
  border-radius: 0 5px 5px 0;
  border-left: 2px solid antiquewhite;
}

.entity-info {
  text-align: left;
  margin: 0 15px;
  background: #515f6e;
  color: antiquewhite;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 5px 5px;
}

.color-select {
  border-radius: 100%;
  height: 30px;
  width: 30px;
  border: none;
  outline: none;
  -webkit-appearance: none;
  padding: 0;
}

.color-select::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-select::-webkit-color-swatch {
  border: none;
  border-radius: 100%;
}

.color-select::-moz-color-swatch {
  border: none;
  border-radius: 100%;
}
</style>
