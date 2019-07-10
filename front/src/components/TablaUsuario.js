import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import { Col, Button, Row } from 'react-bootstrap'
//import { } from '../backend/usuario/usuario'
import { ModalUsuario } from './ModalUsuario'

import request from '../config'
import { ModalUsuarioEdit } from './ModalUsuarioEdit';
export class TablaUsuario extends Component {
    constructor(props) {
        super(props)

        this._handleShow = this._handleShow.bind(this);
        this.state = ({
            usuarios: [],
            show: false,
            id: 0,
            showModalEdit:false,
            email:"",
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
    _handleShowEdit(correo) {
        this.setState({ showModalEdit: true,email:correo });
        //this.setState({ show: true })
    }

    _handleCloseEdit = (modalEvt) => {
        this.setState({ showModalEdit: modalEvt ,email:""});
    }

    _handleEliminar = () => {
        let id = this.state.email;
        request.delete(`/eliminar_usuario/${id}`)
        .then(res => {
            request.get('/lista_usuarios')
                    .then(res => {
                        this.setState({ usuarios: res.data.data, mensaje: res.data.mensaje })
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
        })
        .catch(error => {
            console.log(error.response);
        });
    }
    componentDidMount(){
        const self = this;
        request.get('/lista_usuarios')
                    .then(res => {
                        self.setState({ usuarios: res.data.data, mensaje: res.data.mensaje })
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    _handleModalSubmit = (modalInfo) => {
        const self = this;
        let info = JSON.parse(modalInfo);
        let stringedit = info.tipo;
        let array = stringedit.split("-");
        info.tipo = array[0];
        request.post('/agregar_usuario', { info })
            .then(res => {
                request.get('/lista_usuarios')
                    .then(res => {
                        self.setState({ usuarios: res.data.data, mensaje: res.data.mensaje })
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
        let stringedit = info.tipo;
        let array = stringedit.split("-");
        info.tipo = array[0];
        request.put('/actualizar_usuario', { info })
            .then(res => {
                request.get('/lista_usuarios')
                    .then(res => {
                        self.setState({ usuarios: res.data.data, mensaje: res.data.mensaje })
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
                        <Button className="btn-custom" onClick={this._handleShow}>Agregar Usuario</Button>
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                
                <span>{this.state.mensaje}</span>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Correo</th>
                            <th>Nombre</th>
                            <th>Ap. Paterno</th>
                            <th>Ap. Materno</th>
                            <th>Direccion</th>
                            <th>Ciudad</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.usuarios.map((v, i) => {
                            return (
                                <tr key={v.correo} onClick={() => this._handleShowEdit(v.correo)}>
                                    <td>{v.correo}</td>
                                    <td>{v.nombre}</td>
                                    <td>{v.ap_paterno}</td>
                                    <td>{v.ap_materno}</td>
                                    <td>{v.direccion}</td>
                                    <td>{v.ciudad}</td>
                                    <td>{v.tipo===0?'Admin':'Cliente'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ModalUsuario
                    show={this.state.show}
                    fnCerrar={this._handleClose}
                    onSubmit={this._handleModalSubmit} />
                {this.state.email===""? <div></div>:<ModalUsuarioEdit
                    correo={this.state.email}
                    show={this.state.showModalEdit}
                    fnCerrar={this._handleCloseEdit}
                    fnEliminar={this._handleEliminar}
                    onSubmit={this._handleModalSubmitEdit} />}
                
            </div>
        )
    }
}