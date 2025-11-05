import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import { Alert, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

type AvatarPickerProps = {
  size?: number;
  initialUri?: string | null;
  onChange?: (uri: string | null) => void;
  label?: string;
};

export default function AvatarPicker({ size = 120, initialUri = null, onChange, label = 'Ảnh đại diện' }: AvatarPickerProps) {
  const [avatarUri, setAvatarUri] = useState<string | null>(initialUri);

  const setUri = useCallback((uri: string | null) => {
    setAvatarUri(uri);
    onChange?.(uri);
  }, [onChange]);

  const ensurePermissions = useCallback(async () => {
    const media = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!media.granted) {
      Alert.alert('Cần quyền', 'Vui lòng cấp quyền truy cập ảnh để chọn ảnh đại diện.');
      return false;
    }
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    if (!camera.granted) {
      // Không chặn nếu người dùng chỉ muốn chọn ảnh từ thư viện.
      // Chúng ta chỉ cảnh báo khi họ chọn chức năng chụp ảnh.
    }
    return true;
  }, []);

  const openCamera = useCallback(async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();
    if (!granted) {
      const req = await ImagePicker.requestCameraPermissionsAsync();
      if (!req.granted) {
        Alert.alert('Không có quyền camera', 'Vui lòng cấp quyền camera trong phần cài đặt.');
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      setUri(result.assets[0]?.uri ?? null);
    }
  }, [setUri]);

  const openLibrary = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      setUri(result.assets[0]?.uri ?? null);
    }
  }, [setUri]);

  const onPick = useCallback(async () => {
    const ok = await ensurePermissions();
    if (!ok) return;

    if (Platform.OS === 'ios') {
      // Use simple alert as a cross-platform action sheet replacement
      Alert.alert(
        'Chọn ảnh đại diện',
        undefined,
        [
          { text: 'Chụp ảnh', onPress: openCamera },
          { text: 'Chọn từ thư viện', onPress: openLibrary },
          { text: 'Hủy', style: 'cancel' },
        ]
      );
    } else {
      Alert.alert(
        'Chọn ảnh đại diện',
        undefined,
        [
          { text: 'Chụp ảnh', onPress: openCamera },
          { text: 'Chọn từ thư viện', onPress: openLibrary },
          { text: 'Hủy', style: 'cancel' },
        ]
      );
    }
  }, [ensurePermissions, openCamera, openLibrary]);

  return (
    <View style={styles.container}>
      <Pressable style={[styles.avatarWrapper, { width: size, height: size, borderRadius: size / 2 }]} onPress={onPick}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
        ) : (
          <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
            <Text style={styles.placeholderText}>+</Text>
          </View>
        )}
      </Pressable>
      {!!label && <Text style={styles.label}>{label}</Text>}
      {avatarUri && (
        <Text style={styles.uriText} numberOfLines={1}>
          {avatarUri}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  avatarWrapper: {
    overflow: 'hidden',
    backgroundColor: '#e9eef5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#cdd9ed',
  },
  placeholder: {
    backgroundColor: '#e9eef5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 36,
    color: '#7a8aa0',
    fontWeight: '700',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
    fontWeight: '600',
  },
  uriText: {
    fontSize: 12,
    color: '#6b7280',
    maxWidth: 260,
  },
});


