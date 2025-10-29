import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { changeFavorite } from "../redux/slice/userFavoriteSlice";

// Giả định interface User của bạn
interface User {
  username: string;
  favorite: boolean;
}

const UserItem = ({
  user,
  onChangeFavorite,
}: {
  user: User;
  onChangeFavorite: (username: string) => void;
}) => {
  const icon = user.favorite ? "❤️" : "❓";

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.usernameText}>UserName: {user.username}</Text>
      <View style={styles.favoriteRow}>
        <Text style={styles.labelText}>Favorites:</Text>
        <TouchableOpacity onPress={() => onChangeFavorite(user.username)}>
          <Text style={styles.favoriteIcon}>{icon}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Ex4() {
  const userFavoriteList: User[] = useSelector(
    (state: RootState) => state.userFavorite
  );

  const dispatch = useDispatch();

  const handleChangeFavorite = (username: string) => {
    dispatch(changeFavorite(username));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>List Favorites User</Text>

      <FlatList
        data={userFavoriteList}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <UserItem user={item} onChangeFavorite={handleChangeFavorite} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 5,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    paddingVertical: 15,
  },
  usernameText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  favoriteRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    color: "#555",
    marginRight: 10,
  },
  favoriteIcon: {
    fontSize: 20, // Kích thước lớn hơn cho trái tim/dấu ?
    // Dùng padding để tăng vùng chạm (touch area)
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 0,
  },
});
