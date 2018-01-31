import React, { Component } from "react";
import { Header, Form } from "semantic-ui-react";

class PartyGuestsForm extends Component {
	render() {
		return (
			<Form>
				<Header as="h3">New Guest</Header>
				<Form.Group widths='equal'>
					<Form.Field>
						<label>First Name</label>
						<input placeholder="First Name" />
					</Form.Field>
					<Form.Field>
						<label>Last Name</label>
						<input placeholder="Last Name" />
					</Form.Field>
				</Form.Group>
				<Form.Button type="submit">Submit</Form.Button>
			</Form>
		);
	}
}

export default PartyGuestsForm;
