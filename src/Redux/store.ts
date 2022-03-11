import { createStore } from 'redux';
import { Restaurant, Tip } from '../Types/ApiData';
import { loadState, saveState } from './localStorage';

/* -------------------------------------------------------------------------- */
/*                              Types                                         */
/* -------------------------------------------------------------------------- */

export type RootState = {
  restaurants: Restaurant[];
};

export type Action =
  | {
      type: 'ADD_RESTAURANTS';
      payload: Restaurant[];
    }
  | {
      type: 'ADD_TIP';
      payload: {
        id: string;
        tips: Tip[];
      };
    };

/* -------------------------------------------------------------------------- */
/*                              Reducer and Store Creation                    */
/* -------------------------------------------------------------------------- */

const initialState = {
  restaurants: [] as Restaurant[]
};

export const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_RESTAURANTS': {
      const newState = { ...state, restaurants: [...action.payload] };
      return newState;
    }
    case 'ADD_TIP': {
      const newState = { ...state };
      const itemTobeUpdated = newState.restaurants.find((r) => r.fsq_id === action.payload.id);
      if (itemTobeUpdated) {
        itemTobeUpdated.tips = action.payload.tips;
      }
      return newState;
    }
    default:
      return state;
  }
};

const store = createStore(appReducer, loadState());

/**
 * Subscribe to store. Whenever there is change in store save the updated state in local storage.
 *
 */

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
