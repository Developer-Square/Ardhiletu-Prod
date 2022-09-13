/* eslint-disable no-undef */
import React, { Component } from "react";

import "./dashboard.css";

class Map extends Component {
	state = {
		defaultCenter: { lat: -1.286389, lng: 36.817223 },
		markers: [
			{ lat: -1.2758, lng: 36.823 },
			{
				lat: -4.04374,
				lng: 39.658871,
			},
			{
				lat: -1.85238,
				lng: 36.77683,
			},
		],
	};

	componentDidMount() {
		document.body.classList.add("is-map");
		this.handleAttachGoogleMap();
	}

	componentWillUnmount() {
		document.body.classList.remove("is-map");
	}

	handleAttachGoogleMap = () => {
		const { defaultCenter } = this.state;
		this.map = new google.maps.Map(document.getElementById("google-map"), {
			center: defaultCenter,
			zoom: 9,
		});

		setTimeout(() => {
			this.handleDrawMarkers();
		}, 2000);
	};

	handleDrawMarkers = () => {
		const { markers } = this.state;
		markers.forEach((marker) => {
			new google.maps.Marker({
				position: marker,
				map: this.map,
			});
		});
	};

	render() {
		return <div id='google-map'>Map</div>;
	}
}

export default Map;
