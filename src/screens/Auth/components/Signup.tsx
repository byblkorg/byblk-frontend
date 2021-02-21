import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "components";
import appcontext from "appcontext";
import AuthContext from "../authcontext";
import {
  americanizePhoneNumber,
  normalizePhoneStringInput,
  handleSignUp,
} from "../functions";
import { AuthState } from "../types";

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

export default function Signup() {
  const { theme } = useContext(appcontext);
  const { setAuthState } = useContext(AuthContext);
  const [state, setState] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | undefined>(undefined);

  function signUp() {
    handleSignUp({
      username: americanizePhoneNumber(normalizePhoneStringInput(state.phone)),
      password: state.password,
      onSuccess: () => {
        setAuthState(AuthState.Login);
      },
      onFail: (err) => {
        if (err && err.message) {
          setError(err.message);
        }
      },
    });
  }

  function updateState(key: string, value: string) {
    setState((currState) => ({ ...currState, [key]: value }));
  }

  function isValid({
    phone,
    password,
    confirmPassword,
  }: {
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }): boolean {
    if (phone) {
      return phone.length > 0;
    }

    if (password) {
      return password.length > 0;
    }

    if (confirmPassword) {
      return confirmPassword === state.password;
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
          Create Account
        </Text>

        <Text style={styles.text}>We're happy to have you on board!</Text>
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="phone"
          placeholder="Enter your phone number"
          validator={() => isValid({ phone: state.phone })}
          onChangeText={(txt) => updateState("phone", txt)}
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="lock"
          placeholder="Enter your password"
          validator={() => isValid({ password: state.password })}
          onChangeText={(txt) => updateState("password", txt)}
          secureTextEntry
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="lock"
          placeholder="Confirm your password"
          validator={() => isValid({ confirmPassword: state.confirmPassword })}
          onChangeText={(txt) => updateState("confirmPassword", txt)}
          secureTextEntry
        />
      </View>

      {error && <Text style={[styles.text, { color: "red" }]}>{error}</Text>}

      <View style={styles.marginBottomContainer}>
        <Button
          label="Signup"
          onPress={() => signUp()}
          variant="primary"
          disabled={state.confirmPassword !== state.password}
        />
      </View>
    </>
  );
}
