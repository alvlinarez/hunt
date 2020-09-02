import React from 'react';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {
  Product,
  ProductDescription,
  Title,
  DescriptionText,
  Comments,
  Image,
  Votes
} from '../../styles/components/layout/productDetailsStyles';
import { apiUrl } from '../../config/axios';

const ProductDetails = ({ product }) => {
  const {
    id,
    comments,
    createdAt,
    description,
    company,
    name,
    url,
    urlImage,
    votes
  } = product;
  return (
    <Product>
      <ProductDescription>
        <div>
          <Image src={`${apiUrl}/${urlImage}`} alt={name} />
        </div>
        <div>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <Title>{name}</Title>
          </Link>
          <DescriptionText>{description}</DescriptionText>
          <Comments>
            <div>
              <img src="/static/img/comment.png" alt="" />
              <p>{comments.length} Comments</p>
            </div>
          </Comments>
          <p>Published {formatDistanceToNow(new Date(createdAt))} ago </p>
        </div>
      </ProductDescription>
      <Votes>
        <div> &#9650; </div>
        <p>{votes}</p>
      </Votes>
    </Product>
  );
};

export default ProductDetails;
