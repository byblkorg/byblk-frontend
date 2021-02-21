import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { useValue, withTimingTransition } from "react-native-redash";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeArea } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import appcontext from "appcontext";
import createTheme from "theme";
import { updateSettings } from "graphql/mutations";

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const {
  interpolateNode,
  Extrapolate,
  useCode,
  greaterThan,
  set,
  block,
} = Animated;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: "row",
    height: MIN_HEADER_HEIGHT,
    alignItems: "center",
    paddingHorizontal: PADDING,
  },
  title: {
    fontSize: 18,
    marginLeft: PADDING,
    flex: 1,
  },
});

interface HeaderProps {
  y: number;
  title: string;
}

export default ({ y, title }: HeaderProps) => {
  const { navigate } = useNavigation();
  const toggle = useValue<0 | 1>(0);
  const insets = useSafeArea();
  const transition = withTimingTransition(toggle, { duration: 100 });
  const { top: paddingTop } = insets;
  const translateX = interpolateNode(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-ICON_SIZE - PADDING, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateY = interpolateNode(y, {
    inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
    outputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
      0,
    ],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = transition;
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
  useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
    toggle,
    y,
  ]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop,
        },
      ]}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: ctx?.darkmode
            ? theme.colors.dianne
            : theme.colors.gray98,
        }}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate("home")}>
          <View>
            <Icon name="arrow-left" size={ICON_SIZE} color="white" />

            <Animated.View
              style={{ ...StyleSheet.absoluteFillObject, opacity: transition }}
            >
              <Icon
                name="arrow-left"
                size={ICON_SIZE}
                color={ctx?.darkmode ? "white" : "black"}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>

        <Animated.Text
          style={[
            styles.title,
            { transform: [{ translateX }, { translateY }] },
            { color: theme.colors.defaultFontColor },
          ]}
        >
          {title}
        </Animated.Text>

        {/* <TouchableOpacity
          onPress={() => {
            updateSettings({});
          }}
        >
          <Icon name="heart" size={ICON_SIZE} color="white" />
        </TouchableOpacity> */}
      </View>
    </Animated.View>
  );
};
