import { configureStore } from '@reduxjs/toolkit';

import stories from './stories';

const store = configureStore({
  reducer: stories,
});

export default store;
