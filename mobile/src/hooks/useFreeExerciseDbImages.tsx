// hooks/useFreeExerciseDbImages.ts
import { useEffect, useRef, useState } from "react";

interface FreeExerciseDbItem {
    id: string;
    name: string;
    images: string[]; // відносні шляхи типу "Bench_Press/0.jpg"
}

interface ExerciseFrames {
    images: string[]; // повні URL
}

const DATA_URL =
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
const IMAGE_BASE_URL =
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/";

let indexPromise: Promise<Map<string, string[]>> | null = null;

async function buildIndex(): Promise<Map<string, string[]>> {
    const res = await fetch(DATA_URL);
    const data: FreeExerciseDbItem[] = await res.json();

    const index = new Map<string, string[]>();

    for (const item of data) {
        const key = item.name.trim().toLowerCase();
        index.set(
            key,
            item.images.map((path) => `${IMAGE_BASE_URL}${path}`)
        );
    }

    return index;
}

function getIndex(): Promise<Map<string, string[]>> {
    if (!indexPromise) {
        indexPromise = buildIndex();
    }
    return indexPromise;
}

export function useFreeExerciseDbImages(searchTerm: string | null) {
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const cancelledRef = useRef(false);

    useEffect(() => {
        cancelledRef.current = false;

        if (!searchTerm) {
            setImages([]);
            return;
        }

        setIsLoading(true);

        getIndex()
            .then((index) => {
                if (cancelledRef.current) return;

                const key = searchTerm.trim().toLowerCase();
                let found = index.get(key);

                if (!found) {
                    for (const [name, imgs] of index) {
                        if (name.includes(key) || key.includes(name)) {
                            found = imgs;
                            break;
                        }
                    }
                }

                setImages(found ?? []);
            })
            .catch((error) => {
                console.error("free-exercise-db index error:", error);
                if (!cancelledRef.current) setImages([]);
            })
            .finally(() => {
                if (!cancelledRef.current) setIsLoading(false);
            });

        return () => {
            cancelledRef.current = true;
        };
    }, [searchTerm]);

    return { images, isLoading };
}