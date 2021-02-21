import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInputProps,
  TextInput as RNTextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "theme";

const Valid = true;
const Invalid = false;
const Pristine = null;
type InputState = typeof Valid | typeof Invalid | typeof Pristine;

interface Props extends TextInputProps {
  icon: string;
  validator: (input: string) => boolean;
  error?: boolean;
}

export default function TextInput({ icon, validator, error, ...rest }: Props) {
  const [input, setInput] = useState("");
  const [state, setState] = useState<InputState>(Pristine);
  const color =
    state === Pristine ? "#777" : state === Valid ? colors.emerald : "red";

  function onChangeText(text: string) {
    setInput(text);
  }

  function validate() {
    const valid = error ? false : validator(input);
    setState(valid);
  }

  useEffect(() => {
    error && setState(Invalid);
  }, [error]);

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <View style={styles.iconContainer}>
        <Feather name={icon} size={16} {...{ color }} />
      </View>

      <View style={{ flex: 1 }}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          onBlur={validate}
          onChange={(e) => onChangeText(e.nativeEvent.text)}
          {...rest}
          style={{ zIndex: 995 }}
        />
      </View>

      {(state === Valid || state === Invalid) && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color,
            borderColor: color,
            borderRadius: 25,
            height: 20,
            width: 20,
          }}
        >
          <Feather
            name={state === Valid ? "check" : "x"}
            color="white"
            size={12}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    width: "100%",
    padding: 5,
    maxWidth: 300,
  },
  iconContainer: {
    padding: 10,
  },
});
