import React from 'react'
import { useQuery } from "@tanstack/react-query";
import apiClient from '@/api/apiClient';
import { ActivityIndicator, Text, View } from 'react-native';


export default function TodoDetailScreen({todoId}: {todoId: number}) {
    const {data, status, error} = useQuery({
        queryKey: ['todo', todoId],
        queryFn: async() => {
            const response = await apiClient.get(`/todos/${todoId}`)
            return response.data
        },
        staleTime: 1000 * 60 * 60 // dữ liệu fresh trong 1 giờ
    })

    const renderContent = () => {
        if (status === 'pending') {
            return (
                <View>
                    <ActivityIndicator size='large'/>
                    <Text>Đang tải chi tiết công việc...</Text>
                </View>
            )
        }
        if (status === 'error') {
            return (
                <View>
                    <Text>Lỗi: ${error.message}</Text>
                </View>
            )
        }
        if (status === 'success') {
            return(
                <View>
                    <Text>Tiêu đề: {data.title}</Text>
                    <Text>Trạng thái: {data.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</Text>
                </View>
            )
        }
    }
  return renderContent()
}
