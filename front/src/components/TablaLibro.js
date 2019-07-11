import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import { Col, Button, Row } from 'react-bootstrap'
//import { } from '../backend/usuario/usuario'
import { ModalLibro } from './ModalLibro'
import ModalCompraLibro from './ModalCompraLibro'
import request from '../config'
import { ModalStock } from './ModalStock';
export class TablaLibro extends Component {
    constructor(props) {
        super(props)

        this._handleShow = this._handleShow.bind(this);
        this._handleShowModalStock = this._handleShowModalStock.bind(this);
        this._handleCloseCompra = this._handleCloseCompra.bind(this);
        this.state = ({
            libros: [],
            show: false,
            id: 0,
            showModalStock: false,
            showModalCompra: false,
            codigoLibro: "",
            mensaje: "",
        })
    }

    _handleShow() {
        this.setState({ show: true });
        //this.setState({ show: true })
    }

    _handleShowModalStock(codigo) {
        console.log(codigo);
        this.setState({ showModalStock: true, codigoLibro: codigo });
        this.setState({ showModalCompra: true,codigoLibro: codigo });
    }

    
    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }
    _handleCloseCompra (){
        this.setState({showModalCompra: false,codigoLibro: ""});
    }
    _handleCloseModalStock = (modalEvt) => {
        this.setState({ showModalStock: modalEvt, codigoLibro: "" });
    }

    componentDidMount() {
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
        let fecha1 = new Date(info.fecha);
        info.fecha = fecha1.toJSON().slice(0, 19).replace('T', ' ');
        console.log(info);
        request.post('/agregar_libro', { info })
            .then(res => {
                console.log(res);
                request.get('/lista_libros')
                    .then(res => {
                        self.setState({ libros: res.data.data, mensaje: res.data.mensaje })
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
        let id = this.state.codigoLibro;
        request.delete(`/eliminar_libro/${id}`)
        .then(res => {
            request.get('/lista_libros')
                    .then(res => {
                        this.setState({ libros: res.data.data, mensaje: res.data.mensaje })
                    })

                    .catch(err => {
                        console.log(err);
                    });
        })
        .catch(err => {
            console.log(err.response);
        });
    }
    _handleModalSubmitModalStock = (modalInfo) => {

        console.log("_handleModalSubmit")
        const self = this;
        let info = JSON.parse(modalInfo)
        console.log(info);
        let categorias = info.categorias;
        console.log(categorias);
        let autores = info.autores;
        console.log(autores);
        if (info.stock !== "") {
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
        if (info.precio !== "") {
            request.put('/actualizar_libro', { id: info.codigo, precio: info.precio })
                .then(res => {
                    request.get('/lista_libros')
                        .then(res => {
                            self.setState({ libros: res.data.data, mensaje: res.data.mensaje })
                        })

                        .catch(err => {
                            console.log(err.response);
                        });
                })
                .catch(err => {
                    console.log(err.response);
                });
        }
        if (categorias !== []) {
            categorias.map((e) => {
                let array = e.split("-");
                request.post('/agregar_categorizado', { ref_libro: info.codigo, ref_categoria: array[0] })
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
            });
        }
        if(autores!==[]){
            autores.map((e)=>{
                let stringedit = e.autor;
                let array = stringedit.split("-");
                let fecha1 = new Date(e.fecha);
                e.fecha = fecha1.toJSON().slice(0, 19).replace('T', ' ')
                console.log(e);
                request.post('/agregar_escribe', { ref_autor: array[0], ref_libro: info.codigo,fecha_escritura: e.fecha})
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
            });
        }
    }


    render() {
        return (
            <div>
                <Row>
                    <Col>
                    {(this.props.userType ===1) ?
                    <Button className="btn-custom" onClick={this._handleShow}>Agregar Libro</Button> 
                        :<div></div>}
                        
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
                             let fecha = new Date(v.fecha_publicacion)
                             /*let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                                                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);*/
                             let nueva = fecha.toJSON().slice(0, 19).replace('T', ' ')
                             let array = nueva.split(' ');
                            return (
                                <tr key={v.codigo} onClick={() => this._handleShowModalStock(v.codigo)}>
                                    <td>{v.codigo}</td>
                                    <td>{v.titulo_libro}</td>
                                    <td>{v.n_edicion}</td>
                                    <td>{v.paginas}</td>
                                    <td>{v.stock}</td>
                                    <td>{v.precio}</td>
                                    <td>{array[0]}</td>
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
                {this.state.codigoLibro!=="" && (this.props.userType)===1 ? 
                <ModalStock
                show={this.state.showModalStock}
                codigo={this.state.codigoLibro}
                fnCerrar={this._handleCloseModalStock}
                fnEliminar={this._handleEliminar}
                onSubmit={this._handleModalSubmitModalStock} />: <div></div>
                }
                {this.state.codigoLibro!=="" && (this.props.userType)===0 ? 
                <ModalCompraLibro fnCerrar={this._handleCloseCompra}
                idLibro={this.state.codigoLibro}
                idCliente={this.props.id}
               
                isOpen={this.state.showModalCompra}>

                </ModalCompraLibro>: <div></div>
                
                }
            </div>
        )
    }
}

