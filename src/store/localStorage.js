export function loadState(key, defaultState = () => undefined) {
  try {
    const serialisedState = localStorage.getItem(key);
    if (serialisedState === null) {
      console.log('No serialised state found, returning default state');
      return defaultState();
    }
    return JSON.parse(serialisedState);
  } catch (err) {
    const state = defaultState();
    console.error('Loaded from default state', state, err);
    return state;
  }
}

export function saveState(key, state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(key, serialisedState);
  } catch (err) {
    console.error('Error when saving state to local storage', err);
  }
}
