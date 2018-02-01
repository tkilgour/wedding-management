import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class PartyForm extends Component {
	constructor(props) {
		super(props);
		this.state = { party_name: "" };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePartyNameChange = this.handlePartyNameChange.bind(this);
	}

	handlePartyNameChange(e) {
		this.setState({ party_name: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		let party_name = this.state.party_name.trim();
		if (!party_name) return;

		this.props.onPartySubmit({ party_name: party_name, guests: [] });
		this.setState({ party_name: "" });
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group>
					<Form.Input placeholder="Name of party" value={this.state.party_name} onChange={this.handlePartyNameChange} />
					<Form.Button content="Submit" />
				</Form.Group>
			</Form>
		);
	}
}

export default PartyForm;
