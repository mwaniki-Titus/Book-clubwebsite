import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          if (user.error) {
            alert('Invalid username or password!');
          } else {
            onLogin(user);
            console.log(user.email);
            navigate('/home');
          }
        });
      }
    });
    setSubmitting(false);
  };

  return (
    <div className="login-container container d-flex align-items-center justify-content-center vh-100">
      <div className="card">
        <div className="card-header">Login</div>
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
                    Don't have an account?{' '}
                    <Link className="login_link" to="/sign-up">
                      Signup
                    </Link>
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
