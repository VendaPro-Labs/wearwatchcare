import React from 'react';
import { Switch, Route}  from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import PagePaymentSubmited  from './components/Pages/PagePaymentSubmited';
const AppRoutes = () => {
    return (
        <div>
        <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/paymentsubmitted" component={PagePaymentSubmited} />
        </Switch>
        </div>
    )
}

export default AppRoutes;
