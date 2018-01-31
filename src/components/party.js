import React, { Component } from "react";
import { Modal, Card, Header } from "semantic-ui-react";
import "./party.css";

class Party extends Component {
	render() {
		const party = this.props.children;

		let guests = party.guests.map(guest => {
			const fullName = `${guest.first_name} ${guest.last_name}`;
			return <Card.Meta key={fullName}>{fullName}</Card.Meta>;
		});

		return (
			<Modal
				trigger={
					<Card fluid href="javascript:void(0)">
						<Card.Content>
							<Card.Header>{party.party_name}</Card.Header>
							{guests}
						</Card.Content>
					</Card>
				}
			>
				<Modal.Content>
					<Modal.Description>
						<Header as="h2">{party.party_name}</Header>
						{party.guests.map(guest => {
							const fullName = `${guest.first_name} ${guest.last_name}`;
							return <p key={fullName}>{fullName}</p>;
						})}
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default Party;
