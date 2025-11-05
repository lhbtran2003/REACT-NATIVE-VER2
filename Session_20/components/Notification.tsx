import * as Notifications from 'expo-notifications';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, View } from 'react-native';

const Notification = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const requestPermissions = useCallback(async () => {
    const settings = await Notifications.getPermissionsAsync();
    let finalStatus = settings.status;
    if (finalStatus !== 'granted') {
      const ask = await Notifications.requestPermissionsAsync();
      finalStatus = ask.status;
    }
    const granted = finalStatus === 'granted';
    setPermissionGranted(granted);
    return granted;
  }, []);

  useEffect(() => {
    requestPermissions();
  }, [requestPermissions]);

  const sendNow = useCallback(async () => {
    const hasPermission = permissionGranted || (await requestPermissions());
    if (!hasPermission) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Xin chào',
        body: 'Gửi ngay lập tức!',
      },
      trigger: null,
    });
  }, [permissionGranted, requestPermissions]);

  return (
    <View>
      <Button title="Gửi ngay" onPress={sendNow} />
    </View>
  );
};

export default Notification;


