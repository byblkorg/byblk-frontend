import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from "react-native";
import createTheme from "theme";
import appcontext from "appcontext";
import { Octicons } from "@expo/vector-icons";
import { fetchBusinessWithSlug } from "graphql/queries";
import { useNavigation } from "@react-navigation/native";

function slugifyString(str: string) {
  return str.toLowerCase().replace(/ /g, "_");
}

interface SearchBarProps {
  style?: ViewStyle;
  onIconPress?: (text: string) => void;
  onType?: (text: string) => void;
}

export default function SearchBar({
  style,
  onType = () => {},
}: SearchBarProps) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
  const [text, updateText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    onType && onType(text);
  }, [text]);

  return (
    <View
      style={[
        style,
        styles.container,
        {
          backgroundColor: ctx?.darkmode
            ? theme.colors.slate
            : theme.colors.brassWithOpacity(),
        },
      ]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search by name"
          placeholderTextColor={ctx?.darkmode ? "#ccc" : "#eee"}
          style={[theme.fonts.cotham, styles.input, { color: "white" }]}
          onChangeText={(text) => updateText(text)}
          value={text}
        />

        <TouchableOpacity
          onPress={async () => {
            const searchRes = await fetchBusinessWithSlug(slugifyString(text));
            const business = searchRes.data.getBusinessBySlug.items[0];
            if (business) {
              navigation.navigate("business", {
                region: business.region,
                csc: business.csc,
                slug: business.slug,
                data: business,
              });
            }
          }}
        >
          <Octicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    ...(Platform.OS === "web" && { minWidth: 250, maxWidth: "fit-content" }),
    maxHeight: 70,
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 50,
    marginRight: 10,
    padding: 10,
  },
  inputContainer: {
    width: "85%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});
