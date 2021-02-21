import React, { ReactNode } from "react";
import { View, Dimensions, StyleSheet, Platform } from "react-native";
import { colors } from "theme";
import BLMBackground from "./BLMBackground";

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const { width } = Dimensions.get("window");
const ASPECT_RATIO = 750 / 1125;
const height = width * ASPECT_RATIO;
const BORDER_RADIUS = 75;

export default function Container({ children, footer }: ContainerProps) {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.imageContainer}>
          <View style={styles.image} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View
          style={{
            width,
            height,
            ...StyleSheet.absoluteFillObject,
            top: -height * 0.61,
            backgroundColor: colors.brass,
            zIndex: 998,
          }}
        />
        <View style={styles.content}>{children}</View>
      </View>

      <View style={styles.footerContainer}>{footer}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ebony,
    zIndex: 999,
  },
  imageContainer: {
    borderBottomLeftRadius: BORDER_RADIUS,
    overflow: "hidden",
    height: Platform.OS === "web" ? 200 : height * 0.61,
    zIndex: 999,
  },
  image: {
    width,
    height,
    borderBottomLeftRadius: BORDER_RADIUS,
    backgroundColor: colors.brass,
  },
  contentContainer: {
    flex: 1,
    overflow: "hidden",
    zIndex: 999,
  },
  content: {
    borderRadius: BORDER_RADIUS,
    borderTopLeftRadius: 0,
    flex: 1,
    backgroundColor: "white",
    zIndex: 999,
  },
  footerContainer: {
    height: "20%",
  },
});
