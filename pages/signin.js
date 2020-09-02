import React, { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  ButtonSubmit,
  Error,
  Form,
  FormDiv
} from '../styles/components/ui/formStyles';
import Layout from '../components/layout/Layout';
import {
  SocialMediaContainer,
  SocialMediaIconContainer
} from '../styles/pages/signinStyles';

const SignIn = () => {
  const authContext = useContext(AuthContext);
  const { authLoading, signIn, error } = authContext;

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
    }),
    onSubmit: (values) => {
      signIn(values, router);
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
        Sign In
      </h1>
      <Form onSubmit={formik.handleSubmit}>
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
        <ButtonSubmit type="submit">Sign In</ButtonSubmit>
      </Form>

      <SocialMediaContainer>
        <SocialMediaIconContainer>
          <img src="/static/img/google-icon.png" alt="Google Icon" />
          <a href="/auth/google">Sign In with Google</a>
        </SocialMediaIconContainer>

        <SocialMediaIconContainer>
          <img src="/static/img/facebook-icon.png" alt="Facebook Icon" />
          <a href="/auth/facebook">Sign In with Facebook</a>
        </SocialMediaIconContainer>
      </SocialMediaContainer>
    </Layout>
  );
};

export default SignIn;
