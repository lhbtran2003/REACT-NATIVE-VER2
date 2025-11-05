import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import TodoDetailScreen from "./(inClass)/TodoDetailScreen";

export default function Home() {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text>Chọn 1 todo để xem chi tiết</Text>
      <Button title="Xem todo 1" onPress={() => setSelectedTodoId(1)} />
      <Button title="Xem todo 2" onPress={() => setSelectedTodoId(2)} />
      <Button title="Xem todo 3" onPress={() => setSelectedTodoId(3)} />
      {selectedTodoId && <TodoDetailScreen todoId={selectedTodoId} />}
    </View>
  );
}
