import React, { Component } from 'react'
import { Col, Button, Row,Table,Spinner } from 'react-bootstrap'
import { Layout } from '../components/Layout';
import AgregarAutor from './AgregarAutor';
import config from '../config'
//import { Layout } from '../components/Layout'
export class Autor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            esAdmin: false,
            modalAgregarAutor: false,
            isLoading: true,
            dataAutores: [],
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modalAgregarAutor: !prevState.modalAgregarAutor
        }));
      }

    componentDidMount(){
        config.get('/lista_autor').
        then( response =>{
            console.log(response.data)
            this.setState({isLoading:false,dataAutores:response.data});
        }

        )
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
                    <div>{
                        (!this.state.isLoading) ?
                       <Table responsive="md">
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
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.nombre}</td>
                                        <td>{item.ap_paterno}</td>
                                        <td>{item.ap_materno}</td>
                                        <td>{item.fec_nac}</td>
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