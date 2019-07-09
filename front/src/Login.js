import React, { Component } from 'react'
import axios from 'axios';
import './login.css';
import {
  Form, Button, FormGroup, Label, Input,
  Card, CardHeader, CardBody, CardFooter,
  Container, Row, Col, Spinner, CardTitle
}
  from 'reactstrap';
import { Layout } from './components/Layout';


export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            texto: 'Mostrar clave',
            mostrar: false,
            hidden: true,
            isloading: false,
            error: "",
            validate: false,
            userData: {}
        }
    }
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
      
    }
    handleSubmit = event => {
        event.preventDefault();
        let data = {};
        data.email = this.state.email;
        data.contrasena = this.state.password;
        this.setState({ isloading: true })
        axios.post(process.env.REACT_APP_BACKURL_LOCAL + "/login", data)
          .then(res => {
            console.log("este es el resultado: ",res)
            //this.props.onAuth(res.data);
            this.setState({validate: true,userData: res});
          }).catch(err => {
            this.setState({ error: "Usuario o contraseña incorrectos", isloading: false })
          })
      }

    render(){
        if(this.state.validate){
          return(
            <Redirect to={"/" }></Redirect>
          )
        }
        else{
        return(

            <div className="login-page">
            
            <Container className='cont'>
              <Row >
                <Col md={{ size: 6, offset: 3 }}>
                  <div className="login-icon">                
                  </div>
                  <Card className="login-card" body inverse style={{ backgroundColor: 'white', borderColor: '#990000' }}>
                    <CardHeader  body inverse style={{ backgroundColor: '#1E90FF', borderColor: '' }}>
                      <CardTitle className="text-login"><h3>Iniciar sesión</h3></CardTitle>                 
                    </CardHeader>
                    <CardBody className="login-cardbody" style={{ pading: "0rem", height: "none" }} >
                    {/*<img className="size-image" src={logo} style={{ width: "20%", height: "60%" }} alt="logo" />*/}                
                      <div className='cont' style={{ display: "flex", }}>
    
                          <CardBody style={{ pading: "0rem", height: "none" }}>
                            <Form onSubmit={this.handleSubmit}>
                              <FormGroup>
                                <Label className="titulo-color" for="Usuario">Correo:</Label>
                                <Input className="input_user"
                                  type="text"
                                  placeholder="Ingrese su usuario"
                                  name="email"
                                  id="email"
                                  value={this.state.email}
                                  onChange={this.handleChange}
                                  required                             
                                />                           
                              </FormGroup>
                              <FormGroup >
                                <Label className="titulo-color" for="password">Contraseña:</Label>
                                <Input
                                  type={this.state.hidden ? "password" : "text"}
                                  placeholder="Ingrese su contraseña"
                                  name="password"
                                  id="password"
                                  value={this.state.password}
                                  onChange={this.handleChange}
                                  required
                                />
                              </FormGroup>
                              {
                                (this.state.error !== "") ?
                                  <font color="red" >{this.state.error}</font> : null
                              }
                              <center style={{ marginTop: "50px" }}>
                                {
                                  (this.state.isloading) ?
                                    <div className="d-flex justify-content-center" >
                                      <Spinner color="success" />
                                    </div>
                                    :
                                    <Button className="buttonLogin" style={{ width: "60%", height: "10%" }} type="submit">
                                      <center>Iniciar sesión</center>
                                    </Button>
                                }
                                {/* <Button className="float-right" color="secondary" onClick={this.toggleShow}>{this.state.texto}</Button>                                                 */}
                              </center>
                            </Form>                      
                          </CardBody>
    
                      </div>
                    </CardBody>
                    <CardFooter body inverse style={{ backgroundColor: '#1E90FF', borderColor: '' }}>
                      
                      {/*<Clave toggleEditarClave={this.toggleEditarClave} isOpen={this.state.modalEditarClave} />*/}
                      <div className="marque-color">
                        ©2019 GBD
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
    
          </div> 

        )
      }
    }

}