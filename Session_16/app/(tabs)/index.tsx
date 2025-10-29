import { Platform, StyleSheet, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByAmount } from "../redux/slice/counterSlice";

export default function HomeScreen() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(5));
  };
  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
}
