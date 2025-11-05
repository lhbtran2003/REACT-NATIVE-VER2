
import Notification from '@/components/Notification';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

const YourApp = () => {
  return (
   <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
   {/* <View style={{ marginBottom: 24 }}>
     <AvatarPicker />
   </View> */}
   {/* <Bt1/> */}
   <View style={{ marginTop: 24 }}>
     <Notification />
   </View>
   </SafeAreaView>
  );
};

export default YourApp;