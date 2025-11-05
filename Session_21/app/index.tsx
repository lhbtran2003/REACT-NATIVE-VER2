import React from 'react';
import { Text, View } from 'react-native';
import SendNowButton from './SendNowButton';

const YourApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <Text>Try editing me! 🎉</Text> */}
      <SendNowButton />
    </View>
  );
};

export default YourApp;