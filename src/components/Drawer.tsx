import appcontext from "appcontext";
import React, { useContext, Suspense, lazy } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Auth } from "screens";
import createTheme, { colors } from "theme";
import { Auth as AmplifyAuth } from "aws-amplify";
const WebStyles = lazy(() => import("../styles/Web"));

export default function Drawer() {
  const { darkmode, setDarkMode, user, isAuthenticated } = useContext(
    appcontext
  );
  const theme = createTheme(darkmode);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background(darkmode),
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background(darkmode),
          },
        ]}
      >
        {user?.name && (
          <View style={[styles.block, { alignSelf: "center" }]}>
            <Text style={[theme.typography.title, { fontSize: 24 }]}>
              {user.name}
            </Text>
          </View>
        )}

        <View>
          <TouchableOpacity
            onPress={async () => {
              await AmplifyAuth.signOut();
              isAuthenticated(false);
            }}
          >
            <Text style={[theme.typography.title, styles.link]}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 5, marginVertical: 10 }}>
          <Switch
            trackColor={{ false: colors.brass, true: colors.oxford }}
            thumbColor={darkmode ? colors.brass : colors.slate}
            onValueChange={() => setDarkMode(!darkmode)}
            value={darkmode}
          />
        </View>
      </View>

      <Suspense fallback={<></>}>
        {Platform.OS === "web" && <WebStyles />}
      </Suspense>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    zIndex: 999,
  },
  block: {
    marginBottom: 10,
    padding: 15,
  },
  link: {
    fontSize: 18,
    color: colors.emerald,
    margin: 5,
  },
});
