// src/components/LoginForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log('values: ', values)
      const response = await axios.post("http://localhost:5001/auth/login", values);
      console.log("Login successful:", response.data);

      // Store the token securely
      localStorage.setItem("authToken", response.data.token);

      // Redirect to dashboard
      navigate("/leads");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div>
          <label className="block text-gray-600">Email</label>
          <Field
            name="email"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
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

