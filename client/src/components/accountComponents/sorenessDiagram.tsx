import { useState, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import type { ISoreness } from "../../types";

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

const LEFT_DELTOID = "M62,72 C46,72 34,84 32,100 C30,114 40,122 54,120 C64,118 68,104 66,88 C65,80 64,75 62,72 Z";
const RIGHT_DELTOID = "M138,72 C154,72 166,84 168,100 C170,114 160,122 146,120 C136,118 132,104 134,88 C135,80 136,75 138,72 Z";
const LEFT_UPPER_ARM = "M50,92 C34,98 22,118 22,145 C22,163 30,175 42,172 C52,169 56,150 54,125 C53,112 52,100 50,92 Z";
const RIGHT_UPPER_ARM = "M150,92 C166,98 178,118 178,145 C178,163 170,175 158,172 C148,169 144,150 146,125 C147,112 148,100 150,92 Z";
const LEFT_FOREARM = "M24,172 C18,190 16,215 18,240 C19,252 30,254 34,244 C38,220 38,195 36,172 Z";
const RIGHT_FOREARM = "M176,172 C182,190 184,215 182,240 C181,252 170,254 166,244 C162,220 162,195 164,172 Z";
const LEFT_THIGH = "M66,218 C60,238 58,262 62,296 L94,296 C98,262 96,238 92,218 C84,214 74,214 66,218 Z";
const RIGHT_THIGH = "M134,218 C140,238 142,262 138,296 L106,296 C102,262 104,238 108,218 C116,214 126,214 134,218 Z";
const LEFT_CALF = "M64,304 C60,328 60,356 66,384 C68,394 82,395 84,386 C88,358 88,330 84,304 Z";
const RIGHT_CALF = "M136,304 C140,328 140,356 134,384 C132,394 118,395 116,386 C112,358 112,330 116,304 Z";
const TORSO_BASE = "M70,74 C58,78 52,96 54,118 L58,175 C58,196 64,212 76,218 L124,218 C136,212 142,196 142,175 L146,118 C148,96 142,78 130,74 C118,68 108,66 100,66 C92,66 80,68 70,74 Z";
const LEFT_PEC = "M98,86 C82,82 66,88 62,104 C60,118 70,130 86,128 C96,126 100,114 99,100 C99,95 99,90 98,86 Z";
const RIGHT_PEC = "M102,86 C118,82 134,88 138,104 C140,118 130,130 114,128 C104,126 100,114 101,100 C101,95 101,90 102,86 Z";
const BACK_SHAPE = "M100,70 L136,96 C142,120 138,158 124,196 L100,206 L76,196 C62,158 58,120 64,96 Z";

const ABS: AbsCell[] = [
    { x: 82, y: 134 }, { x: 103, y: 134 },
    { x: 82, y: 156 }, { x: 103, y: 156 },
    { x: 82, y: 178 }, { x: 103, y: 178 },
];

    function getSorenessValue(soreness: ISoreness, id: MuscleGroupId): number {
        if (!soreness) return 0;

        if (Array.isArray(soreness)) {
            const item = soreness.find(
                (g) => g.name && g.name.toLowerCase() === id.toLowerCase()
            );
            return item ? item.soreness : 0;
        }
        
        return 0;

        
    }

function BodyBase() {
    return (
        <>
            <circle className="acct-body-base" cx="100" cy="34" r="22" />
            <rect className="acct-body-base" x="90" y="54" width="20" height="18" rx="6" />
            <path className="acct-body-base" d={TORSO_BASE} />
            <path className="acct-body-base" d={LEFT_FOREARM} />
            <path className="acct-body-base" d={RIGHT_FOREARM} />
            <ellipse className="acct-body-base" cx="26" cy="262" rx="8" ry="11" />
            <ellipse className="acct-body-base" cx="174" cy="262" rx="8" ry="11" />
            <rect className="acct-body-base" x="58" y="394" width="36" height="16" rx="8" />
            <rect className="acct-body-base" x="106" y="394" width="36" height="16" rx="8" />
        </>
    );
}

interface RegionProps {
    soreness: ISoreness;
    id: MuscleGroupId;
    getColor: (value: number) => string;
    selected: MuscleGroupId | null;
    onSelect: (id: MuscleGroupId) => void;
    children: (shapeProps: ShapeProps) => ReactElement;
}

function MuscleRegion({ id, soreness, getColor, selected, onSelect, children }: RegionProps) {
    const { t } = useTranslation();
    const value = getSorenessValue(soreness, id);
    const isSelected = selected === id;
    const shapeProps: ShapeProps = {
        fill: getColor(value),
        stroke: isSelected ? "#ffffff" : "rgba(0,0,0,0.35)",
        strokeWidth: isSelected ? 2.5 : 1,
    };
    const muscleName = t(`user_form.muscle_groups.${id}`, { defaultValue: id });
    return (
        <g className="acct-muscle-shape" onClick={() => onSelect(id)}>
            <title>{`${muscleName}: ${Math.round(value)}%`}</title>
            {children(shapeProps)}
        </g>
    );
}

type FigureProps = Omit<RegionProps, "id" | "children">;

function FrontFigure({ soreness, getColor, selected, onSelect, ariaLabel }: FigureProps & { ariaLabel: string }) {
    return (
        <svg viewBox="0 0 200 420" width="130" height="273" role="img" aria-label={ariaLabel}>
            <BodyBase />
            <MuscleRegion id="shoulders" soreness={soreness} getColor={getColor} selected={selected} onSelect={onSelect}>
                {(p: ShapeProps) => (<><path d={LEFT_DELTOID} {...p} /><path d={RIGHT_DELTOID} {...p} /></>)}
            </MuscleRegion>
            <MuscleRegion id="chest" soreness={soreness} getColor={getColor} selected={selected} onSelect={onSelect}>
                {(p: ShapeProps) => (<><path d={LEFT_PEC} {...p} /><path d={RIGHT_PEC} {...p} /></>)}
            </MuscleRegion>
            <MuscleRegion id="biceps" soreness={soreness} getColor={getColor} selected={selected} onSelect={onSelect}>
                {(p: ShapeProps) => (<><path d={LEFT_UPPER_ARM} {...p} /><path d={RIGHT_UPPER_ARM} {...p} /></>)}
            </MuscleRegion>
            <MuscleRegion id="core" soreness={soreness} getColor={getColor} selected={selected} onSelect={onSelect}>
                {(p: ShapeProps) => (<>{ABS.map((r: AbsCell, i: number) => (<rect key={i} x={r.x} y={r.y} width={15} height={18} rx={4} {...p} />))}</>)}
            </MuscleRegion>
            <MuscleRegion id="legs" soreness={soreness} getColor={getColor} selected={selected} onSelect={onSelect}>
                {(p: ShapeProps) => (<><path d={LEFT_THIGH} {...p} /><path d={RIGHT_THIGH} {...p} /><path d={LEFT_CALF} {...p} /><path d={RIGHT_CALF} {...p} /></>)}
            </MuscleRegion>
        </svg>
    );
}

function BackFigure({ soreness, getColor, selected, onSelect, ariaLabel }: FigureProps & { ariaLabel: string }) {
    return (
        <svg viewBox="0 0 200 420" width="130" height="273" role="img" aria-label={ariaLabel}>
            <BodyBase />
            <MuscleRegion id="shoulders" soreness={soreness} getColor={getColor} selected={selected} onSelect={onSelect}>
                {(p: ShapeProps) => (<><path d={LEFT_DELTOID} {...p} /><path d={RIGHT_DELTOID} {...p} /></>)}
            </MuscleRegion>
            <MuscleRegion id="back" soreness={soreness} getColor={getColor} selected={selected} onSelect={onSelect}>
                {(p: ShapeProps) => <path d={BACK_SHAPE} {...p} />}
            </MuscleRegion>
            <MuscleRegion id="triceps" soreness={soreness} getColor={getColor} selected={selected} onSelect={onSelect}>
                {(p: ShapeProps) => (<><path d={LEFT_UPPER_ARM} {...p} /><path d={RIGHT_UPPER_ARM} {...p} /></>)}
            </MuscleRegion>
            <MuscleRegion id="legs" soreness={soreness} getColor={getColor} selected={selected} onSelect={onSelect}>
                {(p: ShapeProps) => (<><path d={LEFT_THIGH} {...p} /><path d={RIGHT_THIGH} {...p} /><path d={LEFT_CALF} {...p} /><path d={RIGHT_CALF} {...p} /></>)}
            </MuscleRegion>
        </svg>
    );
}

function SorenessDiagram({ soreness, getColor, frontLabel = "Front", backLabel = "Back" }: SorenessDiagramProps) {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<MuscleGroupId | null>(null);
    const toggle = (id: MuscleGroupId) => setSelected((cur) => (cur === id ? null : id));

    return (
        <div>
            <p className="acct-bodymap-status">
                {selected ? (
                    <>
                        <strong>{t(`user_form.muscle_groups.${selected}`, { defaultValue: selected })}</strong> — {Math.round(getSorenessValue(soreness, selected) )}% {t("account.sore_label")}
                    </>
                ) : (
                    "\u00A0"
                )}
            </p>
            <div className="acct-bodymap">
                <div className="acct-bodymap-figure">
                    <FrontFigure soreness={soreness} getColor={getColor} selected={selected} onSelect={toggle} ariaLabel={frontLabel} />
                    <span className="acct-bodymap-caption">{frontLabel}</span>
                </div>
                <div className="acct-bodymap-figure">
                    <BackFigure soreness={soreness} getColor={getColor} selected={selected} onSelect={toggle} ariaLabel={backLabel} />
                    <span className="acct-bodymap-caption">{backLabel}</span>
                </div>
            </div>
        </div>
    );
}

export default SorenessDiagram;
