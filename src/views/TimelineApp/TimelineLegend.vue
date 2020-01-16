<template>
  <div id="legend">
    <div>
      <label for="scale-min">Scale minimum</label>
      <input id="scale-min" v-model.lazy.number="scale_min" />
    </div>
    <div>
      <label for="scale-max">Scale maximum</label>
      <input id="scale-max" v-model.lazy.number="scale_max" />
    </div>
    <div>
      <label for="scale-partition-length">Partition length</label>
      <input
        id="scale-partition-length"
        v-model.lazy.number="scale_partition_length"
      />
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

<style></style>
