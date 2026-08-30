const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { promisify } = require("util");
const ffmpegPath = require("ffmpeg-static");

const execFileAsync = promisify(execFile);

const DATA_URL =
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
const IMAGE_BASE_URL =
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

const OUTPUT_DIR = path.join(__dirname, "../build/exercise-gifs");
const FRAMES_DIR = path.join(__dirname, "../build/exercise-frames");
const META_OUTPUT = path.join(OUTPUT_DIR, "meta.json");

async function downloadBuffer(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
    }
    return Buffer.from(await res.arrayBuffer());
}

async function downloadFrame(relativePath, destDir, index) {
    const ext = path.extname(relativePath) || ".jpg";
    const dest = path.join(destDir, `${index}${ext}`);

    if (fs.existsSync(dest)) {
        return dest;
    }

    const buffer = await downloadBuffer(`${IMAGE_BASE_URL}${relativePath}`);
    fs.writeFileSync(dest, buffer);
    return dest;
}

async function generateGif(exerciseId, framePaths, outPath) {
    const filter =
        "[0][1][0]concat=n=3:v=1:a=0,fps=4,scale=480:-1:flags=lanczos,split[a][b];" +
        "[a]palettegen=stats_mode=diff[p];" +
        "[b][p]paletteuse=dither=bayer";

    const tmpPath = `${outPath}.tmp`;

    await execFileAsync(ffmpegPath, [
    "-y",
    "-loop", "1", "-t", "0.5", "-i", framePaths[0],
    "-loop", "1", "-t", "0.5", "-i", framePaths[1],
    "-filter_complex", filter,
    "-loop", "0",
    "-f", "gif",  // ← додано: примусово вказуємо формат, бо ".gif.tmp" не розпізнається як GIF
    tmpPath,
]);

    fs.renameSync(tmpPath, outPath);
}

async function main() {
    console.log("Fetching exercise index...");
    const res = await fetch(DATA_URL);
    const items = await res.json();

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.mkdirSync(FRAMES_DIR, { recursive: true });

    const meta = [];
    let done = 0;
    let skipped = 0;
    let failed = 0;

    const eligible = items.filter((item) => item.images.length >= 2);
    console.log(`${eligible.length} exercises have >= 2 frames, ${items.length - eligible.length} skipped (< 2 images).`);

    for (const item of eligible) {
        const gifPath = path.join(OUTPUT_DIR, `${item.id}.gif`);

        if (fs.existsSync(gifPath)) {
            meta.push({ id: item.id, name: item.name });
            skipped++;
            continue;
        }

        try {
            const frameDir = path.join(FRAMES_DIR, item.id);
            fs.mkdirSync(frameDir, { recursive: true });

            const framePaths = [
                await downloadFrame(item.images[0], frameDir, 0),
                await downloadFrame(item.images[1], frameDir, 1),
            ];

            await generateGif(item.id, framePaths, gifPath);

            meta.push({ id: item.id, name: item.name });
            done++;
            console.log(`[${done + skipped}/${eligible.length}] OK: ${item.id}`);
        } catch (err) {
            failed++;
            console.error(`FAIL: ${item.id} — ${err.message}`);
        }
    }

    fs.writeFileSync(META_OUTPUT, JSON.stringify(meta, null, 2));

    console.log("\n--- Summary ---");
    console.log(`Generated: ${done}`);
    console.log(`Already existed (skipped): ${skipped}`);
    console.log(`Failed: ${failed}`);
    console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});