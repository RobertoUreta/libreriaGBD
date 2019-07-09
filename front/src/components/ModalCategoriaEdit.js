import React, { Component } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'
import request from '../config'
export class ModalCategoriaEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id:"",
            nombre: "",
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
            id:"",
            nombre: "",
        })
    }

    _handleModalSubmit = (evt) => {
        //console.log(this.state)

        const aux = JSON.stringify(this.state, null, '  ');
        //console.log(data)
        this.props.onSubmit(aux)

        this._handleClose()
    }

    componentDidMount(){
        const self = this;
        console.log(this.props.codigo);
        request.get(`/obtener_categoria/${this.props.codigo}`)
                    .then(res => {
                        console.log(res);
                        console.log(res.data.data[0]);
                        let data = res.data.data[0];
                        self.setState({
                                id: data.id,
                                nombre: data.nombre,
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Categoria</Modal.Title>
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
