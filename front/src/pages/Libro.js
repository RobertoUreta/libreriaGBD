import React, { Component } from 'react'
import { Col, Button, Row } from 'react-bootstrap'
import {TablaLibro} from '../components/TablaLibro'
import request from '../config'
import {Layout } from '../components/Layout'
export class Libro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            libros: [],
            esAdmin: false,
        }
    }


    componentDidMount(){
        const self = this;
        request.get('/lista_libros')
            .then(res => {
                console.log(res);
                console.log(res.data.data);
                self.setState({ libros: res.data.data})
                console.log("libros", this.state.libros)
            })

            .catch(err => {
            });

    }
    render() {
    
        return (
            
                <div id="body"> 
                
            <Layout></Layout>
                    <div style={{paddingTop: '100px' }}>
                        <Row>
                            <Col>
                                <Button className="btn-custom" > Agregar Libro</Button>
                            </Col>
                            <Col>

                            </Col>
                        </Row>
                    </div>
                    <div>
                       <span>works!</span>
                       
                       <TablaLibro libros={this.state.libros}/>
                    </div>
                </div>
        )
    }
}