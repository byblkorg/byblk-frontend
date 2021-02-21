import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Svg, { Path, G } from "react-native-svg";

const SVG_SIZE = 30;

function FBLogin() {
  return (
    <Svg viewBox="0 0 50 50" width={SVG_SIZE} height={SVG_SIZE} fill="#3b5998">
      <Path d="M32 11h5a1 1 0 001-1V3.263a.997.997 0 00-.925-.997C35.484 2.153 32.376 2 30.141 2 24 2 20 5.68 20 12.368V19h-7a1 1 0 00-1 1v7a1 1 0 001 1h7v19a1 1 0 001 1h7a1 1 0 001-1V28h7.222a1 1 0 00.994-.89l.778-7A1 1 0 0037 19h-8v-5a3 3 0 013-3z" />
    </Svg>
  );
}

function GLogin() {
  return (
    <Svg viewBox="0 0 48 48" width={SVG_SIZE} height={SVG_SIZE}>
      <Path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <Path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <Path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <Path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </Svg>
  );
}

function AppleLogo() {
  return (
    <Svg viewBox="0 0 24 24" width={SVG_SIZE} height={SVG_SIZE}>
      <Path d="M16.125 1c-1.153.067-2.477.71-3.264 1.527-.71.744-1.272 1.85-1.043 2.918 1.253.033 2.511-.626 3.264-1.459.703-.779 1.236-1.866 1.043-2.986zm.068 4.443c-1.809 0-2.565 1.112-3.818 1.112-1.289 0-2.467-1.041-4.027-1.041C6.226 5.514 3 7.48 3 12.11 3 16.324 6.818 21 8.973 21c1.309.013 1.626-.823 3.402-.832 1.778-.013 2.162.843 3.473.832 1.476-.011 2.628-1.633 3.47-2.918.604-.92.853-1.39 1.32-2.43-3.472-.88-4.163-6.48 0-7.638-.785-1.341-3.08-2.57-4.445-2.57z" />
    </Svg>
  );
}

export default function SocialLogin() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <FBLogin />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <GLogin />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <AppleLogo />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // flex: 1,
  },
  iconContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    // marginHorizontal: 20,
    // overflow: "hidden",
  },
});
