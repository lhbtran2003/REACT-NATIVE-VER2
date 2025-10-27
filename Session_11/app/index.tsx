import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mini Shop</Text>
      <Text>Find the best product here</Text>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDJwT58UWZTsmxsEJalrL_ASrD4qyyo2rOg&s",
        }}
        style={styles.image}
      />
      <TouchableOpacity
        onPress={() => router.push("/ProductListScreen")}
        style={styles.customeButton}
      >
        <Text style={styles.buttonText}>Browser All Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgrey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingHorizontal: 35,
        height: '100%'
    },
    title: {
        fontSize: 50,
        fontWeight: "bold"
    },
    description: {
        color: "grey"
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 10
    },
    customeButton: {
        backgroundColor: "lightblue",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "700"
    }
})