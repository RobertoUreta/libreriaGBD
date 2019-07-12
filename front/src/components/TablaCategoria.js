import React, { Component } from 'react'
import { Table} from 'react-bootstrap'

import { Col, Button, Row } from 'react-bootstrap'
//import { } from '../backend/usuario/usuario'
import { ModalCategoria } from './ModalCategoria'

import request from '../config'
import { ModalCategoriaEdit } from './ModalCategoriaEdit';
export class TablaCategoria extends Component {
    constructor(props) {
        super(props)

        this._handleShow = this._handleShow.bind(this);
        this.state = ({
            categorias: [],
            show: false,
            id: 0,
            showModalEdit:false,
            codigoCategoria: "",
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
        this.setState({ showModalEdit: true,codigoCategoria:codigo });
        //this.setState({ show: true })
    }

    _handleCloseEdit = (modalEvt) => {
        this.setState({ showModalEdit: modalEvt ,codigoCategoria:""});
    }
    componentDidMount(){
        const self = this;
        request.get('/lista_categorias')
                    .then(res => {
                        self.setState({ categorias: res.data.data, mensaje: res.data.mensaje })
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    _handleModalSubmit = (modalInfo) => {
        const self = this;
        let info = JSON.parse(modalInfo)
        request.post('/agregar_categoria', { info })
            .then(res => {
                request.get('/lista_categorias')
                    .then(res => {
                        self.setState({ categorias: res.data.data, mensaje: res.data.mensaje })
                    })

                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err.response);
            });
        console.log(modalInfo)
    }
    _handleEliminar = () => {
        let id = this.state.codigoCategoria;
        request.delete(`/eliminar_categoria/${id}`)
        .then(res => {
            request.get('/lista_categorias')
                    .then(res => {
                        this.setState({ categorias: res.data.data, mensaje: res.data.mensaje })
                    })
                    .catch(err => {
                        console.log(err);
                    });
        })
        .catch(err => {
            console.log(err.response);
        });
    }
    _handleModalSubmitEdit = (modalInfo) => {
        const self = this;
        let info = JSON.parse(modalInfo);
        request.put('/actualizar_categoria', { info })
            .then(res => {
                request.get('/lista_categorias')
                    .then(res => {
                        self.setState({ categorias: res.data.data, mensaje: res.data.mensaje })
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
                        <Button className="btn-custom" onClick={this._handleShow}>Agregar Categoria</Button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categorias.map((v, i) => {
                            return (
                                <tr key={v.id} onClick={() => this._handleShowEdit(v.id)}>
                                    <td>{v.id}</td>
                                    <td>{v.nombre}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ModalCategoria
                    show={this.state.show}
                    fnCerrar={this._handleClose}
                    onSubmit={this._handleModalSubmit} />
                {this.state.codigoCategoria===""? <div></div>:<ModalCategoriaEdit
                    codigo={this.state.codigoCategoria}
                    show={this.state.showModalEdit}
                    fnCerrar={this._handleCloseEdit}
                    fnEliminar={this._handleEliminar}
                    onSubmit={this._handleModalSubmitEdit} />}
            </div>
        )
    }
}