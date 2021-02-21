import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import appcontext from "appcontext";
import createTheme from "theme";
import { Tag } from "components";
import { useNavigation } from "@react-navigation/native";
import StickyHeader from "../components/StickyHeader";
import { ScreenProps } from "types";
import { getBusiness } from "graphql/queries";
import { Business } from "@gcmp/types";

interface BusinessProps extends ScreenProps<"business"> {}

const { width, height } = Dimensions.get("window");

export default function BusinessScreen({ route }: BusinessProps) {
  const [business, setBusiness] = useState<Business | null>(null);
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);
  const navigation = useNavigation();
  const data = route.params?.data;
  const csc = route.params.csc;
  const slug = route.params.slug;

  useEffect(() => {
    if (typeof data === "object") {
      setBusiness(data);
    } else {
      init();
    }
  }, []);

  async function init() {
    const business = await getBusiness(csc, slug);
    setBusiness(business);
  }

  return (
    <StickyHeader
      title={business?.name}
      imageSrc={{ uri: business?.headerImage }}
      business={business}
      renderContent={() => (
        <View
          style={[
            styles.details,
            {
              backgroundColor: ctx?.darkmode
                ? theme.colors.dianne
                : theme.colors.gray98,
            },
          ]}
        >
          <View style={{ padding: 20 }}>
            <Text
              style={[
                {
                  color: theme.colors.defaultFontColor,
                  lineHeight: 30,
                  letterSpacing: 1,
                },
                theme.typography.subtitle,
                theme.fonts.cotham,
                theme.typography.fontS,
                !ctx?.darkmode && { color: theme.colors.dianne },
              ]}
            >
              {business?.description}
            </Text>
          </View>

          <View
            style={[
              styles.tagsContainer,
              { padding: theme.spacing.padding.sm },
            ]}
          >
            {business?.tags?.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </View>

          <View
            style={[
              styles.divider,
              {
                backgroundColor: ctx?.darkmode
                  ? theme.colors.brass
                  : theme.colors.slate,
              },
            ]}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  image: {
    width,
    height: height / 2.5,
    zIndex: 9999,
  },
  intro: {
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 20,
  },
  details: {
    flex: 1,
  },
  bottomTabHeader: {
    alignItems: "center",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainerStyle: {
    backgroundColor: "#F3F4F9",
    minHeight: "120%",
  },
  panelHandle: {
    width: 40,
    height: 2,
    borderRadius: 4,
  },
  item: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    height: 0.5,
    width: "85%",
    alignSelf: "flex-start",
  },
  tagsContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  metaContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    width: "100%",
  },
  icon: {
    height: 70,
    width: 70,
  },
  metaText: {
    flexWrap: "wrap",
    maxWidth: "75%",
    lineHeight: 25,
  },
  backBtn: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 0.3,
    borderColor: "#ccc",
    margin: 10,
    alignSelf: "flex-start",
  },
});
