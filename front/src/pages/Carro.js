import React, { Component } from 'react'
import {TablaLibro} from '../components/TablaLibro'
//import request from '../config'
import * as actions from '../store/actions/index'
import { connect } from 'react-redux';
import {Layout } from '../components/Layout';
import {TablaCarro} from '../components/TablaCarro';
class Carro extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div id="body"> 
                
            <Layout></Layout>
                    <div style={{paddingTop: '100px' }}>
                    </div>
                    <div>
                      <TablaCarro correo={this.props.correo}></TablaCarro>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      tipo: state.auth.tipo,
      correo: state.auth.correo,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onAuth: (user) => {
        dispatch(actions.auth(user))
      },
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Carro);