import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "App";

export interface ScreenProps<ScreenName extends keyof RootStackParamList> {
  navigation: StackNavigationProp<RootStackParamList, ScreenName>;
  route: RouteProp<RootStackParamList, ScreenName>;
}
