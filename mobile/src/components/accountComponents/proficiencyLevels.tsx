import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { styles } from "../style/accountStyles";

export interface ProficiencyLevelDefinition {
    key: string;
    threshold: number;
}

export const PROFICIENCY_LEVELS: ProficiencyLevelDefinition[] = [
    { key: "novice", threshold: 0 },
    { key: "beginner", threshold: 0.5 },
    { key: "intermediate", threshold: 0.9 },
    { key: "advanced", threshold: 1.3 },
    { key: "elite", threshold: 1.8 },
    { key: "legendary", threshold: 2.5 },
];

export interface ProficiencyLevelInfo {
    currentLevel: ProficiencyLevelDefinition;
    nextLevel: ProficiencyLevelDefinition | null;
    progressPercent: number;
    isMaxLevel: boolean;
}

export function resolveProficiencyLevel(
    value: number
): ProficiencyLevelInfo {
    const safeValue = Number.isFinite(value)
        ? Math.max(value, 0)
        : 0;

    let currentLevel = PROFICIENCY_LEVELS[0];
    let currentIndex = 0;

    for (let i = 0; i < PROFICIENCY_LEVELS.length; i++) {
        if (safeValue >= PROFICIENCY_LEVELS[i].threshold) {
            currentLevel = PROFICIENCY_LEVELS[i];
            currentIndex = i;
        } else {
            break;
        }
    }

    const nextLevel =
        PROFICIENCY_LEVELS[currentIndex + 1] ?? null;

    const isMaxLevel = nextLevel === null;

    let progressPercent = 100;

    if (nextLevel) {
        const span =
            nextLevel.threshold - currentLevel.threshold;

        const progressInSpan =
            safeValue - currentLevel.threshold;

        progressPercent =
            span > 0
                ? Math.min(
                      Math.max(
                          (progressInSpan / span) * 100,
                          0
                      ),
                      100
                  )
                : 100;
    }

    return {
        currentLevel,
        nextLevel,
        progressPercent,
        isMaxLevel,
    };
}

export interface ProficiencyGroupDatum {
    id: number;
    name: string;
    proficiency: number;
}

interface ProficiencyLevelBarProps {
    name: string;
    value: number;
    isLast: boolean;
}

function ProficiencyLevelBar({
    name,
    value,
    isLast,
}: ProficiencyLevelBarProps) {
    const { t } = useTranslation();

    const {
        currentLevel,
        nextLevel,
        progressPercent,
        isMaxLevel,
    } = resolveProficiencyLevel(value);

    return (
        <View
            style={[
                styles.progressItem,
                isLast && styles.progressItemLast,
            ]}
        >
            <View style={styles.progressTop}>
                <Text style={styles.progressTopLabel}>
                    {t(
                        `user_form.muscle_groups.${name.toLowerCase()}`,
                        {
                            defaultValue: name,
                        }
                    )}
                </Text>

                <Text style={styles.progressLevel}>
                    {t(
                        `user_form.proficiency_levels.${currentLevel.key.toLowerCase()}`,
                        {
                            defaultValue: currentLevel.key,
                        }
                    )}
                </Text>
            </View>

            <View style={styles.progressTrack}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            width: `${progressPercent}%`,
                        },
                    ]}
                />
            </View>

            <Text style={styles.progressSub}>
                {isMaxLevel
                    ? t("user_form.proficiency_max_level", {
                          defaultValue: "Max Level",
                      })
                    : t("user_form.proficiency_next_level", {
                          defaultValue:
                              '{{percent}}% to level «{{level}}»',
                          percent: Math.round(progressPercent),
                          level: t(
                              `user_form.proficiency_levels.${nextLevel!.key}`,
                              {
                                  defaultValue:
                                      nextLevel!.key,
                              }
                          ),
                      })}
            </Text>
        </View>
    );
}

interface ProficiencyLevelsListProps {
    groups: ProficiencyGroupDatum[];
}

function ProficiencyLevelsList({
    groups,
}: ProficiencyLevelsListProps) {
    const { t } = useTranslation();

    if (groups.length === 0) {
        return (
            <Text style={styles.statLabel}>
                {t("user_form.loading", {
                    defaultValue: "Loading...",
                })}
            </Text>
        );
    }

    return (
        <View>
            {groups.map((group, index) => (
                <ProficiencyLevelBar
                    key={group.id}
                    name={group.name}
                    value={group.proficiency}
                    isLast={index === groups.length - 1}
                />
            ))}
        </View>
    );
}

export default ProficiencyLevelsList;