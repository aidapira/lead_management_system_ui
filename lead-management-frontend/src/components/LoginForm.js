// src/components/LoginForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/api/login", values);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error logging in:", error.response.data);
    }
  };

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div>
          <label className="block text-gray-600">Username or Email</label>
          <Field
            name="usernameOrEmail"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ErrorMessage name="usernameOrEmail" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block text-gray-600">Password</label>
          <Field
            name="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline focus:ring-blue-400"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;

