import React from "react";
import { TabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";

import Tasks from "./screens/Tasks";
import Settings from "./screens/Settings";

const RootNavigator = TabNavigator(
  {
    Tasks: {
      screen: Tasks,
      navigationOptions: ({ navigation }) => ({
        title: "Hizmetler",
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="timer-sand" size={25} color={tintColor} />;
        }
      })
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        title: "Fazlasi",
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="dots-horizontal" size={25} color={tintColor} />;
        }
      })
    }
  },
  {
    initialRouteName: "Tasks",
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: "#8bc250",
      labelStyle: {
        fontSize: 8,
        margin: 0,
        marginTop: 5,
        fontWeight: "bold"
      },
      style: {
        backgroundColor: "#fff"
      },
      inactiveTintColor: "#4e4e4e",
      indicatorStyle: {
        backgroundColor: "#8bc250"
      }
    }
  }
);

export default RootNavigator;
