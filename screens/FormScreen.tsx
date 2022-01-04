import React from "react";
import { Alert, View, TextInput, Button } from "react-native";
import { Formik, FormikValues } from "formik";

const validateEmail = (value: FormikValues) => {
  const errors = {};
  if (!value.email) {
    errors.email = "Required";
  }
  return errors;
};

const FormScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Formik
        initialValues={{ email: "" }}
        validate={validateEmail}
        onSubmit={(values) => Alert.alert("성공쓰!", values.email)}
      >
        {({ values, handleChange, handleSubmit, handleBlur }) => (
          <>
            <TextInput
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
              placeholder="여기다 써요"
              value={values.email}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
            />
            <Button title="내자!" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default FormScreen;
