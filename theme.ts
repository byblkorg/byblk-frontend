import { TextStyle } from "react-native";

export interface theme {
  background: string;
  title: TextStyle;
  subtitle: TextStyle;
}

export const colors = {
  ebony: "#0f1924",
  brass: "#ce8277",
  slate: "#526073",
  dianne: "#1e3443",
  oxford: "#354c5d",
  gris: "#ccc",
  emerald: "#319177",
  gray98: "#fafafa",
  darkCyan: "#131f2d",
  rosa: "#eed6cf",
  ivory: "#ffffeb",
  brassWithOpacity: (opacity: number = 0.7) =>
    `rgba(206, 130, 119, ${opacity})`,
  background: (darkmode: boolean) => (darkmode ? colors.ebony : colors.gray98),
};

export const fonts = {
  cooper: {
    fontFamily: "CooperHewitt",
  },
  cotham: {
    fontFamily: "CothamSans",
  },
  office: {
    fontFamily: "Office",
  },
  work: {
    fontFamily: "Work",
  },
};

export const sizing = {
  fontXL: {
    fontSize: 48,
  },
  fontL: {
    fontSize: 30,
  },
  fontM: {
    fontSize: 20,
  },
  fontS: {
    fontSize: 16,
  },
};

export const spacing = {
  margin: {
    sm: 5,
    md: 20,
    lg: 50,
  },
  padding: {
    sm: 15,
    md: 30,
    lg: 60,
  },
};

export function createTheme(dark?: boolean) {
  return {
    spacing,
    fonts,
    colors: {
      // background: dark ? colors.ebony : "white",
      defaultFontColor: dark ? "white" : "black",
      ...colors,
    },
    typography: {
      title: {
        color: dark ? "white" : "black",
        fontSize: 48,
        padding: 2,
        ...fonts.cooper,
      },
      subtitle: {
        color: dark ? colors.gris : "#ce8277",
        fontSize: 20,
        ...fonts.cotham,
      },
      ...sizing,
    },
  };
}

export default createTheme;
