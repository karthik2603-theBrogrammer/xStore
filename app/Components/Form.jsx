import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Button } from "native-base";
import { Icon } from "react-native-elements";
import { useRouter } from "expo-router";

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('contacts');
//db name -> contacts

const Form = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState([])
  const [formValues, setFormValues] = useState({
    firstname: null,
    lastname: null,
    phone: null,
    email: null,
  }); 

  const handleInputChange = (name, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contacts (phone TEXT PRIMARY KEY, fname TEXT, lname TEXT, email TEXT)'
      );
    });
    console.log('table created')
    fetchContacts();
    console.log(contacts)
  }, [db]);

  const fetchContacts = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM contacts', [], (_, { rows }) => {
        setContacts(rows._array);
      console.log('table accessed')
      });
    });
  };

  const handleSubmit = () =>{
    console.log('here')
    db.transaction(tx => {
      tx.executeSql(
        'INSERT OR REPLACE INTO contacts (phone, fname, lname, email) VALUES (?, ?, ?, ?)',
        [formValues.phone, formValues.firstname, formValues.lastname, formValues.email],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Contact added successfully');
          }
          else{
            console.log('nope')
          }
          setFormValues({
            firstname: null,
            lastname: null,
            phone: null,
            email: null,
          });
          fetchContacts();
        }
      );
    });
  }

///DROP
  const handleDrop =()=>{
    db.transaction(tx=>{
      tx.executeSql('DROP table contacts'), ()=>{
        console.log('Database Dropped')
        fetchContacts();
      }
    })
  }
///

  return (
    <View className="flex flex-col justify-center items-center my-5 space-y-6">
      <View className="flex flex-row  justify-center items-center">
        <Icon name="person" className="mr-4" />
        <Input
          type="text"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="First Name"
          onChangeText={(text) => handleInputChange("firstname", text)}
        />
      </View>
      <View className="flex flex-row  justify-center items-center">
        <Icon name="people" className="mr-4" />
        <Input
          type="text"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="Last Name"
          onChangeText={(text) => handleInputChange("lastname", text)}
        />
      </View>
      <View className="flex flex-row  justify-center items-center">
        <Icon name="phone" className="mr-4" />
        <Input
          type="phone"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="Phone Number"
          onChangeText={(text) => handleInputChange("phone", text)}
        />
      </View>
      <View className="flex flex-row  justify-center items-center">
        <Icon name="email" className="mr-4" />
        <Input
          type="email"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="Email"
          onChangeText={(text) => handleInputChange("email", text)}
        />
      </View>
      <Button color='emerald.200'  onPress={handleSubmit}>
        <Text className = 'text-white'>Success</Text>
      </Button>
      <Button color='emerald.200'  onPress={handleDrop}>
        <Text className = 'text-white'>Drop</Text>
      </Button>
      <Button color="emerald.200" onPress={() => {router.push('/contacts-screen/contacts')}}>
        <Text className="text-white">View Contacts</Text>
      </Button>
    </View>
  );
};

export default Form;
