import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Dashboard from './DashboardComponent';
import Login from './LoginComponent';

function Main(props)
{
    return(

        <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Redirect to="/login"></Redirect>
        </Switch>

    )
}

export default withRouter(Main);