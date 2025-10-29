import React from 'react'
import { Button, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { createRandomInteger } from '../redux/slice/listIntegerSlice'

export default function ex2() {
    const listInteger = useSelector((state:RootState ) => state.listInteger)
    const dispatch = useDispatch()
  return (
    <View>
        <Text>Danh sách số ngẫu nhiên</Text>
        <Text>[${listInteger}]</Text>
        <Button title='Tạo danh sách số ngẫu nhiên' onPress={() => dispatch(createRandomInteger())}/>
    </View>
  )
}
