import React, { Component } from 'react'
import { Col, Button, Row } from 'react-bootstrap'
import { Layout } from '../components/Layout'
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
                        <Row>
                            <Col>
                                <Button className="btn-custom" > Agregar Usuario</Button>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </div>
                    <div>
                       <span>works!</span>
                    </div>
                </div>
        )
    }
}