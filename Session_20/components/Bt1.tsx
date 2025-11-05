import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { CameraCapturedPicture, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import React, { useRef, useState } from "react";
import { Alert, Button, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Bt1(){
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [video, setVideo] = useState<{ uri: string } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo');

  const statusText = permission
    ? permission.status === "granted"
      ? "Đã cấp quyền"
      : permission.status
    : "Chưa xác định";

  // Hàm yêu cầu tất cả quyền
  const requestAllPermissions = async () => {
    try {
      // Yêu cầu quyền camera
      await requestPermission();
      
      // Yêu cầu quyền thư viện
      await requestMediaPermission();
      
      // Yêu cầu quyền microphone
      const { status } = await Audio.requestPermissionsAsync();
      setAudioPermission(status === 'granted');
      
      // Log để debug
      console.log('Camera permission:', permission?.status);
      console.log('Media permission:', mediaPermission?.status);
      console.log('Audio permission:', status);
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Lỗi', 'Không thể yêu cầu quyền: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.statusText}>Trạng thái quyền camera: {statusText}</Text>
        <Text style={styles.statusText}>
          Trạng thái quyền thư viện: {mediaPermission?.status || "Chưa xác định"}
        </Text>
        <Text style={styles.statusText}>
          Trạng thái quyền microphone: {audioPermission === null ? "Chưa xác định" : (audioPermission ? "Đã cấp quyền" : "Chưa cấp quyền")}
        </Text>
        <Button 
          title="Yêu cầu quyền truy cập" 
          onPress={requestAllPermissions}
          color="#2196F3" 
        />
      </View>
      {
        permission?.status === "granted" && mediaPermission?.granted && 
        <OpenCamera 
          cameraMode={cameraMode}
          setCameraMode={setCameraMode}
          photo={photo}
          setPhoto={setPhoto}
          video={video}
          setVideo={setVideo}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          audioPermission={audioPermission}
        />
      }
      {
        (!permission?.canAskAgain || !mediaPermission?.canAskAgain || audioPermission === false) && (
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={()=>Linking.openSettings()}
          >
            <Text style={styles.settingsButtonText}>Mở cài đặt để cấp quyền</Text>
          </TouchableOpacity>
        )
      }
    </View>
  );

  function OpenCamera({ 
    cameraMode, 
    setCameraMode, 
    photo, 
    setPhoto, 
    video, 
    setVideo, 
    isRecording, 
    setIsRecording,
    audioPermission
  }: {
    cameraMode: 'photo' | 'video';
    setCameraMode: (mode: 'photo' | 'video') => void;
    photo: CameraCapturedPicture | null;
    setPhoto: (photo: CameraCapturedPicture | null) => void;
    video: { uri: string } | null;
    setVideo: (video: { uri: string } | null) => void;
    isRecording: boolean;
    setIsRecording: (recording: boolean) => void;
    audioPermission: boolean | null;
  }) {
    const cameraRef = useRef<CameraView | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    const takePicture = async () => {
      if (!isCameraReady) {
        Alert.alert('Thông báo', 'Camera chưa sẵn sàng. Vui lòng chờ một chút.');
        return;
      }
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo);
      }
    };

    const savePhoto = async () => {
      if (photo) {
        try {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
          Alert.alert('Thành công', 'Ảnh đã được lưu vào thư viện!');
          setPhoto(null);
        } catch (error) {
          Alert.alert('Lỗi', 'Không thể lưu ảnh: ' + error);
        }
      }
    };

    const startRecording = async () => {
      if (!isCameraReady) {
        Alert.alert('Thông báo', 'Camera chưa sẵn sàng. Vui lòng chờ một chút.');
        return;
      }
      if (cameraRef.current) {
        try {
          setIsRecording(true);
          
          // Cấu hình quay video với hoặc không có âm thanh
          const videoOptions = {
            quality: '720p' as const,
            maxDuration: 60, // 60 giây
            mute: audioPermission === false, // Tắt âm thanh nếu không có quyền microphone
          };
          
          const video = await cameraRef.current.recordAsync(videoOptions);
          if (video) {
            setVideo(video);
          }
        } catch (error) {
          console.error('Video recording error:', error);
          Alert.alert('Lỗi', 'Không thể quay video: ' + error);
          setIsRecording(false);
        }
      }
    };

    const stopRecording = () => {
      if (cameraRef.current) {
        cameraRef.current.stopRecording();
        setIsRecording(false);
      }
    };

    const saveVideo = async () => {
      if (video) {
        try {
          await MediaLibrary.saveToLibraryAsync(video.uri);
          Alert.alert('Thành công', 'Video đã được lưu vào thư viện!');
          setVideo(null);
        } catch (error) {
          Alert.alert('Lỗi', 'Không thể lưu video: ' + error);
        }
      }
    };

    if (photo) {
      return (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo.uri }} style={styles.preview} />
          <View style={styles.previewButtons}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => setPhoto(null)}
            >
              <Text style={styles.buttonText}>Chụp lại</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={savePhoto}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>Lưu ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (video) {
      return (
        <View style={styles.previewContainer}>
          <View style={styles.videoPreview}>
            <Text style={styles.videoText}>Video đã quay</Text>
            <Ionicons name="play-circle" size={60} color="#2196F3" />
          </View>
          <View style={styles.previewButtons}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => setVideo(null)}
            >
              <Text style={styles.buttonText}>Quay lại</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={saveVideo}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>Lưu video</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <CameraView 
          ref={cameraRef} 
          style={styles.camera} 
          facing="front"
          onCameraReady={() => {
            console.log('Camera is ready');
            setIsCameraReady(true);
          }}
        >
          {/* Mode Toggle Button */}
          <View style={styles.modeToggleContainer}>
            <TouchableOpacity
              style={[styles.modeButton, cameraMode === 'photo' && styles.activeModeButton]}
              onPress={() => setCameraMode('photo')}
            >
              <Ionicons name="camera" size={20} color={cameraMode === 'photo' ? '#fff' : '#666'} />
              <Text style={[styles.modeText, cameraMode === 'photo' && styles.activeModeText]}>Ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, cameraMode === 'video' && styles.activeModeButton]}
              onPress={() => setCameraMode('video')}
            >
              <Ionicons name="videocam" size={20} color={cameraMode === 'video' ? '#fff' : '#666'} />
              <Text style={[styles.modeText, cameraMode === 'video' && styles.activeModeText]}>Video</Text>
            </TouchableOpacity>
          </View>

          {/* Capture/Record Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.captureButton, isRecording && styles.recordingButton, !isCameraReady && { opacity: 0.5 }]}
              onPress={cameraMode === 'photo' ? takePicture : (isRecording ? stopRecording : startRecording)}
              disabled={!isCameraReady}
            >
              <Ionicons 
                name={cameraMode === 'photo' ? "camera" : (isRecording ? "stop" : "videocam")} 
                size={32} 
                color="white" 
              />
            </TouchableOpacity>
          </View>

          {/* Recording Indicator */}
          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>
                Đang quay... {audioPermission === false && '(Không có âm thanh)'}
              </Text>
            </View>
          )}

          {/* Camera initializing overlay */}
          {!isCameraReady && (
            <View style={styles.initializingOverlay}>
              <Text style={styles.initializingText}>Đang khởi tạo camera...</Text>
            </View>
          )}
        </CameraView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
    fontWeight: '500',
  },
  settingsButton: {
    backgroundColor: '#ff4242',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    aspectRatio: 3/4,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 20,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff4242',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  previewContainer: {
    flex: 1,
    width: '100%',
    aspectRatio: 3/4,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 20,
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  previewButtons: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  primaryButtonText: {
    color: '#fff',
  },
  modeToggleContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeModeButton: {
    backgroundColor: '#2196F3',
  },
  modeText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  activeModeText: {
    color: '#fff',
  },
  recordingButton: {
    backgroundColor: '#ff4242',
  },
  recordingIndicator: {
    position: 'absolute',
    top: 80,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 66, 66, 0.9)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  recordingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  initializingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  initializingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  videoPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  videoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  }
});
