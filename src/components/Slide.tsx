import React, { useRef, useEffect, lazy } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import Lottie from "./Lottie";

interface SlideProps {}

const { width, height } = Dimensions.get("window");

export const SLIDE_HEIGHT = 0.61 * height;

export default function Slide({}: SlideProps) {
  const lottie = useRef(null);

  useEffect(() => {
    lottie.current.play();
  }, []);

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Lottie
        {...{
          ref: lottie,
          style: { height: 400, width: 400 },
          ...(Platform.OS === "web"
            ? {
                options: {
                  animationData: require("../../assets/animation/blm.json"),
                },
              }
            : {
                source: require("../../assets/animation/blm.json"),
              }),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
