import React, { Component } from "react";
import axios from "axios";
import { Header, Grid } from "semantic-ui-react";

import PartyForm from "./components/party-form";
import PartyList from "./components/party-list";

const URI = "http://localhost:3001/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };

    this.loadPartiesFromServer = this.loadPartiesFromServer.bind(this);
    this.handlePartySubmit = this.handlePartySubmit.bind(this);
  }

  loadPartiesFromServer() {
    axios
      .get(`${URI}/parties`)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handlePartySubmit(party) {
    let parties = this.state.data;
    party._id = Date.now()
    let newParties = parties.concat([party]);


    this.setState({ data: newParties });

    axios.post(`${URI}/parties/`, party).catch(err => {
      console.error(err);
      this.setState({ data: parties });
    });
  }

  componentDidMount() {
    this.loadPartiesFromServer();
  }

  render() {
    return (
      <div style={{ marginTop: "3em" }}>
        <Grid container columns={1}>
          <Grid.Column>
            <Header as="h1">Wedding Guestlist</Header>
          </Grid.Column>
          <Grid.Column style={{ marginBottom: "2em" }}>
            <PartyForm onPartySubmit={this.handlePartySubmit} />
          </Grid.Column>
        </Grid>

        <PartyList data={this.state.data} />
      </div>
    );
  }
}

export default App;
