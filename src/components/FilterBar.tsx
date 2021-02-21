import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Filter from "./Filter";
import { Industries } from "services";

// export const defaultState = Industries.restaurant;

export default function FilterBar({
  style = "default",
  onSelectFilter,
  onActiveCategoryChange,
  controlledActiveCategory,
}: {
  style?: "default" | "minimal";
  onSelectFilter?: (category: Industries) => void;
  onActiveCategoryChange?: (category: Industries | string) => void;
  controlledActiveCategory?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<Industries | string>(
    onSelectFilter ? null : ""
  );

  useEffect(() => {
    onActiveCategoryChange && onActiveCategoryChange(activeCategory);
  }, [activeCategory]);

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {Object.values(Industries).map((category, index) => {
        return (
          <Filter
            category={category}
            active={
              onSelectFilter
                ? category === controlledActiveCategory
                : category === activeCategory
            }
            key={index}
            onClick={() => {
              onSelectFilter
                ? onSelectFilter(Industries[category])
                : setActiveCategory(Industries[category]);
            }}
            style={style}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
