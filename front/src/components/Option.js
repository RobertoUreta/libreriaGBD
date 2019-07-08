import React, {Component} from 'react'

export class Option extends Component{
    render(){
        const {options} = this.props
        return(
            options.map((op,i) =>(
                <option key={i}>{op}</option>
            ) )
        )
    }
}