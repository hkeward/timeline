const zeroNotShown = state => {
  return (
      state.scale.max > 0 &&
      state.scale.min < 0 &&
      -state.scale.min % state.scale.partition_length !== 0
  );
};

const indexPriorToZero = (state, getters) => {
  const isGtZero = element => element.value > 0;
  var index = state.getters.partitions.findIndex(isGtZero);
  if (index > 0) {
    return index - 1;
  } else if (state.scale.max > 0) {
    return getters.partitions.length - 1;
  }
  return getters.partitions.length;
};

const partitions = state => {
  var partitions = [];
  var num_partitions =
      (state.scale.max - state.scale.min) / state.scale.partition_length;
  for (var i = 0; i < num_partitions; i++) {
    var partition_object = {};
    if (i === 0) {
      partition_object.feature = "first";
    } else if (i === num_partitions - 1) {
      partition_object.feature = "last";
    } else {
      partition_object.feature = "internal";
    }
    partition_object.value = state.scale.min + i * state.scale.partition_length;
    partitions.push(partition_object);
  }
  return partitions;
};

export default {
  indexPriorToZero,
  zeroNotShown,
  partitions
}