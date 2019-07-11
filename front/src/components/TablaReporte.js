import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Col, Button, Row } from 'react-bootstrap';
import request from '../config';
export class TablaReporte extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            num_reporte: 0,
            reporte1: [],
            reporte2: [],
            reporte3: [],
            reporte4: [],
            reporte5: [],
            reporte6: [],
            reporte7: [],
            reporte8: [],
            reporte9: [],
            reporte10: [],
            show: false,
            id: 0,
            showModalEdit: false,
            codigoCategoria: "",
            mensaje: "",
        })
    }

    componentDidMount() {

    }


    reporte1() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Titulo</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Valoracion</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.reporte1.map((v, i) => {
                        return (
                            <tr key={v.codigo}>
                                <td>{v.codigo}</td>
                                <td>{v.titulo_libro}</td>
                                <td>{v.precio}</td>
                                <td>{v.stock}</td>
                                <td>{v.valoracion}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
    generarReporte1 = () => {
        this.setState({ num_reporte: 1 });
        request.get('/reporte1')
            .then(res => {
                //console.log(res);
                this.setState({ reporte1: res.data.data, mensaje: res.data.mensaje })
            })
            .catch(err => {
                console.log(err.response);
            });
    }
    reporte2() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Titulo</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Valoracion</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.reporte2.map((v, i) => {
                        return (
                            <tr key={v.codigo}>
                                <td>{v.codigo}</td>
                                <td>{v.titulo_libro}</td>
                                <td>{v.precio}</td>
                                <td>{v.stock}</td>
                                <td>{v.valoracion}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
    generarReporte2 = () => {
        this.setState({ num_reporte: 2 });
        request.get('/reporte2')
            .then(res => {
                //console.log(res);
                this.setState({ reporte2: res.data.data, mensaje: res.data.mensaje })
            })
            .catch(err => {
                console.log(err.response);
            });
    }
    reporte3() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre Editorial</th>
                        <th>Telefono</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.reporte3.map((v, i) => {
                        return (
                            <tr key={v.codigo}>
                                <td>{v.codigo}</td>
                                <td>{v.nombre}</td>
                                <td>{v.telefono}</td>
                                <td>{v.cantidad}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
    generarReporte3 = () => {
        this.setState({ num_reporte: 3 });
        request.get('/reporte3')
            .then(res => {
                //console.log(res);
                this.setState({ reporte3: res.data.data, mensaje: res.data.mensaje })
            })
            .catch(err => {
                console.log(err.response);
            });
    }
    reporte4() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre Categoria</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.reporte4.map((v, i) => {
                        return (
                            <tr key={v.ref_categoria}>
                                <td>{v.ref_categoria}</td>
                                <td>{v.nombre}</td>
                                <td>{v.cantidad}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
    generarReporte4 = () => {
        this.setState({ num_reporte: 4 });
        request.get('/reporte4')
            .then(res => {
                console.log(res);
                this.setState({ reporte4: res.data.data, mensaje: res.data.mensaje })
            })
            .catch(err => {
                console.log(err.response);
            });
    }
    reporte5() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Titulo</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Valoracion</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.reporte5.map((v, i) => {
                        return (
                            <tr key={v.codigo}>
                                <td>{v.codigo}</td>
                                <td>{v.titulo_libro}</td>
                                <td>{v.precio}</td>
                                <td>{v.stock}</td>
                                <td>{v.valoracion}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
    generarReporte5 = () => {
        this.setState({ num_reporte: 5 });
        request.get('/reporte5')
            .then(res => {
                //console.log(res);
                this.setState({ reporte5: res.data.data, mensaje: res.data.mensaje })
            })
            .catch(err => {
                console.log(err.response);
            });
    }
    reporte6() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Titulo</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Valoracion</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.reporte6.map((v, i) => {
                        return (
                            <tr key={v.codigo}>
                                <td>{v.codigo}</td>
                                <td>{v.titulo_libro}</td>
                                <td>{v.precio}</td>
                                <td>{v.stock}</td>
                                <td>{v.valoracion}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
    generarReporte6 = () => {
        this.setState({ num_reporte: 6 });
        request.get('/reporte6')
            .then(res => {
                //console.log(res);
                this.setState({ reporte6: res.data.data, mensaje: res.data.mensaje })
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    reporte7() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre Editorial</th>
                        <th>Telefono</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.reporte7.map((v, i) => {
                        return (
                            <tr key={v.codigo}>
                                <td>{v.codigo}</td>
                                <td>{v.nombre}</td>
                                <td>{v.telefono}</td>
                                <td>{v.cantidad}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
    generarReporte7 = () => {
        this.setState({ num_reporte: 7 });
        request.get('/reporte7')
            .then(res => {
                //console.log(res);
                this.setState({ reporte7: res.data.data, mensaje: res.data.mensaje })
            })
            .catch(err => {
                console.log(err.response);
            });
    }
    reporte8() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre Categoria</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.reporte8.map((v, i) => {
                        return (
                            <tr key={v.ref_categoria}>
                                <td>{v.ref_categoria}</td>
                                <td>{v.nombre}</td>
                                <td>{v.cantidad}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
    generarReporte8 = () => {
        this.setState({ num_reporte: 8 });
        request.get('/reporte8')
            .then(res => {
                console.log(res);
                this.setState({ reporte8: res.data.data, mensaje: res.data.mensaje })
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Button className="btn-custom" onClick={this.generarReporte1}>Libros mas caros</Button>
                    </Col>
                    <Col>
                        <Button className="btn-custom" onClick={this.generarReporte2}>Libros mejor valorados</Button>
                    </Col>
                </Row>


                <Row style={{ paddingTop: '20px' }}>
                    <Col>
                        <Button className="btn-custom" onClick={this.generarReporte3}>Editoriales con mas libros asociados</Button>
                    </Col>
                    <Col>
                        <Button className="btn-custom" onClick={this.generarReporte4}>Categorias con mas libros asociados</Button>
                    </Col>
                </Row>

                <Row style={{ paddingTop: '20px' }}>
                    <Col>
                        <Button className="btn-custom" onClick={this.generarReporte5}>Libros mas baratos</Button>
                    </Col>
                    <Col>
                        <Button className="btn-custom" onClick={this.generarReporte6}>Libros peor valorados</Button>
                    </Col>
                </Row>

                <Row style={{ paddingTop: '20px' }}>
                    <Col>
                        <Button className="btn-custom" onClick={this.generarReporte7}>Editoriales con menos libros asociados</Button>
                    </Col>
                    <Col>
                        <Button className="btn-custom" onClick={this.generarReporte8}>Categorias con menos libros asociados</Button>
                    </Col>
                </Row>
                <div style={{ paddingTop: '20px' }}>

                    {this.state.reporte1.length > 0 && this.state.num_reporte === 1 ? this.reporte1() : <div></div>}
                    {this.state.reporte2.length > 0 && this.state.num_reporte === 2 ? this.reporte2() : <div></div>}
                    {this.state.reporte3.length > 0 && this.state.num_reporte === 3 ? this.reporte3() : <div></div>}
                    {this.state.reporte4.length > 0 && this.state.num_reporte === 4 ? this.reporte4() : <div></div>}
                    {this.state.reporte5.length > 0 && this.state.num_reporte === 5 ? this.reporte5() : <div></div>}
                    {this.state.reporte6.length > 0 && this.state.num_reporte === 6 ? this.reporte6() : <div></div>}
                    {this.state.reporte7.length > 0 && this.state.num_reporte === 7 ? this.reporte7() : <div></div>}
                    {this.state.reporte8.length > 0 && this.state.num_reporte === 8 ? this.reporte8() : <div></div>}

                </div>
            </div>
        )
    }
}