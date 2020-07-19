import React,  { Component }  from 'react';
import ReactDOM from 'react-dom';
import locha_source from './assets/locha1.jpg';
import './GiltView.css'

class GiltView extends React.Component {
    render() {
        return (
            <img className = {this.props.className}
                src = {locha_source}>
            </img>
        )
    }
}

export default GiltView;