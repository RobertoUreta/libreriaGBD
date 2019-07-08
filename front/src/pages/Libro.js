import React, { Component } from 'react'
import {TablaLibro} from '../components/TablaLibro'
import request from '../config'
import {Layout } from '../components/Layout'
export class Libro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            libros: [],
            mensaje: '',
            esAdmin: false,
        }
    }

    render() {
        return (
            
                <div id="body"> 
                
            <Layout></Layout>
                    <div style={{paddingTop: '100px' }}>
                    </div>
                    <div>
                       <TablaLibro/>
                    </div>
                </div>
        )
    }
}