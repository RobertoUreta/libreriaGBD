import React, { Component } from 'react'
import { Col, Button, Row,Table,Spinner } from 'react-bootstrap'
import { Layout } from '../components/Layout';
import AgregarAutor from '../components/ModalAgregarAutor';
import config from '../config'
import ModalAutorEdit from '../components/ModalAutorEdit'
//import { Layout } from '../components/Layout'
export class Autor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            esAdmin: false,
            modalAgregarAutor: false,
            modalAutorEdit: false,
            isLoading: true,
            dataAutores: [],
            idSelected: false,
        }
        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modalAgregarAutor: !prevState.modalAgregarAutor
        }));
      }

    toggle2() {
    this.setState(prevState => ({
        modalAutorEdit: !prevState.modalAutorEdit
    }));
    }
    handleClick(id) {
        console.log(id)
        this.setState(prevState=>({modalAutorEdit: !prevState.modalAutorEdit, idSelected: id}));
    }

    handleCloseEdit(){
        this.setState(prevState=>({modalAutorEdit: !prevState.modalAutorEdit,idSelected: false}))
    }
    
    componentDidMount(){
        config.get('/lista_autor').
        then( response =>{
            console.log(response.data)
            this.setState({isLoading:false,dataAutores:response.data});
        }

        )
    }

    formatDate(date)
    {
        var formatedDate = new Date(date);
        return (""+formatedDate.getFullYear() +"-"+ formatedDate.getMonth()+"-"+formatedDate.getDay()+"" )
    }
    render() {
    
        return (
                <div id="body"> 
                <Layout></Layout>
                    <div style={{paddingTop: '100px' }}>
                        <Row>
                            <Col>
                                <Button className="btn-custom" onClick={this.toggle} > Agregar Autor</Button>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </div>
                    <AgregarAutor isOpen={this.state.modalAgregarAutor} toggle={this.toggle}></AgregarAutor>
                    <div>
                    {this.state.idSelected===false? <div></div>:<ModalAutorEdit 
                    isOpen={this.state.modalAutorEdit} 
                    toggle={this.toggle2} 
                    id={this.state.idSelected}
                    fnCerrar={this.handleCloseEdit}></ModalAutorEdit>}
                    {

                    }
                    
                    </div>
                    <div>{
                        (!this.state.isLoading) ?
                       <Table  striped bordered hover size="sm">
                           <thead>
                               <tr>
                                   <th>#</th>
                                   <th>Nombre</th>
                                   <th>A.Paterno</th>
                                   <th>A.Materno</th>
                                   <th>Nacimiento</th>
                               </tr>
                           </thead>
                           <tbody>
                                {this.state.dataAutores.map((item,index)=>(
                                    <tr key={index} onClick={() => this.handleClick(item.id)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.nombre}</td>
                                        <td>{item.ap_paterno}</td>
                                        <td>{item.ap_materno}</td>
                                        <td>{this.formatDate(item.fec_nac)}</td>
                                    </tr>
                                    
                                    
                                ))}
                           </tbody>
                       </Table> :
                     <div className="d-flex justify-content-center" >
                        <Spinner color="success" />
                    </div>}
                    </div>
                </div>
        )
    }
}