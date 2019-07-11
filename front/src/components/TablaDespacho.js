import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Col, Button, Row } from 'react-bootstrap'
import request from '../config'

export class TablaDespacho extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            despachos: [],
        }
    }


    componentDidMount(){
        const self = this;
        request.get(`/despacho_cliente/${this.props.correo}`)
            .then(res => {
                console.log(res)
                this.setState({ despachos: res.data.res })
            })
    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                
                
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Codigo Despacho</th>
                            <th>Libro</th>
                            <th>Compra</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.despachos.map((v, i) => {
                            return (
                                <tr key={v.codigo} >
                                    <td>{v.codigo}</td>
                                    <td>{v.titulo_libro}</td>
                                    <td>{v.codigo_compra}</td>
                                    <td>{v.estado_despacho}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                
            </div>
        )
    }
}