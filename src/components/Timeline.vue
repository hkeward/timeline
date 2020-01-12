<template>
  <div>
    <div id="header">
      <div>
        <h1 id="title">
          Hi this is a timeline app
        </h1>
      </div>
      <div id="legend">
        <label for="scale-min">Scale minimum</label>
        <input id="scale-min" v-model.lazy.number="scale.min" />
        <label for="scale-max">Scale maximum</label>
        <input id="scale-max" v-model.lazy.number="scale.max" />
        <label for="scale-partition-length">Partition length</label>
        <input
          id="scale-partition-length"
          v-model.lazy.number="scale.partition_length"
        />
      </div>
    </div>
    <div id="add-entity">
      <div>
        <input v-model="personName" v-on:keyup.enter="lookupPerson(personName)" ref="input" />
        <button @click="lookupPerson(personName)">Add it!</button>
      </div>
      <div id="custom-entity">
        <div>
          Create your own person
        </div>
        <div>
          <div>
            <input id="custom-person-name" v-model="customPerson.name"/>
            <label for="custom-person-name">Name</label>
          </div>
          <div>
            <label for="custom-person-birthDate">Birth Date</label>
            <input id="custom-person-birthDate" v-model="customPerson.birthDate">
            <div>
              <input type="radio" id="birthEra-BC" name="birthEra" value="BC" v-model="customPerson.birthEra">
              <label for="birthEra-BC">BC</label>
            </div>
            <div>
              <input type="radio" id="birthEra-AD" name="birthEra" value="AD" v-model="customPerson.birthEra">
              <label for="birthEra-AD">AD</label>
            </div>
          </div>
          <div>
            <input id="custom-person-deathDate" v-model="customPerson.deathDate">
            <label for="custom-person-deathDate">Death Date</label>
            <div>
              <input type="radio" id="deathEra-BC" name="deathEra" value="BC" v-model="customPerson.deathEra">
              <label for="deathEra-BC">BC</label>
            </div>
            <div>
              <input type="radio" id="deathEra-AD" name="deathEra" value="AD" v-model="customPerson.deathEra">
              <label for="deathEra-AD">AD</label>
            </div>
          </div>
          <button @click="addCustomPerson">Add custom person</button>
        </div>
      </div>
    </div>
    <div v-if="errorMessage" id="error">
      {{ errorMessage }}
    </div>
    <div id="timeline">
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
                background: 'rgb(' + entity.colour + ')'
              }"
            ></div>
            <div
              v-else
              :title="entity.name"
              class="timeline-entity"
              :style="{
                width: 100 + '%',
                background: 'rgb(' + entity.colour + ')'
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
                background: 'rgb(' + entity.colour + ')'
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
                background: 'rgb(' + entity.colour + ')'
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
                background: 'rgb(' + entity.colour + ')'
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="possibleMatches">
        <table>
          <tr>
            <td v-for="(match, index) in possibleMatches" v-bind:key="index">
              <button @click="parseLifespan(match)">{{ match.label }}</button>
            </td>
          </tr>
          <!--          <tr>-->
          <!--            <td v-for="(match, index) in possibleMatches" v-bind:key="index">-->
          <!--              <img v-bind:src="possibleMatchesImages[index]">-->
          <!--            </td>-->
          <!--          </tr>-->
          <tr>
            <td v-for="(match, index) in possibleMatches" v-bind:key="index">
              {{ match.description }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <button @click="populateWithExamples">
        Populate with some examples!
      </button>
    </div>
    <div>
      <ul>
        <li
          v-for="(entity, index) in orderedTimelineEntities"
          v-bind:key="index"
        >
          {{ entity.name }}: {{ Math.abs(entity.birthDate) }}
          {{ entity.birthEra }} to
          {{ Math.abs(entity.deathDate) || "present" }}
          {{ entity.deathEra || "" }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Timeline",

  data() {
    return {
      personName: "",
      possibleMatches: [],
      possibleMatchesImages: [],
      errorMessage: "",
      timelineEntities: [],
      scale: {
        min: -500,
        max: 500,
        partition_length: 50
      },
      currentYear: new Date().getFullYear(),
      customPerson: {
        name: "",
        birthDate: "",
        birthEra: "BC",
        deathDate: "",
        deathEra: "BC"
      }
    };
  },

  methods: {
    async lookupPerson(providedPerson) {
      var person = providedPerson;
      this.errorMessage = "";
      var url = new URL("https://www.wikidata.org/w/api.php");
      var params = {
        origin: "*",
        action: "wbsearchentities",
        language: "en",
        format: "json",
        search: person
      };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );
      try {
        const response = await fetch(url);
        const data = await response;
        const searchResults = await data.json();
        if (person === searchResults.search[0].label) {
          this.parseLifespan(searchResults.search[0]);
        } else {
          this.showOptions(searchResults.search);
        }
      } catch (error) {
        this.errorMessage = `No results found for "${providedPerson}"`;
      }
    },

    async parseLifespan(entity) {
      const entityId = entity.id;
      var url = new URL("https://www.wikidata.org/w/api.php");
      var params = {
        origin: "*",
        action: "wbgetclaims",
        format: "json",
        entity: entityId
      };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );
      try {
        var birthDate;
        var birthEra;
        var deathDate;
        var deathEra;

        const response = await fetch(url);
        const data = await response;
        const entityClaims = await data.json();
        const claims = entityClaims.claims;

        //  check whether the entity is a human
        if ("P31" in claims) {
          var instanceClaims = [];
          claims.P31.forEach(function(instance) {
            instanceClaims.push(instance.mainsnak.datavalue.value.id);
          });

          // human or human character in the Old Testament
          if (
            instanceClaims.includes("Q5") ||
            instanceClaims.includes("Q20643955")
          ) {
            //  if human, retrieve birth and death dates
            if ("P569" in claims) {
              // This assumes the first date in the array is the best one, not necessarily true
              var birth = claims.P569[0].mainsnak.datavalue.value.time;
              birthDate = parseInt(birth.substring(0, 5));
              birthEra = birthDate < 0 ? "BC" : "AD";
            } else {
              this.errorMessage = "Birth date is confusing me, sorry!";
            }

            if ("P570" in claims) {
              var death = claims.P570[0].mainsnak.datavalue.value.time;
              deathDate = parseInt(death.substring(0, 5));
              deathEra = deathDate < 0 ? "BC" : "AD";
            }

            this.addToTimeline({
              name: entity.label,
              birthDate: birthDate,
              birthEra: birthEra,
              deathDate: deathDate,
              deathEra: deathEra,
              colour: this.hsv_to_rgb(Math.random(), 0.5, 0.95)
            });
          } else {
            this.errorMessage = "Selected entity is non-human";
          }
        }
      } catch (error) {
        throw Error("Error searching Wikidata");
      }

      this.clearOptions();
    },
    //
    // async getImage(index, entity) {
    //   const entityId = entity.id;
    //   var url = new URL("https://www.wikidata.org/w/api.php");
    //   var params = {
    //     origin: '*',
    //     action: 'wbgetclaims',
    //     format: 'json',
    //     property: 'P18',
    //     entity: entityId
    //   };
    //   Object.keys(params).forEach(key =>
    //           url.searchParams.append(key, params[key])
    //   );
    //   try {
    //     const response = await fetch(url);
    //     const data = await response;
    //     const imageClaim = await data.json();
    //     const claim = imageClaim.claims;
    //
    //     var urlBase = `https://commons.wikimedia.org/wiki/File:`
    //     var imgUrl;
    //     if ('P18' in claim) {
    //       var file = claim.P18[0].mainsnak.datavalue.value.replace(/ /g, "_");
    //       imgUrl = `${urlBase}${file}`;
    //     }
    //
    //     this.possibleMatchesImages.splice(index, 1, imgUrl);
    //   } catch (error) {
    //     throw Error("Some issue getting image");
    //   }
    // },

    showOptions(searchResults) {
      const disambigRegex = /disambiguation/;
      this.possibleMatches = searchResults
        .filter(result => {
          return !result.description.match(disambigRegex);
        })
        .slice(0, 5);
      // for (var i = 0; i < this.possibleMatches.length; i++) {
      //   this.getImage(i, this.possibleMatches[i]);
      // }
    },

    clearOptions() {
      this.possibleMatches = [];
    },

    addToTimeline(entity) {
      this.timelineEntities.push(entity);
      this.personName = "";
      this.$refs.input.focus();
    },

    // https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
    hsv_to_rgb(h, s, v) {
      var h_i = Math.trunc(h * 6);
      var f = h * 6 - h_i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);
      var r, g, b;
      if (h_i === 0) {
        r = v;
        g = t;
        b = p;
      } else if (h_i === 1) {
        r = q;
        g = v;
        b = p;
      } else if (h_i === 2) {
        r = p;
        g = v;
        b = t;
      } else if (h_i === 3) {
        r = p;
        g = q;
        b = v;
      } else if (h_i === 4) {
        r = t;
        g = p;
        b = v;
      } else if (h_i === 5) {
        r = v;
        g = p;
        b = q;
      }
      return Math.trunc(r * 256)
        .toString()
        .concat(
          ",",
          Math.trunc(g * 256).toString(),
          ",",
          Math.trunc(b * 256).toString()
        );
    },

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
        this.lookupPerson(person);
      });
    },

    addCustomPerson() {
      var birthDate, birthYear, deathDate, deathYear, factor;

      birthDate = new Date(this.customPerson.birthDate);
      factor = (this.customPerson.birthEra === "BC") ? -1 : 1;
      if (this.customPerson.birthDate && this.customPerson.birthDate.length <= 4) {
        birthYear = factor * this.customPerson.birthDate;
      } else if (birthDate.valueOf()) {
        birthYear = factor * birthDate.getFullYear();
      } else {
        this.errorMessage = "Invalid or missing birth date";
        return;
      }

      deathDate = new Date(this.customPerson.deathDate);
      factor = (this.customPerson.deathEra === "BC") ? -1 : 1;
      if (this.customPerson.deathDate && this.customPerson.deathDate.length <= 4) {
        deathYear = factor * this.customPerson.deathDate;
      } else if (deathDate.valueOf()) {
        deathYear = factor * deathDate.getFullYear();
      } else {
        deathYear = this.currentYear;
      }

      this.addToTimeline({
        name: this.customPerson.name,
        birthDate: birthYear,
        birthEra: this.customPerson.birthEra,
        deathDate: deathYear,
        deathEra: this.customPerson.deathEra,
        colour: this.hsv_to_rgb(Math.random(), 0.5, 0.95)
      });
      this.customPerson = _.mapValues(this.customPerson, () => "");
      this.customPerson.birthEra = "BC";
      this.customPerson.deathEra = "BC";
    }
  },

  computed: {
    orderedTimelineEntities() {
      return _.orderBy(this.timelineEntities, ["birthDate"]);
    },
    partitions() {
      var partitions = [];
      var num_partitions =
        (this.scale.max - this.scale.min) / this.scale.partition_length;
      for (var i = 0; i < num_partitions; i++) {
        var partition_object = {};
        if (i === 0) {
          partition_object.feature = "first";
        } else if (i === num_partitions - 1) {
          partition_object.feature = "last";
        } else {
          partition_object.feature = "internal";
        }
        partition_object.value =
          this.scale.min + i * this.scale.partition_length;
        partitions.push(partition_object);
      }
      return partitions;
    },
    zeroNotShown() {
      return (
        this.scale.max > 0 &&
        this.scale.min < 0 &&
        -this.scale.min % this.scale.partition_length !== 0
      );
    },
    indexPriorToZero() {
      const isGtZero = element => element.value > 0;
      var index = this.partitions.findIndex(isGtZero);
      if (index > 0) {
        return index - 1;
      } else if (this.scale.max > 0) {
        return this.partitions.length - 1;
      }
      return this.partitions.length;
    }
  }
};
</script>

<style scoped>
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

.person-options {
  display: inline-block;
}

#error {
  color: darkred;
}

#header {
  display: flex;
  justify-content: center;
}

#title {
  display: flex;
}

#legend {
  position: absolute;
  top: 5px;
  right: 5px;
  text-align: left;
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

.timeline-bar {
  height: 10px;
  width: 100%;
  display: flex;
}

.timeline-entity {
  border-right: 1px solid transparent;
}

.alive {
  border-right: 1px solid red;
}

#add-entity {
  display: flex;
}

#custom-entity {
  display: block;
}
</style>
