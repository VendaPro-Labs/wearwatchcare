import React from 'react';
import { Switch, Route}  from 'react-router-dom';
import Products from './components/Products';

const AppRoutes = () => {
    return (
        <div>
        <Switch>
            <Route exact path="/" component={Products} />
        </Switch>
        </div>
    )
}

export default AppRoutes;