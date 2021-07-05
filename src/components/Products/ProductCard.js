import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Col from 'react-bootstrap/Col';

import { Link }from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import { addItemToCart } from '../../redux/actions/cartActions';

const SaleBadge = withStyles( ()=> ({
    badge: {
		backgroundColor: 'var(--orange)',
		color: 'var(--white)',
		borderRadius: '5px',
		padding: '10px',
	},

})) (Badge);

const ProductCard = ( {product, addItemToCart} ) => {
    console.log( product.name);

    return (
         <Col lg={4} md={6} sm={6} xs={12}>

        <div className="productCard">
            <Link to={`/product/${product.id}`}>
            <div>
                <SaleBadge badgeContent="Sale">
                <img className="productCardImage" src={product.image_url} alt={product.name}>
                </img>
                </SaleBadge>
            </div>
            </Link>
            <div className="productCardContent">
                <div className="productCardDetails">
                    <Button onClick={addItemToCart}>
                        ${(product.price/100).toFixed(2)} - Add to Cart
                    </Button>
                </div>
            </div>

        </div>
        </Col>
    )

}

ProductCard.prototypes = {
    product: PropTypes.object.isRequired,
    addItemToCart: PropTypes.func.isRequired,
}

const mapDispatchToProps = ( dispatch, ownProps) => {
    const {product} = ownProps;

    return {
        addItemToCart: () =>
            dispatch( addItemToCart(product.id, 1, 'increment_count') ),
    }

}

export default connect(  null, mapDispatchToProps)(ProductCard);