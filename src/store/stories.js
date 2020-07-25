import uid from 'uid';
import { createSlice } from '@reduxjs/toolkit';
import { defaultState } from './defaultState';

const storiesSlice = createSlice({
  name: 'stories',
  initialState: defaultState(),
  reducers: {
    newStory: addStory,
    newPassage: addPassage
  }
});

function addStory({ stories }, action) {
  const { id, title } = action.payload;
  stories.stories.push(id);
  stories.storiesById[id] = {
    id,
    title
  };
}

function addPassage(state, action) {
  const { sceneId, title, content } = action.payload;

  const passageId = uid();
  state.stories.passagesById[passageId] = {
    id: passageId,
    sceneId,
    title,
    content,
    links: []
  };

  const scene = selectScene(sceneId)(state);
  scene.passages.push(passageId);
}

export const { newStory, newPassage } = storiesSlice.actions;

export default storiesSlice.reducer;

export function selectStories({ stories }) {
  return Object.values(stories.storiesById);
}

export function selectStory(id) {
  return ({ stories }) => stories.storiesById[id];
}

export function selectScene(id) {
  return ({ stories }) => stories.scenesById[id];
}

export function selectImage(id) {
  return ({ stories }) => stories.imagesById[id];
}

export function selectScenes(storyId) {
  return ({ stories }) =>
    Object.values(stories.scenesById).filter(
      scene => scene.storyId === storyId
    );
}

export function selectPassages(sceneId) {
  return ({ stories }) =>
    Object.values(stories.passagesById).filter(
      passage => passage.sceneId === sceneId
    );
}
