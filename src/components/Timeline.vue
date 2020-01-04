<template>
  <div>
    <h1>
      Hi this is a timeline app
    </h1>
    <div>
      <input v-model="personName" v-on:keyup.enter="lookupPerson" ref="input" />
      <button @click="lookupPerson">Add it!</button>
    </div>
    <div v-if="errorMessage" id="error">
      {{errorMessage}}
    </div>
    <div>
      <div v-if="possibleMatches">
        <table>
          <tr>
            <td v-for="(match, index) in possibleMatches" v-bind:key="index">
              <button @click="parseLifespan(match)">{{match.label}}</button>
            </td>
          </tr>
<!--          <tr>-->
<!--            <td v-for="(match, index) in possibleMatches" v-bind:key="index">-->
<!--              <img v-bind:src="possibleMatchesImages[index]">-->
<!--            </td>-->
<!--          </tr>-->
          <tr>
            <td v-for="(match, index) in possibleMatches" v-bind:key="index">
              {{match.description}}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="(entity, index) in orderedTimelineEntities" v-bind:key="index">
          {{entity.name}}: {{Math.abs(entity.birthDate)}} {{entity.birthEra}} to {{Math.abs(entity.deathDate) || 'present'}} {{entity.deathEra || ''}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: "Timeline",

  data() {
    return {
      personName: "",
      possibleMatches: [],
      possibleMatchesImages: [],
      errorMessage: "",
      timelineEntities: []
    };
  },

  methods: {
    async lookupPerson() {
      this.errorMessage = "";
      var url = new URL("https://www.wikidata.org/w/api.php");
      var params = {
        origin: '*',
        action: 'wbsearchentities',
        language: 'en',
        format: 'json',
        search: this.personName
      };
      Object.keys(params).forEach(key =>
              url.searchParams.append(key, params[key])
      );
      try {
        const response = await fetch(url);
        const data = await response;
        const searchResults = await data.json();
        if (this.personName === searchResults.search[0].label) {
          this.parseLifespan(searchResults.search[0]);
        } else {
          this.showOptions(searchResults.search);
        }
      } catch (error) {
        throw Error("Error searching Wikidata");
      }
    },

    async parseLifespan(entity) {
      const entityId = entity.id;
      var url = new URL("https://www.wikidata.org/w/api.php");
      var params = {
        origin: '*',
        action: 'wbgetclaims',
        format: 'json',
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
        if ('P31' in claims) {
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
            if ('P569' in claims) {
              // This assumes the first date in the array is the best one, not necessarily true
              var birth = claims.P569[0].mainsnak.datavalue.value.time;
              birthDate = parseInt(birth.substring(0, 5));
              birthEra = birthDate < 0 ? "BC" : "AD";
            } else {
              this.errorMessage = "Birth date is confusing me, sorry!";
            }

            if ('P570' in claims) {
              var death = claims.P570[0].mainsnak.datavalue.value.time;
              deathDate = parseInt(death.substring(0, 5));
              deathEra = deathDate < 0 ? "BC" : "AD";
            }

            this.addToTimeline({name: entity.label,
              birthDate: birthDate,
              birthEra: birthEra,
              deathDate: deathDate,
              deathEra: deathEra});

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
      this.possibleMatches = searchResults.filter(result => {
        return !result.description.match(disambigRegex);
      }).slice(0,5);
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
  },

  computed: {
    orderedTimelineEntities() {
      return _.orderBy(this.timelineEntities, ['birthDate']);
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
</style>
