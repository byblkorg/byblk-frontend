import React, { useRef, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Slide, SLIDE_HEIGHT, SubSlide, Dot } from "components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "App";
import Animated, {
  divide,
  interpolateColors,
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "welcome"
>;

type WelcomeSpinnerProps = {
  navigation: ProfileScreenNavigationProp;
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("hasReadIntro", jsonValue);
  } catch (e) {
    // saving error
  }
};

const { width } = Dimensions.get("window");

const slides = [
  {
    subtitle: "Welcome!",
    description:
      "ByBlk is a grass-roots initiative that seeks to, from a global perspective, introduce the Black world to itself through culture, education, and commerce.",
    color: "#0f1924",
  },
  {
    subtitle: "Community ownership",
    description:
      "We're a non-profit. That means we all own this app and any and all future profits generated from it will be reinvested into the community.",
    color: "#ce8277",
  },
  {
    subtitle: "Open Source",
    description:
      "Community ownership taken to the next level. Our front-end is completely open source. If you can code, you can fork the app and make your own spin on it. Or, simply, watch and learn as the application grows.",
    color: "#526073",
  },
  {
    subtitle: "Thank You",
    description:
      "Thank you again for joining. I hope you enjoy the journey with us!",
    color: "#caaba6",
  },
];

const BORDER_RADIUS = 75;

export default function WelcomeSpinner({ navigation }: WelcomeSpinnerProps) {
  const scroll = useRef<Animated.ScrollView>(null);

  const [_, setState] = useState(0);

  const x = useSharedValue(0);

  function updateState(val: number) {
    "worklet";
    runOnJS(setState)(val);
  }

  const scrollHandler = useAnimatedScrollHandler((event) => {
    "worklet";
    updateState(event.contentOffset.x);
    x.value = event.contentOffset.x;
  });

  const backgroundColor = interpolateColors(x.value, {
    inputRange: slides.map((_, i) => i * width),
    outputColorRange: slides.map((slide) => slide.color),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <View>
          <Slide />
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            {
              backgroundColor,
            },
          ]}
        />

        <View style={[styles.footerContent, {}]}>
          <View style={styles.pagination}>
            {slides.map((slide, index) => (
              <Dot
                key={index}
                {...{ index }}
                currentIndex={divide(x.value, width)}
              />
            ))}
          </View>

          <Animated.ScrollView
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={16}
            {...{ onScroll: scrollHandler }}
            ref={scroll}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;

              return (
                <SubSlide
                  {...{ subtitle, description, last }}
                  key={index}
                  onPress={async () => {
                    if (last) {
                      await storeData(true);
                      navigation.replace("home");
                    } else {
                      if (scroll.current) {
                        scroll.current
                          .getNode()
                          .scrollTo({ x: width * (index + 1), animated: true });
                      }
                    }
                  }}
                />
              );
            })}
          </Animated.ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
