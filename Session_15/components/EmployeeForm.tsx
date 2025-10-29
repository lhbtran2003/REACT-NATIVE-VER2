import { Employee } from "@/interfaces/employee.interface";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DUMMY_POSITIONS, Employee as Detail, Gender } from "../data/mockData";


interface EmployeeFormProps {
  initialData?: Employee | Detail;
  onSubmit?: (data: any) => void;
}

export default function EmployeeForm({
  initialData,
  onSubmit,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    employeeCode: initialData?.employeeCode || "",
    employeeName: initialData?.employeeName || "",
    phoneNumber: initialData?.phoneNumber || "",
    gender: initialData?.gender || Gender.MALE,
    positionId: initialData?.positionId || undefined,
  });
  const [date, setDate] = useState(
    initialData?.dateBirth ? new Date(initialData.dateBirth) : new Date()
  );
  const [showPicker, setShowPicker] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      dateBirth: date.toISOString().split("T")[0],
    };
    onSubmit?.(payload);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Mã nhân viên *</Text>
      <TextInput
        style={styles.input}
        value={formData.employeeCode}
        onChangeText={(v) => handleInputChange("employeeCode", v)}
        placeholder="VD: NV0004"
      />

      <Text style={styles.label}>Tên nhân viên *</Text>
      <TextInput
        style={styles.input}
        value={formData.employeeName}
        onChangeText={(v) => handleInputChange("employeeName", v)}
        placeholder="Nguyễn Văn A"
      />

      <Text style={styles.label}>Số điện thoại *</Text>
      <TextInput
        style={styles.input}
        value={formData.phoneNumber}
        onChangeText={(v) => handleInputChange("phoneNumber", v)}
        placeholder="09..."
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(v) => handleInputChange("gender", v)}
        >
          <Picker.Item label="Nam" value={Gender.MALE} />
          <Picker.Item label="Nữ" value={Gender.FEMALE} />
        </Picker>
      </View>

      <Text style={styles.label}>Ngày sinh</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString("vi-VN")}
          editable={false}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={"spinner"}
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Vị trí công việc</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.positionId}
          onValueChange={(v) => handleInputChange("positionId", v)}
        >
          <Picker.Item label="-- Chọn vị trí --" value={undefined} />
          {DUMMY_POSITIONS.map((pos) => (
            <Picker.Item key={pos.id} label={pos.positionName} value={pos.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={initialData ? "Lưu thay đổi" : "Thêm mới"}
          color="tomato"
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, marginBottom: 8, color: "#333", fontWeight: "600" },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#000",
  },
  pickerContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: { marginTop: 20, marginBottom: 40 },
});
