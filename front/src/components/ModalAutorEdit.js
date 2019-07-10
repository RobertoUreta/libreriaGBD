import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from '../config'

class ModalAutorEdit extends Component{
    constructor(props){
        
        super(props);
        this.state={
            id: -1,
            nombre: "",
            apPaterno: "",
            apMaterno:"",
            fecNac: new Date(),
            nacionalidad:"",
            lugarNacimiento:"",
        }
        console.log("algo")
        this._handleClose = this._handleClose.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentDidMount(){
        console.log(this.props)
        this.setState({id: this.props.id})
        let send={
            id: this.props.id,
        }
        config.post('/obtener_autor', send).then( reponse =>{
            console.log(reponse)
            var fecha = new Date(reponse.data[0].fec_nac);
            console.log(fecha);
            this.setState({
                
                nombre: reponse.data[0].nombre,
                apPaterno: reponse.data[0].ap_paterno,
                apMaterno: reponse.data[0].ap_materno,
                fecNac: fecha,
                nacionalidad: reponse.data[0].nacionalidad,
                lugarNacimiento: reponse.data[0].lugar_nacimiento,
            })
        })
    }

    handleSubmit = event =>{
        event.preventDefault();
        let data = {};
        data.id= this.state.id;
        data.nombre= this.state.nombre;
        data.ap_paterno = this.state.apPaterno;
        data.ap_materno = this.state.apMaterno;
        data.fec_nac = "" + this.state.fecNac.getDay() + "/" + this.state.fecNac.getMonth() + "/" + this.state.fecNac.getFullYear()+"";
        console.log(data.fec_nac);
        data.nacionalidad = this.state.nacionalidad;
        data.lugar_nacimiento = this.state.lugarNacimiento;
        console.log(data)
        config.put('/actualizar_autor',data).
        then(res =>{
            console.log(res)
            window.location.reload();
        })
      }
      _handleClose = () => {
        this.props.fnCerrar()
        this.setState({
          id: -1,
          nombre: "",
          apPaterno: "",
          apMaterno:"",
          fecNac: new Date(),
          nacionalidad:"",
          lugarNacimiento:"",
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

    delete(){
        console.log(this.state.id)
        let data ={
          id: this.state.id,
        }
        config.delete(`/eliminar_autor/${data.id}`).then(reponse=>{
          window.location.reload();
        })
    }


      render(){
        console.log(this.state.nombre);
        return(
          
          <div>
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
              <ModalHeader toggle={this.props.toggle}>Editar Autor</ModalHeader>
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
                          value={this.state.nombre || ''}
                          onChange={this.handleChange}
                          contentEditable={true}
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
                          contentEditable={true}
                          value={this.state.apPaterno || ''}
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
                          value={this.state.apMaterno || ''}
                          onChange={this.handleChange}
                          contentEditable={true}
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
                          value={this.state.nacionalidad || ''}
                          onChange={this.handleChange}
                          contentEditable={true}
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
                          value={this.state.lugarNacimiento || ''}
                          onChange={this.handleChange}
                          contentEditable={true}
                          required>
                          
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">Enviar</Button>{' '}
                  <Button color="danger" onClick={this.delete}>Eliminar</Button>
                  <Button color="danger" onClick={this._handleClose}>Cancelar</Button>
                </ModalFooter>
              </Form>
    
            </Modal>
          </div>
        )
      }
}
export default ModalAutorEdit