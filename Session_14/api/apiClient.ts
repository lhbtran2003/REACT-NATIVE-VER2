import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
    baseURL: "nest-api-public.ixe-agent.io.vn/api/v1/positions",
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 giây
})
apiClient.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem("userToken")
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiClient