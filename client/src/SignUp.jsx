import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./LogIn";
import "./App.css";
import { API_BASE_URL } from './config';

function Signup({ onSignup }) {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    fetch(`${API_BASE_URL}/signup`, {
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
            alert("User already exists!");
          } else {
            alert("Successfully created a new user!");
            onSignup(user);
            navigate("/");
          }
        });
      }
      setSubmitting(false);
    });
  };

  return (
    <div className="signup-container card-container container d-flex align-items-center justify-content-center vh-100">
      <div className="card-header">Sign Up</div>
      <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form">
              <div className="input-group">
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
                  className="error-message"
                />
              </div>

              <div className="input-group">
                <label htmlFor="first_name" className="form-label">
                  First Name:
                </label>
                <Field
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-group">
                <label htmlFor="last_name" className="form-label">
                  Last Name:
                </label>
                <Field
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="input-group">
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
                  className="error-message"
                />
              </div>

              <div className="form-message">
                <p>
                  Already have an account?{" "}
                  <Link className="login-link" to="/login">
                    Login
                  </Link>
                </p>
              </div>

              <button type="submit" className="btn-primary" disabled={isSubmitting}>
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
