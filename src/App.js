import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import SwimLineContainer from './containers/SwimLineContainers/SwimlineContainer';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={SwimLineContainer}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        )
    }

}
export default App;
