import { deleteEmployee, getAllEmployee } from "@/apis/employee.apis";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DUMMY_EMPLOYEES, Employee } from "../../../data/mockData";


export default function EmployeeListScreen() {
  const router = useRouter()
  const [listEmployees, setListEmployees] = useState<Employee[]>([])
  useEffect(() => {
    const fetchAllEmployee = async () => {
      try {
        const response = await getAllEmployee();

        console.log("Response; ", response);
        // hãy xem response trả về có cấu trúc như thế nào
        if (response) {
          setListEmployees(response?.data)
        }

        Alert.alert("Thành công", JSON.stringify(response));
      } catch (error) {
        console.log("Error: ", error);

        Alert.alert("Cảnh báo", JSON.stringify(error?.response));
      }
    };

    fetchAllEmployee();
  }, []);

  const handleDelete = async(id: number) => {
    try {
      await deleteEmployee(id)
    } catch {
       const errorData = error?.response?.data;
       let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
       if (errorData?.message) {
         const rawMessage = errorData.message;
         if (Array.isArray(rawMessage)) {
           errorMessage = rawMessage.join("\n");
         } else if (typeof rawMessage === "string") {
           errorMessage = rawMessage;
         }
       }
    }
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Danh sách Nhân viên",
          headerRight: () => (
            <Link href="/employees/add" asChild>
              <TouchableOpacity onPress={() => router.push("/(tabs)/employees/add")}>
                <Ionicons name="add-circle" size={32} color="tomato" />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <FlatList
        data={listEmployees}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }: { item: Employee }) => (
          <Link
            href={{
              pathname: "/employees/[id]",
              params: { id: item.id.toString() },
            }}
            asChild
          >
            <TouchableOpacity style={styles.itemContainer}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {item.employeeName} ({item.employeeCode})
                </Text>
                <Text style={styles.itemPosition}>{item.positionName}</Text>
              </View>
              <View style={styles.itemActions}>
                <Link
                  href={{
                    pathname: "/employees/edit/[id]",
                    params: { id: item.id.toString() },
                  }}
                  asChild
                >
                  {/* nút edit gắn ở đây */}
                  <TouchableOpacity onPress={() => router.push({pathname: `/(tabs)/employees/edit/[id]`, params: {...item}})}>
                    <Ionicons name="pencil" size={24} color="#007AFF" />
                  </TouchableOpacity>
                </Link>
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPosition: { fontSize: 14, color: "gray", marginTop: 4 },
  itemActions: { flexDirection: "row", alignItems: "center" },
});
