import React, { Component } from 'react'
import {TablaLibro} from '../components/TablaLibro'
//import request from '../config'
import * as actions from '../store/actions/index'
import { connect } from 'react-redux';
import {Layout } from '../components/Layout'
class Libro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            libros: [],
            mensaje: '',
            esAdmin: false,
        }
    }

    render() {
        return (
            
                <div id="body"> 
                
            <Layout></Layout>
                    <div style={{paddingTop: '100px' }}>
                    </div>
                    <div>
                       <TablaLibro userType= {this.props.tipo}/>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      tipo: state.auth.tipo,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onAuth: (user) => {
        dispatch(actions.auth(user))
      },
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Libro);