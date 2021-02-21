import React, {
  useContext,
  Fragment,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Animated,
  Easing,
} from "react-native";
import createTheme from "theme";
import appcontext from "appcontext";
import {
  SearchBar,
  Modal,
  defaultModalProps,
  Filter,
  Category,
  Card,
} from "components";
import { ScreenProps } from "types";
import LottieView from "lottie-react-native";

interface SearchProps extends ScreenProps<"Search"> {}

enum BusinessType {
  restaurant = "restaurant",
  grocery = "grocery",
  bakery = "bakery",
  home = "home",
  cosmetic = "cosmetic",
  wellness = "wellness",
}

const data = [
  {
    name: "restaurant",
    categories: [
      {
        name: "West Indian",
        subcategories: ["Jamaica", "Cuba", "Aruba", "Saint Lucia", "Grenada"],
      },
      {
        name: "American",
        subcategories: ["Southern", "Soul Food"],
      },
    ],
  },
  {
    name: "grocery",
    categories: [],
  },
  {
    name: "bakery",
    categories: [],
  },
  {
    name: "home",
    categories: [
      {
        name: "Contractors",
        subcategories: [],
      },
      {
        name: "Electricians",
        subcategories: [],
      },
      {
        name: "Landscapers",
        subcategories: [],
      },
      {
        name: "Cleaners",
        subcategories: [],
      },
      {
        name: "Locksmiths",
        subcategories: [],
      },
      {
        name: "Movers",
        subcategories: [],
      },
      {
        name: "Painters",
        subcategories: [],
      },
      {
        name: "Plumbers",
        subcategories: [],
      },
    ],
  },
  {
    name: "cosmetic",
    categories: [],
  },
  {
    name: "wellness",
    categories: [],
  },
];

const refreshHeight = 100;

const HeartsAnimation = ({
  progress,
  refreshing,
}: {
  progress: number;
  refreshing: boolean;
}) => {
  const lottie = useRef(null);

  useEffect(() => {
    if (refreshing) {
      lottie.current.play();
    }
  }, [refreshing]);

  return (
    <Animated.View
      style={{
        height: refreshHeight,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <LottieView
        ref={lottie}
        style={{
          flex: 1,
        }}
        source={require("../../assets/animation/hearts-loader.json")}
        progress={refreshing ? undefined : progress / 2}
      />
    </Animated.View>
  );
};

export default function Search({
  route,
  navigation: { navigate },
}: SearchProps) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<BusinessType>(
    BusinessType.restaurant
  );
  const searchQuery = route.params?.searchQuery ?? "";
  const [query, updateQuery] = useState(searchQuery);
  const [refreshing, isRefreshing] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [extraPaddingTop] = useState(new Animated.Value(0));
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    if (offsetY <= 0) {
      setProgress(-offsetY / refreshHeight);
    }
  }, [offsetY]);

  useEffect(() => {
    if (refreshing) {
      Animated.timing(extraPaddingTop, {
        toValue: refreshHeight,
        duration: 0,
      }).start();
    } else {
      Animated.timing(extraPaddingTop, {
        toValue: 0,
        duration: 400,
        easing: Easing.elastic(1.3),
      }).start();
    }
  }, [refreshing]);

  useEffect(() => {
    updateQuery(searchQuery);
  }, [searchQuery]);

  function onScroll(event) {
    const {
      nativeEvent: {
        contentOffset: { y },
      },
    } = event;

    setOffsetY(y);
  }

  function onRelease() {
    if (offsetY <= -refreshHeight) {
      isRefreshing(true);
      setTimeout(() => {
        isRefreshing(false);
        setLoaderVisible(false);
      }, 5000);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1 }}>
        {loaderVisible && <HeartsAnimation {...{ progress, refreshing }} />}

        <Animated.View style={{ paddingTop: extraPaddingTop }} />

        <ScrollView
          style={[styles.container]}
          {...{ onScroll }}
          onScrollBeginDrag={() => setLoaderVisible(true)}
          onResponderRelease={onRelease}
          scrollEventThrottle={1}
          scrollEnabled={refreshing ? false : true}
        >
          <View style={styles.intro}>
            <Text style={theme.typography.title}>SEARCH</Text>

            <SearchBar
              onIconPress={() => setIsVisible(true)}
              onType={updateQuery}
              value={query}
            />
          </View>

          <View style={styles.section}>
            {query.length ? (
              <View />
            ) : (
              data
                .filter((categories) => categories.name === activeCategory)[0]
                .categories.map((category, index) => (
                  <Fragment key={index}>
                    <View>
                      <Text
                        style={[theme.typography.subtitle, { padding: 15 }]}
                        key={`title: ${index}`}
                      >
                        {category.name}
                      </Text>
                    </View>

                    {category.subcategories.length ? (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollViewContainer}
                        key={index}
                      >
                        {category.subcategories.map((subcategory, index) => (
                          <Category
                            {...{
                              key: index,
                              title: subcategory,
                              onPress: () => {
                                updateQuery(subcategory);
                              },
                            }}
                          />
                        ))}
                      </ScrollView>
                    ) : (
                      <ScrollView
                        horizontal
                        // style={styles.sectionScrollView}
                        showsHorizontalScrollIndicator={false}
                      >
                        {[1, 2, 3, 4].map((data, index) => (
                          <Card
                            {...{
                              key: index,
                              onPress: () => navigate("Business"),
                            }}
                          />
                        ))}
                      </ScrollView>
                    )}
                  </Fragment>
                ))
            )}
          </View>

          <Modal
            modalProps={{
              ...defaultModalProps,
              isVisible,
              coverScreen: true,
              avoidKeyboard: false,
              backdropOpacity: 0.8,
              onBackdropPress: () => setIsVisible(false),
              style: {
                justifyContent: "center",
                alignItems: "center",
              },
            }}
            close={() => setIsVisible(false)}
          >
            <ScrollView style={styles.modalBody}>
              <View style={styles.filtersContainer}>
                {data.map((category, index) => {
                  return (
                    <Filter
                      category={category.name}
                      active={category.name === activeCategory}
                      key={index}
                      onClick={() => {
                        setActiveCategory(BusinessType[category.name]);
                      }}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intro: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  section: {
    paddingVertical: 40,
  },
  scrollViewContainer: {
    paddingVertical: 20,
  },
  modalBody: {
    flex: 1,
    maxHeight: 250,
    overflow: "hidden",
    marginTop: 50,
    marginBottom: 50,
  },
  filtersContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
