import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


import Col from 'react-bootstrap/Col';

const ProductCard = ( {product} ) => {
    console.log( product.name);

    return (
         <Col lg={4} md={6} sm={6} xs={12}>

        <div>
            <div>
                <img src={product.image_url} alt={product.name}>
                </img>
            </div>

            <div>
                <div>

                </div>
            </div>
        </div>
        </Col>
    )

}

ProductCard.prototypes = {
    product: PropTypes.object.isRequired
}

export default ProductCard;