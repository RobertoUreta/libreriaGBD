import React, { Component } from 'react'
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
//import logo from '../images/cepaicono.png'
//import "../styles/styles.css"
//import { cerrarSesion } from '../backend/login'
//import { obtenerDatosUsuario } from '../backend/usuario/usuario'
//import { ModalUsuario } from '../components/ModalUsuario'

export class NavBar extends Component {
    constructor(props) {
        super(props);

        this._handleShow = this._handleShow.bind(this);
        this.state = {
            usuario: {nombre:'Roberto',apellido_paterno:'Ureta',apellido_materno:''},
            show: false
        }
    }

    componentWillMount() {

       

    }

    handleChange = evt => {
        this.setState({
            search: evt.target.value
        });

    }

    _cerrarSesion = () => {
        
    }

    _handleShow() {
        this.setState({ show: true })
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    
    render() {
        const { nombre, apellido_paterno, apellido_materno } = this.state.usuario
        const hrefListaLibros = `/libros`
        const hrefListaEditoriales = `/editoriales`
        const hrefListaAutores = `/autores`
        const hrefListaUsuarios = `/usuarios`
        return (
            <div className="Layout">
                <Navbar bg="light" expand="lg" fixed="top">
                    
                        <Navbar.Brand >

                            

                        </Navbar.Brand>
                    

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="collasible-nav-dropdown">
                        <Nav className="mr-auto" variant="pills">
                            <Nav.Item>
                                <Nav.Link eventKey="libros" href={hrefListaLibros}>Libros</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="editoriales" href={hrefListaEditoriales}>Editoriales </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="autores" href={hrefListaAutores}>Autores</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="usuarios" href={hrefListaUsuarios}>Usuarios</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <NavDropdown
                            className="dropdown-menu-nav"
                            title={<i className="fa fa-user">
                                <span className="fa-icon-inner-text">
                                    {nombre + " " + apellido_paterno + " " + apellido_materno}
                                </span></i>}
                            id="basic-nav-dropdown">

                            <NavDropdown.Item onClick={this._handleShow}>Editar Usuario</NavDropdown.Item>
                            
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this._cerrarSesion} href="/">Cerrar Sesión</NavDropdown.Item>
                        </NavDropdown>



                    </Navbar.Collapse>
                </Navbar>
            </div >
        )
    }
}