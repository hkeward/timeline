const SET_MENU_VISIBILITY = (state, is_visible) => {
  state.menu_visible = is_visible;
};

const SET_ADVANCED_TAB = (state, new_tab) => {
  state.advanced_tab = new_tab;
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

const TOGGLE_ENTITY_INFO = (state, entity_index) => {
  state.timelineEntities[entity_index].advanced_info_expanded = !state.timelineEntities[entity_index].advanced_info_expanded;
};

const SET_ENTITY_COLOUR = (state, { index, colour }) => {
  state.timelineEntities[index].colour = colour;
};

const TOGGLE_SCALE_LOCK = state => {
  state.scale.locked = !state.scale.locked;
};

export default {
  SET_MENU_VISIBILITY,
  SET_ADVANCED_TAB,
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
  SET_RANDOM_COLOUR,
  TOGGLE_ENTITY_INFO,
  SET_ENTITY_COLOUR,
  TOGGLE_SCALE_LOCK
};
