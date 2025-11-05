import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

export default function useMediaLibrary(photoUri: string | null, videoUri: string | null) {
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const [lastAsset, setLastAsset] = useState<MediaLibrary.Asset | null>(null);

    // ❌ BỎ useEffect này đi - nó đang gọi loadLastAsset khi chưa có quyền
    // useEffect(() => {
    //     if (mediaPermission?.granted) loadLastAsset();
    // }, [mediaPermission]);

    const loadLastAsset = async () => {
        // ✅ Kiểm tra quyền trước khi load
        if (!mediaPermission?.granted) {
            console.log("Chưa có quyền để load asset");
            return;
        }

        try {
            const assets = await MediaLibrary.getAssetsAsync({
                first: 1,
                sortBy: [MediaLibrary.SortBy.creationTime],
                mediaType: ["photo", "video"],
            });
            setLastAsset(assets.assets[0] || null);
        } catch (error) {
            console.error("Lỗi khi load asset:", error);
        }
    };

    const saveToLibrary = async () => {
        const uri = photoUri || videoUri;
        if (!uri) return Alert.alert("Không có nội dung để lưu.");

        // ✅ Request quyền nếu chưa có
        if (!mediaPermission?.granted) {
            const res = await requestMediaPermission();
            if (!res?.granted) {
                return Alert.alert("Thiếu quyền MediaLibrary", "Vui lòng cấp quyền để lưu ảnh/video");
            }
        }

        try {
            const asset = await MediaLibrary.createAssetAsync(uri);
            const album = await MediaLibrary.getAlbumAsync("Expo Camera App");
            if (album) {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
            } else {
                await MediaLibrary.createAlbumAsync("Expo Camera App", asset, false);
            }

            Alert.alert("✅ Đã lưu!", "Nội dung đã được lưu vào thư viện.");

            // ✅ Load lại asset sau khi lưu thành công
            await loadLastAsset();
        } catch (error) {
            console.error("Lỗi khi lưu:", error);
            Alert.alert("Lỗi", "Không thể lưu vào thư viện");
        }
    };

    return { lastAsset, loadLastAsset, saveToLibrary };
}