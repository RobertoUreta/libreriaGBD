import React, { Component } from 'react'
import { Col, Button, Row } from 'react-bootstrap'
import { Layout } from '../components/Layout'
import { TablaEditorial } from '../components/TablaEditorial';
export class Editorial extends Component {

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
                       <TablaEditorial/>
                    </div>
                </div>
        )
    }
}