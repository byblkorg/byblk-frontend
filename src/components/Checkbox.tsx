import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

interface CheckboxProps {
  label: string;
}

export default function Checkbox({ label }: CheckboxProps) {
  const [checked, setChecked] = useState(false);
  const color = checked ? "blue" : "white";
  return (
    <RectButton onPress={() => setChecked(!checked)}>
      <View style={styles.container}>
        <View
          style={[styles.icon, { backgroundColor: color, borderColor: "blue" }]}
        >
          <Feather name="check" color="white" />
        </View>
        <Text>{label}</Text>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  icon: {
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 10,
  },
});
