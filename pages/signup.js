import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { AuthContext } from '../context/auth/AuthContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  ButtonSubmit,
  Error,
  Form,
  FormDiv
} from '../styles/components/ui/formStyles';

const SignUp = () => {
  const authContext = useContext(AuthContext);
  const { authLoading, signUp, message, error } = authContext;

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
    }),
    onSubmit: (values) => {
      signUp(values, router);
    }
  });
  return (
    <Layout>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '5rem'
        }}
      >
        Sign Up
      </h1>
      <Form onSubmit={formik.handleSubmit}>
        <FormDiv>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormDiv>
        {formik.touched.name && formik.errors.name && (
          <Error>{formik.errors.name}</Error>
        )}
        <FormDiv>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormDiv>
        {formik.touched.email && formik.errors.email && (
          <Error>{formik.errors.email}</Error>
        )}
        <FormDiv>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormDiv>
        {formik.touched.password && formik.errors.password && (
          <Error>{formik.errors.password}</Error>
        )}
        {error && <Error>{error}</Error>}
        <ButtonSubmit type="submit">Sign Up</ButtonSubmit>
      </Form>
    </Layout>
  );
};

export default SignUp;
