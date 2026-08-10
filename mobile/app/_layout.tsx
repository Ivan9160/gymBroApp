import { Stack } from "expo-router";
import { Provider } from "react-redux";

import { store } from "../src/store/store";
import "../src/localization/i18n";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#121212",
          },
        }}
      />
    </Provider>
  );
}