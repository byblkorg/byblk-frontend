import React, { useState, useMemo, useEffect, useContext } from "react";
import { StatusBar } from "react-native";
import AppContext from "./appcontext";
import { useFonts } from "@use-expo/font";
import createTheme from "theme";
import { Home, Business, WelcomeSpinner, Auth, Results } from "screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer as CustomDrawer } from "components";
import Amplify, { Auth as AmplifyAuth } from "aws-amplify";
import appcontext from "./appcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Business as BusinessType } from "@gcmp/types";
import { createURL } from "expo-linking";

const prefix = createURL("/");

const config = {
  screens: {
    app: {
      screens: {
        business: "business/:region/:csc/:slug",
        home: "home",
        results: "results",
        welcome: "welcome",
        auth: "auth",
      },
    },
  },
};

const linking = {
  prefixes: [prefix],
  config,
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("hasReadIntro");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_FCQ7znFrz",
    userPoolWebClientId: "1aqndu29mudppcpaleb30jdamp",
  },
  API: {
    aws_appsync_graphqlEndpoint:
      "https://knvgtx7b4fco3c5a6dh25wdvie.appsync-api.us-east-1.amazonaws.com/graphql",
    aws_appsync_region: "us-east-1",
    aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  },
});

export type RootStackParamList = {
  auth: undefined;
  welcome: undefined;
  home: undefined;
  business: {
    data: BusinessType;
    region: string;
    csc: string;
    slug: string;
  };
  results: {
    filter?: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();

const MainStack = () => {
  const { authenticated, hasReadIntro } = useContext(appcontext);

  if (!authenticated) {
    return (
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="auth" component={Auth} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      {!hasReadIntro && (
        <Stack.Screen name="welcome" component={WelcomeSpinner} />
      )}
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="business" component={Business} />
      <Stack.Screen name="results" component={Results} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [darkmode, setDarkMode] = useState(true);
  const [authenticated, isAuthenticated] = useState(false);
  const [hasReadIntro, readIntro] = useState(false);
  const [user, setUser] = useState(null);
  const [initializing, isInitializing] = useState(true);

  const [fontsLoaded] = useFonts({
    CooperHewitt: require("./assets/fonts/CooperHewitt-Heavy.otf"),
    CothamSans: require("./assets/fonts/CothamSans.otf"),
    Office: require("./assets/fonts/OfficeCodePro-Light.otf"),
    Work: require("./assets/fonts/WorkSans-ExtraBold.otf"),
  });

  const theme = useMemo(() => createTheme(darkmode), []);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const user = await AmplifyAuth.currentUserInfo();
    const hasReadIntro = await getData();
    readIntro(hasReadIntro);

    if (user) {
      setUser(user);
      isAuthenticated(true);
      isInitializing(false);
    } else {
      isAuthenticated(false);
      isInitializing(false);
    }
  }

  if (fontsLoaded && !initializing) {
    return (
      <AppContext.Provider
        value={{
          darkmode,
          setDarkMode,
          theme,
          authenticated,
          isAuthenticated,
          hasReadIntro,
          user,
        }}
      >
        <NavigationContainer linking={linking}>
          <StatusBar
            barStyle={darkmode ? "light-content" : "dark-content"}
            backgroundColor={theme.colors.background(darkmode)}
          />
          <Drawer.Navigator
            drawerPosition="right"
            drawerContent={() => <CustomDrawer />}
          >
            <Drawer.Screen name="app" component={MainStack} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    );
  } else {
    return null;
  }
}
