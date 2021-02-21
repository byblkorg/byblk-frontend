import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "components";
import appcontext from "appcontext";
import { AuthState } from "../types";
import AuthContext from "../authcontext";
import {
  handleForgotPasswordRequest,
  americanizePhoneNumber,
  normalizePhoneStringInput,
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

export default function ForgotPassword() {
  const { theme } = useContext(appcontext);
  const { setAuthState } = useContext(AuthContext);
  const [state, setState] = useState({
    phone: "",
  });
  const [error, setError] = useState<string | undefined>(undefined);

  function forgotPassword() {
    handleForgotPasswordRequest({
      username: americanizePhoneNumber(normalizePhoneStringInput(state.phone)),
      onSuccess: () => {
        setAuthState(AuthState.ConfirmPassword);
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

  function isValid({ phone }: { phone?: string; password?: string }): boolean {
    if (phone) {
      return phone.length > 0;
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
          Forgot Password
        </Text>

        <Text style={styles.text}>Reset your password</Text>
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

      {error && <Text style={[styles.text, { color: "red" }]}>{error}</Text>}

      <View style={styles.marginBottomContainer}>
        <Button
          label="Reset Password"
          onPress={() => forgotPassword()}
          variant="primary"
        />
      </View>
    </>
  );
}
