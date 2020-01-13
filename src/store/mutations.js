const SET_MENU_VISIBILITY = (state, is_visible) => {
  state.menu_visible = is_visible;
};

const ADD_ENTITY = (state, entity) => {
  state.timelineEntities.push(entity);
};

const SET_ENTITY_NAME = (state, name) => {
  state.entityName = name;
};

const SET_SCALE_MIN = (state, value) => {
  state.scale.min = value;
};

const SET_SCALE_MAX = (state, value) => {
  state.scale.max = value;
};

const SET_SCALE_PARTITION_LENGTH = (state, value) => {
  state.scale.partition_length = value;
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

const SET_CUSTOM_NAME = (state, name) => {
  state.customEntity.name = name;
};

const SET_CUSTOM_BIRTH_DATE = (state, date) => {
  state.customEntity.birthDate = date;
};

const SET_CUSTOM_BIRTH_ERA = (state, era) => {
  state.customEntity.birthEra = era;
};

const SET_CUSTOM_DEATH_DATE = (state, date) => {
  state.customEntity.deathDate = date;
};

const SET_CUSTOM_DEATH_ERA = (state, era) => {
  state.customEntity.deathEra = era;
};

const SET_RANDOM_COLOUR = (state, rgb) => {
  state.random_colour = rgb;
};

export default {
  SET_MENU_VISIBILITY,
  ADD_ENTITY,
  SET_ENTITY_NAME,
  SET_SCALE_MIN,
  SET_SCALE_MAX,
  SET_SCALE_PARTITION_LENGTH,
  CLEAR_NAME,
  SET_MATCHES,
  CLEAR_MATCHES,
  SET_CUSTOM_NAME,
  SET_CUSTOM_BIRTH_DATE,
  SET_CUSTOM_BIRTH_ERA,
  SET_CUSTOM_DEATH_DATE,
  SET_CUSTOM_DEATH_ERA,
  SET_RANDOM_COLOUR
};
