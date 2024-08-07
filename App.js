import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
export default function App() {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [alltodos, setAllTodos] = useState([]);

  const [viewedTodos, setViewedTodos] = useState([]);
// useState(()=>{

// },[alltodos])
  const handleAddTodo = () => {
    setAllTodos([...alltodos, { id: alltodos.length + 1, text: text ,description:description,type:"active"}]);
    setViewedTodos([...alltodos, { id: alltodos.length + 1, text: text ,description:description,type:"active"}]);

  };
  const handleActive = (index) => {
   let newList = [...alltodos];
   newList[index].type = "active"
    setViewedTodos(newList);
  };
  const getActiveList = () => {
    let activeList = [...alltodos].filter((todo)=> todo.type == "active")
    setViewedTodos(activeList);
  };
  const handleDone = (index) => {
    let newList = [...alltodos];
    newList[index].type = "done"
        setAllTodos(newList);  };
  const getDoneList = () => {
    let doneList = [...alltodos].filter((todo)=> todo.type == "done")
    setViewedTodos(doneList);  };
    const TodoItem = ({ text,description ,index}) => {
      return (
        <View style={styles.item}>
         
         
         <View style={styles.itemText}>
          <Text>Title:{text}</Text>
          <Text>Description:{description}</Text>
         </View>
         <View >
          
          <button onClick={()=>{handleActive(index)}}>active</button>
          <button  onClick={()=>{handleDone(index)}}>done</button>
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

