import React, { Component } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'
import request from '../config'
import { Option } from './Option';
import DatePicker from "react-datepicker";
let editoriales = [];
export class ModalLibro extends Component {

    constructor(props) {
        super(props)

        this.state = {
            titulo: "",
            edicion: "",
            paginas: "",
            precio: "",
            fecha: "",
            idioma: "",
            ref_editorial: "",
            categoria: ""
        }
    }

    componentDidMount() {
        request.get('/lista_editoriales')
            .then(res => {
                console.log(res);
                console.log(res.data.data);
                let edito = res.data.data;
                edito.forEach(element => {
                    editoriales.push(element.codigo + "-" + element.nombre);
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

    handleChangeDate = date =>{
        //console.log(date.getFullYear());
        console.log(date);
        this.setState({fecha:date})
    }
    _handleClose = () => {
        this.props.fnCerrar(false)
        this.setState({
            titulo: "",
            edicion: "",
            paginas: "",
            precio: "",
            fecha: "",
            idioma: "",
            ref_editorial: ""
        })
    }

    _handleModalSubmit = (evt) => {
        console.log(this.state)

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
                            <Form.Group controlId="titulo">
                                <Form.Control
                                    value={this.state.titulo}
                                    onChange={this.handleChange}
                                    placeholder="Titulo"
                                />
                            </Form.Group>
                            <Form.Group controlId="edicion">
                                <Form.Control
                                    value={this.state.edicion}
                                    onChange={this.handleChange}
                                    placeholder="N° Edicion"
                                />
                            </Form.Group>
                            <Form.Group controlId="paginas">
                                <Form.Control
                                    value={this.state.paginas}
                                    onChange={this.handleChange}
                                    placeholder="N° Paginas"
                                />
                            </Form.Group>
                            <Form.Group controlId="precio">
                                <Form.Control
                                    value={this.state.precio}
                                    onChange={this.handleChange}
                                    placeholder="precio"
                                />
                            </Form.Group>
                            <Form.Group controlId="fecha">
                                <DatePicker
                                    name="fecha"
                                    dateFormat="dd-MM-yyyy"
                                    customInput={<Form.Control />}
                                    selected={this.state.fecha}
                                    onChange={this.handleChangeDate}
                                    placeholderText="Fecha Publicacion"
                                />
                            </Form.Group>
                            <Form.Group controlId="idioma">
                                <Form.Control
                                    value={this.state.idioma}
                                    onChange={this.handleChange}
                                    placeholder="Idioma"
                                />
                            </Form.Group>
                            <Form.Group controlId="ref_editorial">
                                <Form.Control
                                    as="select"
                                    value={this.state.ref_editorial}
                                    onChange={this.handleChange}
                                >
                                    <option hidden>Editorial</option>
                                    <Option options={editoriales}></Option>
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

