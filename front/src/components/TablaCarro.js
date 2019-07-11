import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Col, Button, Row } from 'react-bootstrap'
import request from '../config'
import { ModalValoracion } from './ModalValoracion';


export class TablaCarro extends Component {
    constructor(props) {
        super(props)

        this._handleShow = this._handleShow.bind(this);
        this.state = ({
            compras: [],
            show: false,
            id: 0,
            codigoCompra: "",
            mensaje: "",
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
        this.setState({ showModalEdit: true, codigoCompra: codigo });
        //this.setState({ show: true })
    }

    _handleCloseEdit = (modalEvt) => {
        this.setState({ showModalEdit: modalEvt, codigoCompra: "" });
    }
    componentDidMount() {
        const self = this;
        request.get(`/compras_cliente/${this.props.correo}`)
            .then(res => {
                console.log(res)
                this.setState({ compras: res.data.data })
            })
    }



    _handleModalSubmitEdit = (modalInfo) => {
        const self = this;
        let info = JSON.parse(modalInfo);
        console.log("adas", info);
        request.put('/actualizar_valoracion', { info })
            .then(res => {
                console.log('res', res);
                request.get(`/compras_cliente/${this.props.correo}`)
                    .then(res => {
                        console.log(res)
                        this.setState({ compras: res.data.data })
                    })
            })
            .catch(err => {
                console.log(err);
            });
        console.log(modalInfo)
    }
    render() {
        return (
            <div>


                <span>{this.state.mensaje}</span>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Valoracion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.compras.map((v, i) => {
                            return (
                                <tr key={v.id_compra} onClick={() => this._handleShowEdit(v.id_compra)}>
                                    <td>{v.id_compra}</td>
                                    <td>{v.nombre_libro}</td>
                                    <td>{v.cantidad}</td>
                                    <td>{v.fecha}</td>
                                    <td>{v.estado}</td>
                                    <td>{v.valoracion}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {this.state.codigoCompra === "" ? <div></div> : <ModalValoracion
                    codigo={this.state.codigoCompra}
                    show={this.state.showModalEdit}
                    fnCerrar={this._handleCloseEdit}
                    onSubmit={this._handleModalSubmitEdit} />}

            </div>
        )
    }

}