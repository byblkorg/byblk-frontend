import React from "react";
import { View, StyleSheet } from "react-native";

export default function Overlay({ children, active }) {
  return (
    <View
      style={[
        styles.overlay,
        {
          backgroundColor: active ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)",
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
