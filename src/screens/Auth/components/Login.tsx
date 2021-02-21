import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "components";
import appcontext from "appcontext";
import { colors } from "theme";
import { AuthState } from "../types";
import AuthContext from "../authcontext";
import { useNavigation } from "@react-navigation/native";
import {
  handleLogin,
  americanizePhoneNumber,
  normalizePhoneStringInput,
} from "../functions";
import { Auth } from "aws-amplify";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  marginBottomContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: "70%",
    alignItems: "center",
  },
});

export default function Login() {
  const { theme, isAuthenticated, hasReadIntro } = useContext(appcontext);
  const { setAuthState } = useContext(AuthContext);
  const navigation = useNavigation();
  const [state, setState] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string | undefined>(undefined);

  function updateState(key: string, value: string) {
    setState((currState) => ({ ...currState, [key]: value }));
  }

  function isValid({
    phone,
    password,
  }: {
    phone?: string;
    password?: string;
  }): boolean {
    if (phone) {
      return phone.length > 0;
    }

    if (password) {
      return password.length > 0;
    }

    return false;
  }

  return (
    <>
      <View style={{ marginTop: 30, marginBottom: 30 }}>
        <Text
          style={[
            theme.typography.title,
            theme.typography.fontL,
            { color: "black" },
            styles.text,
          ]}
        >
          Welcome back
        </Text>

        <Text style={styles.text}>Login below with your credentials</Text>
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="phone"
          placeholder="Enter your phone number"
          error={!!error}
          onChangeText={(txt) => updateState("phone", txt)}
          validator={() =>
            isValid({
              phone: state.phone,
            })
          }
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="lock"
          placeholder="Enter your password"
          error={!!error}
          validator={() =>
            isValid({
              password: state.password,
            })
          }
          onChangeText={(txt) => updateState("password", txt)}
          secureTextEntry
        />
      </View>

      {error && <Text style={[styles.text, { color: "red" }]}>{error}</Text>}

      <View style={styles.marginBottomContainer}>
        <Button
          label="Login"
          onPress={() => {
            handleLogin({
              username: americanizePhoneNumber(
                normalizePhoneStringInput(state.phone)
              ),
              password: state.password,
              onSuccess: async (res) => {
                if (res.challengeName === "NEW_PASSWORD_REQUIRED") {
                  await Auth.completeNewPassword(res, state.password, null);

                  setError(
                    "Please go to forgot password and change your password"
                  );
                } else {
                  isAuthenticated(true);

                  if (hasReadIntro) {
                    navigation.navigate("home");
                  } else {
                    navigation.navigate("welcome");
                  }
                }
              },
              onFail: (err) => {
                if (err && err.message) {
                  setError(err.message);
                }
              },
            });
          }}
          variant="primary"
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setAuthState(AuthState.ForgotPassword);
        }}
      >
        <Text style={[styles.text, { color: colors.emerald }]}>
          Forgot password
        </Text>
      </TouchableOpacity>
    </>
  );
}
