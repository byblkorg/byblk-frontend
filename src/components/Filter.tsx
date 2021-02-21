import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import createTheme, { colors } from "theme";
import appcontext from "appcontext";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

const iconFontSize = 40;

type IconFunctionProps = {
  active: boolean;
  darkmode: boolean;
};

const icons = {
  getIconColor: (darkmode: boolean, active: boolean = false) => {
    if (active) {
      return darkmode ? colors.brass : colors.slate;
    } else return darkmode ? colors.ebony : colors.slate;
  },
  restaurant: ({ active, darkmode }: IconFunctionProps) => (
    <MaterialIcons
      name="restaurant"
      size={iconFontSize}
      color={icons.getIconColor(darkmode, active)}
    />
  ),
  grocery: ({ active, darkmode }: IconFunctionProps) => (
    <FontAwesome5
      name="store"
      size={iconFontSize}
      color={icons.getIconColor(darkmode, active)}
    />
  ),
  bakery: ({ active, darkmode }: IconFunctionProps) => (
    <MaterialCommunityIcons
      name="food-croissant"
      size={iconFontSize}
      color={icons.getIconColor(darkmode, active)}
    />
  ),
  home: ({ active, darkmode }: IconFunctionProps) => (
    <FontAwesome5
      name="home"
      size={iconFontSize}
      color={icons.getIconColor(darkmode, active)}
    />
  ),
  cosmetic: ({ active, darkmode }: IconFunctionProps) => (
    <Fontisto
      name="scissors"
      size={iconFontSize}
      color={icons.getIconColor(darkmode, active)}
    />
  ),
  wellness: ({ active, darkmode }: IconFunctionProps) => (
    <Entypo
      name="leaf"
      size={iconFontSize}
      color={icons.getIconColor(darkmode, active)}
    />
  ),
  clothing: ({ active, darkmode }: IconFunctionProps) => (
    <MaterialCommunityIcons
      name="tshirt-crew"
      size={iconFontSize}
      color={icons.getIconColor(darkmode, active)}
    />
  ),
};

export default function Filter({
  active,
  category,
  onClick = () => {},
  style = "default",
}: {
  active: boolean;
  category: string;
  onClick?: () => void;
  style?: "default" | "minimal";
}) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);

  function renderIcon(category: string, active?: boolean) {
    return icons[category]({ active, darkmode: ctx?.darkmode });
  }

  return (
    <TouchableOpacity
      style={[styles.container, style === "minimal" && styles.containerMinimal]}
      onPress={onClick}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: ctx?.darkmode
              ? colors.slate
              : colors.brassWithOpacity(),
          },
        ]}
      >
        {style !== "minimal" && renderIcon(category, active)}

        <Text
          style={[
            styles.text,
            theme.typography.fontS,
            theme.fonts.cotham,
            active && { color: "white" },
            style === "minimal" && styles.textMinimal,
          ]}
        >
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 110,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  containerMinimal: {
    height: 50,
  },
  iconContainer: {
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerActive: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  text: {
    marginTop: 10,
  },
  textMinimal: {
    marginTop: 0,
  },
});
