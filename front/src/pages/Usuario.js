import React, { Component } from 'react'
import { Layout } from '../components/Layout'
import { TablaUsuario } from '../components/TablaUsuario';
export class Usuario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarios: [],
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
                       <TablaUsuario/>
                    </div>
                </div>
        )
    }
}