import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
export default function Home() {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [alltodos, setAllTodos] = useState([]);

  const [viewedTodos, setViewedTodos] = useState([]);
useEffect(()=>{ async function getStorage() {
  
  storage= await AsyncStorage.getItem("todos");
  console.log(storage);
  setAllTodos(storage? JSON.parse(storage) :[])
  setViewedTodos(storage? JSON.parse(storage) :[])
}
  getStorage();
},[])
  const handleAddTodo = () => {
    setAllTodos([...alltodos, { id: alltodos.length + 1, text: text ,description:description,type:"active"}]);
    setViewedTodos([...alltodos, { id: alltodos.length + 1, text: text ,description:description,type:"active"}]);
    storeData({ id: alltodos.length + 1, text: text ,description:description,type:"active"})

  };
  const  handleDeleted =async (index) => {
    let todos = [...alltodos]
    todos.splice(index,1);
    setAllTodos(todos);
    setViewedTodos(todos);
    console.log(todos);
    await AsyncStorage.setItem("todos",JSON.stringify(todos) );

  };
  const getActiveList = () => {
    let activeList = [...alltodos].filter((todo)=> todo.type == "active")
    setViewedTodos(activeList);
  };
  const handleDone = (index) => {
    let newList = [...alltodos];
    newList[index].type = "done"
        setAllTodos(newList);
      storeData()
      };
  const getDoneList = () => {
    let doneList = [...alltodos].filter((todo)=> todo.type == "done")
    setViewedTodos(doneList);  };
    const navigation = useNavigation();
    const storeData = async () => {
      let storage =await AsyncStorage.getItem("todos");
      
      if ( storage) {
      let todo = [...alltodos];
        await AsyncStorage.setItem("todos",JSON.stringify(todo) );
      } else {

        try {
          await AsyncStorage.setItem("todos", JSON.stringify([value]));
          console.log('Data stored successfully!');
        } catch (error) {
          console.error('Error storing data: ', error);
        }
      }
    };
    const TodoItem = ({ text,description ,index}) => {
      return (
        <View style={styles.item}>
         
         <TouchableOpacity style={styles.itemText}       onPress={() => navigation.navigate("Todo-details", { text })}
         >

          <Text>Title:{text}</Text>
          <Text>Description:{description}</Text>
         </TouchableOpacity>
         <View >
          
          <AntDesign name="checksquareo" size={20} color="green" onClick={()=>{handleDone(index)}} />
          <Feather name="trash" size={20} color="red" onClick={()=>{handleDeleted(index)}}/>
         </View>
        </View>
      );
    };
    
    
    
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo App</Text>
      <StatusBar style="auto" />
      <View style={styles.addItem}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter todo..."
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter todo..."
      />
      <Button title="Add" style={styles.addButton}  onPress={handleAddTodo} />
    </View>
    <View style={styles.divider}/>
    <View style={styles.container}>

      <View style={styles.buttonsContainer}>
        <Button title="All" onPress={() => setViewedTodos(alltodos)} />
        <Button title="Active" onPress={() => getActiveList()} />
        <Button title="Done" onPress={() => getDoneList()} />
      </View>

      <FlatList
      style={{width:"100%"}}
        data={viewedTodos}
        renderItem={({ item ,index}) => <TodoItem text={item.text } description={item.description} index={index}/>}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>


 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width:"100%",
    display:"flex",
    alignItems:"center"
  },
  text : {
    textAlign:"center",
    marginVertical:"20px"

  },
  addItem : {
    display:"flex",
    flexDirection:"column",
    width:"80%"
  },
  input: {
    flex: 1,
    marginVertical:"5px"
,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  
  
  
  addButton: {
   marginVertical:"20px",
   backgroundColor:"red",
  }, buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width:"100%",
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
    width:"100%"
  },
 item:{
  display:"flex",
  flexDirection:"row",
  width:"80%",
  margin:'auto',
  justifyContent:"space-around",
  alignItems:"center",
  border:"2px solid black",
  borderRadius:"5px",
  padding:"5px"
},
itemText:{
  width:"80%",

},
itemButtons:{

display:"flex",
flexDirection:"column",
justifyContent:"space-around",
marginTop:"10px"
}
});

