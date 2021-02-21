import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ScreenProps } from "types";
import {
  Container,
  SocialLogin,
  Login,
  ForgotPassword,
  Signup,
  Confirm,
} from "./components";
import { colors } from "theme";
import { AuthState } from "./types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthContext from "./authcontext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "App";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "auth"
>;

type AuthProps = {
  navigation: ProfileScreenNavigationProp;
  state?: AuthState;
};

function Footer() {
  const { authState, setAuthState } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* <SocialLogin /> */}

      <View style={styles.linkBtn}>
        <Text style={[styles.text, { color: "white" }]}>
          {authState === AuthState.Login
            ? "Don't have an account?"
            : "Already have an account?"}
        </Text>
        <TouchableOpacity
          onPress={() =>
            setAuthState(
              authState === AuthState.Login ? AuthState.Signup : AuthState.Login
            )
          }
        >
          <Text style={[styles.text, { color: colors.emerald }]}>
            {authState === AuthState.Login ? "Sign up here." : "Login here."}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Wrapper({ children }) {
  return (
    <Container footer={<Footer />}>
      <KeyboardAwareScrollView>
        <View
          style={{
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {children}
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
}

function renderLayout(authState: AuthState) {
  switch (authState) {
    case AuthState.Login:
      return (
        <Wrapper>
          <Login />
        </Wrapper>
      );

    case AuthState.ForgotPassword:
      return (
        <Wrapper>
          <ForgotPassword />
        </Wrapper>
      );

    case AuthState.Signup:
      return (
        <Wrapper>
          <Signup />
        </Wrapper>
      );

    case AuthState.ConfirmPassword:
      return (
        <Wrapper>
          <Confirm />
        </Wrapper>
      );

    default:
      return (
        <Wrapper>
          <Login />
        </Wrapper>
      );
  }
}

export default function Layout({ state }: AuthProps) {
  const [authState, setAuthState] = useState(state ? state : AuthState.Login);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
      }}
    >
      {renderLayout(authState)}
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  linkBtn: {
    marginTop: 20,
  },
  text: {
    textAlign: "center",
  },
  marginBottomContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});
