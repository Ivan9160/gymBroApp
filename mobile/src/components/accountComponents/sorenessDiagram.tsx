import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Circle,
    Ellipse,
    G,
    Path,
    Rect,
    Svg,
} from "react-native-svg";
import type { LayoutChangeEvent } from "react-native";
import {
    Pressable,
    Text,
    View,
} from "react-native";

import type { ISoreness } from "../../types";
import { colors, styles } from "../../style";

export type MuscleGroupId =
    | "chest"
    | "back"
    | "shoulders"
    | "biceps"
    | "triceps"
    | "core"
    | "legs";

interface SorenessDiagramProps {
    soreness: ISoreness;
    getColor: (value: number) => string;
    frontLabel?: string;
    backLabel?: string;
}

interface ShapeProps {
    fill: string;
    stroke: string;
    strokeWidth: number;
}

interface AbsCell {
    x: number;
    y: number;
}

interface HitZone {
    id: MuscleGroupId;
    x: number;
    y: number;
    width: number;
    height: number;
}

const LEFT_DELTOID =
    "M62,72 C46,72 34,84 32,100 C30,114 40,122 54,120 C64,118 68,104 66,88 C65,80 64,75 62,72 Z";

const RIGHT_DELTOID =
    "M138,72 C154,72 166,84 168,100 C170,114 160,122 146,120 C136,118 132,104 134,88 C135,80 136,75 138,72 Z";

const LEFT_UPPER_ARM =
    "M50,92 C34,98 22,118 22,145 C22,163 30,175 42,172 C52,169 56,150 54,125 C53,112 52,100 50,92 Z";

const RIGHT_UPPER_ARM =
    "M150,92 C166,98 178,118 178,145 C178,163 170,175 158,172 C148,169 144,150 146,125 C147,112 148,100 150,92 Z";

const LEFT_FOREARM =
    "M24,172 C18,190 16,215 18,240 C19,252 30,254 34,244 C38,220 38,195 36,172 Z";

const RIGHT_FOREARM =
    "M176,172 C182,190 184,215 182,240 C181,252 170,254 166,244 C162,220 162,195 164,172 Z";

const LEFT_THIGH =
    "M66,218 C60,238 58,262 62,296 L94,296 C98,262 96,238 92,218 C84,214 74,214 66,218 Z";

const RIGHT_THIGH =
    "M134,218 C140,238 142,262 138,296 L106,296 C102,262 104,238 108,218 C116,214 126,214 134,218 Z";

const LEFT_CALF =
    "M64,304 C60,328 60,356 66,384 C68,394 82,395 84,386 C88,358 88,330 84,304 Z";

const RIGHT_CALF =
    "M136,304 C140,328 140,356 134,384 C132,394 118,395 116,386 C112,358 112,330 116,304 Z";

const TORSO_BASE =
    "M70,74 C58,78 52,96 54,118 L58,175 C58,196 64,212 76,218 L124,218 C136,212 142,196 142,175 L146,118 C148,96 142,78 130,74 C118,68 108,66 100,66 C92,66 80,68 70,74 Z";

const LEFT_PEC =
    "M98,86 C82,82 66,88 62,104 C60,118 70,130 86,128 C96,126 100,114 99,100 C99,95 99,90 98,86 Z";

const RIGHT_PEC =
    "M102,86 C118,82 134,88 138,104 C140,118 130,130 114,128 C104,126 100,114 101,100 C101,95 101,90 102,86 Z";

const BACK_SHAPE =
    "M100,70 L136,96 C142,120 138,158 124,196 L100,206 L76,196 C62,158 58,120 64,96 Z";

const ABS: AbsCell[] = [
    { x: 82, y: 134 },
    { x: 103, y: 134 },
    { x: 82, y: 156 },
    { x: 103, y: 156 },
    { x: 82, y: 178 },
    { x: 103, y: 178 },
];

const VIEWBOX_WIDTH = 200;
const VIEWBOX_HEIGHT = 420;
const ASPECT_RATIO = VIEWBOX_HEIGHT / VIEWBOX_WIDTH;

const FIGURE_GAP = 14;
const MAX_FIGURE_WIDTH = 150;
const DEFAULT_FIGURE_WIDTH = 130;

/**
 * Approximate bounding boxes (in the 200x420 viewBox coordinate space) for
 * each tappable region. These back plain RN <Pressable> hit zones overlaid
 * on top of the SVG — NOT react-native-svg's native onPress.
 *
 * Why: react-native-svg's touch handling has known reliability issues under
 * the New Architecture (Fabric) on Android — onPress on shapes/groups can
 * silently never fire, independent of how the SVG code itself is written.
 * Plain Pressable is the same primitive already working everywhere else in
 * this app (buttons, cards), so it sidesteps that bug entirely.
 *
 * These are hand-tuned approximations, not exact path bounds — good enough
 * to tap reliably, but feel free to nudge the numbers if a zone feels off.
 */
const FRONT_ZONES: HitZone[] = [
    { id: "shoulders", x: 26, y: 66, width: 148, height: 40 },
    { id: "chest", x: 56, y: 82, width: 88, height: 50 },
    { id: "biceps", x: 16, y: 88, width: 42, height: 92 },
    { id: "biceps", x: 142, y: 88, width: 42, height: 92 },
    { id: "core", x: 76, y: 128, width: 48, height: 56 },
    { id: "legs", x: 54, y: 210, width: 92, height: 190 },
];

const BACK_ZONES: HitZone[] = [
    { id: "shoulders", x: 26, y: 66, width: 148, height: 40 },
    { id: "back", x: 56, y: 66, width: 88, height: 100 },
    { id: "triceps", x: 16, y: 88, width: 42, height: 92 },
    { id: "triceps", x: 142, y: 88, width: 42, height: 92 },
    { id: "legs", x: 54, y: 210, width: 92, height: 190 },
];

function getSorenessValue(
    soreness: ISoreness,
    id: MuscleGroupId
): number {
    if (!soreness) {
        return 0;
    }

    if (Array.isArray(soreness)) {
        const item = soreness.find(
            (group) =>
                group.name &&
                group.name.toLowerCase() === id.toLowerCase()
        );

        return item?.soreness ?? 0;
    }

    return 0;
}

function BodyBase() {
    const baseProps = {
        fill: colors.acctSkin,
        stroke: colors.acctSkinStroke,
        strokeWidth: 1,
    };

    return (
        <G pointerEvents="none">
            <Circle cx={100} cy={34} r={22} {...baseProps} />
            <Rect x={90} y={54} width={20} height={18} rx={6} {...baseProps} />
            <Path d={TORSO_BASE} {...baseProps} />
            <Path d={LEFT_FOREARM} {...baseProps} />
            <Path d={RIGHT_FOREARM} {...baseProps} />
            <Ellipse cx={26} cy={262} rx={8} ry={11} {...baseProps} />
            <Ellipse cx={174} cy={262} rx={8} ry={11} {...baseProps} />
            <Rect x={58} y={394} width={36} height={16} rx={8} {...baseProps} />
            <Rect x={106} y={394} width={36} height={16} rx={8} {...baseProps} />
        </G>
    );
}

interface MuscleRegionProps {
    id: MuscleGroupId;
    soreness: ISoreness;
    getColor: (value: number) => string;
    selected: MuscleGroupId | null;
    children: (props: ShapeProps) => React.ReactNode;
}

/** Purely visual now — no onPress here, taps are handled by the Pressable overlay. */
function MuscleRegion({
    id,
    soreness,
    getColor,
    selected,
    children,
}: MuscleRegionProps) {
    const value = getSorenessValue(soreness, id);
    const isSelected = selected === id;

    const shapeProps: ShapeProps = {
        fill: getColor(value),
        stroke: isSelected ? colors.white : colors.acctSkinStroke,
        strokeWidth: isSelected ? 2.5 : 1,
    };

    return <G>{children(shapeProps)}</G>;
}

type FigureProps = {
    soreness: ISoreness;
    getColor: (value: number) => string;
    selected: MuscleGroupId | null;
    onSelect: (id: MuscleGroupId) => void;
    width: number;
};

/**
 * Renders the SVG plus a plain-View overlay of Pressable hit zones on top,
 * scaled from viewBox units to the figure's actual rendered pixel size.
 */
function HitZoneOverlay({
    zones,
    scale,
    onSelect,
}: {
    zones: HitZone[];
    scale: number;
    onSelect: (id: MuscleGroupId) => void;
}) {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            {zones.map((zone, index) => (
                <Pressable
                    key={`${zone.id}-${index}`}
                    onPress={() => onSelect(zone.id)}
                    style={{
                        position: "absolute",
                        left: zone.x * scale,
                        top: zone.y * scale,
                        width: zone.width * scale,
                        height: zone.height * scale,
                    }}
                />
            ))}
        </View>
    );
}

function FrontFigure({
    soreness,
    getColor,
    selected,
    onSelect,
    width,
}: FigureProps) {
    const height = width * ASPECT_RATIO;
    const scale = width / VIEWBOX_WIDTH;

    return (
        <View style={{ width, height }}>
            <Svg
                width={width}
                height={height}
                viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            >
                <BodyBase />

                <MuscleRegion id="shoulders" soreness={soreness} getColor={getColor} selected={selected}>
                    {(p) => (
                        <G>
                            <Path d={LEFT_DELTOID} {...p} />
                            <Path d={RIGHT_DELTOID} {...p} />
                        </G>
                    )}
                </MuscleRegion>

                <MuscleRegion id="chest" soreness={soreness} getColor={getColor} selected={selected}>
                    {(p) => (
                        <G>
                            <Path d={LEFT_PEC} {...p} />
                            <Path d={RIGHT_PEC} {...p} />
                        </G>
                    )}
                </MuscleRegion>

                <MuscleRegion id="biceps" soreness={soreness} getColor={getColor} selected={selected}>
                    {(p) => (
                        <G>
                            <Path d={LEFT_UPPER_ARM} {...p} />
                            <Path d={RIGHT_UPPER_ARM} {...p} />
                        </G>
                    )}
                </MuscleRegion>

                <MuscleRegion id="core" soreness={soreness} getColor={getColor} selected={selected}>
                    {(p) => (
                        <G>
                            {ABS.map((cell, index) => (
                                <Rect
                                    key={index}
                                    x={cell.x}
                                    y={cell.y}
                                    width={15}
                                    height={18}
                                    rx={4}
                                    {...p}
                                />
                            ))}
                        </G>
                    )}
                </MuscleRegion>

                <MuscleRegion id="legs" soreness={soreness} getColor={getColor} selected={selected}>
                    {(p) => (
                        <G>
                            <Path d={LEFT_THIGH} {...p} />
                            <Path d={RIGHT_THIGH} {...p} />
                            <Path d={LEFT_CALF} {...p} />
                            <Path d={RIGHT_CALF} {...p} />
                        </G>
                    )}
                </MuscleRegion>
            </Svg>

            <HitZoneOverlay zones={FRONT_ZONES} scale={scale} onSelect={onSelect} />
        </View>
    );
}

function BackFigure({
    soreness,
    getColor,
    selected,
    onSelect,
    width,
}: FigureProps) {
    const height = width * ASPECT_RATIO;
    const scale = width / VIEWBOX_WIDTH;

    return (
        <View style={{ width, height }}>
            <Svg
                width={width}
                height={height}
                viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            >
                <BodyBase />

                <MuscleRegion id="shoulders" soreness={soreness} getColor={getColor} selected={selected}>
                    {(p) => (
                        <G>
                            <Path d={LEFT_DELTOID} {...p} />
                            <Path d={RIGHT_DELTOID} {...p} />
                        </G>
                    )}
                </MuscleRegion>

                <MuscleRegion id="back" soreness={soreness} getColor={getColor} selected={selected}>
                    {(p) => <Path d={BACK_SHAPE} {...p} />}
                </MuscleRegion>

                <MuscleRegion id="triceps" soreness={soreness} getColor={getColor} selected={selected}>
                    {(p) => (
                        <G>
                            <Path d={LEFT_UPPER_ARM} {...p} />
                            <Path d={RIGHT_UPPER_ARM} {...p} />
                        </G>
                    )}
                </MuscleRegion>

                <MuscleRegion id="legs" soreness={soreness} getColor={getColor} selected={selected}>
                    {(p) => (
                        <G>
                            <Path d={LEFT_THIGH} {...p} />
                            <Path d={RIGHT_THIGH} {...p} />
                            <Path d={LEFT_CALF} {...p} />
                            <Path d={RIGHT_CALF} {...p} />
                        </G>
                    )}
                </MuscleRegion>
            </Svg>

            <HitZoneOverlay zones={BACK_ZONES} scale={scale} onSelect={onSelect} />
        </View>
    );
}

function SorenessDiagram({
    soreness,
    getColor,
    frontLabel = "Front",
    backLabel = "Back",
}: SorenessDiagramProps) {
    const { t } = useTranslation();

    const [selected, setSelected] = useState<MuscleGroupId | null>(null);
    const [figureWidth, setFigureWidth] = useState(DEFAULT_FIGURE_WIDTH);

    const toggle = (id: MuscleGroupId) => {
        setSelected((current) => (current === id ? null : id));
    };

    const handleBodymapLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        const availablePerFigure = (width - FIGURE_GAP) / 2;

        setFigureWidth(Math.min(availablePerFigure, MAX_FIGURE_WIDTH));
    };

    const selectedValue = selected
        ? Math.round(getSorenessValue(soreness, selected))
        : 0;

    const selectedName = selected
        ? t(`user_form.muscle_groups.${selected}`, { defaultValue: selected })
        : "";

    return (
        <View>
            <Text style={styles.bodymapStatus}>
                {selected ? (
                    <>
                        <Text style={styles.bodymapStatusStrong}>
                            {selectedName}
                        </Text>
                        {" — "}
                        {selectedValue}% {t("account.sore_label")}
                    </>
                ) : (
                    "\u00A0"
                )}
            </Text>

            <View style={styles.bodymap} onLayout={handleBodymapLayout}>
                <View style={styles.bodymapFigure}>
                    <FrontFigure
                        soreness={soreness}
                        getColor={getColor}
                        selected={selected}
                        onSelect={toggle}
                        width={figureWidth}
                    />

                    <Text style={styles.bodymapCaption}>{frontLabel}</Text>
                </View>

                <View style={styles.bodymapFigure}>
                    <BackFigure
                        soreness={soreness}
                        getColor={getColor}
                        selected={selected}
                        onSelect={toggle}
                        width={figureWidth}
                    />

                    <Text style={styles.bodymapCaption}>{backLabel}</Text>
                </View>
            </View>
        </View>
    );
}

export default SorenessDiagram;