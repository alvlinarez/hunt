import React, { useEffect, useContext } from 'react';
import { ProductContext } from '../context/product/ProductContext';
import Layout from '../components/layout/Layout';
import {
  ProductList,
  ProductListContainer,
  ProductListUl
} from '../styles/pages/indexStyles';
import ProductDetails from '../components/layout/ProductDetails';

const Populars = () => {
  const productContext = useContext(ProductContext);
  const { getPopularProducts, products } = productContext;

  useEffect(() => {
    getPopularProducts();
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
};

export default Populars;
