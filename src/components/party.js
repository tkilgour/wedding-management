import React, { Component } from "react";
import { Modal, Card, Header, List, Button, Icon } from "semantic-ui-react";

import PartyGuestsForm from "./party-guests-form";
import "./party.css";

class Party extends Component {
	constructor(props) {
		super(props);

		this.deleteParty = this.deleteParty.bind(this);
	}

	deleteParty(e) {

		e.preventDefault();
		let id = this.props.uniqueID;
		this.props.onPartyDelete(id);
	}

	render() {
		const party = this.props.children;

		let guests = party.guests.map(guest => {
			const fullName = `${guest.first_name} ${guest.last_name}`;
			return <Card.Meta key={fullName}>{fullName}</Card.Meta>;
		});

		return (
			<Modal
				trigger={
					<Card fluid href="#">
						<Card.Content>
							<Card.Header>{party.party_name}</Card.Header>
							{guests}
						</Card.Content>
					</Card>
				}
			>
				<Modal.Content>
					<Modal.Description>
						<Button
							negative
							icon
							floated="right"
							compact
							size="large"
							aria-label="delete button"
							onClick={this.deleteParty}
						>
							<Icon name="trash" />
						</Button>
						<Header as="h2" style={{ marginTop: "0" }}>
							{party.party_name}
						</Header>
						<List>
							{party.guests.map(guest => {
								const fullName = `${guest.first_name} ${guest.last_name}`;
								return (
									<List.Item icon="user" content={fullName} key={fullName} />
								);
							})}
						</List>
						<PartyGuestsForm />
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default Party;
