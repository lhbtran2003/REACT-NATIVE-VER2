import { View, Image, Text, Button } from "react-native";
import { Video } from "expo-av";

type Props = {
  photoUri: any
  videoUri: any
  saveToLibrary: any
  retake: any
};

export default function PreviewMedia({
  photoUri,
  videoUri,
  saveToLibrary,
  retake,
}: Props) {
  return (
    <View>
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={{ width: "100%", height: 250, borderRadius: 10 }}
        />
      )}
      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          style={{ width: "100%", height: 250, borderRadius: 10 }}
          useNativeControls
        />
      )}
      <View style={{ marginTop: 10 }}>
        <Button title="💾 Lưu vào thư viện" onPress={saveToLibrary} />
        <View style={{ height: 10 }} />
        <Button title="🔁 Chụp lại" color="#888" onPress={retake} />
      </View>
    </View>
  );
}
