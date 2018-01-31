import React, { Component } from "react";
import Party from "./party";
import { Container, Header, Grid, Card } from "semantic-ui-react";

class PartyList extends Component {
	render() {
		const data = this.props.data;

		let partyCards = data.map(party => {
			return (
				<Grid.Column mobile={16} tablet={8} computer={4} key={party["_id"]}>
					<Party>{party}</Party>
				</Grid.Column>
			);
		});

		return (
			<Container style={{ marginTop: "3em" }}>
				<Header as="h1">Guestlist</Header>
				<Card.Group itemsPerRow={4}>
					<Grid>{partyCards}</Grid>
				</Card.Group>
			</Container>
		);
	}
}

export default PartyList;
