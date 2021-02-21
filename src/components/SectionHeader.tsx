import appcontext from "appcontext";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import createTheme from "theme";

export default function SectionHeader({ text }: { text: string }) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);

  return (
    <View>
      <Text style={[theme.typography.subtitle, { padding: 15 }]}>{text}</Text>
    </View>
  );
}
