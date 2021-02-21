// import {
//   requestPermissionsAsync,
//   getCurrentPositionAsync,
// } from "expo-location";

export async function getLocation() {
  //   let { status } = await requestPermissionsAsync();
  //   if (status !== "granted") {
  //     return null;
  //   }

  //   let location = await getCurrentPositionAsync({});
  //   return location;
  return "us";
}

export const regions = [
  {
    name: "americas",
    countries: [
      {
        name: "United States",
        code: "us",
      },
      {
        name: "Puerto Rico",
        code: "pr",
      },
      {
        name: "Brazil",
        code: "br",
      },
      {
        name: "Dominican Republic",
        code: "do",
      },
      {
        name: "Haiti",
        code: "ht",
      },
      {
        name: "Colombia",
        code: "co",
      },
      {
        name: "Jamaica",
        code: "jm",
      },
      {
        name: "Mexico",
        code: "mx",
      },
      {
        name: "Canada",
        code: "ca",
      },
      {
        name: "Cuba",
        code: "cu",
      },
      {
        name: "Venezuela",
        code: "ve",
      },
      {
        name: "Peru",
        code: "pe",
      },
      {
        name: "Panama",
        code: "pa",
      },
      {
        name: "Trinidad & Tobago",
        code: "tt",
      },
      {
        name: "Barbados",
        code: "bb",
      },
      {
        name: "Guyana",
        code: "gy",
      },
      {
        name: "Suriname",
        code: "sr",
      },
      {
        name: "Grenada",
        code: "gd",
      },
    ],
  },
];
