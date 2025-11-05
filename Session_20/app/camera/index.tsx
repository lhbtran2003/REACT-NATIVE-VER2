import React, { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";


import PreviewMedia from "./PreviewMedia";
import useCameraActions from "@/hooks/useCameraActions";
import useMediaLibrary from "@/hooks/useMediaLibrary";
import CameraControls from "./CameraControls";

export default function CameraScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  

  const [mode, setMode] = useState<"photo" | "video">("photo");

  const {
    cameraRef,
    photoUri,
    videoUri,
    isRecording,
    facing, 
    toggleCamera, 
    takePicture,
    startRecording,
    stopRecording,
    retake,
  } = useCameraActions();

  const { lastAsset, loadLastAsset, saveToLibrary } = useMediaLibrary(
    photoUri,
    videoUri
  );

  if (!cameraPermission?.granted)
    return (
      <Button title="Cấp quyền Camera" onPress={requestCameraPermission} />
    );

  return (
    <ScrollView style={{ flex: 1, padding: 16, paddingTop: 40 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        📸 Expo Camera Demo
      </Text>

      {/* Bộ đổi chế độ */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <Button title="Chụp Ảnh" onPress={() => setMode("photo")} />
        <Button
          title="Quay Video"
          color="#FF3B30"
          onPress={() => setMode("video")}
        />
      </View>

      {/* Nếu chưa chụp/quay */}
      {!photoUri && !videoUri && (
        <View style={{ height: 400, borderRadius: 12, overflow: "hidden" }}>
          <CameraView ref={cameraRef} style={{ flex: 1 }}>
            <CameraControls
              mode={mode}
              isRecording={isRecording}
              takePicture={takePicture}
              startRecording={startRecording}
              stopRecording={stopRecording}
              toggleCamera={toggleCamera}
            />
          </CameraView>
        </View>
      )}

      {/* Nếu đã chụp/quay */}
      {(photoUri || videoUri) && (
        <PreviewMedia
          photoUri={photoUri}
          videoUri={videoUri}
          saveToLibrary={saveToLibrary}
          retake={retake}
        />
      )}
    </ScrollView>
  );
}
