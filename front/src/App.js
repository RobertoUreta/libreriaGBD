import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from './components/Layout'

import {BrowserRouter, Switch, Route } from 'react-router-dom'
import { Libro } from './pages/Libro';
import { Editorial } from './pages/Editorial';
import { Autor } from './pages/Autor';
import { Usuario } from './pages/Usuario';

function App() {
  return (
    <div className="App">

        
        <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Layout} />
          <Route path='/libros' component={Libro} />
          <Route path='/editoriales' component={Editorial} />
          <Route path='/autores' component={Autor} />
          <Route path='/usuarios' component={Usuario} />
        </Switch>
        </BrowserRouter>
        <Layout></Layout>
    </div>
  );
}

export default App;
