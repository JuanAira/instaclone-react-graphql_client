import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../gql/user';

import getContent from './content';
import './sass/styles.scss';

const spaceName = 'register';

const initialValues = () => ({
  name: '',
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
});

export default function RegisterForm({ setShowLogin }) {
  const {
    title,
    nameAndLastName,
    email,
    password,
    repeatPassword,
    username,
    textButton,
  } = getContent();

  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required('Your name is required'),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          'Username cannot have space',
        )
        .required('Username is required'),
      email: Yup.string()
        .email('The email is not valid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('repeatPassword')], 'Passwords are not the same'),
      repeatPassword: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('password')], 'Passwords are not the same'),
    }),
    onSubmit: async (formData) => {
      try {
        const newUser = formData;
        delete newUser.repeatPassword;

        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success('Successfully registered user');
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className={spaceName} onSubmit={formik.handleSubmit}>
      <h2 className={`${spaceName}--title`}>{title}</h2>
      <Form className={`${spaceName}--form`}>
        <Form.Input
          type="text"
          placeholder={nameAndLastName}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name && true}
        />
        <Form.Input
          type="text"
          placeholder={username}
          name="username"
          className={`${spaceName}--form__input`}
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username && true}
        />
        <Form.Input
          type="text"
          placeholder={email}
          name="email"
          className={`${spaceName}--form__input`}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="password"
          placeholder={password}
          name="password"
          className={`${spaceName}--form__input`}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Form.Input
          type="password"
          placeholder={repeatPassword}
          name="repeatPassword"
          className={`${spaceName}--form__input`}
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword && true}
        />
        <Button type="submit" className="btn-submit">{textButton}</Button>
      </Form>
    </div>
  );
}

RegisterForm.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};
