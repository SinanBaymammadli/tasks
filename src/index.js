import React, { Component } from "react";
import { View, ActivityIndicator, YellowBox } from "react-native";

import { createRootNavigator } from "./router";
import { auth } from "./api";

YellowBox.ignoreWarnings(["Setting a timer"]);
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

export default class App extends Component {
  state = {
    loading: true,
    user: null
  };

  componentDidMount() {
    this.authSubscription = auth.onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    const { loading, user } = this.state;
    if (loading)
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );

    if (user) {
      const signedIn = true;
      const Layout = createRootNavigator(signedIn);
      return <Layout />;
    } else {
      const signedIn = false;
      const Layout = createRootNavigator(signedIn);
      return <Layout />;
    }
  }
}
