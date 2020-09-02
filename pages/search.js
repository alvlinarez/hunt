import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ProductContext } from '../context/product/ProductContext';
import Layout from '../components/layout/Layout';
import {
  ProductList,
  ProductListContainer,
  ProductListUl
} from '../styles/pages/indexStyles';
import ProductDetails from '../components/layout/ProductDetails';

const Search = () => {
  const router = useRouter();
  const {
    query: { q }
  } = router;

  const productContext = useContext(ProductContext);
  const { products, getProducts } = productContext;

  // Array of searched products
  const [res, setRes] = useState([]);

  useEffect(() => {
    getProducts();
    if (products) {
      const search = q.toLowerCase();
      const filter = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.creator.name.toLowerCase().includes(search)
        );
      });
      setRes(filter);
    }
  }, [q]);

  return (
    <Layout>
      <ProductList>
        <ProductListContainer>
          <ProductListUl>
            {res && Object.keys(res).length <= 0 ? (
              <h2>Sorry, no results :(</h2>
            ) : (
              res.map((product) => (
                <ProductDetails key={product.id} product={product} />
              ))
            )}
          </ProductListUl>
        </ProductListContainer>
      </ProductList>
    </Layout>
  );
};

export default Search;
