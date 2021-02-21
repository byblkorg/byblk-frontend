import React, { useContext } from "react";
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import appcontext from "appcontext";
import createTheme from "theme";
import WebModal from "modal-enhanced-react-native-web";
import MobileModal, { ModalProps } from "react-native-modal";
import { EvilIcons } from "@expo/vector-icons";

export const defaultModalProps: ModalProps = {
  animationIn: "slideInUp",
  animationInTiming: 300,
  animationOut: "slideOutDown",
  animationOutTiming: 300,
  avoidKeyboard: false,
  coverScreen: true,
  hasBackdrop: true,
  backdropColor: "black",
  backdropOpacity: 0.7,
  backdropTransitionInTiming: 300,
  backdropTransitionOutTiming: 300,
  customBackdrop: null,
  children: null,
  deviceHeight: null,
  deviceWidth: null,
  isVisible: false,
  onBackButtonPress: () => {},
  onBackdropPress: () => {},
  onModalWillHide: () => {},
  onModalHide: () => {},
  onModalWillShow: () => {},
  onModalShow: () => {},
  onSwipeStart: () => {},
  onSwipeMove: (percentageShown) => {},
  onSwipeComplete: ({ swipingDirection }) => {},
  onSwipeCancel: () => {},
  scrollOffset: 0,
  scrollOffsetMax: 0,
  scrollTo: null,
  scrollHorizontal: false,
  swipeThreshold: 100,
  swipeDirection: null,
  useNativeDriver: false,
  hideModalContentWhileAnimating: false,
  propagateSwipe: false,
  style: null,
};

const Modal = (props: ModalProps) =>
  Platform.OS === "web" ? <WebModal {...props} /> : <MobileModal {...props} />;

export default function EnhancedModal({
  children,
  modalProps,
  close,
}: {
  children: JSX.Element;
  modalProps: ModalProps;
  close: () => void;
}) {
  const ctx = useContext(appcontext);
  const theme = createTheme(ctx?.darkmode);

  return (
    <Modal {...modalProps}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: ctx?.darkmode
              ? theme.colors.slate
              : theme.colors.brass,
          },
        ]}
      >
        <TouchableOpacity style={styles.closeContainer} onPress={close}>
          <EvilIcons name="close" size={40} color="black" />
        </TouchableOpacity>

        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  closeContainer: {
    width: "100%",
    height: 50,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    padding: 5,
  },
});
