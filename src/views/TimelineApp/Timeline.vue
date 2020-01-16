<template>
  <div>
    <div id="map">
      <div id="map-top">
        <div v-for="(partition, index) in partitions" v-bind:key="index">
          <div v-if="zeroNotShown && index === partitions.length - 1">
            <div v-if="zeroNotShown && index === indexPriorToZero"></div>
            <div :class="partition.feature"></div>
          </div>
          <div v-else>
            <div :class="partition.feature"></div>
            <div v-if="zeroNotShown && index === indexPriorToZero"></div>
          </div>
        </div>
      </div>
      <div id="map-top-mid">
        <div v-for="(partition, index) in partitions" v-bind:key="index">
          <div v-if="zeroNotShown && index === partitions.length - 1">
            <div
              v-if="zeroNotShown && index === indexPriorToZero"
              class="zero-value"
            ></div>
            <div :class="partition.feature" class="mid"></div>
          </div>
          <div v-else>
            <div :class="partition.feature" class="mid"></div>
            <div
              v-if="zeroNotShown && index === indexPriorToZero"
              class="zero-value"
            ></div>
          </div>
        </div>
      </div>
      <div id="map-bottom-mid">
        <div v-for="(partition, index) in partitions" v-bind:key="index">
          <div v-if="zeroNotShown && index === partitions.length - 1">
            <div
              v-if="zeroNotShown && index === indexPriorToZero"
              class="zero-value"
            ></div>
            <div :class="partition.feature" class="mid"></div>
          </div>
          <div v-else>
            <div :class="partition.feature" class="mid"></div>
            <div
              v-if="zeroNotShown && index === indexPriorToZero"
              class="zero-value"
            ></div>
          </div>
        </div>
      </div>
      <div id="map-bottom">
        <div v-for="(partition, index) in partitions" v-bind:key="index">
          <div v-if="zeroNotShown && index === partitions.length - 1">
            <div v-if="zeroNotShown && index === indexPriorToZero"></div>
            <div :class="partition.feature"></div>
          </div>
          <div v-else>
            <div :class="partition.feature"></div>
            <div v-if="zeroNotShown && index === indexPriorToZero"></div>
          </div>
        </div>
      </div>
      <div id="values">
        <div v-for="(partition, index) in partitions" v-bind:key="index">
          <div>
            {{ partition.value }}
          </div>
          <div>
            <div v-if="zeroNotShown && index === indexPriorToZero">
              0
            </div>
            <div v-if="index === partitions.length - 1" class="max-value">
              {{ scale.max }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Timeline",

  computed: {
    ...mapState(["scale"]),
    ...mapGetters(["zeroNotShown", "partitions", "indexPriorToZero"])
  }
};
</script>

<style>
#map {
  margin-top: 10px;
  height: auto;
  width: 100%;
}

#map-top,
#map-top-mid,
#map-bottom-mid,
#map-bottom,
#values {
  display: flex;
  color: black;
}

#map-top div {
  height: 10px;
  flex-basis: 100%;
  display: flex;
}

#map-top-mid div {
  height: 10px;
  flex-basis: 100%;
  border-bottom: 1px solid black;
  display: flex;
}

#map-bottom-mid div {
  height: 10px;
  flex-basis: 100%;
  display: flex;
}

#map-bottom div {
  height: 10px;
  flex-basis: 100%;
  display: flex;
}

#values div {
  flex-basis: 100%;
  display: flex;
}

.zero-value {
  border-right: 1px solid black;
}

.max-value {
  justify-content: flex-end;
}

.first {
  border-left: 2px solid black;
  border-right: 1px solid transparent;
}

.first.mid {
  border-right: 1px solid black;
}

.last {
  border-right: 2px solid black;
}

.internal {
  border-right: 1px solid transparent;
}

.internal.mid {
  border-right: 1px solid black;
}
</style>
