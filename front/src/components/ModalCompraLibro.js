import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from '../config'

export default class ModalCompraLibro extends Component{
    constructor(props){
        super(props);
        this.state={
            idLibro: false,
            idCliente: false,
            cantidad: 0,

        }
    }

    handleChange = event => {
        console.log("entre")
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    _handleClose = () => {
        this.props.fnCerrar()
        this.setState({
          cantidad:0,
          idLibro: false,
          idCliente: false,
        })
    }
    handleSubmit = event =>{
        event.preventDefault();
        let data = {};
        data.ref_libro= this.props.idLibro;
        data.ref_usuario= this.props.idCliente;
        data.cantidad = this.state.cantidad;
        var date = new Date();
        data.fecha = date.getDay() + "-"+ date.getMonth() + "-" + date.getFullYear(); 
        console.log(data)
        try {
            config.post('/agregar_compra',data).
            then(res =>{
            console.log(res)
            window.location.reload();
            
        })
        } catch (error) {
            console.log(error)
        }
        
      }
    render(){
        return(
            
                <Modal isOpen={this.props.isOpen} >
                    <ModalHeader toggle={this.props.toggle} >Comprar</ModalHeader>
                    <ModalBody>
                        <Form  onSubmit={this.handleSubmit}>
                            <FormGroup style={{marginBottom: "0rem"}}>
                                <Label for="cantidad">Cantidad</Label>
                                <Input
                                    type="number"
                                    name="cantidad"
                                    id="cantidad"
                                    placeholder="cantidad"
                                    value={this.state.cantidad}
                                    onChange={this.handleChange}
                                    required />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={this.handleSubmit}>Enviar</Button>{' '}
                        <Button color="danger" onClick={this._handleClose}>Cancelar</Button>
                    </ModalFooter>

                </Modal>
            

        )
    }
}