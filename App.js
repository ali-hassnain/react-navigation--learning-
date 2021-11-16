import React from "react";
import { View, TextInput, FlatList } from "react-native";
import { Text, Button } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PostCard from "./components/PostCard";
import { Container } from "./styles/FeedStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import AddPost from "./components/AddPost";

const Posts = [
  {
    id: "1",
    userName: "Ali Hassnain",
    Image: require("./assets/ali.jpeg"),
    postTime: "40 minutes ago",
    post: "Let's go for a retreat in these winters at some warm place.",
    postImage: require("./assets/beach.jpg"),
    liked: true,
    likes: "14",
    comments: "5",
  },
  {
    id: "2",
    userName: "Kate Winslet",
    Image: require("./assets/girl.jpg"),
    postTime: "2 hours ago",
    post: "I love to travel to Pakistan. It is a safe and calm place to travel with such scenery. This place is Fairy Meadows in the Northern Pakistan❤️",
    postImage: require("./assets/fairymeadows.jpg"),
    liked: true,
    likes: "152",
    comments: "78",
  },
  {
    id: "3",
    userName: "Waqar Ali",
    Image: require("./assets/boy.jpg"),
    postTime: "2 minutes ago",
    post: "Lahore is a cultural place to travel. I would love to host you guys to travel anywhere in Lahore.",
    postImage: require("./assets/lahore.jpg"),
    liked: true,
    likes: "100",
    comments: "28",
  },
];

function Cards({ navigation }) {
  return (
    <Container>
      <Button
        onPress={() => {
          navigation.navigate("AddPost");
        }}
      >
        Posts
      </Button>
      <FlatList
        data={Posts}
        renderItem={({ item }) => <PostCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

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
      {/* <Button
        onPress={() => {
          navigation.navigate("Cards");
        }}
      >
        Cards
      </Button> */}
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
      {/* <MainStack.Screen name="Card" component={Cards}></MainStack.Screen> */}
      <MainStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="DeatailScreen"
        component={DeatailScreen}
        options={{
          title: "Details",
          headerShown: false,
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
    // mode="modal"
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: "#80d0c7",
    //   },
    // }}
    >
      {/* <RootStack.Screen name="card" component={Cards}></RootStack.Screen> */}
      <RootStack.Screen
        name="Quotes"
        component={MainStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Mymodal"
        component={ModalScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "green" },
        }}
      />
      <RootStack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          headerShown: false,
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

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-listbox" : "ios-list";
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      {/* You can add as many buttons you want in this bottom bar over here and never go more than 5 tabs! */}

      <Tabs.Screen
        name="Home"
        component={RootStackScreen}
        options={{
          headerShown: false,
        }}
      ></Tabs.Screen>
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
        <Drawer.Screen name="Home" component={TabNavigation} />
        <Drawer.Screen name="Posts" component={Cards}></Drawer.Screen>
        <Drawer.Screen name="Quote of the day" component={FirstItem} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
