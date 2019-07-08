import React, { Component } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'
export class ModalStock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            codigo: "",
            stock:""
        }
    }
    handleChange = event => {
        
        this.setState({
            [event.target.id]: event.target.value,
            codigo:this.props.codigo
        });


    }
    _handleClose = () => {
        this.props.fnCerrar(false)
        this.setState({
            stock:""
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
                    <Modal.Title>Agregar Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <Col>
                            <Form.Group controlId="stock">
                                <Form.Control
                                    value={this.state.stock}
                                    onChange={this.handleChange}
                                    placeholder="Stock"
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
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}
