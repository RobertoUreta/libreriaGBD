import React, { Component } from 'react'
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import * as actions from '../store/actions/index'
import { connect } from 'react-redux';
import {Redirect} from 'react-router'
//import logo from '../images/cepaicono.png'
//import "../styles/styles.css"
//import { cerrarSesion } from '../backend/login'
//import { obtenerDatosUsuario } from '../backend/usuario/usuario'
//import { ModalUsuario } from '../components/ModalUsuario'

class NavBar extends Component {
    constructor(props) {
        super(props);

        this._handleShow = this._handleShow.bind(this);
        this.state = {
            usuario: {nombre:'Roberto',apellido_paterno:'Ureta',apellido_materno:''},
            show: false,
            validate: false
        }
        this._cerrarSesion = this._cerrarSesion.bind(this)
    }

    componentWillMount() {

       

    }

    

    handleChange = evt => {
        this.setState({
            search: evt.target.value
        });

    }

    _cerrarSesion = () => {
        this.props.onLogout();

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
        const hrefListaCategorias = `/categorias`
        const hrefListaReportes = `/reportes`
       
        const hrefListaCarro = `/carro`
        const hrefListaDespacho=`/despacho`

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
                            {(this.props.tipo ===0) ? 
                            <Nav.Item>
                                <Nav.Link eventKey="carro" href={hrefListaCarro}>Compra</Nav.Link>
                            </Nav.Item>
                            :
                            <div>
                                
                            </div>}
                            {(this.props.tipo ===0 )?
                            <Nav.Item>
                                <Nav.Link eventKey="despacho" href={hrefListaDespacho}>Despacho</Nav.Link>
                            </Nav.Item>
                            :
                            <div>
                            
                            </div>}
                            
                            {(this.props.tipo ===1) ?
                            <Nav.Item>
                                <Nav.Link eventKey="usuarios" href={hrefListaUsuarios}>Usuarios</Nav.Link>
                            </Nav.Item> 
                            : <div></div>}
                            
                            {this.props.tipo ===1 ?
                            <Nav.Item>
                                <Nav.Link eventKey="editoriales" href={hrefListaEditoriales}>Editoriales </Nav.Link>
                            </Nav.Item>
                             : <div></div>}
                             {this.props.tipo ===1 ?
                             <Nav.Item>
                                <Nav.Link eventKey="autores" href={hrefListaAutores}>Autores</Nav.Link>
                              </Nav.Item>
                             :<div></div>}
                             {this.props.tipo ===1 ?
                             <Nav.Item>
                                <Nav.Link eventKey="categorias" href={hrefListaCategorias}>Categorias</Nav.Link>
                             </Nav.Item> : <div></div>
                             }
                            
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reportes" href={hrefListaReportes}>Reportes</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <NavDropdown
                            className="dropdown-menu-nav"
                            title={<i className="fa fa-user">
                                <span className="fa-icon-inner-text">
                                    {this.props.nombre + " " + this.props.ap_paterno + " " + this.props.ap_materno}
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

const mapStateToProps = state => {
    return {
      nombre: state.auth.nombre,
      ap_materno: state.auth.ap_materno,
      ap_paterno: state.auth.ap_paterno,
      tipo: state.auth.tipo,
      correo: state.auth.correo,
      
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onLogout: () => {
        dispatch(actions.logout())
      },
      
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
  