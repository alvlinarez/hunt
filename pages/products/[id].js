import React, { useEffect, useContext } from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../../context/auth/AuthContext';
import { ProductContext } from '../../context/product/ProductContext';
import Error from '../../components/layout/Error';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {
  Container,
  ProductContainer,
  ProductCreator
} from '../../styles/pages/products/productsStyles';
import { ButtonSubmit, FormDiv } from '../../styles/components/ui/formStyles';
import { Button } from '../../styles/components/ui/buttonStyles';

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const authContext = useContext(AuthContext);
  const { authenticated, user } = authContext;
  const productContext = useContext(ProductContext);
  const {
    productLoading,
    currentProduct,
    getProduct,
    productError
  } = productContext;
  const {
    comments,
    createdAt,
    description,
    company,
    creator,
    name,
    url,
    urlImage,
    votes,
    hasVoted
  } = currentProduct;

  useEffect(() => {
    getProduct(id);
  }, []);
  if (!productLoading && productError) {
    // If there is no product with the id
    return <Error error={{ statusCode: 404 }} />;
  }

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    validationSchema: yup.object({
      message: yup.string().required()
    }),
    onSubmit: (values) => {}
  });

  if (Object.keys(currentProduct) <= 0) {
    return null;
  }

  const isCreator = (id) => {
    return id === user.id;
  };

  const handleVote = () => {};

  const allowDelete = () => {
    if (!authenticated) return false;
    return currentProduct.creator.id === user.id;
  };

  const handleDelete = () => {};

  return (
    <Layout>
      <Container>
        <h1
          style={{
            textAlign: 'center',
            marginTop: '5rem'
          }}
        >
          {name}
        </h1>
        <ProductContainer>
          <div>
            <p>Published {formatDistanceToNow(new Date(createdAt))} ago </p>
            <p>
              By: {creator.name} of {company}
            </p>
            <img src={urlImage} alt={name} />
            <p>{description}</p>
            {authenticated && (
              <>
                <h2>Add your comment</h2>
                <form onSubmit={formik.handleSubmit}>
                  <FormDiv>
                    <input
                      type="text"
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormDiv>
                  <ButtonSubmit type="submit">Add comment</ButtonSubmit>
                </form>
              </>
            )}

            <h2
              style={{
                margin: '2rem 0'
              }}
            >
              Comments
            </h2>
            {comments.length === 0 ? (
              'No comments yet!'
            ) : (
              <ul>
                {comments.map((comment, i) => (
                  <li
                    key={`${comment.creator.id}-${i}`}
                    style={{
                      border: '1px solid #e1e1e1',
                      padding: '2rem'
                    }}
                  >
                    <p>{comment.message}</p>
                    <p>
                      By:{' '}
                      <span
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        {''} {comment.creator.name}
                      </span>
                    </p>
                    {isCreator(comment.creator.id) && (
                      <ProductCreator>Creator</ProductCreator>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside>
            <Button target="_blank" bgColor="true" href={url}>
              Visit page
            </Button>

            <div
              style={{
                marginTop: '5rem'
              }}
            >
              <p
                style={{
                  textAlign: 'center'
                }}
              >
                {votes} Votes
              </p>
              {authenticated && <Button onClick={handleVote}>Vote</Button>}
            </div>
          </aside>
        </ProductContainer>
        {allowDelete() && (
          <Button onClick={handleDelete}>Delete Product</Button>
        )}
      </Container>
    </Layout>
  );
};

export default Product;
