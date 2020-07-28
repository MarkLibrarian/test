import uid from 'uid';
import { createSlice } from '@reduxjs/toolkit';
import { defaultState } from './defaultState';

const storiesSlice = createSlice({
  name: 'stories',
  initialState: defaultState(),
  reducers: {
    newStory: addStory,
    newPassage: {
      reducer: addPassage,
      prepare: passage => ({
        payload: {
          id: uid(),
          ...passage
        }
      })
    }
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
  const { id, sceneId, title, content } = action.payload;

  state.stories.passagesById[id] = {
    id,
    sceneId,
    title,
    content,
    links: []
  };

  const scene = selectScene(sceneId)(state);
  scene.passages.push(id);
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
