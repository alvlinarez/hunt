import React, { useContext, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import {
  ProductList,
  ProductListContainer,
  ProductListUl
} from '../styles/pages/indexStyles';
import ProductDetails from '../components/layout/ProductDetails';
import { ProductContext } from '../context/product/ProductContext';

export default function Home() {
  const productContext = useContext(ProductContext);
  const { products, getProducts, productError } = productContext;
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Layout>
      <ProductList>
        <ProductListContainer>
          <ProductListUl>
            {products &&
              products.map((product) => (
                <ProductDetails key={product.id} product={product} />
              ))}
          </ProductListUl>
        </ProductListContainer>
      </ProductList>
    </Layout>
  );
}
