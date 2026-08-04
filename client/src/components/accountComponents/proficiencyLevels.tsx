import { useTranslation } from "react-i18next";


export interface ProficiencyLevelDefinition {
    key: string;
    threshold: number; // minimum raw proficiency value required to reach this level
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
    progressPercent: number; // 0-100, progress from currentLevel toward nextLevel
    isMaxLevel: boolean;
}

/**
 * Resolves a raw proficiency value into its level tier, and how far along
 * the user is between that tier and the next one (as a %), rather than
 * just returning the raw value as a percentage.
 */
export function resolveProficiencyLevel(value: number): ProficiencyLevelInfo {
    const safeValue = Number.isFinite(value) ? Math.max(value, 0) : 0;

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

    const nextLevel = PROFICIENCY_LEVELS[currentIndex + 1] ?? null;
    const isMaxLevel = nextLevel === null;

    let progressPercent = 100;
    if (nextLevel) {
        const span = nextLevel.threshold - currentLevel.threshold;
        const progressInSpan = safeValue - currentLevel.threshold;
        progressPercent = span > 0 ? Math.min(Math.max((progressInSpan / span) * 100, 0), 100) : 100;
    }

    return { currentLevel, nextLevel, progressPercent, isMaxLevel };
}

export interface ProficiencyGroupDatum {
    id: number;
    name: string;
    proficiency: number;
}

interface ProficiencyLevelBarProps {
    name: string;
    value: number;
}

function ProficiencyLevelBar({ name, value }: ProficiencyLevelBarProps) {
    const { t } = useTranslation();
    const { currentLevel, nextLevel, progressPercent, isMaxLevel } = resolveProficiencyLevel(value);

    return (
        <div className="acct-progress-item">
            <div className="acct-progress-top">
                <span>{name}</span>
                <span className="acct-progress-level">
                    {t(`user_form.proficiency_levels.${currentLevel.key}`, { defaultValue: currentLevel.key })}
                </span>
            </div>
            <div className="acct-progress-track">
                <div className="acct-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="acct-progress-sub">
                {isMaxLevel ? (
                    t('user_form.proficiency_max_level', { defaultValue: 'Max Level' })
                ) : (
                    t('user_form.proficiency_next_level', {
                        defaultValue: '{{percent}}% to level «{{level}}»',
                        percent: Math.round(progressPercent),
                        level: t(`user_form.proficiency_levels.${nextLevel!.key}`, { defaultValue: nextLevel!.key }),
                    })
                )}
            </p>
        </div>
    );
}

interface ProficiencyLevelsListProps {
    groups: ProficiencyGroupDatum[];
}

function ProficiencyLevelsList({ groups }: ProficiencyLevelsListProps) {
    const { t } = useTranslation();

    if (groups.length === 0) {
        return <p className="acct-stat-label">{t('user_form.loading', { defaultValue: 'Loading...' })}</p>;
    }

    return (
        <>
            {groups.map(group => (
                <ProficiencyLevelBar key={group.id} name={group.name} value={group.proficiency} />
            ))}
        </>
    );
}

export default ProficiencyLevelsList;
