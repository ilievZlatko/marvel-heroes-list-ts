import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home'

class Routes extends React.Component<any, any> {
    public render () {
        return (
            <Switch>
                <Route path="/" exact={true} component={Home} />
            </Switch> 
        );
    }
}

export default Routes;