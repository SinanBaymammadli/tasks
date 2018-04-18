import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { auth } from "../api";

export default class Settings extends Component {
  signOut = () => {
    auth
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Settings</Text>
        <Button onPress={() => this.signOut()} title="Sign Out" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
