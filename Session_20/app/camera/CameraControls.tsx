import { View, Button } from "react-native";

type Props = {
  mode: any
  isRecording: any
  takePicture: any
  startRecording : any
  stopRecording : any
  toggleCamera : any
};

export default function CameraControls({
  mode,
  isRecording,
  takePicture,
  startRecording,
  stopRecording,
  toggleCamera, // 👈 nhận thêm prop
}: Props) {
  return (
    <View style={{ position: "absolute", bottom: 20, width: "100%" }}>
      {/* Nút đổi camera */}
      <View style={{ position: "absolute", right: 15, top: -330 }}>
        <Button title="🔄" onPress={toggleCamera} />
      </View>

      {/* Nút chụp / quay */}
      <View style={{ alignSelf: "center" }}>
        {mode === "photo" ? (
          <Button title="📷 Chụp ảnh" onPress={takePicture} />
        ) : isRecording ? (
          <Button title="⏹ Dừng quay" color="#FF3B30" onPress={stopRecording} />
        ) : (
          <Button title="🎥 Bắt đầu quay" onPress={startRecording} />
        )}
      </View>
    </View>
  );
}
