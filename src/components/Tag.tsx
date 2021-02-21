import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import appcontext from "appcontext";
import createTheme from "theme";

export default function Tags({ children }: { children: string }) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: ctx?.darkmode
            ? theme.colors.slate
            : theme.colors.brass,
        },
      ]}
    >
      <Text style={[styles.text, theme.fonts.office]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 8,
    padding: 10,
  },
  text: {
    color: "black",
  },
});
