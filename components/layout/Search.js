import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  ButtonSubmit,
  InputText
} from '../../styles/components/layout/searchStyles';

const Search = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      search: ''
    },
    validationSchema: yup.object({
      search: yup.string().required()
    }),
    onSubmit: (values) => {
      router.push({
        pathname: '/search',
        query: { q: values.search }
      });
    }
  });
  return (
    <form
      style={{
        position: 'relative'
      }}
      onSubmit={formik.handleSubmit}
    >
      <InputText
        type="text"
        placeholder="Search Products..."
        onChange={formik.handleChange}
        name="search"
        value={formik.values.search}
      />
      <ButtonSubmit type="submit">Search</ButtonSubmit>
    </form>
  );
};

export default Search;
