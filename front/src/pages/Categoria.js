import React, { Component } from 'react'
import { Layout } from '../components/Layout'
import { TablaCategoria } from '../components/TablaCategoria';
export class Categoria extends Component {

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
                       <TablaCategoria/>
                    </div>
                </div>
        )
    }
}