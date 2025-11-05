import { Link } from 'expo-router';
import React from 'react'
import { Text, View } from 'react-native'

export default function index() {
  return (
    <View style={{margin: 100}}>
      <Link href="/camera">
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Mở Camera</Text>
      </Link>
    </View>
  );
}
