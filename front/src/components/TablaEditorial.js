import React, { Component } from 'react'
import { Table} from 'react-bootstrap'

import { Col, Button, Row } from 'react-bootstrap'
//import { } from '../backend/usuario/usuario'
import { ModalEditorial } from './ModalEditorial'

import request from '../config'
import { ModalEditorialEdit } from './ModalEditorialEdit';
export class TablaEditorial extends Component {
    constructor(props) {
        super(props)

        this._handleShow = this._handleShow.bind(this);
        this.state = ({
            editoriales: [],
            show: false,
            id: 0,
            showModalEdit:false,
            codigoEditorial: "",
            mensaje:"",
        })
    }

    _handleShow() {
        this.setState({ show: true });
        //this.setState({ show: true })
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    _handleShowEdit(codigo) {
        this.setState({ showModalEdit: true,codigoEditorial:codigo });
        //this.setState({ show: true })
    }

    _handleCloseEdit = (modalEvt) => {
        this.setState({ showModalEdit: modalEvt ,codigoEditorial:""});
    }
    _handleEliminar = () => {
        let codigo = this.state.codigoEditorial;
        request.delete(`/eliminar_editorial/${codigo}`)
        .then(res => {
            request.get('/lista_editoriales')
                .then(res => {
                    this.setState({ editoriales: res.data.data, mensaje: res.data.mensaje })
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        const self = this;
        request.get('/lista_editoriales')
                    .then(res => {
                        self.setState({ editoriales: res.data.data, mensaje: res.data.mensaje })
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    _handleModalSubmit = (modalInfo) => {
        const self = this;
        let info = JSON.parse(modalInfo)
        request.post('/agregar_editorial', { info })
            .then(res => {
                request.get('/lista_editoriales')
                    .then(res => {
                        self.setState({ editoriales: res.data.data, mensaje: res.data.mensaje })
                    })

                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
        console.log(modalInfo)
    }
    _handleModalSubmitEdit = (modalInfo) => {
        const self = this;
        let info = JSON.parse(modalInfo);
        request.put('/actualizar_editorial', { info })
            .then(res => {
                request.get('/lista_editoriales')
                    .then(res => {
                        self.setState({ editoriales: res.data.data, mensaje: res.data.mensaje })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
        console.log(modalInfo)
    }
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Button className="btn-custom" onClick={this._handleShow}>Agregar Editorial</Button>
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                
                <span>{this.state.mensaje}</span>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Direccion</th>
                            <th>Ciudad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.editoriales.map((v, i) => {
                            return (
                                <tr key={v.codigo} onClick={() => this._handleShowEdit(v.codigo)}>
                                    <td>{v.codigo}</td>
                                    <td>{v.nombre}</td>
                                    <td>{v.telefono}</td>
                                    <td>{v.direccion}</td>
                                    <td>{v.ciudad}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ModalEditorial
                    show={this.state.show}
                    fnCerrar={this._handleClose}
                    onSubmit={this._handleModalSubmit} />
                {this.state.codigoEditorial===""? <div></div>:<ModalEditorialEdit
                    codigo={this.state.codigoEditorial}
                    show={this.state.showModalEdit}
                    fnCerrar={this._handleCloseEdit}
                    fnEliminar={this._handleEliminar}
                    onSubmit={this._handleModalSubmitEdit} />}
            </div>
        )
    }
}