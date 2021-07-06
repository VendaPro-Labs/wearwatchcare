import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import AppRoutes from './AppRoutes';
import Navigation from './components/Navigation';
import _isEmpty from 'lodash.isempty';

import {getProducts} from './redux/actions/storeActions'
import { getTotals } from './redux/actions/cartActions';

import { getSquareEnvrionment }  from './redux/actions/squareActions';

import { loadState } from './redux/localStorage';

import './App.css';

import Container from 'react-bootstrap/Container';

const App = ({dispatch, enableSideBar, cartItems }) => {


  const localState = loadState();
	useEffect(() => {

		if (_isEmpty(localState) || _isEmpty(localState.storeReducer.products)) {
			const fetchProducts = async () => {
				await dispatch(getProducts());

			};
      const fetchSquareEnv = async () => {
        await dispatch( getSquareEnvrionment() );
      }
			fetchProducts();
      fetchSquareEnv();
		}
	}, [dispatch, localState]);


  useEffect (
    () => {
			dispatch(getTotals());
    },
    [dispatch, cartItems]
  );

  return (
    <div className="App">
      <Container>
        <Navigation />
         <Row>
             <AppRoutes></AppRoutes>
         </Row>
         </Container>
     </div>
  );
}

const mapStateToProps = ( state ) => {
  return {
		products: state.storeReducer.products,
    cartItems: state.cartReducer.items,
  }
}

App.propTypes = {
	products: PropTypes.array,
  cartItems: PropTypes.array,
  dispatch: PropTypes.func,
  enableSideBar: PropTypes.bool,
}

export default connect(mapStateToProps)(App);
