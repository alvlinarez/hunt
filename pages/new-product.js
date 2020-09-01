import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ProductContext } from '../context/product/ProductContext';
import { axiosClient } from '../config/axios';
import Layout from '../components/layout/Layout';
import {
  ButtonSubmit,
  Error,
  Form,
  FormDiv
} from '../styles/components/ui/formStyles';

const NewProduct = () => {
  const productContext = useContext(ProductContext);
  const { products, getProducts, createProduct, productError } = productContext;

  // Image object
  const [selectedFile, setSelectedFile] = useState(null);
  // If image is uploaded
  const [imageUploaded, setImageUploaded] = useState(false);
  // If image is not uploaded or an error happened
  const [errorUpload, setErrorUpload] = useState(null);

  // Url of uploaded image retrieved from API
  const [urlImage, setUrlImage] = useState(null);

  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      company: '',
      url: ''
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      description: yup.string().required(),
      company: yup.string().required(),
      url: yup.string().url().required()
    }),
    onSubmit: (values) => {
      if (imageUploaded) {
        createProduct(values);
      } else {
        setErrorUpload('Product image is required');
        setTimeout(() => {
          setErrorUpload(null);
        }, 3000);
      }
    }
  });

  const onFileUpload = async () => {
    const formData = new FormData();

    // Update the formData object
    formData.append('image', selectedFile, selectedFile.name);

    try {
      const { data } = await axiosClient().post('upload', formData);
      setUrlImage(data.path);
      formik.setValues({
        ...formik.values,
        urlImage: data.path
      });
      setImageUploaded(true);
    } catch (e) {
      setErrorUpload(e.response.data.error);
      setImageUploaded(false);
    }
  };

  return (
    <Layout>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '5rem'
        }}
      >
        New Product
      </h1>
      <Form onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>General Information</legend>
          <FormDiv>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormDiv>
          {formik.touched.name && formik.errors.name && (
            <Error>{formik.errors.name}</Error>
          )}
          <FormDiv>
            <label htmlFor="name">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Your Company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormDiv>

          {formik.touched.company && formik.errors.company && (
            <Error>{formik.errors.company}</Error>
          )}

          <FormDiv>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            {imageUploaded ? (
              <div style={{ fontSize: '1.2rem' }}>
                Image uploaded successfully
              </div>
            ) : (
              <button type="button" onClick={onFileUpload}>
                Upload Image!
              </button>
            )}
          </FormDiv>

          <FormDiv>
            <label htmlFor="url">URL</label>
            <input
              type="url"
              id="url"
              name="url"
              placeholder="Your Product URL"
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormDiv>
          {formik.touched.url && formik.errors.url && (
            <Error>{formik.errors.url}</Error>
          )}
        </fieldset>
        <fieldset>
          <legend>About your Product</legend>
          <FormDiv>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormDiv>
          {formik.touched.description && formik.errors.description && (
            <Error>{formik.errors.description}</Error>
          )}
        </fieldset>
        {productError && <Error>{productError}</Error>}
        {errorUpload && <Error>{errorUpload}</Error>}
        <ButtonSubmit type="submit">Create Product</ButtonSubmit>
      </Form>
    </Layout>
  );
};

export default NewProduct;
