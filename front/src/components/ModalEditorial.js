import React, { Component } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'
import request from '../config'
import { Option } from './Option';
let editoriales = [];
export class ModalEditorial extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            telefono: "",
            direccion: "",
            ciudad: "",
        }
    }

    componentDidMount(){
        request.get('/lista_editoriales')
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            let edito = res.data.data;
            edito.forEach(element => {
                editoriales.push(element.codigo+"-"+element.nombre);
            });
            //this.setState({ editoriales: res.data.data, mensaje:res.data.mensaje})
            console.log("editoriales", this.state.editoriales)
        })

        .catch(err => {
            console.log(err);
        });
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });


    }


    _handleClose = () => {
        this.props.fnCerrar(false)
        this.setState({
            nombre: "",
            telefono: "",
            direccion: "",
            ciudad: "",
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
                    <Modal.Title>Agregar Editorial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <Col>
                            <Form.Group controlId="nombre">
                                <Form.Control
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Nombre"
                                />
                            </Form.Group>
                            <Form.Group controlId="telefono">
                                <Form.Control
                                    value={this.state.telefono}
                                    onChange={this.handleChange}
                                    placeholder="Telefono"
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

