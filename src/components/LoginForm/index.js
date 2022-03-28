import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../gql/user';
import { setToken, decodeToken } from '../../utils/token';
import useAuth from '../../hooks/useAuth';

import getContent from './content';
import './sass/styles.scss';

const initialValues = () => ({
  email: '',
  password: '',
});

const spaceName = 'login-form';

export default function LoginForm() {
  const {
    title,
    form: { email, password, ctaText },
  } = getContent();
  const [err, setError] = useState('');
  const [login] = useMutation(LOGIN);
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is not valid')
        .required(' Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (formData) => {
      setError('');
      try {
        const {
          data: {
            login: {
              token,
            },
          },
        } = await login({
          variables: {
            input: formData,
          },
        });

        setToken({ token });
        setUser({ user: decodeToken({ token }) });
      } catch (error) {
        setError(error.message);
      }
    },
  });

  return (
    <Form className={spaceName} onSubmit={formik.handleSubmit}>
      <h2 className={`${spaceName}--title`}>{title}</h2>
      <Form.Input
        type="text"
        placeholder={email}
        name="email"
        className={`${spaceName}__input`}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Form.Input
        type="password"
        placeholder={password}
        name="password"
        className={`${spaceName}__input`}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password && true}
      />
      <Button type="submit" className={`${spaceName}__btn--submit`}>
        {ctaText}
      </Button>
      {err && <p className="submit-error">{err}</p>}
    </Form>
  );
}
