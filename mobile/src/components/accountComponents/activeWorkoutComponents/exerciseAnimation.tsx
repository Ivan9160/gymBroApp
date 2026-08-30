import { View } from "react-native";
import { Image } from "expo-image";
import { VideoView, useVideoPlayer } from "expo-video";

import { styles } from "../../../style";

interface ExerciseAnimationProps {
  filename: string | null;
}

function Mp4Animation({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.exerciseAnimationWrap}>
      <VideoView
        player={player}
        style={styles.exerciseAnimationImage}
        contentFit="contain"
        nativeControls={false}
      />
    </View>
  );
}

export function ExerciseAnimation({
  filename,
}: ExerciseAnimationProps) {
  if (!filename) {
    return null;
  }

  const uri = `${process.env.EXPO_PUBLIC_API_URL}/exercise-gifs/${encodeURIComponent(
    filename
  )}`;

  const extension = filename.toLowerCase();

  if (extension.endsWith(".gif")) {
    return (
      <View style={styles.exerciseAnimationWrap}>
        <Image
          source={{ uri }}
          style={styles.exerciseAnimationImage}
          contentFit="contain"
          cachePolicy="none"
          onLoad={() => console.log("GIF loaded:", uri)}
          onError={(e) => console.log("GIF ERROR:", e)}
        />
      </View>
    );
  }

  if (extension.endsWith(".mp4")) {
    return <Mp4Animation uri={uri} />;
  }

  return null;
}

export default ExerciseAnimation;
