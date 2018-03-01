import { handleActions } from 'redux-actions';
import { RecipeState } from '../../constants/models';

import {
  GET_RECIPES,
  SET_RECIPE,
} from '../../constants/actionTypes';

const itemReducers = handleActions({
  GET_RECIPES: (state, { payload }) => (
    state.set(
      'items',
      payload.items
    )
  ),
  SET_RECIPE: (state, { payload }) => (
    state.setIn(payload.keyPath, payload.value)
  ),  
}, RecipeState);

export default itemReducers;