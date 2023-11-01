
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./LogIn";
import "./App.css"

function Signup({ onSignup }) {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    phone_number: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone_number: Yup.string().required("Phone number is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log(user);
          if (user.error) {
            alert("User already exist!");
          } else {
            alert("Successfully created new user!");
            onSignup(user);
            navigate("/");
          }
        });
      }
    });
    setSubmitting(false);
  };

  return (
    <div  className=" card login-container container d-flex align-items-center justify-content-center vh-100">
      <div className="card-header">Sign Up</div>
      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="forms">
              <div className="input_fields">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <Field
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>

              <div className="input_fields">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="input_fields">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form_message">
                <p>
                  Already have an account?{" "}
                  <Link className="login_link" to="/login">
                    Login
                  </Link>
                </p>
              </div>

              <button type="submit" className="btn" disabled={isSubmitting}>
                Signup
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
