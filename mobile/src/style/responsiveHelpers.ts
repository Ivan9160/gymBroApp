import { Dimensions } from "react-native";

import { breakpoints } from "./theme";
import { styles } from "./styles";
import { responsiveStyles } from "./responsiveStyles";

export function getResponsiveStyles() {
    const width = Dimensions.get("window").width;

    const responsive: any[] = [];

    if (width <= breakpoints.tablet) {
        responsive.push(responsiveStyles.at760GuestFeatureGrid);
        responsive.push(responsiveStyles.at760GuestSteps);
    }

    if (width <= breakpoints.mobileMedium) {
        responsive.push(responsiveStyles.at520Container);
    }

    if (width <= breakpoints.mobile) {
        responsive.push(responsiveStyles.at480SwipeCard);
    }

    if (width <= breakpoints.mobileSmall) {
        responsive.push(responsiveStyles.at360DetailsStat);
    }

    return responsive;
}

export function getContentContainerStyle() {
    const width = Dimensions.get("window").width;

    if (width <= breakpoints.mobileMedium) {
        return [
            styles.contentContainer,
            responsiveStyles.at520ContentContainer,
        ];
    }

    return styles.contentContainer;
}

export function getFormContainerStyle() {
    const width = Dimensions.get("window").width;

    if (width <= breakpoints.mobileMedium) {
        return [
            styles.formContainer,
            responsiveStyles.at520Container,
        ];
    }

    return styles.formContainer;
}

export function getGuestContainerStyle() {
    const width = Dimensions.get("window").width;

    if (width <= breakpoints.mobileMedium) {
        return [
            styles.guestContainer,
            responsiveStyles.at520Container,
        ];
    }

    return styles.guestContainer;
}

export function getPageTitleStyle() {
    const width = Dimensions.get("window").width;

    if (width <= breakpoints.mobileMedium) {
        return [
            styles.pageTitle,
            responsiveStyles.at520PageTitle,
        ];
    }

    return styles.pageTitle;
}

export function getGuestHeroTitleStyle() {
    const width = Dimensions.get("window").width;

    if (width <= breakpoints.mobileMedium) {
        return [
            styles.guestHeroTitle,
            responsiveStyles.at520GuestHeroTitle,
        ];
    }

    return styles.guestHeroTitle;
}

export function getWorkoutGroupHeaderStyle() {
    const width = Dimensions.get("window").width;

    if (width <= breakpoints.mobile) {
        return [
            styles.workoutGroupHeader,
            responsiveStyles.at480WorkoutGroupHeader,
        ];
    }

    return styles.workoutGroupHeader;
}

export function getDetailsStatsStyle(twoColumn = false) {
    const width = Dimensions.get("window").width;

    if (twoColumn) {
        return styles.detailsStatsTwo;
    }

    if (width <= breakpoints.tablet) {
        return [
            styles.detailsStats,
            responsiveStyles.at760DetailsStats,
        ];
    }

    return styles.detailsStats;
}
