import React from "react";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    Redirect
  } from 'react-router-dom';
import CreateActivity from '../components/CreateActivity';
import CreateCategory from '../components/CreateCategory';
import Header from '../components/common/Header';
import LoginPage from '../LoginPage';
import Register from "../Register";
  // …
  class AppRouter extends React.Component {
    constructor() {
      super();
      this.setLoginData.bind(this);
      this.loginData = {};
    }

    setLoginData(loginData) {
      console.log("Login data", loginData);
      this.loginData = loginData;
    }


    render() {
      return (
        <Router>  
          <div>
              <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/home" component={Header}/>
                <Route exact path="/addactivity/" component={CreateActivity} />
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/addcategory" component={CreateCategory}></Route>
                <Route>
                  <Redirect
                      to={{
                          pathname: "/home"
                      }}
                  />
                </Route>
              </Switch>
            </div>
        </Router>
      );
    }
  }  
export default AppRouter;