import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { database } from "../api";
import Task from "../components/Task";

export default class Tasks extends Component {
  state = {
    tasks: [],
    refreshing: false
  };

  componentDidMount = () => {
    this.getTasks();
  };

  getTasks = () => {
    this.setState({
      refreshing: true
    });

    database.ref("task").on("value", tasks => {
      tasks.forEach(task => {
        this.setState({
          tasks: [...this.state.tasks, task.val()],
          refreshing: false
        });
      });
    });
  };

  _keyExtractor = item => item.user_id;

  _renderItem = ({ item }) => <Task task={item} />;

  render() {
    const { tasks } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={tasks}
          onRefresh={this.getTasks}
          keyExtractor={this._keyExtractor}
          refreshing={this.state.refreshing}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
