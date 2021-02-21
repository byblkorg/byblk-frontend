import React, { useContext, useRef, useState } from "react";
import {
  ImageSourcePropType,
  ImageURISource,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import HeaderImage from "./HeaderImage";
import ContentContainer from "./Content";
import Header from "./Header";
import appcontext from "appcontext";
import createTheme from "theme";
import { Business } from "@gcmp/types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ({
  title,
  imageSrc,
  renderContent,
  business,
}: {
  title: string;
  imageSrc:
    | number
    | ImageURISource
    | ImageURISource[]
    | Animated.Node<ImageSourcePropType>;
  renderContent: () => JSX.Element;
  business?: Business;
}) => {
  const scrollView = useRef<Animated.ScrollView>(null);
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);

  const [_, setState] = useState(0);
  const y = useSharedValue(0);

  function updateState(val: number) {
    "worklet";
    runOnJS(setState)(val);
  }

  const onScroll = useAnimatedScrollHandler((event) => {
    "worklet";
    updateState(event.contentOffset.y);
    y.value = event.contentOffset.y;
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: ctx?.darkmode
            ? theme.colors.dianne
            : theme.colors.gray98,
        },
      ]}
    >
      <HeaderImage {...{ y: y.value, imageSrc }} />
      <Animated.ScrollView
        ref={scrollView}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        {...{ onScroll }}
      >
        <ContentContainer
          {...{ y: y.value }}
          renderContent={renderContent}
          business={business}
        />
      </Animated.ScrollView>
      <Header {...{ y: y.value, title }} />
    </View>
  );
};
