
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Spinner } from 'reactstrap';
import RefreshRoute from './RefreshRoute';

const loading = () => <div className="animated fadeIn pt-3 text-center"><Spinner color="success" /></div>;
const Login = Loadable({
  loader: () => import('./Login'),
  loading
});
class App extends Component {

  componentDidMount() {
    document.title = "Libreria GBD";
    
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          {/*<RefreshRoute path="/" name="Home" component={Login}/>*/}
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
