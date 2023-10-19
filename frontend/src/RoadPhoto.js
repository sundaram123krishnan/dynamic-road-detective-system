import React, { Component } from 'react';
import axios from 'axios';

class RoadPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoUrl: null,
    };
  }

  componentDidMount() {
    // Replace 'YOUR_API_KEY' with your Google Street View Static API key
    const apiKey = 'AIzaSyDkRb7OLdil8cgM2b5ZRvbbJYzZZvtNBBE';

    // Specify the latitude and longitude
    const { latitude, longitude } = this.props;

    // Make a request to the Google Street View Static API to get a road photo
    axios
      .get(
        `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${latitude},${longitude}&key=${apiKey}`
      )
      .then((response) => {
        this.setState({ photoUrl: response.config.url });
      })
      .catch((error) => {
        console.error('Error fetching road photo:', error);
      });
  }

  render() {
    const { photoUrl } = this.state;

    return (
      <div>
        {photoUrl ? (
          <img src={photoUrl} alt="Road" />
        ) : (
          <p>Loading road photo...</p>
        )}
      </div>
    );
  }
}

export default RoadPhoto;
