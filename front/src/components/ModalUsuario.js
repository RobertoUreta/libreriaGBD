import React, { Component } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'
//import request from '../config'
import { Option } from './Option';
let tipos = ["0-Cliente","1-Administrador"];
export class ModalUsuario extends Component {

    constructor(props) {
        super(props)

        this.state = {
            correo: "",
            contrasenia: "",
            nombre: "",
            ap_paterno: "",
            ap_materno: "",
            direccion: "",
            ciudad: "",
            tipo: "",
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    _handleClose = () => {
        this.props.fnCerrar(false)
        this.setState({
            correo: "",
            contrasenia: "",
            nombre: "",
            ap_paterno: "",
            ap_materno: "",
            direccion: "",
            ciudad: "",
            tipo: "",
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
                    <Modal.Title>Agregar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <Col>
                            <Form.Group controlId="correo">
                                <Form.Control
                                    value={this.state.correo}
                                    onChange={this.handleChange}
                                    placeholder="Correo"
                                />
                            </Form.Group>
                            <Form.Group controlId="contrasenia">
                                <Form.Control
                                    value={this.state.contrasenia}
                                    onChange={this.handleChange}
                                    placeholder="Contraseña"
                                />
                            </Form.Group>
                            <Form.Group controlId="nombre">
                                <Form.Control
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Nombre"
                                />
                            </Form.Group>
                            <Form.Group controlId="ap_paterno">
                                <Form.Control
                                    value={this.state.ap_paterno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Paterno"
                                />
                            </Form.Group>
                            <Form.Group controlId="ap_materno">
                                <Form.Control
                                    value={this.state.ap_materno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Materno"
                                />
                            </Form.Group>
                            <Form.Group controlId="direccion">
                                <Form.Control
                                    value={this.state.direccion}
                                    onChange={this.handleChange}
                                    placeholder="Direccion"
                                />
                            </Form.Group>
                            <Form.Group controlId="ciudad">
                                <Form.Control
                                    value={this.state.ciudad}
                                    onChange={this.handleChange}
                                    placeholder="Ciudad"
                                />
                            </Form.Group>
                            <Form.Group controlId="tipo">
                                        <Form.Control
                                            as="select"
                                            value={this.state.tipo}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Tipo</option>
                                            <Option options={tipos}></Option>
                                        </Form.Control>
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