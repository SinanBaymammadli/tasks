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

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loaded: true
  };

  register = () => {
    const { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        error: "Passwords don't match."
      });
    } else {
      this.setState({
        loaded: false,
        error: ""
      });
      auth
        .createUserWithEmailAndPassword(email, password)
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
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.form}>
            <View style={styles.imageWrapper}>
              <Text style={styles.headerText}>Register</Text>
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
              value={this.state.email}
              blurOnSubmit={false}
              onSubmitEditing={() => this.PasswordInput.focus()}
            />
            <TextInput
              ref={PasswordInput => (this.PasswordInput = PasswordInput)}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              onSubmitEditing={() => this.confirmPasswordInput.focus()}
            />

            <TextInput
              ref={confirmPasswordInput =>
                (this.confirmPasswordInput = confirmPasswordInput)
              }
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={confirmPassword => {
                this.setState({ confirmPassword });
              }}
              value={this.state.confirmPassword}
              onSubmitEditing={this.register}
            />

            <Button title="Sign up" onPress={this.register} />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
              style={styles.registerBtn}
            >
              <Text style={styles.registerBtnText}>
                You already have an account? Login here
              </Text>
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
    alignItems: "center"
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
