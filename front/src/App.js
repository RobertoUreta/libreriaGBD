
import React, { Component } from 'react';
import './App.css';
import Loadable from 'react-loadable';
import { Spinner } from 'reactstrap';
import {Layout} from './components/Layout'

import {BrowserRouter, Switch, Route } from 'react-router-dom'
import  Libro  from './pages/Libro';
import { Editorial } from './pages/Editorial';
import { Autor } from './pages/Autor';
import { Usuario } from './pages/Usuario';
import { Categoria } from './pages/Categoria';
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
         <div className="App">
        <BrowserRouter>
        <Switch>
          <Route exact path='/home' component={Layout} />
          <Route exact path='/' name="Login Page" component={Login} />
          {/*<RefreshRoute path="/" name="Home" component={Login}/>*/}
          <Route path='/libros' component={Libro} />
          <Route path='/editoriales' component={Editorial} />
          <Route path='/autores' component={Autor} />
          <Route path='/usuarios' component={Usuario} />
          <Route path='/categorias' component={Categoria} />
        </Switch>
        </BrowserRouter>
    </div>
    );
  }
  
   
}

export default App;
