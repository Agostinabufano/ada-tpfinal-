import React, { Component } from 'react';
import { withRouter } from 'react-router';
import logo from "./img/Ada_Iso_Blanco.png";
import searchImg from "./img/Icono_Search.png";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: "Nunca dejes de buscar",
            inputVal: "",
        }
        this.inputChange = this.inputChange.bind(this)
    }

    inputChange(e) {
        this.setState({
            inputVal: e.target.value
        })
    }

    render() {
        return (
            <header>
                <figure>
                    <img className="adaImg" src={logo}></img>
                </figure>
                <input className="searchInput" placeholder={this.state.placeholder} value={this.state.inputVal} onChange={(e) => this.inputChange(e)}></input>
                <div>
                    <img className="searchImg" src={searchImg} onClick={(e) => this.props.history.push('/items?search=' + this.state.inputVal)} />
                </div>
            </header>
        );
    }
}

export default withRouter(Header)