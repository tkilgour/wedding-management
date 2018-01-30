import React, { Component } from "react";
import axios from "axios";
import PartyList from "./components/party-list";

const API = "http://localhost:3001/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };

    this.loadPartiesFromServer = this.loadPartiesFromServer.bind(this);
  }

  loadPartiesFromServer() {
    axios
      .get(`${API}/parties`)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.loadPartiesFromServer();
  }

  render() {
    return (
      <div>
        <PartyList data={this.state.data} />
      </div>
    );
  }
}

export default App;
