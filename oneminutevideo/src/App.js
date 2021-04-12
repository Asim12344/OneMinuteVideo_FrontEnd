import React, { Component } from 'react';
import { BrowserRouter ,Route, Switch ,Redirect} from 'react-router-dom';
// import Dashboard from './containers/Dashboard/Dashboard';
import Home from './containers/Home/Home'
// import UserEditedFile from './containers/UserEditedFile/UserEditedFile'
import Layout from './hocs/Layout';
// import Login from './containers/Login/login'
// import PrivateRoute from './containers/PrivateRoute/PrivateRoute'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/home' component={Home} />
            
            <Redirect from="/" to="/home" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}


export default App;