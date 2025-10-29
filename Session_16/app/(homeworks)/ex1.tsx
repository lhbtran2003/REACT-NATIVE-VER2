import React from 'react'
import { Button, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../redux/slice/counterSlice'

export default function ex1() {
    const count = useSelector((state: any) => state.counter.value)
    const dispatch = useDispatch()
    const handleIncrement = () => {
       dispatch(increment())
    }
    const handleDecrement = () => {
        dispatch(decrement())
    }
  return (
    <View>
        <Text>{count}</Text>
        <Button title='Tăng' onPress={handleIncrement}/>
        <Button title='Giam' onPress={handleDecrement}/>
    </View>
  )
}
