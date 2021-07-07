import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

import ProductCard from './ProductCard';

import './style.css';

class Products extends React.Component {

    constructor( props){
        super(props);
    }

    componentDidMount() {
        /*
        const fetchproduct =   getProducts();
        const products =  fetchproduct().then(
            products =>  this.setState( { products:  products } )
        );
        */

    }




    render() {
        console.log ( '----' + this.props.products );

        if (this.props.products && this.props.products.length) {
            //your code here
            return (
                <div className="page productPage">
                    <Row className="products">
                        {   this.props.products.map ( ( product) => (
                            <ProductCard key={product.id} product={product} ></ProductCard>

                        )

                        )
                        }
                    </Row>
                </div>
            );
        } else {
            return ( <Row>
                no products
            </Row>
            );
        }
    }



}


const getProducts = () => async () => {
    try {
        //const productUrl =  `${process.env.REACT_APP_API_URL}/mock/products.json`;
        const productUrl =  `/mock/products.json`;
    const res = await fetch (
          productUrl,
        {
            credentials: 'include',
        }
    );
        const products = await res.json();
        return products;
    } catch(error) {
        console.log( '[getProducts][error]', error);
    }
}


const mapStateToProps = ( state) => {
    return {
        products: state.storeReducer.products,
        //fetchingProducts: state.storeReducer.fetchingProducts,
    }
}

export default connect(mapStateToProps)(Products);


Products.propTypes = {
	//fetchingProducts: PropTypes.bool.isRequired,
    products: PropTypes.array,

}