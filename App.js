import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default class App extends React.Component {
  state = {
    pos: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      const initialPosition = JSON.stringify(pos);
      this.setState({ pos });
    });
  }

  renderMap() {
    console.log(this.state.pos);
    return (
      <MapView
        style={styles.map}
        region={{
          latitude: this.state.pos.coords.latitude,
          longitude: this.state.pos.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        <Marker
          coordinate={{
            latitude: this.state.pos.coords.latitude,
            longitude: this.state.pos.coords.longitude
          }}
        />
      </MapView>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.pos ? this.renderMap() : null}
        <Text>{JSON.stringify(this.state.pos)}</Text>
      </View>
    );
  }
}
