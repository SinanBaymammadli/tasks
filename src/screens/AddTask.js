import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
  Keyboard
} from "react-native";
import { NavigationActions } from "react-navigation";
import { database, auth } from "../api";
import moment from "moment";

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default class AddTask extends Component {
  state = {
    name: "",
    price: "",
    loaded: true
  };

  addNewTask = () => {
    this.setState({
      loaded: false
    });
    const user = auth.currentUser;
    const title_date = moment().format("DD MMMM | HH:mm");

    database
      .ref("task")
      .push({
        about_skill: {
          asdsadas: {
            name: "Tras",
            index: "0",
            price: "10"
          },
          lkrokerokoekf: {
            name: "Sac",
            index: "1",
            price: "20"
          }
        },
        activate: 1,
        active: false,
        index: makeid(),
        style_name: this.state.name,
        title_date,
        total_price: this.state.price,
        user_id: user.uid,
        user_name: user.email
      })
      .then(() => {
        this.setState({
          name: "",
          price: "",
          loaded: true
        });

        Keyboard.dismiss();

        this.props.navigation.dispatch(NavigationActions.back());

        ToastAndroid.showWithGravity(
          "New Task added",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Add Task</Text>
        <KeyboardAvoidingView>
          <View style={styles.form}>
            <View style={styles.feedbackWrapper}>
              {!this.state.loaded ? (
                <ActivityIndicator size="small" color="blue" />
              ) : (
                <Text style={styles.errorText}>{this.state.error}</Text>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              returnKeyType="next"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              blurOnSubmit={false}
              onSubmitEditing={() => this.priceInput.focus()}
            />

            <TextInput
              ref={priceInput => (this.priceInput = priceInput)}
              style={styles.input}
              placeholder="Price"
              onChangeText={price => this.setState({ price })}
              value={this.state.price}
              onSubmitEditing={this.addNewTask}
            />

            <Button title="Add new task" onPress={this.addNewTask} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
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
  }
});
