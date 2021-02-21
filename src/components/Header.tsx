import React from "react";
import { View, TouchableOpacity } from "react-native";
import SearchBar from "./SearchBar";
import { Avatar } from "react-native-elements";
import { colors } from "theme";
import { useNavigation } from "@react-navigation/native";

export default function Header({
  onType,
  onIconPress,
}: {
  onType?: (text: string) => void;
  onIconPress?: () => void;
}) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        padding: 15,
      }}
    >
      <SearchBar onType={(text) => onType(text)} onIconPress={onIconPress} />
      {/* @ts-ignore */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Avatar
          rounded
          icon={{ name: "settings", color: colors.emerald }}
          size={100}
        />
      </TouchableOpacity>
    </View>
  );
}
