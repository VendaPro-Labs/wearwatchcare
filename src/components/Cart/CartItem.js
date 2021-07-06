import React, { Component } from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const CartItem = ({ id, item }) => {

  const productPrice = `$${(item.price / 100).toFixed(2)}`;
  const productTotalPrice = `$${(item.total / 100).toFixed(2)}`;

  return (
    <Row noGutters={true} className="cartItem">
      <Col xs={3} md={2}>
        <div>
         <Link to={`/details/${id}`}>
            <img className="cartItemImage" src={item.image_url} />
          </Link>
        </div>
      </Col>
      <Col>
        <Row noGutters className="cartItemDetailsRow1">
          <Col xs={12} md={3} className="cartItemName">
            {item.name}
          </Col>
          <Col xs={10} sm={9} md={8} className="cartItemDescription">
            <Row noGutters className="cartItemDetailsRow2">
              <Col
                xs={12}
                md={4}
                className="cartItemDetail cartItemPrice d-none d-md-flex"
              >
                <span className="cartItemPricePrefix">Price:</span>
                {productPrice}
              </Col>
              <Col xs={7} md={4} className="cartItemDetail cartItemQuantity">
              <span className="cartItemPricePrefix">Count:</span>
                {item.count}
              </Col>
              <Col xs={4} md={4} className="cartItemDetail  cartItemPrice">
                <span className="cartItemPricePrefix">Total:</span>
                {productTotalPrice}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default CartItem;
