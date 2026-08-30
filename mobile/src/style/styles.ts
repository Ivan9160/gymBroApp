import { StyleSheet } from "react-native";

import { accountPageStyles } from "../components/accountComponents/style/accountPageStyles";
import { appShellStyles } from "./appShellStyles";
import { guestStyles } from "../components/style/guestStyles";
import { formPageStyles } from "../components/userDataComponentes/style/formPageStyles";
import { loadingStyles } from "./loadingStyles";
import { creatorStyles } from "../components/style/creatorStyles";
import { historyStyles } from "../components/workoutHistoryComponents/style/historyStyles";
import { detailsStyles } from "../components/workoutHistoryComponents/workoutReviewComponents/style/detailsStyles";
import { contentStyles } from "./contentStyles";
import { modalStyles } from "../components/accountComponents/activeWorkoutComponents/style/modalStyles";
import { swipeStyles } from "../components/accountComponents/activeWorkoutComponents/style/swipeStyles";
import { exerciseCreatorStyles } from "../components/style/exerciseCreatorStyles";
import { exerciseAnimationStyles } from "../components/accountComponents/activeWorkoutComponents/style/exerciseAnimationStyles";

export const styles = StyleSheet.create({
    ...accountPageStyles,
    ...appShellStyles,
    ...guestStyles,
    ...formPageStyles,
    ...loadingStyles,
    ...creatorStyles,
    ...historyStyles,
    ...detailsStyles,
    ...contentStyles,
    ...modalStyles,
    ...swipeStyles,
    ...exerciseCreatorStyles,
    ...exerciseAnimationStyles,
});
