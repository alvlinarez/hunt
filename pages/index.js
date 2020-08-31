import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import {
  ProductList,
  ProductListContainer,
  ProductListUl
} from '../styles/pages/indexStyles';
import ProductDetails from '../components/layout/ProductDetails';

export default function Home() {
  return (
    <Layout>
      <ProductList>
        <ProductListContainer>
          <ProductListUl>
            {<ProductDetails key={1} product={'ga'} />}
          </ProductListUl>
        </ProductListContainer>
      </ProductList>
    </Layout>
  );
}
