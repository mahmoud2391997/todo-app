import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const TodoDetails = () => {
  const navigation = useNavigation();
  const {text} = useRoute().params;
  
  return (
    <View>
        <Text>Task Title: {text}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoDetails;
