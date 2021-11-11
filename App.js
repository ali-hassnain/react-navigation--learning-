import React from "react";
import { View, TextInput } from "react-native";
import { Text, Button } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";

function HomeScreen({ navigation }) {
  const [name, setName] = React.useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={{ fontSize: 21, margin: 30 }}
        placeholder="Please enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      ></TextInput>
      <Button
        color="info"
        title="See the magic"
        onPress={() => {
          navigation.navigate("DeatailScreen", { name });
        }}
      >
        Enter
      </Button>
    </View>
  );
}

function DeatailScreen({ navigation, route }) {
  const { name } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 30,
          marginBottom: 50,
          fontWeight: "bold",
          marginHorizontal: 30,
        }}
      >
        {name}, you are special 😊
      </Text>
      <Button
        color="#50C7C7"
        shadowless
        title="Home"
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      >
        Home
      </Button>
      <Button
        color="success"
        title="another magic?"
        onPress={() => {
          navigation.navigate("Mymodal");
        }}
      >
        Experience
      </Button>
      <Text style={{ fontSize: 13, paddingHorizontal: 40, paddingTop: 20 }}>
        Experience the vibe and spread the good message.
      </Text>
    </View>
  );
}

// const Stack = createNativeStackNavigator();

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30, position: "absolute", top: 120 }}>
        Quote of the day!
      </Text>
      <Text style={{ fontSize: 24, paddingHorizontal: 30, paddingBottom: 50 }}>
        Stay Happy and Thankful to Allah for what you have!
      </Text>
      <Button title="Close the modal" onPress={() => navigation.goBack()}>
        Back
      </Button>
    </View>
  );
}
const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      <MainStack.Screen
        name="DeatailScreen"
        component={DeatailScreen}
        options={{
          title: "Details",
          headerRight: () => (
            <Button
              round
              color="#50C7C7"
              size="small"
              title="Done"
              onPress={() => alert("Thank you for telling your name :)")}
            >
              Done
            </Button>
          ),
        }}
      />
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#80d0c7",
        },
      }}
    >
      <RootStack.Screen name="Naino Quotes" component={MainStackScreen} />
      <RootStack.Screen
        name="Mymodal"
        component={ModalScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "green" },
        }}
      />
    </RootStack.Navigator>
  );
}

function TabNavigation() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // if (route.name === "Home") {
          //   iconName = focused
          //     ? "ios-information-circle"
          //     : "ios-information-circle-outline";
          // } else if (route.name === "Settings") {
          //   iconName = focused ? "ios-listbox" : "ios-list";
          // }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      {/* You can add as many buttons you want in this bottom bar over here and never go more than 5 tabs! */}

      <Tabs.Screen name="Home" component={RootStackScreen}></Tabs.Screen>
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarBadge: 1,
        }}
      ></Tabs.Screen>
    </Tabs.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ margin: 60 }}>
      <Text style={{ fontSize: 24 }}>This is settings tab</Text>
    </View>
  );
}

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function FirstItem({ navigation }) {
  return (
    <View style={{ margin: 60, backgroundColor: "black", padding: 60 }}>
      <Text style={{ fontSize: 24, color: "#fff" }}>
        People forget what you say,
      </Text>
      <Text style={{ fontSize: 24, color: "#fff" }}>
        people forget what you do,
      </Text>
      <Text style={{ fontSize: 24, color: "#fff" }}>
        but they never forget the way you make them feel.
      </Text>
    </View>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Quote One" component={FirstItem} />
        <Drawer.Screen name="Home" component={TabNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
