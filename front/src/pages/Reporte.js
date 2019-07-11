import React, { Component } from 'react'
import { Layout } from '../components/Layout'
import { TablaReporte } from '../components/TablaReporte';
export class Reporte extends Component {

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
                       <TablaReporte/>
                    </div>
                </div>
        )
    }
}