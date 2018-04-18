import React from "react";
import { TouchableOpacity } from "react-native";
import {
  TabNavigator,
  StackNavigator,
  NavigationActions
} from "react-navigation";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/dist/Ionicons";

import Tasks from "./screens/Tasks";
import Settings from "./screens/Settings";
import Login from "./screens/Login";
import Register from "./screens/Register";
import AddTask from "./screens/AddTask";

const Guest = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register",
      header: null
    }
  }
});

const TaskStackNavigator = StackNavigator({
  Tasks: {
    screen: Tasks,
    navigationOptions: ({ navigation }) => ({
      title: "Tasks",
      headerStyle: {
        backgroundColor: "#f4f4f4"
      },
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddTask")}
          style={{ padding: 15 }}
          activeOpacity={0.1}
        >
          <Ionicons name="ios-add-outline" size={30} color="#007bff" />
        </TouchableOpacity>
      )
    })
  },
  AddTask: {
    screen: AddTask,
    navigationOptions: ({ navigation }) => ({
      title: "Add new task",
      headerStyle: {
        backgroundColor: "#f4f4f4"
      }
    })
  }
});

const User = TabNavigator(
  {
    Tasks: {
      screen: TaskStackNavigator,
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
      activeTintColor: "#007bff",
      labelStyle: {
        fontSize: 8,
        margin: 0,
        marginTop: 5,
        fontWeight: "bold"
      },
      style: {
        backgroundColor: "#f9f9f9"
      },
      inactiveTintColor: "#4e4e4e",
      indicatorStyle: {
        backgroundColor: "#007bff"
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) =>
  StackNavigator(
    {
      Guest: {
        screen: Guest
      },
      User: {
        screen: User
      }
    },
    {
      headerMode: "none",
      initialRouteName: signedIn ? "User" : "Guest"
    }
  );

export const ResetToGuest = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: "Guest" })]
});

export const ResetToUser = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: "User" })]
});
