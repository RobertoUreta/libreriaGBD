import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import { Col, Button, Row } from 'react-bootstrap'
//import { } from '../backend/usuario/usuario'
import { ModalLibro } from './ModalLibro'

import request from '../config'
import { ModalStock } from './ModalStock';
export class TablaLibro extends Component {
    constructor(props) {
        super(props)

        this._handleShow = this._handleShow.bind(this);
        this._handleShowModalStock = this._handleShowModalStock.bind(this);
        this.state = ({
            libros: [],
            show: false,
            id: 0,
            showModalStock:false,
            codigoLibro: "",
            mensaje:"",
        })
    }

    _handleShow() {
        this.setState({ show: true });
        //this.setState({ show: true })
    }
    _handleShowModalStock( codigo) {
        console.log(codigo);
        this.setState({ showModalStock: true,codigoLibro:codigo});
        //this.setState({ show: true })
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }
    _handleCloseModalStock = (modalEvt) => {
        this.setState({ showModalStock: modalEvt });
    }

    componentDidMount(){
        const self = this;
        request.get('/lista_libros')
                    .then(res => {
                        self.setState({ libros: res.data.data, mensaje: res.data.mensaje })
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    _handleModalSubmit = (modalInfo) => {
        const self = this;
        let info = JSON.parse(modalInfo)
        let stringedit = info.ref_editorial;
        let array = stringedit.split("-");
        info.ref_editorial = array[0];
        request.post('/agregar_libro', { info })
            .then(res => {
                request.get('/lista_libros')
                    .then(res => {
                        self.setState({ libros: res.data.data, mensaje: res.data.mensaje })
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
    _handleModalSubmitModalStock = (modalInfo) => {

        console.log("_handleModalSubmit")
        const self = this;
        let info = JSON.parse(modalInfo)
        request.put('/aumentar_stock', { info })
            .then(res => {
                request.get('/lista_libros')
                    .then(res => {
                        self.setState({ libros: res.data.data, mensaje: res.data.mensaje })
                    })

                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Button className="btn-custom" onClick={this._handleShow}>Agregar Libro</Button>
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                
                <span>{this.state.mensaje}</span>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Titulo</th>
                            <th>N° Edicion</th>
                            <th>N° Paginas</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th>Fecha Publicacion</th>
                            <th>Valoracion</th>
                            <th>Idioma</th>
                            <th>Editorial</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.libros.map((v, i) => {
                            return (
                                <tr key={v.codigo} onClick={() => this._handleShowModalStock(v.codigo)}>
                                    <td>{v.codigo}</td>
                                    <td>{v.titulo_libro}</td>
                                    <td>{v.n_edicion}</td>
                                    <td>{v.paginas}</td>
                                    <td>{v.stock}</td>
                                    <td>{v.precio}</td>
                                    <td>{v.fecha_publicacion}</td>
                                    <td>{v.valoracion}</td>
                                    <td>{v.idioma}</td>
                                    <td>{v.ref_editorial}-{v.nombre}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <ModalLibro
                    show={this.state.show}
                    fnCerrar={this._handleClose}
                    onSubmit={this._handleModalSubmit} />
                {(this.props.userType)===1 ?
                <ModalStock
                show={this.state.showModalStock}
                codigo={this.state.codigoLibro}
                fnCerrar={this._handleCloseModalStock}
                onSubmit={this._handleModalSubmitModalStock} /> : <span>wena los cabros</span>}
                
            </div>
        )
    }
}

