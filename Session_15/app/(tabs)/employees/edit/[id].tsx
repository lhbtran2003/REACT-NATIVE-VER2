import { editEmployee } from "@/apis/employee.apis";
import EmployeeForm from "@/components/EmployeeForm";
import { Employee } from "@/interfaces/employee.interface";
import { DUMMY_EMPLOYEES, Employee as Detail, Gender } from "@/data/mockData";

import { useLocalSearchParams } from "expo-router";
import React from "react";

const transParamToEmployee = (params: any) => {
  const getStringValue = (key: string): string => String(params[key] || "");
  const getNumberValue = (key: string): number => Number(params[key] || 0);
  const getGenderValue = (key: string): Gender => {
    const value = getStringValue(key).toUpperCase();
    return value === Gender.MALE || value === Gender.FEMALE
      ? (value as Gender)
      : Gender.MALE;
  };
  return {
    id: getNumberValue("id"),
    positionId: getNumberValue("positionId"),

    employeeCode: getStringValue("employeeCode"),
    employeeName: getStringValue("employeeName"),
    phoneNumber: getStringValue("phoneNumber"),
    positionName: getStringValue("positionName"),

    gender: getGenderValue("gender"),

    dateBirth: getStringValue("dateBirth"),
    createdAt: getStringValue("createdAt"),
  } as Detail;
};

export default function EditEmployeeScreen() {
  const params = useLocalSearchParams();
  const employeeToEdit = transParamToEmployee(params);

  const handleEdit = async (editedEmployee: Employee) => {
    try {
      const id = employeeToEdit.id;
      const response = editEmployee(editedEmployee, id);
      console.log("Response API: ", response);
    } 
    catch (error: any) {
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

  return <EmployeeForm initialData={employeeToEdit} onSubmit={handleEdit} />;
}
