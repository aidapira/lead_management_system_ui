// src/components/RegistrationForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const { confirmPassword, ...payload } = values; // Exclude confirmPassword from API payload
      const response = await axios.post(`${API_BASE_URL}/auth/register`, payload);
      
      console.log("Registration successful:", response.data);

      // Optionally: Auto-login or notify the user
      alert("Registration successful! You can now log in.");
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div>
          <label className="block text-gray-600">Username</label>
          <Field
            name="username"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block text-gray-600">Email</label>
          <Field
            name="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block text-gray-600">Password</label>
          <Field
            name="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block text-gray-600">Confirm Password</label>
          <Field
            name="confirmPassword"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
