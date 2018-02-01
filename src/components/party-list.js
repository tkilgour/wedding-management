import React, { Component } from "react";
import Party from "./party";
import { Grid, Card } from "semantic-ui-react";

class PartyList extends Component {
	render() {
		const data = this.props.data;

		let partyCards = data.map(party => {
			return (
				<Grid.Column mobile={16} tablet={8} computer={4} key={party._id}>
					<Party
						uniqueID={party._id}
						onPartyDelete={this.props.onPartyDelete}
						data={data}
					>
						{party}
					</Party>
				</Grid.Column>
			);
		});

		return (
			<Card.Group>
				<Grid container>{partyCards}</Grid>
			</Card.Group>
		);
	}
}

export default PartyList;
