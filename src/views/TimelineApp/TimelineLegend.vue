<template>
  <div>
    <div class="legend">
      <label for="scale-min" class="flex-left">Scale minimum</label>
      <input id="scale-min" v-model.lazy.number="scale_min" />
      <div class="flex-right"></div>
    </div>
    <div class="legend">
      <label for="scale-max" class="flex-left">Scale maximum</label>
      <input id="scale-max" v-model.lazy.number="scale_max" />
      <div class="flex-right"></div>
    </div>
    <div class="legend">
      <label for="scale-partition-length" class="flex-left">Partition length</label>
      <input id="scale-partition-length" v-model.lazy.number="scale_partition_length" />
      <div class="flex-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimelineLegend",

  computed: {
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
    }
  }
};
</script>

<style>
.legend {
  display: flex;
}
</style>
