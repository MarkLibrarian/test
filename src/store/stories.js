import { createSlice } from '@reduxjs/toolkit';
import { defaultState } from './defaultState';

const storiesSlice = createSlice({
  name: 'stories',
  initialState: defaultState(),
  reducers: {
    newStory(state, action) {
      const { id, title } = action.payload;
      state.stories.push(id);
      state.storiesById[id] = {
        id,
        title
      };
    }
  }
});

export const { newStory } = storiesSlice.actions;

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
