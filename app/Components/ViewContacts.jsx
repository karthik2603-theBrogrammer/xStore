import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Input } from "native-base";
import { Icon } from "react-native-elements";
import Contact from "./Contact";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("contacts");
//db name -> contacts

const ViewContacts = () => {
  const [contacts, setContacts] = useState(null);
  const [query, setQuery] = useState("");
  const [emptyContacts, setEmptyContacts] = useState([
    { fname: null, lname: null, phone: null, email: null },
  ]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM contacts", [], (_, { rows }) => {
        // console.log("fetching contacts", rows._array);
        setContacts(rows._array);
      });
    });
  }, []);

  useEffect(() => {
    if (contacts !== null && query !== "") {
      const filteredData = contacts.filter((item) =>
        item.phone.includes(query)
      );
      // console.log("newData", filteredData);
    }
  }, [query]);

  const renderContact = ({ item }) => (
    <Contact
      fname={item?.fname}
      lname={item?.lname}
      phone={item?.phone}
      email={item?.email}
    />
  );
  return (
    <View className="flex flex-col  justify-center items-center bg-white">
      <View className="flex flex-row justify-center items-center mt-[5%]">
        <Icon name="book" className="mr-4" color='purple' />
        <Input
          type="text"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="Search For Phone Number"
          onChangeText={(text) => setQuery(text)}
          keyboardType="numeric"
        />
      </View>
      <FlatList
        data={
          (contacts?.filter((item) => item?.phone?.includes(query)))?.length > 0
            ? contacts?.filter((item) => item?.phone?.includes(query))
            : emptyContacts
        }
        renderItem={renderContact}
        keyExtractor={(contacts) => contacts.phone}
      />
    </View>
  );
};

export default ViewContacts;
