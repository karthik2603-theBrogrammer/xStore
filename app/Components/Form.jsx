// import { View, Text, TextInput } from "react-native";
// import React, { useState, useEffect } from "react";
// import { Input, Button } from "native-base";
// import { Icon } from "react-native-elements";
// import { useRouter } from "expo-router";

// import * as SQLite from "expo-sqlite";
// const db = SQLite.openDatabase("contacts");
// //db name -> contacts

// const Form = () => {
//   const router = useRouter();
//   const [contacts, setContacts] = useState([]);
//   const [formValues, setFormValues] = useState({
//     firstname: "",
//     lastname: "",
//     phone: "",
//     email: "",
//   });

//   const handleInputChange = (name, value) => {
//     setFormValues((prevFormValues) => ({
//       ...prevFormValues,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     makeTable();
//   }, [db]);

//   const makeTable = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "CREATE TABLE IF NOT EXISTS contacts (phone TEXT PRIMARY KEY, fname TEXT, lname TEXT, email TEXT)"
//       );
//       // console.log("Table Created!");
//     });
//   };

//   const fetchContacts = () => {
//     db.transaction((tx) => {
//       tx.executeSql("SELECT * FROM contacts", [], (_, { rows }) => {
//         setContacts(rows._array);
//         // console.log("table accessed");
//       });
//     });
//   };

//   // const fetchContacts = () => {
//   //   db.transaction(async (tx) => {
//   //     await tx.executeSql
//   //   })
//   // }

//   const handleAddContact = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "INSERT OR REPLACE INTO contacts (phone, fname, lname, email) VALUES (?, ?, ?, ?)",
//         [
//           formValues.phone,
//           formValues.firstname,
//           formValues.lastname,
//           formValues.email,
//         ],
//         (_, { rowsAffected }) => {
//           if (rowsAffected > 0) {
//             // console.log("Contact added successfully");
//           } else {
//             // console.log("Contact Already Exists");
//           }
//           setFormValues({
//             firstname: "",
//             lastname: "",
//             phone: "",
//             email: "",
//           });
//         }
//       );
//     });
//   };

//   ///DROP
//   const handleDrop = () => {
//     db.transaction((tx) => {
//       tx.executeSql("DROP TABLE CONTACTS", [], (_, { rowsAffected }) => {
//         // console.log('Table Dropped')
//         makeTable();
//       });
//     });
//   };

//   ///

//   return (
//     <View className="flex flex-col justify-center items-center my-5 space-y-6">
//       <View className="flex flex-row  justify-center items-center">
//         <Icon name="person" className="mr-4" />
//         <Input
//           type="text"
//           w={{
//             base: "75%",
//             md: "25%",
//           }}
//           placeholder="First Name"
//           onChangeText={(text) => handleInputChange("firstname", text)}
//         />
//       </View>
//       <View className="flex flex-row  justify-center items-center">
//         <Icon name="people" className="mr-4" />
//         <Input
//           type="text"
//           w={{
//             base: "75%",
//             md: "25%",
//           }}
//           placeholder="Last Name"
//           onChangeText={(text) => handleInputChange("lastname", text)}
//         />
//       </View>
//       <View className="flex flex-row  justify-center items-center">
//         <Icon name="phone" className="mr-4" />
//         <Input
//           type="phone"
//           w={{
//             base: "75%",
//             md: "25%",
//           }}
//           placeholder="Phone Number"
//           isRequired={true}
//           defaultValue="+91 "
//           onChangeText={(text) => handleInputChange("phone", text)}
//           keyboardType="numeric"
//           maxLength={14}
//         />
//       </View>
//       <View className="flex flex-row  justify-center items-center">
//         <Icon name="email" className="mr-4" />
//         <Input
//         textContentType="emailAddress"
//           w={{
//             base: "75%",
//             md: "25%",
//           }}
//           placeholder="Email"
//           onChangeText={(text) => handleInputChange("email", text)}
//         />
//       </View>
//       <View className="flex flex-row flex-wrap space-x-4 space-y-4 items-center justify-center">
//         <Button color="emerald.200" onPress={handleAddContact}>

//           <Text className="text-white">Register Contact</Text>
//         </Button>
//         <Button color="emerald.200" onPress={handleDrop}>
//           <Text className="text-white">Refresh Contact Book</Text>
//         </Button>
//         <Button
//           transparent
//           onPress={() => {
//             router.push("/contacts-screen/contacts");
//           }}
//         >
//           <Text className="text-white">View Your Contacts</Text>
//         </Button>
//       </View>
//     </View>
//   );
// };

// export default Form;
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Box } from "native-base";
import { Icon } from "react-native-elements";
import { useRouter } from "expo-router";
import { useToast } from "native-base";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("contacts");

const inputStyles =
  "rounded-lg w-[85%] text-center border border-purple-700 py-2   transition ease-in-out transition-400 ";
const errorStyles = "text-red-600";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^[\d\s+]{14}$/, "Phone Number must be 10 digits"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Form = () => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    toast.show({
      render: () => {
        return (
          <Box bg="green.500" px="2" py="5" mx={12} rounded="lg">
            <Text className="text-white text-[18px] text-center">
              Welcome to <Text className="text-2xl font-bold">xStore!</Text> A
              secure app to store away your contacts!
            </Text>
          </Box>
        );
      },
    });

    makeTable();
  }, [db]);

  const makeTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS contacts (phone TEXT PRIMARY KEY, fname TEXT, lname TEXT, email TEXT)"
      );
    });
  };
  const handleAddContact = (values) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT OR REPLACE INTO contacts (phone, fname, lname, email) VALUES (?, ?, ?, ?)",
        [values.phone, values.firstname, values.lastname, values.email],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Contact added successfully");
            toast.show({
              render: () => {
                return (
                  <Box bg="emerald.500" px="2" py="1" rounded="sm">
                    Contact Successfully Added!
                  </Box>
                );
              },
            });
          } else {
            console.log("Contact Already Exists");
            toast.show({
              render: () => {
                return (
                  <Box bg="red.500" px="2" py="1" rounded="sm">
                    Contact Already Exists
                  </Box>
                );
              },
            });
          }
        }
      );
    });
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      // console.log(values);
      setSubmitting(false);
      handleAddContact(values);
      resetForm();
    }, 500);
  };
  ///DROP
  const handleDrop = () => {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE CONTACTS", [], (_, { rowsAffected }) => {
        console.log("Table Dropped");
        toast.show({
          render: () => {
            return (
              <Box bg="yellow.500" px="2" py="1" rounded="sm">
                Database Dropped Successfully!
              </Box>
            );
          },
        });
        makeTable();
      });
    });
  };

  ///

  return (
    <View className="h-[90vh]">
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          phone: "+91 ",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View className="flex flex-col items-center justify-center my-9 space-y-5">
            <TextInput
              onChangeText={handleChange("firstname")}
              onBlur={handleBlur("firstname")}
              value={values.firstname}
              placeholder="First Name"
              // style = {formStyles?.inputTags}
              className={`${inputStyles}`}
            />
            {touched.firstname && errors.firstname && (
              <Text className={`${errorStyles}`}>{errors.firstname}</Text>
            )}

            <TextInput
              onChangeText={handleChange("lastname")}
              onBlur={handleBlur("lastname")}
              value={values.lastname}
              placeholder="Last Name"
              className={`${inputStyles}`}
            />
            {touched.lastname && errors.lastname && (
              <Text className={`${errorStyles}`}>{errors.lastname}</Text>
            )}

            <TextInput
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              placeholder="+91 - India. Leave a Space after code"
              keyboardType="numeric"
              maxLength={14}
              className={`${inputStyles}`}
            />
            {touched.phone && errors.phone && (
              <Text className={`${errorStyles}`}>{errors.phone}</Text>
            )}

            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
              className={`${inputStyles}`}
            />
            {touched.email && errors.email && (
              <Text className={`${errorStyles}`}>{errors.email}</Text>
            )}
            <View className="flex flex-row items-center justify-center  w-[80%]  ">
              <Button
                onPress={handleSubmit}
                title="Submit"
                disabled={isSubmitting}
                className="bg-transparent"
              >
                <View className="bg-violet-800 flex flex-row items-center justify-center p-2 rounded-md">
                  <Icon name="add" color="white" className="m-1" />
                  <Text className="text-white text-1xl font-bold">Add</Text>
                </View>
              </Button>
              <Button
                onPress={handleDrop}
                title="Submit"
                disabled={isSubmitting}
                className="bg-transparent"
              >
                <View className="bg-violet-800 flex flex-row items-center justify-center p-2 rounded-md">
                  <Icon name="remove" color="white" className="m-1" />
                  <Text className="text-white text-1xl font-bold">Reset</Text>
                </View>
              </Button>
              <Button
                onPress={() => {
                  router.push("/contacts-screen/contacts");
                }}
                className="bg-transparent"
              >
                <View className="bg-violet-800 flex flex-row items-center justify-center p-2 rounded-md space-x-1">
                  <Icon name="more" color="white" className="m-1" />
                  <Text className="text-white text-1xl font-bold">
                    View All
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Form;
const ToastMessage = ({
  id,
  status,
  variant,
  title,
  description,
  isClosable,
  ...rest
}) => {
  <Alert
    maxWidth="100%"
    alignSelf="center"
    flexDirection="row"
    variant={variant}
    {...rest}
  >
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text
            fontSize="md"
            fontWeight="medium"
            flexShrink={1}
            color={
              variant === "solid"
                ? "lightText"
                : variant !== "outline"
                ? "darkText"
                : null
            }
          >
            {title}
          </Text>
        </HStack>
        {isClosable ? (
          <IconButton
            variant="unstyled"
            icon={<CloseIcon size="3" />}
            _icon={{
              color: variant === "solid" ? "lightText" : "darkText",
            }}
            onPress={() => toast.close(id)}
          />
        ) : null}
      </HStack>
      <Text
        px="6"
        color={
          variant === "solid"
            ? "lightText"
            : variant !== "outline"
            ? "darkText"
            : null
        }
      >
        {description}
      </Text>
    </VStack>
  </Alert>;
};
