import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';

import { Link }from 'react-router-dom';

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';


const SaleBadge = withStyles( ()=> ({
    badge: {
		backgroundColor: 'var(--orange)',
		color: 'var(--white)',
		borderRadius: '5px',
		padding: '10px',
	},

})) (Badge);

const ProductCard = ( {product} ) => {
    console.log( product.name);

    return (
         <Col lg={4} md={6} sm={6} xs={12}>

        <div className="productCard">
            <Link to={`/product/${product.id}`}>
            <div>
                <SaleBadge badgeContent="Sale">
                <img src={product.image_url} alt={product.name}>
                </img>
                </SaleBadge>
            </div>

            <div>
                <div>

                </div>
            </div>
            </Link>
        </div>
        </Col>
    )

}

ProductCard.prototypes = {
    product: PropTypes.object.isRequired
}

export default ProductCard;