import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import './App.css';
import Header from './components/_partials/header';
import Err404 from './components/ERR404';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { sessionService } from './services/session.service';
import SessionErrors from './components/session.errors';
import welcome from './components/welcome';
import AccountActivation from './components/auth/account.activate';
import Home from './components/home';
import AccountRecovery from './components/auth/account.recovery';
import AccountReset from './components/auth/account.reset';

const isLogged = sessionService.isLogged();

class App extends React.Component {

  componentDidCatch(error, errorInf) {
    console.log("And error", error);

  }

  render() {
    return (
      <React.Fragment>

        <BrowserRouter>
          <>
            <Header />
            <Switch>
              <Route path="/" component={welcome} exact />
              <AuthRoute path="/login" component={Login} exact />
              <AuthRoute path="/register" component={Register} exact />
              <AuthRoute path="/activate/:token?" component={AccountActivation} exact />
              <AuthRoute path="/recovery" component={AccountRecovery} exact />
              <AuthRoute path="/reset/:token?" component={AccountReset} exact />
              <PrivateRoute path="/home" component={Home} exact />
              <Route component={Err404} />
            </Switch>

            <SessionErrors />
          </>
        </BrowserRouter>
      </React.Fragment>
    );
  }

}

//Routes used when user is logged in
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLogged
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
// Routes used for authentification
const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !isLogged
      ? <Component {...props} />
      : <Redirect to='/home' />
  )} />
)

export default App;
