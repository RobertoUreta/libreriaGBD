import React, { Component } from 'react'
import { Col, Form, Button, Modal, Row, Table } from 'react-bootstrap'
import request from '../config'
import { Option } from './Option';
import DatePicker from "react-datepicker";
let categorias = [];
export class ModalStock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            codigo: "",
            stock: "",
            precio: "",
            categoria: "",
            categorias: [],
            autor: "",
            fecha: "",
            autores: [],
            cat: [],
            aut: []
        }
    }
    handleChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            codigo: this.props.codigo
        });


    }
    _handleClose = () => {
        this.props.fnCerrar(false)
        this.setState({
            codigo: "",
            stock: "",
            precio: "",
            categoria: "",
            categorias: [],
            autor: "",
            fecha: "",
            autores: [],
            cat: [],
            aut: []
        })
    }

    componentDidMount() {
        let codigo = this.props.codigo;
        //console.log(codigo);
        request.get(`/lista_categorias_asociadas/${codigo}`)
            .then(res => {
                console.log(res);
                console.log(res.data.data);
                let edito = res.data.data;
                edito.forEach(element => {
                    this.setState({
                        categorias: [...this.state.categorias, element.id + "-" + element.nombre]
                    });
                });
                //this.setState({ editoriales: res.data.data, mensaje:res.data.mensaje})
            })
            .catch(err => {
                console.log(err);
            });
        request.get(`/lista_categorias/${codigo}`)
            .then(res => {
                console.log(res);
                console.log(res.data.data);
                let edito = res.data.data;
                edito.forEach(element => {
                    this.setState({
                        cat: [...this.state.cat, element.id + "-" + element.nombre]
                    });
                    categorias.push(element.id + "-" + element.nombre);
                });
                //this.setState({ editoriales: res.data.data, mensaje:res.data.mensaje})
            })
            .catch(err => {
                console.log(err);
            });
        request.get(`/lista_autores_asociados/${codigo}`)
            .then(res => {
                console.log(res);
                let edito = res.data.data;
                edito.forEach(element => {
                    let fecha = new Date(element.fecha_escritura);
                    console.log(fecha);
                    let nueva = fecha.toJSON().slice(0, 19).replace('T', ' ')
                    let array = nueva.split(' ');
                    this.setState({
                        autores: [...this.state.autores, { autor: element.id + "-" + element.nombre + ' ' + element.ap_paterno + ' ' + element.ap_materno, fecha: array[0] }]
                    });
                    //autores.push();
                });
                //this.setState({ editoriales: res.data.data, mensaje:res.data.mensaje})

            })
            .catch(err => {
                console.log(err);
            });
        request.get(`/lista_autores/${codigo}`)
            .then(res => {
                console.log(res);
                let edito = res.data.data;
                edito.forEach(element => {
                    this.setState({
                        aut: [...this.state.aut, element.id + "-" + element.nombre + ' ' + element.ap_paterno + ' ' + element.ap_materno]
                    });
                    //autores.push();
                });
                //this.setState({ editoriales: res.data.data, mensaje:res.data.mensaje})
                console.log("autores", this.state.autores)
            })
            .catch(err => {
                console.log(err);
            });

    }

    _handleEliminar = () => {
        this.props.fnEliminar()
        this.props.fnCerrar(false)
        this.setState({
            codigo: "",
            stock: "",
            categoria: "",
            categorias: [],
            autor: "",
            fecha: "",
            autores: [],
            cat: [],
            aut: []
        })
    }
    _handleModalSubmit = (evt) => {
        //console.log(this.state)
        const aux = JSON.stringify(this.state, null, '  ');
        //console.log(data)
        this.props.onSubmit(aux)
        this._handleClose()
    }
    _handleAddCategoria = () => {
        if (this.state.categoria !== "") {

            this.setState({
                categorias: [...this.state.categorias, this.state.categoria]
            });
        }
    }
    handleChangeDate = date => {
        console.log(date.getFullYear());
        console.log(date);
        this.setState({ fecha: date })
        console.log(this.state.fecha);
    }
    _handleAddAutor = () => {
        if (this.state.autor !== "" && this.state.fecha !== "") {
            console.log(this.state.fecha);
            this.setState({
                autores: [...this.state.autores, { autor: this.state.autor, fecha: this.state.fecha }]
            });
        }
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>

                        <Col>
                            <Form.Group controlId="stock">
                                <Form.Control
                                    value={this.state.stock}
                                    onChange={this.handleChange}
                                    placeholder="Aumentar Stock"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>

                        <Col>
                            <Form.Group controlId="precio">
                                <Form.Control
                                    value={this.state.precio}
                                    onChange={this.handleChange}
                                    placeholder="Cambiar Precio"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="categoria">
                                <Form.Control
                                    as="select"
                                    value={this.state.categoria}
                                    onChange={this.handleChange}
                                >
                                    <option hidden>Categoria</option>
                                    <Option options={this.state.cat}></Option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button className="btn-custom" variant="primary" onClick={this._handleAddCategoria}>
                                Agregar Categoria
                    </Button>
                        </Col>

                    </Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categorias.map((v, i) => {
                                let stringedit = v;
                                let array = stringedit.split("-");
                                return (
                                    <tr key={array[0]}>
                                        <td>{array[0]}</td>
                                        <td>{array[1]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            <Form.Group controlId="autor">
                                <Form.Control
                                    as="select"
                                    value={this.state.autor}
                                    onChange={this.handleChange}
                                >
                                    <option hidden>Autor</option>
                                    <Option options={this.state.aut}></Option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="fecha">
                                <DatePicker
                                    name="fecha"
                                    dateFormat="dd-MM-yyyy"
                                    customInput={<Form.Control />}
                                    selected={this.state.fecha}
                                    onChange={this.handleChangeDate}
                                    placeholderText="Fecha Escritura"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button className="btn-custom" variant="primary" onClick={this._handleAddAutor}>
                                Agregar Autor
                    </Button>
                        </Col>

                    </Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.autores.map((v, i) => {
                                let stringedit = v.autor;
                                let array = stringedit.split("-");
                                console.log(v.fecha);
                                let fecha1 = new Date(v.fecha);
                                v.fecha = fecha1.toJSON().slice(0, 19).replace('T', ' ')
                                let array2 = v.fecha.split(' ');
                                return (
                                    <tr key={array[0]}>
                                        <td>{array[0]}</td>
                                        <td>{array[1]}</td>
                                        <td>{array2[0]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-custom" variant="secondary" onClick={this._handleClose}>
                        Cerrar
                    </Button>
                    <Button className="btn-custom" variant="danger" onClick={this._handleEliminar}>
                        Eliminar
                    </Button>
                    <Button className="btn-custom" variant="primary" onClick={this._handleModalSubmit}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}
