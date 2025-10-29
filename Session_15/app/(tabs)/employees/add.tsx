import React from "react";
import EmployeeForm from "../../../components/EmployeeForm";
import { Employee } from "@/interfaces/employee.interface";
import { addEmployee } from "@/apis/employee.apis";
import { Alert } from "react-native";
export default function AddEmployeeScreen() {
  const handleAdd = async (newEmployee: Employee) => {
    try {
      const response = await addEmployee(newEmployee);
      Alert.alert("Thêm nhân viên mới thành công");
      console.log("Phản hồi API: ", response);
    } catch (error: any) {
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
  };
  return <EmployeeForm onSubmit={handleAdd}/>;
}
