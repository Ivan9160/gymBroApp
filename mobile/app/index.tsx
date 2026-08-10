import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";

import HomeScreen from "../src/screens/HomeScreen";
import UserDataScreen from "../src/screens/UserDataScreen";

export default function Index() {
  const reduxUser = useSelector((state: any) => state.user);

  const isAuthenticated = false;

  const hasProfile = Boolean(reduxUser?.id);

  if (isAuthenticated && hasProfile) {
    return <Redirect href="/account" />;
  }

  if (isAuthenticated && !hasProfile) {
    return <UserDataScreen status="new" />;
  }

  return <HomeScreen />;
}