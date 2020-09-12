import { createSlice } from '@reduxjs/toolkit';

const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    storiesById: {},
    storiesByAuthor: {
      author: {
        id: 1,
        name: 'Telegraph PF',
      },
      stories: [],
    },
    currentAuthor: {
      id: 1,
      name: 'Telegraph PF',
    },
  },
  reducers: {
    newStory: addStory,
    storeStory: storeCompleteStory,
    storeStoriesByAuthor: storiesByAuthor,
    removeStoryFromStore: removeCompleteStory,
  },
});

export const {
  newStory,
  storeStory,
  storeStoriesByAuthor,
  removeStoryFromStore,
} = storiesSlice.actions;

export default storiesSlice.reducer;

export function selectStory(id) {
  return (state) => state.storiesById[id];
}

export function selectCurrentAuthor(state) {
  return state.currentAuthor;
}

export function storiesByAuthor(state, action) {
  state.storiesByAuthor = action.payload;
}

export function selectStoriesByAuthor(state) {
  return state.storiesByAuthor;
}

export function getStoriesByAuthor(authorId) {
  return (dispatch) =>
    fetch(`/api/author/${authorId}/stories`)
      .then((res) => res.json())
      .then((data) => dispatch(storeStoriesByAuthor(data)));
}

function addStory(state, action) {
  const story = action.payload;

  state.storiesByAuthor.stories.push({ id: story.id, title: story.title });
}

export function createStory(authorId) {
  return (dispatch) =>
    fetch(`/api/author/${authorId}/story`, {
      method: 'POST',
    })
      .then((res) => fetch(res.headers.get('location')))
      .then((res) => res.json())
      .then((story) => dispatch(newStory(story)));
}

function storeCompleteStory(state, action) {
  const story = action.payload;

  state.storiesById[story.id] = story;
}

function removeCompleteStory(state, action) {
  const storyId = action.payload.storyId;

  delete state.storiesById[storyId];
}

export function fetchStory(storyId) {
  return (dispatch) =>
    fetch(`/api/story/${storyId}`)
      .then((res) => res.json())
      .then((story) => dispatch(storeStory(story)));
}

export function saveSceneContent({ storyId, sceneId, content }) {
  return (dispatch) =>
    fetch(`/api/story/${storyId}/scene/${sceneId}/content`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((story) => dispatch(storeStory(story)));
}

export function saveSceneTitle({ storyId, sceneId, title }) {
  return (dispatch) =>
    fetch(`/api/story/${storyId}/scene/${sceneId}/title`, {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((story) => dispatch(storeStory(story)));
}

export function createNewSceneInStory({ storyId }) {
  return (dispatch) =>
    fetch(`/api/story/${storyId}/scene`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((story) => dispatch(storeStory(story)));
}

export function removeStory({ storyId }) {
  return (dispatch) =>
    fetch(`/api/story/${storyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => dispatch(removeStoryFromStore({ storyId })));
}

export function removeImage({ storyId, sceneId, imageId }) {
  return (dispatch) =>
    fetch(`/api/scene/${sceneId}/image/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => dispatch(fetchStory(storyId)));
}
