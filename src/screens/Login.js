import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { auth } from "../api";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loaded: true
  };

  login = () => {
    const { email, password } = this.state;
    this.setState({
      loaded: false
    });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          loaded: true
        });
      })
      .catch(error => {
        const { message } = error;
        this.setState({
          error: message,
          loaded: true
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.form}>
            <View style={styles.imageWrapper}>
              <Text style={styles.headerText}>Login</Text>
            </View>
            <View style={styles.feedbackWrapper}>
              {!this.state.loaded ? (
                <ActivityIndicator size="small" color="blue" />
              ) : (
                <Text style={styles.errorText}>{this.state.error}</Text>
              )}
            </View>
            <TextInput
              keyboardType="email-address"
              style={styles.input}
              placeholder="Email"
              autoFocus={false}
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={email => this.setState({ email })}
              value={this.state.driver_id}
              blurOnSubmit={false}
              onSubmitEditing={() => this.PasswordInput.focus()}
            />

            <TextInput
              ref={passwordInput => (this.passwordInput = passwordInput)}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              onSubmitEditing={this.login}
            />

            <Button title="Login" onPress={this.login} />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Register")}
              style={styles.registerBtn}
            >
              <Text style={styles.registerBtnText}>Create account</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  form: {
    marginHorizontal: 15
  },
  input: {
    marginBottom: 15,
    fontSize: 18
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 10
  },
  image: {
    width: 100,
    height: 115
  },
  errorText: {
    textAlign: "center",
    color: "red"
  },
  feedbackWrapper: {
    minHeight: 20,
    marginBottom: 10
  },
  registerBtn: {
    padding: 20,
    alignItems: "center"
  },
  registerBtnText: {
    fontSize: 16
  },
  headerText: {
    fontSize: 24
  }
});
