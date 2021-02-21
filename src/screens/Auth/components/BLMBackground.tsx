import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

export default function BLMBackground({}) {
  const lottie = useRef(null);

  useEffect(() => {
    lottie.current.play();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={lottie}
        style={{
          width: 400,
          height: 400,
        }}
        source={require("../../../../assets/animation/blm-words.json")}
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
