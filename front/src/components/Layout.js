import React, { Component } from 'react'
import { NavBar } from './NavBar'

export class Layout extends Component {

    constructor(props){
        super(props)
        this.state = {
            mustBeSideNav: true,
        }
    }
    

    render() {
        return (
            <NavBar/>
        )
    }
}