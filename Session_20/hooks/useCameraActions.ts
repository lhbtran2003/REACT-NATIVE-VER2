import { useState, useRef } from "react";
import { CameraView, CameraType, useMicrophonePermissions } from "expo-camera";
import { Alert } from "react-native";

export default function useCameraActions() {
    const cameraRef = useRef<CameraView>(null);

    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [microPermission, requestMicroPermission] = useMicrophonePermissions();

    // ✅ Thêm ref để track thời gian bắt đầu quay
    const recordingStartTime = useRef<number | null>(null);

    const [facing, setFacing] = useState<CameraType>("back");

    const toggleCamera = () => {
        setFacing((prev) => (prev === "back" ? "front" : "back"));
    };

    const takePicture = async () => {
        if (!cameraRef.current) return;
        try {
            const result = await cameraRef.current.takePictureAsync();
            setPhotoUri(result.uri);
            setVideoUri(null);
        } catch (error) {
            console.error("Lỗi chụp ảnh:", error);
            Alert.alert("Lỗi", "Không thể chụp ảnh");
        }
    };

    const startRecording = async () => {
        if (!cameraRef.current) return;

        // Kiểm tra quyền micro trước
        if (!microPermission?.granted) {
            const res = await requestMicroPermission();
            if (!res.granted) {
                return Alert.alert("Thiếu quyền!", "Bạn cần cấp quyền micro để quay video.");
            }
        }

        try {
            setIsRecording(true);
            setPhotoUri(null);

            // ✅ Lưu thời gian bắt đầu quay
            recordingStartTime.current = Date.now();

            cameraRef.current.recordAsync({
                maxDuration: 30,
            }).then((result) => {
                if (result && result.uri) {
                    setVideoUri(result.uri);
                    console.log("Video đã lưu:", result.uri);
                }
                setIsRecording(false);
                recordingStartTime.current = null;
            }).catch((error) => {
                console.error("Lỗi quay video:", error);

                // ✅ Kiểm tra xem có phải lỗi do dừng quá nhanh không
                const duration = recordingStartTime.current
                    ? Date.now() - recordingStartTime.current
                    : 0;

                if (duration < 1000) {
                    Alert.alert("Lỗi", "Video quá ngắn! Vui lòng quay ít nhất 1 giây.");
                } else {
                    Alert.alert("Lỗi", "Không thể quay video: " + error.message);
                }

                setIsRecording(false);
                recordingStartTime.current = null;
            });
        } catch (error) {
            console.error("Lỗi bắt đầu quay:", error);
            Alert.alert("Lỗi", "Không thể bắt đầu quay video");
            setIsRecording(false);
            recordingStartTime.current = null;
        }
    };

    const stopRecording = () => {
        if (!cameraRef.current || !isRecording) return;

        // ✅ Kiểm tra thời gian đã quay
        if (recordingStartTime.current) {
            const duration = Date.now() - recordingStartTime.current;

            if (duration < 1000) {
                Alert.alert(
                    "Video quá ngắn!",
                    "Vui lòng quay ít nhất 1 giây trước khi dừng."
                );
                return;
            }
        }

        try {
            cameraRef.current.stopRecording();
            console.log("Đã dừng quay video");
        } catch (error) {
            console.error("Lỗi dừng quay:", error);
            setIsRecording(false);
            recordingStartTime.current = null;
        }
    };

    const retake = () => {
        setPhotoUri(null);
        setVideoUri(null);
    };

    return {
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
    };
}