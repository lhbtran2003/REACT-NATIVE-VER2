import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DUMMY_EMPLOYEES } from "../../../data/mockData";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function EmployeeDetailScreen() {
  const employee = DUMMY_EMPLOYEES[0]; // Hiển thị nhân viên đầu tiên làm mẫu
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <InfoRow label="Mã nhân viên" value={employee.employeeCode} />
        <InfoRow label="Họ và tên" value={employee.employeeName} />
        <InfoRow label="Số điện thoại" value={employee.phoneNumber} />
        <InfoRow label="Giới tính" value={employee.gender} />
        <InfoRow label="Ngày sinh" value={employee.dateBirth} />
        <InfoRow label="Vị trí" value={employee.positionName} />
        <InfoRow
          label="Ngày tạo"
          value={new Date(employee.createdAt).toLocaleDateString("vi-VN")}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 15 },
  card: { backgroundColor: "white", borderRadius: 10, padding: 20 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: { fontSize: 16, color: "gray" },
  value: { fontSize: 16, fontWeight: "bold" },
});
