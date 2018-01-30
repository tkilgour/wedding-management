import React, { Component } from "react";

class Party extends Component {
	render() {
		const party = this.props.children;

		let guests = party.guests.map(guest => {
			const fullName = `${guest.first_name} ${guest.last_name}`;
			return <p key={fullName}>{fullName}</p>
		})

		return (
			<div>
				<h2>{party.party_name}</h2>
				{guests}
			</div>
		);
	}
}

export default Party;
