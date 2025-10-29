import { Stack } from "expo-router";
export default function EmployeesStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" options={{ title: "Chi tiết nhân viên" }} />
      <Stack.Screen
        name="add"
        options={{ title: "Thêm mới nhân viên", presentation: "modal" }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{ title: "Chỉnh sửa nhân viên", presentation: "modal" }}
      />
    </Stack>
  );
}
