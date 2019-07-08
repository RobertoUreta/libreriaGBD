import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
//import { } from '../backend/usuario/usuario'
//import { ModalUsuario} from './ModalUsuario'

export class TablaLibro extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            usuarios: [],
            show: false,
            id:0,
        })
    }
    _handleShow(id) {

        this.setState({ show: true,id:id })

    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    render() {
            return (
                <div>
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
                            {this.props.libros.map((v, i) => {
                                return (
                                    <tr key={i}>

                                        <td>{v.codigo}</td>
                                        <td>{v.titulo_libro}</td>
                                        <td>{v.n_edicion}</td>
                                        <td>{v.paginas}</td>
                                        <td>{v.stock}</td>
                                        <td>{v.precio}</td>
                                        <td>{v.fecha_publicacion}</td>
                                        <td>{v.valoracion}</td>
                                        <td>{v.idioma}</td>
                                        <td>{v.ref_editorial}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                        
                    </Table>
                </div>
            )
    }
}