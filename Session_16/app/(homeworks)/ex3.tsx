import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  changeToGridMode,
  changeToListMode,
  DisplayMode,
} from "../redux/slice/displayModeSlice";

export default function Ex3() {
  const displayMode = useSelector((state: RootState) => state.displayMode.mode);
  const dispatch = useDispatch();

  const isGrid = displayMode === DisplayMode.GRID
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

  const handleChangeToListMode = () => {
    dispatch(changeToListMode());
  };

  const handleChangeToGridMode = () => {
    dispatch(changeToGridMode());
  };

  const renderItem = ({ item }: { item: number }) => (
    
    <View
      style={[styles.itemContainer, isGrid ? styles.gridItem : styles.listItem]}
    >
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleChangeToListMode}
          style={[
            styles.modeButton,
            !isGrid && styles.activeModeButton, 
          ]}
        >
          <Text
            style={[
              styles.modeButtonText,
              !isGrid && styles.activeModeButtonText,
            ]}
          >
            List mode
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChangeToGridMode}
          style={[
            styles.modeButton,
            isGrid && styles.activeModeButton, 
          ]}
        >
          <Text
            style={[
              styles.modeButtonText,
              isGrid && styles.activeModeButtonText,
            ]}
          >
            Grid mode
          </Text>
        </TouchableOpacity>
      </View>

    
      <FlatList
        numColumns={isGrid ? 2 : 1}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        key={isGrid ? "grid" : "list"}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeModeButton: {
    backgroundColor: "#007AFF", 
    borderColor: "#007AFF",
  },
  modeButtonText: {
    color: "#000",
    fontWeight: "500",
  },
  activeModeButtonText: {
    color: "white",
  },


  listContent: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: "#FF5733", 
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5, 
  },
  itemText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },


  listItem: {
    width: "100%", 
    height: 100,
    marginBottom: 10, 
  },

 
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: "48%", 
    margin: 5,
  },
});
