import React, { Component } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'
import request from '../config'
export class ModalValoracion extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id:"",
            valoracion: "",
        }
    }

    componentDidMount(){
        this.setState({id: this.props.codigo});
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    _handleClose = () => {
        this.props.fnCerrar(false)
        this.setState({
            id:"",
            valoracion: "",
        })
    }

    _handleModalSubmit = (evt) => {
        //console.log(this.state)

        const aux = JSON.stringify(this.state, null, '  ');
        //console.log(data)
        this.props.onSubmit(aux)

        this._handleClose()
    }

    
    render() {
        return (
            <Modal show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Valoracion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <Col>
                            <Form.Group controlId="valoracion">
                                <Form.Control
                                    value={this.state.valoracion}
                                    onChange={this.handleChange}
                                    placeholder="Valoracion"
                                />
                            </Form.Group>
                        </Col>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-custom" variant="secondary" onClick={this._handleClose}>
                        Cerrar
                    </Button>
                    <Button className="btn-custom" variant="primary" onClick={this._handleModalSubmit}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}
