import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Button from "./Button";

const { width } = Dimensions.get("window");

type SubSlideProps = {
  description: string;
  subtitle: string;
  last?: boolean;
  onPress: () => void;
};

export default function SubSlide({
  description,
  subtitle,
  last,
  onPress,
}: SubSlideProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        {...{ onPress }}
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    overflow: "hidden",
    width,
  },
  subtitle: {
    fontSize: 24,
    color: "#0C0D34",
    lineHeight: 30,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
    color: "#0C0D34",
    textAlign: "center",
  },
});
