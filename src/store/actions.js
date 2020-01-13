import _ from "lodash";

const addToTimeline = ({ commit }, entity) => {
  commit("ADD_ENTITY", entity);
  commit("CLEAR_NAME");
};

const lookupPerson = async ({ state, dispatch }) => {
  state.searchErrorMessage = "";
  const url = new URL("https://www.wikidata.org/w/api.php");
  const params = {
    origin: "*",
    action: "wbsearchentities",
    language: "en",
    format: "json",
    search: state.entityName
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  try {
    const response = await fetch(url);
    const data = await response;
    const searchResults = await data.json();
    if (state.entityName === searchResults.search[0].label) {
      dispatch("parseLifespan", searchResults.search[0]);
    } else {
      dispatch("showOptions", searchResults.search);
    }
  } catch (error) {
    state.searchErrorMessage = `No results found for "${state.entityName}"`;
  }
};

const parseLifespan = async ({ state, dispatch }, entity) => {
  const entityId = entity.id;
  const url = new URL("https://www.wikidata.org/w/api.php");
  const params = {
    origin: "*",
    action: "wbgetclaims",
    format: "json",
    entity: entityId
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  try {
    let birthDate;
    let birthEra;
    let deathDate;
    let deathEra;

    const response = await fetch(url);
    const data = await response;
    const entityClaims = await data.json();
    const claims = entityClaims.claims;

    //  check whether the entity is a human
    if ("P31" in claims) {
      const instanceClaims = [];
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
          const birth = claims.P569[0].mainsnak.datavalue.value.time;
          birthDate = parseInt(birth.substring(0, 5));
          birthEra = birthDate < 0 ? "BC" : "AD";
        } else {
          state.searchErrorMessage = "Birth date is confusing me, sorry!";
        }

        if ("P570" in claims) {
          var death = claims.P570[0].mainsnak.datavalue.value.time;
          deathDate = parseInt(death.substring(0, 5));
          deathEra = deathDate < 0 ? "BC" : "AD";
        }

        dispatch("hsv_to_rgb");

        dispatch("addToTimeline", {
          name: entity.label,
          birthDate: birthDate,
          birthEra: birthEra,
          deathDate: deathDate,
          deathEra: deathEra,
          colour: state.random_colour
        });
        // TODO how do I do this?
        // this.$refs.input.focus();
      } else {
        state.searchErrorMessage = "Selected entity is non-human";
      }
    }
  } catch (error) {
    state.searchErrorMessage("Error searching Wikidata");
  }
  dispatch("clearMatches");
};

const showOptions = ({ commit }, searchResults) => {
  const disambigRegex = /disambiguation/;
  const possibleMatches = searchResults
    .filter(result => {
      return !result.description.match(disambigRegex);
    })
    .slice(0, 5);
  commit("SET_MATCHES", possibleMatches);
};

const clearMatches = ({ commit }) => {
  commit("CLEAR_MATCHES");
};

// https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
const hsv_to_rgb = ({ commit }) => {
  let h = Math.random();
  let s = 0.5;
  let v = 0.95;
  let h_i = Math.trunc(h * 6);
  let f = h * 6 - h_i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  let r, g, b;
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
  const rgb = Math.trunc(r * 256)
    .toString()
    .concat(
      ",",
      Math.trunc(g * 256).toString(),
      ",",
      Math.trunc(b * 256).toString()
    );
  commit("SET_RANDOM_COLOUR", rgb);
};

const addCustomEntity = ({ state, dispatch }) => {
  let birthDate, birthYear, deathDate, deathYear, factor;

  birthDate = new Date(state.customEntity.birthDate);
  factor = state.customEntity.birthEra === "BC" ? -1 : 1;
  if (
    state.customEntity.birthDate &&
    state.customEntity.birthDate.length <= 4
  ) {
    birthYear = factor * state.customEntity.birthDate;
  } else if (birthDate.valueOf()) {
    birthYear = factor * birthDate.getFullYear();
  } else {
    state.searchErrorMessage = "Invalid or missing birth date";
    return;
  }

  deathDate = new Date(state.customEntity.deathDate);
  factor = state.customEntity.deathEra === "BC" ? -1 : 1;
  if (
    state.customEntity.deathDate &&
    state.customEntity.deathDate.length <= 4
  ) {
    deathYear = factor * state.customEntity.deathDate;
  } else if (deathDate.valueOf()) {
    deathYear = factor * deathDate.getFullYear();
  } else {
    deathYear = state.currentYear;
  }

  dispatch("hsv_to_rgb");

  dispatch("addToTimeline", {
    name: state.customEntity.name,
    birthDate: birthYear,
    birthEra: state.customEntity.birthEra,
    deathDate: deathYear,
    deathEra: state.customEntity.deathEra,
    colour: state.random_colour
  });
  // TODO how do I do this
  // this.$refs.input.focus();
  state.customEntity = _.mapValues(state.customEntity, () => "");
  state.customEntity.birthEra = "BC";
  state.customEntity.deathEra = "BC";
};

export default {
  addToTimeline,
  lookupPerson,
  parseLifespan,
  showOptions,
  clearMatches,
  hsv_to_rgb,
  addCustomEntity
};
