import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SET_ITEM,
} from '../constants/actionTypes';

export const getItems = createAction('GET_ITEMS', WebAPI.getItems);
export const addItem = createAction('ADD_ITEM', WebAPI.addItem);
export const updateItem = createAction('UPDATE_ITEM', WebAPI.updateItem);
export const deleteItem = createAction('DELETE_ITEM', WebAPI.deleteItem);
export const setItem = createAction('SET_ITEM');