import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Overlay from "./Overlay";
import createTheme from "theme";
import appcontext from "appcontext";

interface CategoryProps {
  title: string;
  onPress: () => void;
  active: boolean;
}

export default function Category({
  title = "",
  onPress = () => {},
  active = false,
}: CategoryProps) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);

  return (
    <TouchableOpacity style={styles.container} {...{ onPress }}>
      <ImageBackground
        style={styles.image}
        // source={{ uri: "https://picsum.photos/200/300" }}
      >
        <Overlay active={active}>
          <Text style={[theme.fonts.cotham, styles.text]}>{title}</Text>
        </Overlay>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 200,
    borderRadius: 15,
    margin: 10,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  // overlay: {
  //   flex: 1,
  //   backgroundColor: "black",
  //   opacity: 0.5,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  text: {
    color: "white",
    fontSize: 24,
    letterSpacing: 1,
    textAlign: "center",
  },
});
