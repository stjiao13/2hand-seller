import React from 'react';
import { connect } from 'react-redux';
import ShareBox from '../../components/ShareBox';

import { 
  addItem,
  updateItem,
  showSpinner,
  setItem,
} from '../../actions';

export default connect(
  (state) => ({
    items: state.getIn(['item', 'items']),
    itemId: state.getIn(['item', 'item', 'id']),
    name: state.getIn(['item', 'item', 'name']),
    description: state.getIn(['item', 'item', 'description']),
    imagePath: state.getIn(['item', 'item', 'imagePath']),
    isEdit: state.getIn(['ui', 'isEdit']),
  }),
  (dispatch) => ({
    onChangeNameInput: (event) => (
      dispatch(setItem({ keyPath: ['item', 'name'], value: event.target.value }))
    ),
    onChangeDescriptionInput: (event) => (
      dispatch(setItem({ keyPath: ['item', 'description'], value: event.target.value }))
    ),
    onChangeImageUrl: (event) => (
      dispatch(setItem({ keyPath: ['item', 'imagePath'], value: event.target.value }))
    ),    
    onItemSubmit: (items, itemId, name, description, imagePath, isEdit) => () => {
      if (isEdit === true) {
        dispatch(updateItem(dispatch, itemId, name, description, imagePath));
        dispatch(showSpinner());
      } else {
        dispatch(addItem(dispatch, name, description, imagePath));
        dispatch(showSpinner());
      }
    },    
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { items, itemId, name, description, imagePath, isEdit } = stateProps;
    const { onItemSubmit } = dispatchProps;
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
      onItemSubmit: onItemSubmit(items, itemId, name, description, imagePath, isEdit),
    });
  }  
)(ShareBox);