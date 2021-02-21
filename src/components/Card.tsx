import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import appcontext from "appcontext";
import createTheme, { colors } from "theme";

type CardProps = {
  onPress?: () => void;
  style?: "small" | "default";
  title: string;
  subtitle: string;
  imageSrc: string;
};

export default function Card({
  onPress = () => {},
  style = "default",
  title,
  subtitle,
  imageSrc,
}: CardProps) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
  const backgroundColor = ctx?.darkmode ? colors.darkCyan : "transparent";

  return (
    <TouchableOpacity
      style={[styles.container, style === "small" && styles.containerSmall]}
      {...{ onPress }}
    >
      <View style={[styles.imageContainer, { backgroundColor }]}>
        {imageSrc ? (
          <Image source={{ uri: imageSrc }} style={styles.image} />
        ) : (
          <View
            style={[styles.image, { backgroundColor: colors.slate }]}
          ></View>
        )}
      </View>
      <View
        style={[
          styles.details,
          {
            backgroundColor: imageSrc,
          },
        ]}
      >
        <Text
          style={[
            theme.fonts.cotham,
            theme.typography.fontM,
            {
              marginBottom:
                style === "default" ? theme.spacing.margin.md : null,
              color: theme.colors.defaultFontColor,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={{
            color: theme.colors.defaultFontColor,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: 300,
    borderRadius: 10,
    margin: 10,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  containerSmall: {
    height: 200,
    width: 230,
    margin: 10,
  },
  imageContainer: {
    height: "65%",
    padding: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 20,
  },
  details: {
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "transparent",
  },
});
