import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Task extends Component {
  render() {
    const {
      user_name,
      total_price,
      title_date,
      style_name,
      active,
      activate
    } = this.props.task;

    let status;
    let bgColor;
    if (active) {
      if (activate) {
        status = 1; // active
        bgColor = "green";
      }
    } else {
      if (activate) {
        status = 2; // waiting
        bgColor = "gray";
      } else {
        status = 0; // deactive
        bgColor = "red";
      }
    }
    return (
      <View style={styles.task}>
        <View style={styles.taskLeft}>
          <Text style={styles.taskUserName}>{user_name}</Text>
          <Text style={styles.taskDate}>{title_date}</Text>
          <Text style={styles.taskStyle}>{style_name}</Text>
        </View>
        <View style={styles.taskRight}>
          <Text style={styles.taskPrice}>Toplam: {total_price}</Text>
          <View
            style={{
              marginTop: 25,
              padding: 5,
              backgroundColor: bgColor,
              borderRadius: 5
            }}
          >
            <Text style={styles.taskStatusText}>
              {status === 1 && "Onaylanmis"}
              {status === 0 && "Reddedildi"}
              {status === 2 && "Beklemede"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  task: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
    padding: 10,
    marginHorizontal: 15
  },
  taskUserName: {
    fontSize: 20,
    color: "#000"
  },
  taskDate: {
    color: "#a2a2a2"
  },
  taskStyle: {
    marginTop: 25,
    fontSize: 16,
    color: "#000"
  },
  taskPrice: {
    fontSize: 18,
    color: "#000"
  },
  taskRight: {
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  taskStatus: {
    marginTop: 25,
    padding: 5,
    backgroundColor: "red",
    borderRadius: 5
  },
  taskStatusText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  }
});
