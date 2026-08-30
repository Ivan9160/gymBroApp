// hooks/useWgerExerciseIndex.ts
import { useEffect, useRef, useState } from "react";

interface TranslationItem {
    name: string;
    exercise: number;
    language: number;
}

interface VideoItem {
    exercise: number;
    video: string;
    is_main: boolean;
}

interface WgerIndex {
    nameToExerciseId: Map<string, number>;
    exerciseIdToVideo: Map<number, string>;
}

const ENGLISH_LANGUAGE_ID = 2;
const PAGE_SIZE = 500;

let indexPromise: Promise<WgerIndex> | null = null;

async function fetchAllPages<T>(url: string): Promise<T[]> {
    let results: T[] = [];
    let next: string | null = url;

    while (next) {
        const res : Response = await fetch(next);
        const data = await res.json();
        results = results.concat(data.results ?? []);
        next = data.next ?? null;
    }

    return results;
}

async function buildIndex(): Promise<WgerIndex> {
    const [translations, videos] = await Promise.all([
        fetchAllPages<TranslationItem>(
            `https://wger.de/api/v2/exercise-translation/?format=json&limit=${PAGE_SIZE}`
        ),
        fetchAllPages<VideoItem>(
            `https://wger.de/api/v2/video/?format=json&limit=${PAGE_SIZE}`
        ),
    ]);

    const nameToExerciseId = new Map<string, number>();

    for (const item of translations) {
        if (item.language !== ENGLISH_LANGUAGE_ID) {
            continue;
        }

        // Кілька перекладів можуть мапитись на ту саму вправу —
        // беремо перший, не перезаписуємо.
        const key = item.name.trim().toLowerCase();
        if (!nameToExerciseId.has(key)) {
            nameToExerciseId.set(key, item.exercise);
        }
    }

    const exerciseIdToVideo = new Map<number, string>();

    for (const item of videos) {
        // Пріоритет is_main; якщо кілька відео на вправу — лишаємо перше main.
        if (!exerciseIdToVideo.has(item.exercise) || item.is_main) {
            exerciseIdToVideo.set(item.exercise, item.video);
        }
    }

    return { nameToExerciseId, exerciseIdToVideo };
}

function getIndex(): Promise<WgerIndex> {
    if (!indexPromise) {
        indexPromise = buildIndex();
    }
    return indexPromise;
}

export function useWgerExerciseMedia(searchTerm: string | null) {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const cancelledRef = useRef(false);

    useEffect(() => {
        cancelledRef.current = false;

        if (!searchTerm) {
            setVideoUrl(null);
            return;
        }

        setIsLoading(true);

        getIndex()
            .then((index) => {
                if (cancelledRef.current) return;

                const key = searchTerm.trim().toLowerCase();
                let exerciseId = index.nameToExerciseId.get(key);

                // Точного збігу нема — пробуємо часткове входження.
                if (exerciseId === undefined) {
                    for (const [name, id] of index.nameToExerciseId) {
                        if (name.includes(key) || key.includes(name)) {
                            exerciseId = id;
                            break;
                        }
                    }
                }

                const video =
                    exerciseId !== undefined
                        ? index.exerciseIdToVideo.get(exerciseId) ?? null
                        : null;

                setVideoUrl(video);
            })
            .catch((error) => {
                console.error("wger index error:", error);
                if (!cancelledRef.current) setVideoUrl(null);
            })
            .finally(() => {
                if (!cancelledRef.current) setIsLoading(false);
            });

        return () => {
            cancelledRef.current = true;
        };
    }, [searchTerm]);

    return { videoUrl, isLoading };
}