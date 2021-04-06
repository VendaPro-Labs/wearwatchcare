import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from './ProductCard';

class Products extends React.Component {

    state = { products: [] };
    constructor( props){
        super(props);
    }

    componentDidMount() {
        const fetchproduct =   getProducts();
        const products =  fetchproduct().then(
            products =>  this.setState( { products:  products } )
        );

    }




    render() {
        console.log ( '----' + this.state.products );

        if (this.state.products && this.state.products.length) {
            //your code here
            return (
                <div>
                    <Row>
                        {   this.state.products.map ( ( product) => (
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
        const productUrl =  `${process.env.REACT_APP_API_URL}/mock/products.json`;
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
export default Products;