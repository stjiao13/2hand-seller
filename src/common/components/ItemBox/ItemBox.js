import React from 'react';
import { Grid, Row, Col, Image, Thumbnail, Button } from 'react-bootstrap';

const ItemBox = (props) => {
  return(
      <Col xs={6} md={4}>
        <Thumbnail src={props.item.get('imagePath')} alt="242x200">
          <h3>{props.item.get('name')}</h3>
          <p>{props.item.get('description')}</p>
          {
            props.isAuthorized === true ? (
            <p>
              <Button bsStyle="primary" onClick={props.onDeleteItem(props.item.get('_id'))}>刪除</Button>&nbsp;
              <Button bsStyle="default" onClick={props.onUpadateItem(props.item.get('_id'))}>修改</Button>
            </p>)
            : null            
          }
        </Thumbnail>
      </Col>
    );
}

export default ItemBox;