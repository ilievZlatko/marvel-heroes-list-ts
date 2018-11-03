import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Favourites from '../containers/Favourites';

class Routes extends React.Component<any, any> {
    public render () {
        return (
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/favourites" component={Favourites} {...this.props} />
            </Switch> 
        );
    }
}

export default Routes;