import appcontext from "appcontext";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { createTheme } from "theme";
import {
  Card,
  CategoryBar,
  FilterBar,
  SearchBar,
  SectionHeader,
} from "components";
import { ScreenProps } from "types";
import { Feather as Icon } from "@expo/vector-icons";
import { regions } from "services";
import {
  fetchBusinessWithFilters,
  fetchLocalBusinesses,
} from "graphql/queries";
import { Business } from "@gcmp/types";

export default function Results({
  route,
  navigation: { navigate },
}: ScreenProps<"results">) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
  const [activeCategory, updateActiveCategory] = useState(
    route.params?.filter ?? ""
  );
  const [activeCountry, updateActiveCountry] = useState("us");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const windowWidth = useWindowDimensions().width;
  const numRows = Math.floor(windowWidth / 230);

  useEffect(() => {
    init();
  }, [activeCountry, activeCategory]);

  async function init() {
    if (activeCategory.length <= 0) {
      const local = await fetchLocalBusinesses("americas", activeCountry);
      setBusinesses(local.data.getBusinessesWithOptions.items);
    } else {
      const filtered = await fetchBusinessWithFilters(
        "americas",
        activeCountry,
        activeCategory
      );
      setBusinesses(filtered.data.getBusinessesWithOptions.items);
    }
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background(ctx?.darkmode) },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigate("home")}>
          <Icon
            name="arrow-left"
            size={30}
            color={ctx?.darkmode ? "white" : "black"}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        <View style={styles.section}>
          <SearchBar />
        </View>
      </View>

      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background(ctx?.darkmode) },
        ]}
      >
        <View>
          <FilterBar
            style="minimal"
            controlledActiveCategory={activeCategory}
            onSelectFilter={(category) => {
              if (category === activeCategory) {
                updateActiveCategory("");
              } else {
                updateActiveCategory(category);
              }
            }}
          />
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          data={businesses}
          numColumns={numRows <= 7 ? (numRows <= 2 ? 2 : numRows - 1) : 7}
          key={`_${numRows}`}
          keyExtractor={(item) => `_${numRows}` + item.slug}
          contentContainerStyle={{
            justifyContent: "space-between",
          }}
          ListHeaderComponent={
            regions.length && (
              <View>
                <CategoryBar
                  data={regions}
                  controlledActiveCountryCode={activeCountry}
                  onPress={(country) => {
                    if (country === activeCountry) {
                      updateActiveCountry("us");
                    } else {
                      updateActiveCountry(country);
                    }
                  }}
                />
                <SectionHeader text={"Results"} />
              </View>
            )
          }
          renderItem={({ item, index }) => (
            <Card
              onPress={() =>
                navigate("business", {
                  region: item.region,
                  csc: item.csc,
                  slug: item.slug,
                  data: item,
                })
              }
              key={index}
              style="small"
              title={item.name}
              subtitle={`${item.city}, ${item.state}`}
              imageSrc={item.headerImage}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 8,
  },
});
