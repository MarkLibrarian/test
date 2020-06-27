import { configureStore } from '@reduxjs/toolkit';

import stories from './stories';
import { defaultState } from './defaultState';
import { loadState, saveState } from './localStorage';

const store = configureStore({
  reducer: stories,
  preloadedState: {
    stories: loadState('vsp', defaultState)
  }
});

store.subscribe(() => {
  saveState('vsp', store.getState().stories);
});

export default store;
