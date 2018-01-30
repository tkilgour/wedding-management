import React, { Component } from "react";
import Party from "./party";
import { Container, Header, Card } from "semantic-ui-react";

class PartyList extends Component {
	render() {
		const data = this.props.data;

		let partyCards = data.map(party => {
			let partyGuests = party.guests.map(guest => {
				return (
					<Card.Meta>{`${guest.first_name} ${guest.last_name}`}</Card.Meta>
				);
			});

			return (
				<Card key={party["_id"]}>
					<Card.Content>
						<Card.Header>{party.party_name}</Card.Header>
						{partyGuests}
					</Card.Content>
				</Card>
			);
		});

		return (
			<Container style={{ marginTop: "3em" }}>
				<Header as="h1">Guestlist</Header>
				<Card.Group itemsPerRow={4}>{partyCards}</Card.Group>
			</Container>
		);
	}
}

export default PartyList;
