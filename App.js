import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "./src/screens/AuthScreen/SignInScreen";
import SignUpScreen from "./src/screens/AuthScreen/SignUpScreen";
import FirstScreen from "./src/screens/AuthScreen/FirstScreen";
import HomeScreen from "./src/screens/AppScreens/HomeDash/HomeScreen";
import ProfileScreen from "./src/screens/AppScreens/ProfileDash/ProfileScreen";
import PlaceScreen from "./src/screens/AppScreens/HomeDash/PlaceScreen";
import SearchScreen from "./src/screens/AppScreens/SearchDash/SearchScreen";
import GroupScreen from "./src/screens/AppScreens/GroupDash/GroupScreen";
import LoadingScreen from "./src/screens/AuthScreen/LoadingScreen";
import ExpenseScreen from "./src/screens/AppScreens/ExpenseDash/ExpenseScreen";
import { FontAwesome } from "@expo/vector-icons";
import CreateGroupScreen from "./src/screens/AppScreens/GroupDash/CreateGroup";
import JoinGroupScreen from "./src/screens/AppScreens/GroupDash/JoinGroupScreen";
import ContactUsScreen from "./src/screens/AppScreens/ProfileDash/ContactUsScreen";
import GroupDashScreen from "./src/screens/AppScreens/GroupDash/GroupDashScreen";
import MapScreen from "./src/screens/AppScreens/GroupDash/MapScreen";
import ChatScreen from "./src/screens/AppScreens/ExpenseDash/ChatScreen";
import { MyContext } from "./Context";
import { ActivityIndicator } from "react-native";
import UserExpenseScreen from "./src/screens/AppScreens/ExpenseDash/UserExpenseScreen";
import AddExpenseScreen from "./src/screens/AppScreens/ExpenseDash/AddExpenseScreen";
import CategoryScreen from "./src/screens/AppScreens/HomeDash/CategoryScreen";

const RootStack = createStackNavigator();

const TabStack = createBottomTabNavigator();
const TabStackScreen = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await firebase
        .firestore()
        .collection("user")
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot) => {
          setUserData(snapshot.data());
        });
    })();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#2B3008"
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      />
    );
  }

  return (
    <MyContext.Provider value={userData}>
      <TabStack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "HomeDash") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "SearchDash") {
              iconName = focused ? "search" : "search";
            } else if (route.name === "GroupDash") {
              iconName = focused ? "location-arrow" : "location-arrow";
            } else if (route.name === "ExpenseDash") {
              iconName = focused ? "google-wallet" : "google-wallet";
            } else if (route.name === "ProfileDash") {
              iconName = focused ? "user" : "user";
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#2B3088",
          inactiveTintColor: "gray",
          showLabel: false,
        }}>
        <TabStack.Screen name="HomeDash" component={HomeStackScreen} />
        <TabStack.Screen name="SearchDash" component={SearchStackScreen} />
        <TabStack.Screen name="GroupDash" component={GroupStackScreen} />
        <TabStack.Screen name="ExpenseDash" component={ExpenseStackScreen} />
        <TabStack.Screen name="ProfileDash" component={ProfileStackScreen} />
      </TabStack.Navigator>
    </MyContext.Provider>
  );
};

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="First"
        component={FirstScreen}
        options={{ headerShown: null }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: null }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: null }}
      />
    </AuthStack.Navigator>
  );
};

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Place" component={PlaceScreen} />
      <HomeStack.Screen name="Category" component={CategoryScreen} />
    </HomeStack.Navigator>
  );
};
const SearchStack = createStackNavigator();
const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};
const GroupStack = createStackNavigator();
const GroupStackScreen = () => {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen name="Group" component={GroupScreen} />
      <GroupStack.Screen name="Create" component={CreateGroupScreen} />
      <GroupStack.Screen name="Join" component={JoinGroupScreen} />
      <GroupStack.Screen name="Dash" component={GroupDashScreen} />
      <GroupStack.Screen name="Map" component={MapScreen} />
    </GroupStack.Navigator>
  );
};
const ExpenseStack = createStackNavigator();
const ExpenseStackScreen = () => {
  return (
    <ExpenseStack.Navigator>
      <ExpenseStack.Screen name="Expense" component={ExpenseScreen} />
      <ExpenseStack.Screen name="Chat" component={ChatScreen} />
      <ExpenseStack.Screen name="UserExpense" component={UserExpenseScreen} />
      <ExpenseStack.Screen name="AddExpense" component={AddExpenseScreen} />
    </ExpenseStack.Navigator>
  );
};
const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Contact" component={ContactUsScreen} />
    </ProfileStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Loading">
        <RootStack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: null }}
        />
        <RootStack.Screen
          name="Tab"
          component={TabStackScreen}
          options={{ headerShown: null }}
        />
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{ headerShown: null }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default App;
