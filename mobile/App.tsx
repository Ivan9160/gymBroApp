import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { store } from "./src/store/store";
import { AppNavigator } from "./src/navigation/AppNavigator";

import "./src/localization/i18n";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </Provider>
    );
}


