import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';

interface AuthNavigatorProps {
  children: React.ReactNode;
}

export default function AuthNavigator({ children }: AuthNavigatorProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Đảm bảo component đã được mount
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Chỉ redirect khi component đã mount và không loading
    if (isMounted && !isLoading) {
      if (isAuthenticated) {
        // Nếu đã authenticated, chuyển đến tabs
        router.replace('/(tabs)');
      } else {
        // Nếu chưa authenticated, chuyển đến login
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading, router, isMounted]);

  return <>{children}</>;
}
