import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Category from "./Category";
import SectionHeader from "./SectionHeader";
import { regions } from "services";

export default function CategoryBar({
  data = [],
  onPress = () => {},
  controlledActiveCountryCode,
}: {
  data: typeof regions;
  onPress: (country: string) => void;
  controlledActiveCountryCode: string;
}) {
  return (
    <View style={{ height: (data.length + 1) * 100 }}>
      {data.map((category) => (
        <>
          <SectionHeader text={category.name} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.subcategoriesContainer}
          >
            {category.countries.map((country, index) => (
              <Category
                {...{
                  key: index,
                  title: country.name,
                  onPress: () => onPress(country.code),
                  active: country.code === controlledActiveCountryCode,
                }}
              />
            ))}
          </ScrollView>
        </>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  subcategoriesContainer: {
    // flex: 1,
  },
});
