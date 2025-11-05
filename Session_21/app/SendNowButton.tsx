import React from 'react';
import { Button } from 'react-native';
import * as Notifications from 'expo-notifications';

const SendNowButton = () => {
  const handleSendNow = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Bạn cần cấp quyền thông báo.');
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Thông báo mới!',
        body: 'Đây là nội dung thông báo.',
      },
      trigger: null,
    });
  };

  return <Button title="Gửi ngay" onPress={handleSendNow} />;
};

export default SendNowButton;
