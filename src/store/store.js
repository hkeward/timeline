import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scale: {
      min: -500,
      max: 500,
      partition_length: 50
    }
  },
  getters: {
    zeroNotShown: state => {
      return (
        state.scale.max > 0 &&
        state.scale.min < 0 &&
        -state.scale.min % state.scale.partition_length !== 0
      );
    },
    partitions: state => {
      const partitions = [];
      const num_partitions =
        (state.scale.max - state.scale.min) / state.scale.partition_length;
      for (let i = 0; i < num_partitions; i++) {
        const partition_object = {};
        if (i === 0) {
          partition_object.feature = "first";
        } else if (i === num_partitions - 1) {
          partition_object.feature = "last";
        } else {
          partition_object.feature = "internal";
        }
        partition_object.value =
          state.scale.min + i * state.scale.partition_length;
        partitions.push(partition_object);
      }
      return partitions;
    },
    indexPriorToZero: (state, getters) => {
      const isGtZero = element => element.value > 0;
      const index = getters.partitions.findIndex(isGtZero);
      if (index > 0) {
        return index - 1;
      } else if (state.scale.max > 0) {
        return getters.partitions.length - 1;
      }
      return getters.partitions.length;
    }
  },
  mutations,
  actions
});
