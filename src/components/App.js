import React, { Component } from 'react';
import Menu from './Menu';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Menu />
                </div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        )
    }
}