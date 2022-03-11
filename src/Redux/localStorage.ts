import { RootState } from './store';

const KEY = 'redux';

/**
 * This function is used to load redux state from local storage.
 *
 */
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

/**
 * This function is used to save the redux state in local storage.
 *
 */
export async function saveState(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // report to your bug reporting service.
  }
}
