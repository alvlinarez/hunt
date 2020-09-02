import React, { useReducer } from 'react';
import ProductReducer from './ProductReducer';
import { axiosClient } from '../../config/axios';
import { ProductContext } from './ProductContext';

import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  PRODUCT_LOADING,
  RESET_PRODUCT_STATE,
  VOTE_PRODUCT_ERROR,
  UNVOTE_PRODUCT_ERROR,
  VOTE_PRODUCT_SUCCESS,
  UNVOTE_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR
} from '../../types/productTypes';

export const ProductState = ({ children }) => {
  const initialState = {
    products: null,
    currentProduct: {},
    productLoading: false,
    productError: null
  };
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const getProducts = async () => {
    dispatch({
      type: PRODUCT_LOADING
    });
    try {
      const { data } = await axiosClient().get('product');
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: data.products
      });
    } catch (e) {
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const getPopularProducts = async () => {
    dispatch({
      type: PRODUCT_LOADING
    });
    try {
      const { data } = await axiosClient().get('product', {
        params: {
          populars: true
        }
      });
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: data.products
      });
    } catch (e) {
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const getProduct = async (productId) => {
    dispatch({
      type: PRODUCT_LOADING
    });
    try {
      const { data } = await axiosClient().get(`product`, {
        params: {
          productId
        }
      });
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: data.product
      });
    } catch (e) {
      dispatch({
        type: GET_PRODUCT_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const createProduct = async ({
    name,
    description,
    company,
    url,
    urlImage
  }) => {
    dispatch({
      type: PRODUCT_LOADING
    });
    try {
      const { data } = await axiosClient().post('product', {
        name,
        description,
        company,
        url,
        urlImage
      });
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: data.product
      });
      window.location.href = `/products/${data.product.id}`;
    } catch (e) {
      dispatch({
        type: ADD_PRODUCT_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const updateProduct = async ({
    id,
    name,
    description,
    company,
    url,
    urlImage
  }) => {
    if (!id || !name || !description || !company || !url || !urlImage) {
      dispatch({
        type: UPDATE_PRODUCT_ERROR,
        payload: 'Product to updated invalid'
      });
    } else {
      dispatch({
        type: PRODUCT_LOADING
      });
      try {
        const { data } = await axiosClient().put(`product/${id}`, {
          name,
          description,
          company,
          url,
          urlImage
        });
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: data.product
        });
      } catch (e) {
        dispatch({
          type: UPDATE_PRODUCT_ERROR,
          payload: e.response.data.error
        });
      }
    }
  };

  const voteProduct = async (productId) => {
    dispatch({
      type: PRODUCT_LOADING
    });
    try {
      const { data } = await axiosClient().put(`product/${productId}/vote`);
      dispatch({
        type: VOTE_PRODUCT_SUCCESS,
        payload: data.product
      });
    } catch (e) {
      dispatch({
        type: VOTE_PRODUCT_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const unvoteProduct = async (productId) => {
    dispatch({
      type: PRODUCT_LOADING
    });
    try {
      const { data } = await axiosClient().put(`product/${productId}/unvote`);
      dispatch({
        type: UNVOTE_PRODUCT_SUCCESS,
        payload: data.product
      });
    } catch (e) {
      dispatch({
        type: UNVOTE_PRODUCT_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const deleteProduct = async ({ id }, router) => {
    dispatch({
      type: PRODUCT_LOADING
    });
    try {
      await axiosClient().delete(`product/${id}`);
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: id
      });
      router.push('/');
    } catch (e) {
      dispatch({
        type: DELETE_PRODUCT_ERROR,
        payload: e.response.data.error
      });
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        currentProduct: state.currentProduct,
        productLoading: state.productLoading,
        productError: state.productError,
        getProducts,
        getPopularProducts,
        getProduct,
        createProduct,
        updateProduct,
        voteProduct,
        unvoteProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
