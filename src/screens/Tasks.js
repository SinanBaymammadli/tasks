import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import { database } from "../api";
import Task from "../components/Task";

export default class Tasks extends Component {
  state = {
    tasks: [],
    refreshing: false,
    modalVisible: false,
    currentSkills: null
  };

  componentDidMount = () => {
    this.getTasks();
  };

  getTasks = () => {
    this.setState({
      refreshing: true
    });

    database.ref("task").on("value", newTasks => {
      let tasks = [];
      newTasks.forEach(task => {
        tasks.push(task.val());
      });

      this.setState({
        tasks,
        refreshing: false
      });
    });
  };

  _keyExtractor = item => item.index;

  _renderItem = ({ item }) => (
    <Task task={item} itemPressed={this.itemPressed} />
  );

  itemPressed = currentSkills => {
    this.setState({
      modalVisible: true,
      currentSkills: currentSkills
    });
  };

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

        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 22,
              borderRadius: 4,
              borderColor: "rgba(0, 0, 0, 0.1)"
            }}
          >
            {this.state.currentSkills &&
              this.state.currentSkills.map(currentSkill => {
                return (
                  <View key={currentSkill.index} style={styles.skillContainer}>
                    <Text style={styles.skillName}>{currentSkill.name}</Text>
                    <Text style={styles.skillPrice}>
                      {currentSkill.price} $
                    </Text>
                  </View>
                );
              })}
            <View style={styles.closeBtn}>
              <Button
                onPress={() => {
                  this.setState({
                    modalVisible: false
                  });
                }}
                title="Kapat"
              />
            </View>
          </View>
        </Modal>
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
  },
  skillContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2"
  },
  skillName: {
    fontSize: 18,
    color: "#000",
    paddingVertical: 10
  },
  skillPrice: {
    fontSize: 18,
    color: "#000",
    paddingVertical: 10
  },
  closeBtn: {
    marginTop: 30
  }
});
