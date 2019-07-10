import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from '../config'

class AgregarAutor extends Component{

  constructor(props){
    super(props);
    this.state ={
      nombre: '',
      apPaterno: '',
      apMaterno:'',
      fecNac: new Date(),
      nacionalidad:'',
      lugarNacimiento:'',
      
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  } 

  handleSubmit = event =>{
    event.preventDefault();
    let data = {};
    data.nombre= this.state.nombre;
    data.ap_paterno = this.state.apPaterno;
    data.ap_materno = this.state.apMaterno;
    data.fec_nac = "" + this.state.fecNac.getDay() + "/" + this.state.fecNac.getMonth() + "/" + this.state.fecNac.getFullYear()+"";
    console.log(data.fec_nac);
    data.nacionalidad = this.state.nacionalidad;
    data.lugar_nacimiento = this.state.lugarNacimiento;
    console.log(data)
    config.post('/agregar_autor',data).
    then(res =>{
        console.log(res)
        window.location.reload();
    })
  }

  handleChange = event => {
    console.log("entre")
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleChangeDate = date =>{
    console.log(date.getFullYear());
    this.setState({fecNac:date})
  }
  render(){
    console.log("entre")
    return(
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>Agregar Autor</ModalHeader>
          <Form onSubmit ={this.handleSubmit}>
            <ModalBody>
            <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nombre">Nombre</Label>
                    <Input
                      type="text"
                      name="nombre"
                      id="nombre"
                      value={this.state.nombre}
                      onChange={this.handleChange}
                      required>
                      
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="apPaterno">Apellido Paterno</Label>
                    <Input
                      type="text"
                      name="apPaterno"
                      id="apPaterno"
                      
                      value={this.state.apPaterno}
                      onChange={this.handleChange}
                      required >
                      
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="apMaterno">Apellido Materno</Label>
                    <Input
                      type="text"
                      name="apMaterno"
                      id="apMaterno"
                      value={this.state.apMaterno}
                      onChange={this.handleChange}
                      required>
                      
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="fecha">Fecha Nacimiento</Label>
                    <DatePicker
                      name="fecha"
                      id="fecha"
                      dateFormat="dd-MM-yyyy"
                      selected={this.state.fecNac}
                      onChange={this.handleChangeDate}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nacionalidad">Nacionalidad</Label>
                    <Input
                      type="text"
                      name="nacionalidad"
                      id="nacionalidad"
                      placeholder=""
                      value={this.state.nacionalidad}
                      onChange={this.handleChange}
                      //onKeyUp={this.handleUpText}
                      required />
                    
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lugarNacimiento">Lugar de Nacimiento</Label>
                    <Input
                      type="text"
                      name="lugarNacimiento"
                      id="lugarNacimiento"
                      value={this.state.lugarNacimiento}
                      onChange={this.handleChange}
                      required>
                      
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">Enviar</Button>{' '}
              <Button color="danger" onClick={this.props.toggle}>Cancelar</Button>
            </ModalFooter>
          </Form>

        </Modal>
      </div>
    )
  }




} export default AgregarAutor