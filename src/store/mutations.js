const ADD_ENTITY = (state, entity) => {
  state.timelineEntities.push(entity);
};

const CLEAR_NAME = state => {
  state.entityName = "";
};

const SET_MATCHES = (state, possibleMatches) => {
  state.possibleMatches = possibleMatches;
};

const CLEAR_MATCHES = state => {
  state.possibleMatches = [];
};

const SET_RANDOM_COLOUR = (state, rgb) => {
  state.random_colour = rgb;
};

export default {
  ADD_ENTITY,
  CLEAR_NAME,
  SET_MATCHES,
  CLEAR_MATCHES,
  SET_RANDOM_COLOUR
};
