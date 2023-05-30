import React, {useState, useEffect} from "react";
import { View, Text, FlatList } from "react-native";
import { Input } from "native-base";
import { Icon } from "react-native-elements";
import Contact from "./Contact";

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('contacts');
//db name -> contacts

const ViewContacts = () => {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState(null)

  
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts', [], (_, { rows }) => setContacts(rows._array)
      );
    });
    console.log('table accessed');
    console.log(contacts);
  }, []);

  
  // const fetchContacts = () => {
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM contacts', [], (_, { rows }) => {
  //       setContacts(rows._array);
  //     console.log('table accessed')
  //     });
  //   });
  // };

  const handleSearch=(text)=>{
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM contacts WHERE PHONE=?', [text], (_, { rows }) => {
        setContacts(rows._array);
      console.log(contacts)
      });
    });
  }

  
  const renderContacts =({contacts})=>(
    <Contact
      // fname={contacts.fname}
      // lname={contacts.lname}
      // phone={contacts.phone}
      // email={contacts.email}
      />
  )
  return (
    <View className="flex flex-col  justify-center items-center">
      <View className = 'flex flex-row justify-center items-center'>
        <Icon name="book" className="mr-4" />
        <Input
          type="text"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="Search For Phone Number"
          onChangeText={(text)=> handleSearch(text)}
        />
      </View>
      <FlatList 
          data={contacts}
          renderItem={renderContacts}
          keyExtractor={ (contacts) => contacts.phone} 
      />
      <Contact />
      <Contact />
    </View>
  );
};

export default ViewContacts;
