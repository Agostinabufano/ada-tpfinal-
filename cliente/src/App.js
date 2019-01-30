import React, { Component } from 'react';
import Products from "./Products";
import { BrowserRouter, Route } from 'react-router-dom';
import Detail from "./Detail";
import Header from "./Header";
import './styles/App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header></Header>
            <Route path="/items" exact strict component={Products} />
            <Route path="/items/:id" exact strict component={Detail} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;