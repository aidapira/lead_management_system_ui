// src/pages/Register.js
import React from "react";
import RegistrationForm from "../components/RegistrationForm";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700">Register</h1>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;
