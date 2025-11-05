import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Khởi tạo authentication state khi app start
    const initAuth = async () => {
      try {
        // Không gọi API getCurrentUser nữa, chỉ check token trong AsyncStorage
        // Token sẽ được validate khi gọi API products
        console.log('Auth initialized - token will be validated on first API call');
      } catch (error) {
        console.log('Auth initialization error:', error);
      }
    };

    initAuth();
  }, [dispatch]);

  // Không hiển thị loading screen nữa vì không có API call
  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
