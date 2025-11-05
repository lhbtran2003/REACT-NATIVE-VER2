# React Native Camera App

Ứng dụng camera React Native với chức năng chụp ảnh và quay video.

## Tính năng

- ✅ Chụp ảnh với camera trước/sau
- ✅ Quay video với camera trước/sau  
- ✅ Chuyển đổi giữa chế độ chụp ảnh và quay video
- ✅ Lưu ảnh và video vào thư viện thiết bị
- ✅ Preview ảnh và video sau khi chụp/quay
- ✅ Giao diện thân thiện với người dùng

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install expo-camera expo-media-library @expo/vector-icons
```

2. Cấp quyền camera và thư viện trong app.json:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Cho phép ứng dụng truy cập camera để chụp ảnh và quay video."
        }
      ],
      [
        "expo-media-library",
        {
          "photosPermission": "Cho phép ứng dụng truy cập thư viện ảnh để lưu ảnh và video.",
          "savePhotosPermission": "Cho phép ứng dụng lưu ảnh và video vào thư viện.",
          "isAccessMediaLocationEnabled": true
        }
      ]
    ]
  }
}
```

## Sử dụng

1. Mở ứng dụng và cấp quyền camera và thư viện
2. Chọn chế độ "Ảnh" hoặc "Video" ở phía trên camera
3. Nhấn nút chụp/quay ở giữa màn hình
4. Xem preview và lưu vào thư viện

## Cấu trúc code

- `Bt1.tsx`: Component chính chứa logic camera và UI
- Sử dụng `expo-camera` cho chức năng camera
- Sử dụng `expo-media-library` để lưu file
- State management với React hooks

## Lưu ý

- Cần cấp quyền camera và thư viện để sử dụng
- Video sẽ được lưu tự động sau khi quay xong
- Ảnh và video được lưu vào thư viện mặc định của thiết bị