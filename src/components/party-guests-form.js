import React, { Component } from "react";
import { Header, Form } from "semantic-ui-react";

class PartyGuestsForm extends Component {
	render() {
		return (
			<Form>
				<Header as="h3" style={{ paddingTop: "2em" }}>Add New Guest</Header>
				<Form.Group widths="equal">
					<Form.Field>
						<label htmlFor="firstName" className="offscreen">First Name</label>
						<input name="firstName" id="firstName" placeholder="First Name" />
					</Form.Field>
					<Form.Field>
						<label htmlFor="lastName" className="offscreen">Last Name</label>
						<input name="lastName" id="lastName" placeholder="Last Name" />
					</Form.Field>
					<Form.Button type="submit">Submit</Form.Button>
				</Form.Group>
			</Form>
		);
	}
}

export default PartyGuestsForm;
