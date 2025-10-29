import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { changeLanguage, Language } from "../redux/slice/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import vi from "../../langueges/vi.json";
import en from "../../langueges/en.json";

export default function ex5() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([
    {label: "Tiếng Việt", value: Language.VI,},
    { label: "English", value: Language.EN },
  ]);

  const language = useSelector((state: RootState) => state.language.value)
  const dispatch = useDispatch()    

  const texts = language === Language.VI ? vi : en

  return (
    <View>
      <DropDownPicker
        open={open}
        value={language}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue = callback(language);
          dispatch(changeLanguage(newValue));
        }}
        setItems={setItems}
        placeholder="Chọn ngôn ngữ"
      />
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>{texts.hello}</Text>
        <Text style={{ marginTop: 8 }}>{texts.welcome}</Text>
      </View>
    </View>
  );
}
