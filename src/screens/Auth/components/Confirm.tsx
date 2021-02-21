import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "components";
import appcontext from "appcontext";
import { AuthState } from "../types";
import AuthContext from "../authcontext";
import {
  americanizePhoneNumber,
  normalizePhoneStringInput,
  handleConfirmPasswordChange,
} from "../functions";

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

export default function ConfirmPassword() {
  const { theme } = useContext(appcontext);
  const { setAuthState } = useContext(AuthContext);
  const [state, setState] = useState({
    phone: "",
    password: "",
    code: "",
  });
  const [error, setError] = useState<string | undefined>(undefined);

  function confirmPasswordChange() {
    handleConfirmPasswordChange({
      username: americanizePhoneNumber(normalizePhoneStringInput(state.phone)),
      password: state.password,
      code: state.code,
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
    code,
  }: {
    phone?: string;
    password?: string;
    code?: string;
  }): boolean {
    if (phone) {
      return phone.length > 0;
    }

    if (password) {
      return password.length > 0;
    }

    if (code) {
      return code.length > 0;
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
          Confirm Password Change
        </Text>

        <Text style={styles.text}>
          Please check your phone for the verification code
        </Text>
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="phone"
          placeholder="Enter your phone number"
          validator={() => isValid({ phone: state.phone })}
          error={!!error}
          onChangeText={(txt) => updateState("phone", txt)}
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="lock"
          placeholder="Enter your new password"
          validator={() => isValid({ password: state.password })}
          error={!!error}
          onChangeText={(txt) => updateState("password", txt)}
          secureTextEntry
        />
      </View>

      <View style={styles.marginBottomContainer}>
        <TextInput
          icon="code"
          placeholder="Enter verification code"
          validator={() => isValid({ code: state.code })}
          error={!!error}
          onChangeText={(txt) => updateState("code", txt)}
        />
      </View>

      {error && <Text style={[styles.text, { color: "red" }]}>{error}</Text>}

      <View style={styles.marginBottomContainer}>
        <Button
          label="Confirm Password Change"
          onPress={() => confirmPasswordChange()}
          variant="primary"
        />
      </View>
    </>
  );
}
