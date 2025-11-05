import apiClient from "@/api/apiClient";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, View } from "react-native";
import { queryClient } from "../_layout";

export default function CreateTodoForm() {
  const [text, setText] = useState("");
  

  // định nghĩa mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (newTodo: any) => {
      const response = await apiClient.post("/todos", newTodo);
      return response.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['todo']})
    },
    onError: (err) => {
        console.log("Đã có lỗi xảy ra: ", err.message);
        // có thể trả về thêm các component mong muốn
        
    }
  });

  const handleSubmit = () => {
    if (text.trim()) {
      mutate({ title: text, completed: false });
      setText("");
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Nhập công việc mới..."
        value={text}
        onChangeText={setText}
      />
      <Button
        title={isPending ? "Đang tạo..." : "Tạo mới"}
        onPress={handleSubmit}
        disabled={isPending}
      />
      {isPending && <ActivityIndicator/>}

      {/* error là đối tượng chứa nội dung lỗi thực tế  */}
      {error && <Text>Lỗi: ${error.message}</Text>}
    </View>
  );
}
