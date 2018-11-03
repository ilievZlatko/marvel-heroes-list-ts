import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Favourites from '../containers/Favourites';
import Details from '../containers/Details';

class Routes extends React.Component<any, any> {
    public render () {
        return (
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/favourites" component={Favourites} {...this.props} />
                <Route path="/details" component={Details} {...this.props} />
            </Switch> 
        );
    }
}

export default Routes;